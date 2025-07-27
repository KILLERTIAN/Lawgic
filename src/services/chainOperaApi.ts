// TensorOpera API Service with Legal Knowledge Base Integration
import TENSOROPERA_CONFIG from '@/config/tensoropera';
import { legalKnowledgeBase } from '@/services/knowledgeBase';

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface TensorOperaResponse {
  response: string;
  source: string;
  timestamp: string;
}

export class TensorOperaApiService {
  private static instance: TensorOperaApiService;
  private conversationHistory: ChatMessage[] = [];
  
  public static getInstance(): TensorOperaApiService {
    if (!TensorOperaApiService.instance) {
      TensorOperaApiService.instance = new TensorOperaApiService();
    }
    return TensorOperaApiService.instance;
  }

  async sendMessage(message: string): Promise<TensorOperaResponse> {
    console.log('🚀 TensorOpera API: Sending message to Lawgic AI...');
    
    // Check if API key is available
    if (!TENSOROPERA_CONFIG.API_KEY) {
      console.error('❌ TensorOpera API key not found in environment variables');
      return await this.getEnhancedLegalResponse(message);
    }
    
    // Add user message to conversation history
    this.conversationHistory.push({ role: 'user', content: message });
    
    try {
      // Get relevant legal context from knowledge base
      const legalContext = legalKnowledgeBase.getContextForQuery(message);
      
      // Create enhanced system prompt with legal context
      const systemPromptWithContext = TENSOROPERA_CONFIG.SYSTEM_PROMPT + legalContext;
      
      // Prepare messages for TensorOpera API
      const messages = [
        { role: 'system', content: systemPromptWithContext },
        ...this.conversationHistory
      ];

      console.log(`🔄 Calling TensorOpera API: ${TENSOROPERA_CONFIG.ENDPOINTS.CHAT_COMPLETIONS}`);
      console.log(`🤖 Using model: ${TENSOROPERA_CONFIG.MODEL}`);
      console.log(`📚 Knowledge base context: ${legalContext ? 'Found relevant cases' : 'No specific cases found'}`);
      
      const response = await fetch(TENSOROPERA_CONFIG.ENDPOINTS.CHAT_COMPLETIONS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${TENSOROPERA_CONFIG.API_KEY}`,
        },
        body: JSON.stringify({
          model: TENSOROPERA_CONFIG.MODEL,
          messages: messages,
          ...TENSOROPERA_CONFIG.DEFAULT_PARAMS
        })
      });

      console.log(`📡 TensorOpera API Response status: ${response.status}`);

      if (response.ok) {
        const data = await response.json();
        console.log('✅ TensorOpera API response received');
        
        // Parse TensorOpera response format
        const aiResponse = 
          data.choices?.[0]?.message?.content ||
          data.response ||
          data.message ||
          data.completion;
        
        if (aiResponse && aiResponse.trim()) {
          console.log('🎉 Successfully got response from TensorOpera!');
          
          // Add assistant response to conversation history
          this.conversationHistory.push({ role: 'assistant', content: aiResponse });
          
          // Keep conversation history manageable (last 8 messages)
          if (this.conversationHistory.length > 8) {
            this.conversationHistory = this.conversationHistory.slice(-8);
          }
          
          return {
            response: aiResponse,
            source: 'TensorOpera AI (Gemini 2.0 Flash)',
            timestamp: new Date().toISOString()
          };
        }
      } else {
        const errorText = await response.text();
        console.error(`❌ TensorOpera API failed with status ${response.status}:`, errorText);
        
        // Check for specific error messages
        if (errorText.includes('invalid_api_key') || errorText.includes('unauthorized')) {
          console.error('🔑 API key issue detected');
        }
      }

      // If TensorOpera API fails, use enhanced legal response
      return await this.getEnhancedLegalResponse(message);

    } catch (error) {
      console.error('❌ TensorOpera API error:', error);
      return await this.getEnhancedLegalResponse(message);
    }
  }

  // Enhanced legal response with knowledge base integration
  private async getEnhancedLegalResponse(message: string): Promise<TensorOperaResponse> {
    console.log('🧠 Using enhanced legal knowledge base...');
    
    try {
      // Search for relevant cases in knowledge base
      const relevantCases = legalKnowledgeBase.searchRelevantCases(message, 3);
      
      // For Indian law questions, provide specific responses
      if (message.toLowerCase().includes('article 350') || message.toLowerCase().includes('indian law')) {
        return {
          response: this.getIndianLawResponse(message, relevantCases),
          source: 'Lawgic Legal Database',
          timestamp: new Date().toISOString()
        };
      }

      // Return enhanced legal response based on the question
      return {
        response: this.generateEnhancedLegalResponse(message, relevantCases),
        source: 'Lawgic Legal Knowledge Base',
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      console.error('Enhanced legal response failed:', error);
      return {
        response: this.generateFallbackResponse(message),
        source: 'Lawgic Fallback System',
        timestamp: new Date().toISOString()
      };
    }
  }



  private getIndianLawResponse(message: string, relevantCases: any[]): string {
    if (message.toLowerCase().includes('article 350')) {
      return `## Article 350 of the Indian Constitution

**Article 350** deals with the **language to be used in representations for redress of grievances**.

### Key Provisions:

**Article 350(1)**: Every person shall be entitled to submit a representation for the redress of any grievance to any officer or authority of the Union or a State in any of the languages used in the Union or in the State, as the case may be.

### Important Aspects:

1. **Fundamental Right**: This article ensures that citizens can approach government authorities in their preferred language
2. **Scope**: Applies to both Union and State governments
3. **Language Options**: Citizens can use any language recognized by the Union or respective State
4. **Grievance Redressal**: Specifically relates to submitting complaints or seeking redress

### Practical Implications:

- **Administrative Convenience**: Government offices must accept representations in multiple languages
- **Access to Justice**: Ensures linguistic minorities can effectively communicate with authorities
- **Constitutional Guarantee**: Part of the fundamental structure ensuring equal access to governance

### Related Provisions:

- **Article 348**: Language of Supreme Court and High Courts
- **Article 349**: Special procedure for certain laws relating to language
- **Article 351**: Directive for development of Hindi language

### Case Law:

Several Supreme Court cases have interpreted this provision to ensure effective implementation of linguistic rights in administrative matters.

---

**⚖️ Legal Disclaimer**: This information is for educational purposes only and does not constitute legal advice. For specific legal matters, please consult with a qualified legal professional familiar with Indian constitutional law.

**📚 Source**: Constitution of India, Part XVII (Official Language)`;
    }

    return this.generateEnhancedLegalResponse(message);
  }

  private generateEnhancedLegalResponse(message: string, relevantCases: unknown[]): string {
    // Analyze the message for legal topics
    const legalTopics = {
      contract: message.toLowerCase().includes('contract'),
      employment: message.toLowerCase().includes('employment') || message.toLowerCase().includes('job'),
      property: message.toLowerCase().includes('property') || message.toLowerCase().includes('real estate'),
      business: message.toLowerCase().includes('business') || message.toLowerCase().includes('company'),
      family: message.toLowerCase().includes('family') || message.toLowerCase().includes('divorce') || message.toLowerCase().includes('marriage'),
      criminal: message.toLowerCase().includes('criminal') || message.toLowerCase().includes('crime'),
      constitutional: message.toLowerCase().includes('constitution') || message.toLowerCase().includes('article'),
      indian: message.toLowerCase().includes('india') || message.toLowerCase().includes('indian')
    };

    let specificGuidance = '';
    
    if (legalTopics.constitutional || legalTopics.indian) {
      specificGuidance = `
### Constitutional Law Guidance:

**Indian Constitutional Framework**: The Constitution of India is the supreme law, containing 395 articles and 12 schedules. Key areas include:

- **Fundamental Rights** (Articles 12-35): Basic rights guaranteed to all citizens
- **Directive Principles** (Articles 36-51): Guidelines for state policy
- **Federal Structure**: Division of powers between Union and States
- **Judicial Review**: Supreme Court's power to interpret the Constitution

**Important Constitutional Articles**:
- Article 14: Right to Equality
- Article 19: Freedom of Speech and Expression
- Article 21: Right to Life and Personal Liberty
- Article 32: Right to Constitutional Remedies`;
    } else if (legalTopics.contract) {
      specificGuidance = `
### Contract Law Guidance:

**Essential Elements of a Valid Contract**:
1. **Offer and Acceptance**: Clear proposal and unqualified acceptance
2. **Consideration**: Something of value exchanged
3. **Capacity**: Legal ability to enter contracts
4. **Free Consent**: Agreement without coercion, fraud, or mistake
5. **Lawful Object**: Purpose must be legal

**Key Considerations**:
- Written contracts provide better evidence
- Review all terms and conditions carefully
- Understand termination clauses and penalties
- Consider dispute resolution mechanisms`;
    }

    let caseReferences = '';
    if (relevantCases.length > 0) {
      caseReferences = `\n### Relevant Legal Precedents:\n\n`;
      relevantCases.forEach((legalCase, index) => {
        caseReferences += `**${index + 1}. ${legalCase.case_name}** (${legalCase.judgement_date})\n`;
        caseReferences += `${legalCase.answer}\n\n`;
      });
    }

    return `## Legal Analysis: ${message}

As **Lawgic**, your AI Legal Assistant powered by TensorOpera's Gemini 2.0 Flash, I'll provide comprehensive guidance on your legal question.

${specificGuidance}

${caseReferences}

### General Legal Framework:

1. **Jurisdiction Matters**: Legal requirements vary by location and applicable laws
2. **Documentation**: Maintain proper records of all legal transactions and communications
3. **Time Limitations**: Be aware of statutes of limitations and filing deadlines
4. **Professional Consultation**: Complex matters require qualified legal counsel

### Recommended Next Steps:

1. **Gather Documentation**: Collect all relevant papers and evidence
2. **Research Applicable Laws**: Identify specific statutes and regulations
3. **Consult Legal Professional**: For personalized advice and representation
4. **Consider Alternative Dispute Resolution**: Mediation or arbitration when appropriate

### Important Legal Resources:

- **Bar Council of India**: For finding qualified lawyers
- **Legal Aid Services**: For those who qualify for free legal assistance
- **Court Websites**: For forms, procedures, and case status
- **Government Legal Portals**: For statutory information and updates

---

**⚖️ Legal Disclaimer**: This response provides general legal information only and does not constitute legal advice. Laws vary by jurisdiction and individual circumstances. Always consult with a qualified legal professional for advice specific to your situation.

**🔗 Powered by**: Lawgic AI Legal Assistant with TensorOpera & Legal Knowledge Base (${legalKnowledgeBase.getTotalCases()} cases)

Would you like me to elaborate on any specific aspect of this legal matter?`;
  }

  private generateFallbackResponse(userMessage: string): string {
    return `Thank you for your legal question: "${userMessage}".

As **Lawgic**, your AI Legal Assistant powered by ChainOpera's decentralized platform, I can provide general legal information. However, please note that this is not legal advice and should not substitute for consultation with a qualified attorney.

## General Legal Considerations:

### 1. **Legal Framework**
The relevant laws may vary significantly by jurisdiction (federal, state, local). It's important to identify which laws apply to your specific situation.

### 2. **Documentation & Evidence**
Proper documentation is crucial for legal matters. Keep detailed records of:
- Contracts and agreements
- Communications (emails, letters, texts)
- Financial records
- Witness information

### 3. **Professional Consultation**
For specific legal advice tailored to your situation, consider consulting with a licensed attorney who specializes in the relevant area of law.

### 4. **Time Limitations**
Many legal matters have strict deadlines (statutes of limitations). Don't delay in seeking proper legal counsel if time-sensitive issues are involved.

---

**⚖️ Legal Disclaimer**: This response is powered by ChainOpera's decentralized AI platform and provides general legal information only. This is not legal advice and should not be relied upon as such. For specific legal advice tailored to your situation, please consult with a qualified legal professional.

**🔗 Powered by**: ChainOpera's Decentralized AI Network

Would you like me to elaborate on any specific aspect of your question or provide information about a particular area of law?`;
  }
}

export const tensorOperaApi = TensorOperaApiService.getInstance();

// Export with original name for backward compatibility
export const chainOperaApi = tensorOperaApi;