// Legal Knowledge Base Service
import legalData from '../../data/IndicLegalQA_Dataset_10K_Revised.json';

export interface LegalCase {
  case_name: string;
  judgement_date: string;
  question: string;
  answer: string;
}

export class LegalKnowledgeBase {
  private static instance: LegalKnowledgeBase;
  private cases: LegalCase[];

  private constructor() {
    this.cases = legalData as LegalCase[];
  }

  public static getInstance(): LegalKnowledgeBase {
    if (!LegalKnowledgeBase.instance) {
      LegalKnowledgeBase.instance = new LegalKnowledgeBase();
    }
    return LegalKnowledgeBase.instance;
  }

  // Search for relevant cases based on query
  searchRelevantCases(query: string, limit: number = 5): LegalCase[] {
    const searchTerms = query.toLowerCase().split(' ');
    const relevantCases: { case: LegalCase; score: number }[] = [];

    this.cases.forEach(legalCase => {
      let score = 0;
      const searchableText = `${legalCase.case_name} ${legalCase.question} ${legalCase.answer}`.toLowerCase();

      // Calculate relevance score
      searchTerms.forEach(term => {
        if (searchableText.includes(term)) {
          score += 1;
          // Boost score for exact matches in case name or question
          if (legalCase.case_name.toLowerCase().includes(term) || 
              legalCase.question.toLowerCase().includes(term)) {
            score += 2;
          }
        }
      });

      if (score > 0) {
        relevantCases.push({ case: legalCase, score });
      }
    });

    // Sort by relevance score and return top results
    return relevantCases
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(item => item.case);
  }

  // Get cases by specific case name
  getCasesByName(caseName: string): LegalCase[] {
    return this.cases.filter(legalCase => 
      legalCase.case_name.toLowerCase().includes(caseName.toLowerCase())
    );
  }

  // Search for constitutional articles
  searchConstitutionalArticles(articleNumber: string): LegalCase[] {
    const searchTerm = `article ${articleNumber}`;
    return this.cases.filter(legalCase => 
      legalCase.question.toLowerCase().includes(searchTerm) ||
      legalCase.answer.toLowerCase().includes(searchTerm)
    );
  }

  // Get context for AI prompt
  getContextForQuery(query: string): string {
    const relevantCases = this.searchRelevantCases(query, 3);
    
    if (relevantCases.length === 0) {
      return '';
    }

    let context = '\n\n**Relevant Legal Precedents from Knowledge Base:**\n\n';
    
    relevantCases.forEach((legalCase, index) => {
      context += `${index + 1}. **${legalCase.case_name}** (${legalCase.judgement_date})\n`;
      context += `   Q: ${legalCase.question}\n`;
      context += `   A: ${legalCase.answer}\n\n`;
    });

    return context;
  }

  // Get total number of cases
  getTotalCases(): number {
    return this.cases.length;
  }

  // Get random legal fact
  getRandomLegalFact(): LegalCase {
    const randomIndex = Math.floor(Math.random() * this.cases.length);
    return this.cases[randomIndex];
  }
}

export const legalKnowledgeBase = LegalKnowledgeBase.getInstance();