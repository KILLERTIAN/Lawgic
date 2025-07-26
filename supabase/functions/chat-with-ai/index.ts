import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { message } = await req.json()
    
    const chainOperaApiKey = Deno.env.get('CHAINOPERA_API_KEY')
    if (!chainOperaApiKey) {
      throw new Error('ChainOpera API key not configured')
    }

    // Call ChainOpera AI API
    const response = await fetch('https://api.chainopera.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${chainOperaApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'chainopera-legal-assistant',
        messages: [
          {
            role: 'system',
            content: `You are Lawgic, an AI Legal Assistant powered by ChainOpera's decentralized AI platform. You provide comprehensive legal guidance by analyzing vast amounts of legal documents and precedents. 

Key capabilities:
- Legal document analysis and review
- Case law research and precedent analysis
- Contract interpretation and drafting guidance
- Regulatory compliance assistance
- Affordable legal advice for individuals and businesses
- Multi-jurisdictional legal research

Always provide:
1. Clear, actionable legal guidance
2. References to relevant laws and precedents when applicable
3. Disclaimers that this is general legal information, not legal advice
4. Recommendations to consult with qualified attorneys for specific legal matters

Format responses in a professional, easy-to-understand manner with proper legal citations when relevant.`
          },
          {
            role: 'user',
            content: message
          }
        ],
        max_tokens: 1000,
        temperature: 0.7,
        stream: false
      })
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error('ChainOpera API error:', errorData)
      throw new Error(`ChainOpera API error: ${response.status}`)
    }

    const data = await response.json()
    const aiResponse = data.choices[0]?.message?.content || 'I apologize, but I cannot process your request at the moment. Please try again.'

    return new Response(
      JSON.stringify({ 
        response: aiResponse,
        source: 'ChainOpera AI Platform'
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )

  } catch (error) {
    console.error('Error in chat-with-ai function:', error)
    
    // Fallback response for demo purposes
    const fallbackResponse = `Thank you for your legal question: "${message}". 

As Lawgic, your AI Legal Assistant powered by ChainOpera's decentralized platform, I can provide general legal information. However, please note that this is not legal advice and should not substitute for consultation with a qualified attorney.

**General Legal Considerations:**

1. **Legal Framework**: The relevant laws may vary by jurisdiction
2. **Documentation**: Proper documentation is crucial for legal matters  
3. **Professional Consultation**: For specific legal advice, consider consulting with a licensed attorney

**Disclaimer**: This response is powered by ChainOpera's decentralized AI platform and provides general legal information only. For specific legal advice tailored to your situation, please consult with a qualified legal professional.

Would you like me to elaborate on any specific aspect of your question?`

    return new Response(
      JSON.stringify({ 
        response: fallbackResponse,
        source: 'Lawgic Fallback System'
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  }
})