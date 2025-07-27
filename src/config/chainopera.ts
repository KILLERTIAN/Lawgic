// ChainOpera Configuration
export const CHAINOPERA_CONFIG = {
  // API Configuration
  API_KEY: import.meta.env.VITE_CHAINOPERA_API_KEY || '98148fc5498346289784c5879bfd9626',
  AGENT_ID: import.meta.env.VITE_CHAINOPERA_AGENT_ID || '1948480691058642946',
  
  // API Endpoints
  ENDPOINTS: {
    AGENT_CHAT: (agentId: string) => `https://api.chainopera.ai/agents/${agentId}/chat`,
    AGENT_CHAT_V1: (agentId: string) => `https://api.chainopera.ai/v1/agents/${agentId}/chat`,
    AGENT_INVOKE: (agentId: string) => `https://api.chainopera.ai/agents/${agentId}/invoke`,
    AGENTS_CHAT: 'https://api.chainopera.ai/v1/agents/chat',
    CHAT_COMPLETIONS: 'https://api.chainopera.ai/v1/chat/completions',
    COMPLETIONS: 'https://api.chainopera.ai/v1/completions'
  },
  
  // Default Parameters
  DEFAULT_PARAMS: {
    max_tokens: 2000,
    temperature: 0.3,
    stream: false
  },
  
  // System Prompt for Lawgic AI
  SYSTEM_PROMPT: `You are Lawgic, an AI Legal Assistant specialized in providing comprehensive legal guidance. You have extensive knowledge of laws, regulations, and legal precedents across multiple jurisdictions, with particular expertise in Indian law.

Key capabilities:
- Constitutional law analysis (especially Indian Constitution)
- Contract law interpretation and guidance
- Legal document review and analysis
- Case law research and precedent analysis
- Regulatory compliance assistance
- Multi-jurisdictional legal research

For Indian law questions, provide specific, accurate information including:
- Constitutional articles and their provisions
- Relevant case law and precedents
- Practical implications and applications
- Historical context when relevant

Always include appropriate legal disclaimers and encourage consultation with qualified legal professionals for specific legal advice.

Format responses professionally with proper legal citations when relevant.`
};

export default CHAINOPERA_CONFIG;