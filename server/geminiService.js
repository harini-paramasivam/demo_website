import dotenv from 'dotenv';
dotenv.config();

/**
 * Gemini AI Integration Service for Velza
 * Connects with Google Gemini Models (e.g. gemini-1.5-flash / gemini-2.0-flash)
 * Supports full RAG context injection, conversation memory, and zero-hallucination guardrails.
 */
class GeminiService {
  constructor() {
    this.apiKey = (
      process.env.GEMINI_API_KEY || 
      process.env.GOOGLE_API_KEY || 
      process.env.VITE_GEMINI_API_KEY || 
      ''
    ).trim();

    this.model = process.env.GEMINI_MODEL || 'gemini-1.5-flash';
    this.endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${this.model}:generateContent`;
  }

  isConfigured() {
    this.refreshKey();
    return Boolean(this.apiKey);
  }

  refreshKey() {
    this.apiKey = (
      process.env.GEMINI_API_KEY || 
      process.env.GOOGLE_API_KEY || 
      process.env.VITE_GEMINI_API_KEY || 
      ''
    ).trim();
  }

  /**
   * Generates a conversational response using Gemini with RAG website grounding
   * @param {string} userQuery
   * @param {Array} history
   * @param {Array} ragContextDocs
   * @returns {Promise<string|null>} Generated text response or null if unavailable
   */
  async generateResponse(userQuery, history = [], ragContextDocs = []) {
    this.refreshKey();
    if (!this.apiKey) return null;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6500); // 6.5s timeout

      // Format RAG grounding documents
      let contextBlock = '';
      if (ragContextDocs && ragContextDocs.length > 0) {
        contextBlock = ragContextDocs.map((doc, idx) => 
          `[Source ${idx + 1}: ${doc.title} (${doc.url})]\n${doc.content || doc.summary}`
        ).join('\n\n---\n\n');
      }

      const systemInstruction = `You are Velza, the official, highly intelligent AI assistant for Velvora Solutions (https://velvorasolutions.com).

Core Operating Principles:
1. Grounded Company Accuracy: For any question concerning Velvora Solutions, its services, training programs, leadership, careers, solutions, partnerships, or policies, rely strictly and factually on the provided [VERIFIED WEBSITE CONTEXT]. Never fabricate clients, pricing, certifications, or procedures. If a specific company detail is not in the context or official knowledge, politely advise the user to contact info@velvorasolutions.com or visit /contact.
2. Broad Technical & General Intelligence: When a visitor asks general technical, programming, mathematical, educational, or conceptual questions (e.g., Python, React, HTML/CSS, APIs, AI/ML, cloud, Docker, Git, digital accessibility principles, or drafting professional messages), use your extensive technical knowledge to provide thorough, articulate, well-structured, and helpful explanations with code/examples where beneficial.
3. Natural Synthesis & Linkage: If a question spans both general knowledge and Velvora services (e.g., "I need an accessible web app built in React"), explain the technical concepts clearly AND connect them to Velvora's verified capabilities and relevant pages.
4. Professional Formatting: Use clean GitHub-flavored markdown with bolding, lists, and code blocks.
5. Helpful Internal Links: Include relevant verified markdown links (e.g., [Explore Services](/services), [Partner With Us](/partner-with-us), [Careers](/careers), [Contact Us](/contact)) when directly useful.`;

      // Format conversation turns for Gemini
      const contents = [];

      // History
      if (Array.isArray(history) && history.length > 0) {
        for (const msg of history.slice(-6)) {
          const role = (msg.role === 'user' || msg.sender === 'user') ? 'user' : 'model';
          const text = msg.content || msg.text || '';
          if (text.trim()) {
            contents.push({
              role: role,
              parts: [{ text: text.trim() }]
            });
          }
        }
      }

      // Current prompt with RAG context
      let promptText = userQuery.trim();
      if (contextBlock) {
        promptText = `[VERIFIED WEBSITE CONTEXT FROM VELVORA SOLUTIONS]:\n${contextBlock}\n\n[USER INQUIRY]:\n${userQuery.trim()}`;
      }

      contents.push({
        role: 'user',
        parts: [{ text: promptText }]
      });

      const url = `${this.endpoint}?key=${this.apiKey}`;
      const payload = {
        systemInstruction: {
          parts: [{ text: systemInstruction }]
        },
        contents: contents,
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 1200
        }
      };

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        const errText = await res.text().catch(() => '');
        console.warn(`[GeminiService] API returned ${res.status}:`, errText.slice(0, 180));
        return null;
      }

      const data = await res.json();
      const candidate = data?.candidates?.[0];
      const replyText = candidate?.content?.parts?.[0]?.text;

      if (replyText && replyText.trim()) {
        return replyText.trim();
      }

      return null;
    } catch (err) {
      if (err.name === 'AbortError') {
        console.warn('[GeminiService] Request timed out, falling back to semantic engine.');
      } else {
        console.warn('[GeminiService] Generation failed:', err.message);
      }
      return null;
    }
  }
}

export const geminiService = new GeminiService();
export default geminiService;

