import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { crawler } from './knowledgeCrawler.js';
import { geminiService } from './geminiService.js';
import { 
  technicalTopics, 
  comparisonTopics, 
  professionalWritingTopics 
} from './technicalKnowledge.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, '..', 'data', 'vora-knowledge.json');

/**
 * Enterprise RAG Knowledge & Natural Conversation Intelligence Engine for Velza
 * Built for Velvora Solutions — Continuous Dynamic Website Synchronization,
 * Context-Aware Follow-up Resolution, and Grounded Factual Accuracy.
 */
class VoraKnowledgeStore {
  constructor() {
    this.store = {
      syncMetadata: {
        version: 'v2.2.0',
        status: 'Synchronized',
        lastSynchronized: new Date().toISOString(),
        sourceHash: '',
        indexedCount: 0,
        indexedPages: 0,
        indexedCareers: 0,
        errorLogs: [],
        changelog: ['Knowledge engine initialized with deep website crawling and Gemini intelligence.']
      },
      documents: [],
      careers: [],
      faqs: []
    };

    this.debounceTimer = null;
    this.init();
  }

  async init() {
    try {
      if (fs.existsSync(DATA_FILE)) {
        const raw = fs.readFileSync(DATA_FILE, 'utf8');
        const parsed = JSON.parse(raw);
        this.store = {
          syncMetadata: parsed.syncMetadata || this.store.syncMetadata,
          documents: parsed.documents || [],
          careers: parsed.careers || [],
          faqs: parsed.faqs || []
        };
      }

      // Automatically sync and verify source integrity on startup
      await this.syncAll(false);

      // Watch for filesystem changes in data and pages to dynamically synchronize
      this.setupLiveFileWatcher();
    } catch (err) {
      console.warn('VORA Knowledge: Initial read warning, falling back to full crawl:', err.message);
      await this.syncAll(true);
      this.setupLiveFileWatcher();
    }
  }

  setupLiveFileWatcher() {
    try {
      const watchDirs = [
        path.join(__dirname, '..', 'src', 'data'),
        path.join(__dirname, '..', 'src', 'pages')
      ];

      watchDirs.forEach(dir => {
        if (fs.existsSync(dir)) {
          fs.watch(dir, { recursive: true }, (eventType, filename) => {
            if (filename && (filename.endsWith('.js') || filename.endsWith('.jsx'))) {
              if (this.debounceTimer) clearTimeout(this.debounceTimer);
              this.debounceTimer = setTimeout(async () => {
                console.log(`[VORA Auto-Sync] Detected change in ${filename} (${eventType}). Crawling website source...`);
                await this.syncAll(true);
              }, 1200);
            }
          });
        }
      });
    } catch (wErr) {
      console.warn('VORA Knowledge: File watcher initialization skipped:', wErr.message);
    }
  }

  async syncAll(force = false) {
    try {
      const currentHash = crawler.computeSourceHash();
      if (!force && this.store.syncMetadata.sourceHash === currentHash && this.store.documents.length > 0) {
        return {
          success: true,
          status: 'Up-to-date',
          version: this.store.syncMetadata.version,
          indexedCount: this.store.syncMetadata.indexedCount
        };
      }

      const crawled = await crawler.crawlAll();
      const prevVersion = this.store.syncMetadata.version || 'v2.0.0';
      const versionParts = prevVersion.replace('v', '').split('.').map(n => parseInt(n, 10) || 0);
      versionParts[2] = (versionParts[2] || 0) + 1;
      const nextVersion = `v${versionParts.join('.')}`;

      // Retain custom dynamic career records
      for (const freshCareer of crawled.careers) {
        const existingIdx = this.store.careers.findIndex(c => c.id === freshCareer.id);
        if (existingIdx !== -1) {
          freshCareer.status = this.store.careers[existingIdx].status || 'Active';
        }
      }

      const customCareers = this.store.careers.filter(c => c.isCustom);
      for (const custom of customCareers) {
        if (!crawled.careers.some(c => c.id === custom.id)) {
          crawled.careers.push(custom);
        }
      }

      this.store.documents = crawled.documents;
      this.store.careers = crawled.careers;
      this.store.faqs = crawled.faqs;

      this.store.syncMetadata = {
        version: nextVersion,
        status: 'Synchronized',
        lastSynchronized: new Date().toISOString(),
        sourceHash: currentHash,
        indexedCount: crawled.documents.length + crawled.careers.length,
        indexedPages: crawled.documents.length,
        indexedCareers: crawled.careers.length,
        errorLogs: crawled.errorLogs || [],
        changelog: [
          `Synced ${crawled.documents.length} pages & ${crawled.careers.length} careers at ${new Date().toISOString()}`,
          ...(this.store.syncMetadata.changelog || []).slice(0, 9)
        ]
      };

      this.persist();
      console.log(`[VORA Knowledge] Successfully synchronized ${nextVersion}: ${crawled.documents.length} pages, ${crawled.careers.length} careers indexed.`);

      return {
        success: true,
        version: nextVersion,
        indexedCount: this.store.syncMetadata.indexedCount,
        lastSynchronized: this.store.syncMetadata.lastSynchronized
      };
    } catch (err) {
      console.error('[VORA Knowledge] Synchronization Error:', err);
      this.store.syncMetadata.status = 'Error';
      this.store.syncMetadata.errorLogs.push({
        source: 'syncAll',
        error: err.message,
        time: new Date().toISOString()
      });
      return { success: false, error: err.message };
    }
  }

  persist() {
    try {
      const dir = path.dirname(DATA_FILE);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(DATA_FILE, JSON.stringify(this.store, null, 2), 'utf8');
    } catch (err) {
      console.error('VORA Knowledge: Persistence failure:', err);
    }
  }

  getMetadata() {
    return {
      ...this.store.syncMetadata,
      liveEngine: 'Dual-Engine Semantic Knowledge & Gemini Intelligence v2.2',
      geminiActive: geminiService.isConfigured()
    };
  }

  getPages() {
    return this.store.documents || [];
  }

  getCareers(filters = {}) {
    let list = this.store.careers || [];
    if (filters.status) {
      list = list.filter(c => (c.status || 'Active').toLowerCase() === filters.status.toLowerCase());
    }
    if (filters.type) {
      list = list.filter(c => (c.type || '').toLowerCase().includes(filters.type.toLowerCase()));
    }
    if (filters.query) {
      const q = filters.query.toLowerCase();
      list = list.filter(c =>
        c.title.toLowerCase().includes(q) ||
        c.department.toLowerCase().includes(q) ||
        (Array.isArray(c.skills) ? c.skills.some(s => s.toLowerCase().includes(q)) : false)
      );
    }
    return list;
  }

  addCareer(careerData) {
    const newId = `job-custom-${Date.now()}`;
    const newCareer = {
      id: newId,
      title: careerData.title,
      department: careerData.department || 'Engineering & Operations',
      type: careerData.type || 'Full-Time / Hybrid',
      workMode: careerData.workMode || 'Hybrid',
      location: careerData.location || 'Cuddalore, TN / Hybrid',
      experience: careerData.experience || 'Fresher / Experienced',
      skills: Array.isArray(careerData.skills) ? careerData.skills : (careerData.skills || '').split(',').map(s => s.trim()).filter(Boolean),
      eligibility: careerData.eligibility || 'Relevant degree or equivalent experience.',
      summary: careerData.summary || `Exciting opportunity for ${careerData.title} at Velvora Solutions.`,
      status: 'Active',
      isCustom: true,
      createdAt: new Date().toISOString()
    };

    this.store.careers.unshift(newCareer);
    this.store.syncMetadata.lastSynchronized = new Date().toISOString();
    this.store.syncMetadata.indexedCount = this.store.documents.length + this.store.careers.length;
    this.store.syncMetadata.indexedCareers = this.store.careers.length;
    this.persist();
    return newCareer;
  }

  updateCareer(id, updates) {
    const idx = (this.store.careers || []).findIndex(c => c.id === id);
    if (idx === -1) return null;
    this.store.careers[idx] = { ...this.store.careers[idx], ...updates, updatedAt: new Date().toISOString() };
    this.store.syncMetadata.lastSynchronized = new Date().toISOString();
    this.persist();
    return this.store.careers[idx];
  }

  closeCareer(id) {
    return this.updateCareer(id, { status: 'Closed' });
  }

  getFaqs() {
    return this.store.faqs || [];
  }

  // =========================================================================
  // NORMALIZATION, CONTEXT RESOLUTION & CONVERSATION HANDLING
  // =========================================================================
  normalizeQuery(text) {
    let norm = (text || '').toLowerCase().trim();
    norm = norm.replace(/[?!.,;:'"()[\]{}]/g, ' ').replace(/\s+/g, ' ').trim();

    // Slang & abbreviation normalization
    norm = norm.replace(/\bur\b/g, 'your')
               .replace(/\bu\b/g, 'you')
               .replace(/\br\b/g, 'are')
               .replace(/\bpls\b|\bplz\b/g, 'please')
               .replace(/\babt\b/g, 'about')
               .replace(/\boir\b/g, 'or')
               .replace(/\btel\b/g, 'tell')
               .replace(/\bwat\b|\bwht\b/g, 'what')
               .replace(/\bwer\b|\bwher\b/g, 'where')
               .replace(/\bco\b/g, 'company');

    // Typo normalization
    norm = norm.replace(/\btra+i*n+g*i*n*g*s*\b|\btra+i*n+i*g+n*s*\b|\btra+n+i+n+g*s*\b|\btra+i+n+g*\b/g, 'training');
    norm = norm.replace(/\binte?r+n+h*s+h*i+p+s*\b|\binte?r+n+s+i+p+s*\b|\binte?r+n+s+h+p+s*\b|\bintrenship\b/g, 'internship');
    norm = norm.replace(/\b(stude?nt|studnt|stdnt|stident|studnet)s?\b/g, 'student');
    norm = norm.replace(/\b(clg|colg)\b/g, 'college');
    norm = norm.replace(/\b(provid+e?s?|provid+i+n+g*|provd+e?s?|provideing)\b/g, 'provide');
    norm = norm.replace(/\b(carrer|carear)s?\b/g, 'career');
    norm = norm.replace(/\b(vacany|vaccancy|vacancie)s?\b/g, 'vacancy');
    norm = norm.replace(/\b(acessibility|accesibility|accessiblity|accessability)\b/g, 'accessibility');
    norm = norm.replace(/\b(publshing|publising|publsihing)\b/g, 'publishing');
    norm = norm.replace(/\b(softwear|sofftware|softwre)\b/g, 'software');
    norm = norm.replace(/\b(contct|conatct|contect)\b/g, 'contact');
    norm = norm.replace(/\b(addres|adress)\b/g, 'address');
    norm = norm.replace(/\b(locatn|locaton|locatin)\b/g, 'location');
    norm = norm.replace(/\b(partnr|partnrship|partneship)\b/g, 'partnership');
    norm = norm.replace(/\b(colaborat|colaborate|collabrate|colab)\b/g, 'collaborate');
    norm = norm.replace(/\b(submt|sumbit|submitt)\b/g, 'submit');
    norm = norm.replace(/\b(resme|resum|resume)\b/g, 'resume');
    norm = norm.replace(/\b(servces|serivces|srevices|servicess)\b/g, 'services');
    norm = norm.replace(/\b(solutins|soltions|solutons)\b/g, 'solutions');
    norm = norm.replace(/\b(diffrence|differnce|diference)\b/g, 'difference');
    norm = norm.replace(/\b(betwen|btwn)\b/g, 'between');

    return norm;
  }

  /**
   * Resolves conversational references like "the second one", "how can I apply?",
   * "what are its benefits?", "can your company provide it?", using recent chat history.
   */
  resolveConversationContext(query, history = []) {
    if (!history || !Array.isArray(history) || history.length === 0) {
      return { resolvedQuery: query, contextTopic: null };
    }

    const qLower = query.toLowerCase().trim();
    const lastAssistantMsg = [...history].reverse().find(m => m.role === 'assistant' || m.sender === 'vora')?.content || '';
    const lastUserMsg = [...history].reverse().find(m => m.role === 'user' || m.sender === 'user')?.content || '';

    // 1. Ordinal References: "the second one", "tell me more about the 2nd one", "option 3"
    const ordinalMatch = qLower.match(/\b(first|1st|second|2nd|third|3rd|fourth|4th|fifth|5th|sixth|6th|seventh|7th|eighth|8th)\b/i);
    const numberMatch = qLower.match(/\b(option|item|number|service|program|track)\s*(\d+)\b/i);

    let index = -1;
    if (ordinalMatch) {
      const ordMap = {
        first: 0, '1st': 0,
        second: 1, '2nd': 1,
        third: 2, '3rd': 2,
        fourth: 3, '4th': 3,
        fifth: 4, '5th': 4,
        sixth: 5, '6th': 5,
        seventh: 6, '7th': 6,
        eighth: 7, '8th': 7
      };
      index = ordMap[ordinalMatch[1].toLowerCase()];
    } else if (numberMatch) {
      index = parseInt(numberMatch[2], 10) - 1;
    }

    if (index >= 0 && lastAssistantMsg) {
      // Find numbered list items in the previous message
      const lines = lastAssistantMsg.split('\n');
      const numberedItems = [];
      for (const line of lines) {
        const itemMatch = line.match(/^\s*(\d+)[\.\)]\s*\*{0,2}([^\*:\n\r]+)\*{0,2}/i);
        if (itemMatch) {
          const num = parseInt(itemMatch[1], 10) - 1;
          numberedItems[num] = itemMatch[2].trim();
        }
      }

      if (numberedItems[index]) {
        const selectedTopic = numberedItems[index];
        return {
          resolvedQuery: `Explain ${selectedTopic} in detail`,
          contextTopic: selectedTopic
        };
      }
    }

    // 2. Follow-up "How can I apply?" or "How do I apply?" after talking about a specific domain
    if (/^(how\s*(can|do)\s*i\s*apply|how\s*to\s*apply|where\s*to\s*apply|i\s*want\s*to\s*apply)\b/i.test(qLower)) {
      if (/vendor|partner|collaboration/i.test(lastAssistantMsg) || /vendor|partner|collaboration/i.test(lastUserMsg)) {
        return { resolvedQuery: 'How to apply for vendor partnership?', contextTopic: 'vendor-partnership' };
      }
      if (/intern|internship|training|student/i.test(lastAssistantMsg) || /intern|internship|training/i.test(lastUserMsg)) {
        return { resolvedQuery: 'How to apply for training and internship?', contextTopic: 'internship-application' };
      }
      if (/career|job|position|hiring|role/i.test(lastAssistantMsg) || /career|job|position/i.test(lastUserMsg)) {
        return { resolvedQuery: 'How to apply for job and submit resume?', contextTopic: 'job-application' };
      }
    }

    // 3. Pronoun resolution: "What are its benefits?" / "Why is it important?" / "How does it work?"
    if (/\b(its|it|that|this)\b/i.test(qLower) && /\b(benefit|benefits|important|work|use|needed)\b/i.test(qLower)) {
      if (/epublishing|epub/i.test(lastUserMsg) || /epublishing/i.test(lastAssistantMsg)) {
        return { resolvedQuery: 'What are the benefits of ePublishing?', contextTopic: 'epublishing' };
      }
      if (/accessibility|pdf/i.test(lastUserMsg) || /accessibility/i.test(lastAssistantMsg)) {
        return { resolvedQuery: 'Why is PDF accessibility important?', contextTopic: 'accessibility' };
      }
      if (/xml/i.test(lastUserMsg) || /xml/i.test(lastAssistantMsg)) {
        return { resolvedQuery: 'Why are XML workflows important?', contextTopic: 'xml' };
      }
      if (/ai|automation/i.test(lastUserMsg) || /ai automation/i.test(lastAssistantMsg)) {
        return { resolvedQuery: 'How can AI improve business operations?', contextTopic: 'ai-automation' };
      }
    }

    // 4. "Can your company provide it?" / "Do you offer this?"
    if (/\b(can (your|the) company provide it|do you offer it|can you do that|can velvora do this)\b/i.test(qLower)) {
      if (/epublishing/i.test(lastUserMsg) || /epublishing/i.test(lastAssistantMsg)) {
        return { resolvedQuery: 'Explain your ePublishing services', contextTopic: 'epublishing' };
      }
      if (/accessibility/i.test(lastUserMsg) || /accessibility/i.test(lastAssistantMsg)) {
        return { resolvedQuery: 'Explain your PDF accessibility services', contextTopic: 'accessibility' };
      }
      if (/xml/i.test(lastUserMsg) || /xml/i.test(lastAssistantMsg)) {
        return { resolvedQuery: 'Explain your XML services', contextTopic: 'xml' };
      }
      if (/react|web|software/i.test(lastUserMsg) || /software/i.test(lastAssistantMsg)) {
        return { resolvedQuery: 'Explain your Software & Web Development services', contextTopic: 'software' };
      }
    }

    // 5. "Where is it located?" or "What are the hours?"
    if (/where\s*(is\s*it|are\s*you)\s*located|what\s*is\s*the\s*address/i.test(qLower)) {
      return { resolvedQuery: 'Where are your offices located?', contextTopic: 'locations' };
    }

    // 6. "How do I contact you?"
    if (/\b(how (do|can) i contact (you|velvora)|how to contact you|where to contact)\b/i.test(qLower)) {
      return { resolvedQuery: 'How can I contact your team?', contextTopic: 'contact' };
    }

    return { resolvedQuery: query, contextTopic: null };
  }

  /**
   * Retrieves the top N most semantically relevant documents from the crawled website knowledge base.
   */
  retrieveRelevantDocs(query, limit = 3) {
    const q = this.normalizeQuery(query);
    const STOP_WORDS = new Set([
      'the', 'and', 'what', 'how', 'who', 'where', 'when', 'why', 'can', 'you',
      'your', 'are', 'is', 'for', 'with', 'from', 'about', 'our', 'have', 'does',
      'did', 'will', 'this', 'that', 'all', 'any', 'please', 'tell', 'give', 'much',
      'many', 'some', 'they', 'them', 'their', 'which', 'there', 'been', 'were', 'was',
      'company', 'provide', 'providing', 'provides'
    ]);

    const words = q.split(/[^a-z0-9]+/).filter(w => w.length > 2 && !STOP_WORDS.has(w));
    let ranked = [];

    for (const doc of (this.store.documents || [])) {
      let score = 0;
      const docTitle = doc.title.toLowerCase();
      const docSummary = (doc.summary || '').toLowerCase();
      const docContent = (doc.content || '').toLowerCase();
      const keywords = (doc.keywords || []).map(k => k.toLowerCase());
      const topics = (doc.topics || []).map(t => t.toLowerCase());

      if (docTitle.includes(q)) score += 40;
      for (const kw of keywords) {
        if (q.includes(kw)) score += 18;
      }
      for (const top of topics) {
        if (q.includes(top)) score += 14;
      }
      for (const w of words) {
        if (docTitle.includes(w)) score += 10;
        if (keywords.some(k => k.includes(w))) score += 7;
        if (topics.some(t => t.includes(w))) score += 5;
        if (docSummary.includes(w)) score += 3;
        if (docContent.includes(w)) score += 1;
      }

      if (score > 10) {
        ranked.push({ doc, score });
      }
    }

    ranked.sort((a, b) => b.score - a.score);
    return ranked.slice(0, limit).map(r => r.doc);
  }

  // =========================================================================
  // ADVANCED CONTEXT-AWARE RETRIEVAL & ANSWER GENERATION PIPELINE
  // =========================================================================
  async answerQuery(userQuery, history = []) {
    const rawQ = (userQuery || '').trim();

    // 1. Resolve conversational history and follow-ups
    const { resolvedQuery, contextTopic } = this.resolveConversationContext(rawQ, history);
    const q = this.normalizeQuery(resolvedQuery);

    // 2. Empty Query Handling
    if (!q) {
      return {
        reply: "Hello! I'm **Velza**, your Velvora Solutions assistant. How can I help you today? You can ask about our digital accessibility audits, ePublishing and XML workflows, corporate and student training, vendor partnerships, project quotations, or live career openings.",
        sources: [
          { title: 'Explore Our Services', url: '/services' },
          { title: 'Training & Internships', url: '/training' },
          { title: 'Contact Our Team', url: '/contact' }
        ]
      };
    }

    // 3. Greetings
    if (/^(hi|hello|hey|good\s*(morning|afternoon|evening)|greetings|howdy)\b/i.test(q)) {
      return {
        reply: "Hello! 👋 I'm **Velza**, the official AI assistant for Velvora Solutions. I'm dynamically synced with our verified digital accessibility standards (WCAG 2.2 / PDF/UA), ePublishing pipelines, AI automation workflows, training programs, and live career openings.\n\nHow can I assist you today? You can ask about our services, student internships, corporate training, vendor partnerships, project quotations, or office locations.",
        sources: [
          { title: 'Explore Services', url: '/services' },
          { title: 'Training Programs', url: '/training' },
          { title: 'Contact Us', url: '/contact' }
        ]
      };
    }

    // 4. Identity Queries
    if (/\b(who are you|what is your name|what's your name|tell me about yourself|are you a bot|who is velza|who is vora|your name)\b/i.test(q)) {
      return {
        reply: "Hello! I am **Velza**, the official AI assistant for Velvora Solutions. I am dynamically connected with our entire website knowledge base, digital accessibility standards, ePublishing & XML workflows, software engineering services, training tracks, and career opportunities. How may I help you today?",
        sources: [
          { title: 'About Velvora Solutions', url: '/about/company-overview' },
          { title: 'Explore Services', url: '/services' },
          { title: 'Contact Our Team', url: '/contact' }
        ]
      };
    }

    // 5. Check if Gemini Generative Engine is configured & online
    if (geminiService.isConfigured()) {
      try {
        const ragDocs = this.retrieveRelevantDocs(resolvedQuery, 3);
        const geminiReply = await geminiService.generateResponse(resolvedQuery, history, ragDocs);
        if (geminiReply && geminiReply.trim()) {
          const sources = ragDocs.map(d => ({ title: d.title, url: d.url }));
          if (sources.length === 0) {
            sources.push(
              { title: 'Velvora Services', url: '/services' },
              { title: 'Contact Team', url: '/contact' }
            );
          }
          return {
            reply: geminiReply,
            sources: sources,
            metadata: this.getMetadata()
          };
        }
      } catch (gemErr) {
        console.warn('Gemini generation error, smoothly engaging autonomous RAG engine:', gemErr.message);
      }
    }

    // 6. Out-of-Scope Domain Guard (Medical, Legal, Flights, etc.)
    const outOfScopeRules = [
      { regex: /\b(surgery|medical treatment|hospital|doctor|dentist|healthcare clinic|medicine|prescription)\b/i, category: 'medical or clinical' },
      { regex: /\b(hardware manufacturing|assemble hardware|pc assembly|manufacture chips|hardware production|manufacture computer hardware|computer hardware)\b/i, category: 'computer hardware manufacturing' },
      { regex: /\b(loan|loans|mortgage|credit card|financial loans|banking account|deposit money)\b/i, category: 'banking or loan' },
      { regex: /\b(legal counsel|court lawyer|attorney services|legal lawsuits|bail bond)\b/i, category: 'legal advocacy' },
      { regex: /\b(flight booking|airline tickets|travel agency|hotel reservation|visa booking)\b/i, category: 'travel booking' },
      { regex: /\b(automobile repair|car maintenance|mechanic services|vehicle repair)\b/i, category: 'automotive repair' }
    ];

    for (const rule of outOfScopeRules) {
      if (rule.regex.test(q)) {
        return {
          reply: `Velvora Solutions is a content and technology company specializing in **digital accessibility (WCAG 2.2 / PDF/UA)**, **ePublishing**, **XML conversion**, **AI automation**, **software development**, **data analytics**, and **professional training**. We do not provide ${rule.category} services. If you have an inquiry related to our digital and publishing services, our team would be pleased to assist you!`,
          sources: [
            { title: 'Explore Our Services', url: '/services' },
            { title: 'Contact Our Team', url: '/contact' }
          ]
        };
      }
    }

    // 7. Check Technical Comparisons (HTML vs React, Python vs Java, AI vs ML, etc.)
    for (const comp of comparisonTopics) {
      if (comp.match(q)) {
        return comp.generate();
      }
    }

    // 8. Check General Computer Science & Technical Concepts (HTML, CSS, JS, Python, React, FastAPI, SQL, Docker, RAG, etc.)
    for (const tech of technicalTopics) {
      if (tech.match(q)) {
        return tech.generate();
      }
    }

    // 9. Check Professional Writing Assistance (Draft Email, Proposals, Cover Letters)
    for (const writing of professionalWritingTopics) {
      if (writing.match(q)) {
        return writing.generate();
      }
    }

    // -------------------------------------------------------------------------
    // INTENT A: VENDOR PARTNERSHIPS & BUSINESS COLLABORATIONS
    // Matches: "How to apply for vendor partnership?", "Can I collaborate?",
    //          "Vendor partnership application", "Partner with us"
    // -------------------------------------------------------------------------
    const isVendorPartnership = (
      /\b(vendor|supplier|agency partner|subcontract|subcontractor|white label|b2b partner)\b/i.test(q) ||
      (/\b(partner|partnership|collaborate|collaboration|alliance)\b/i.test(q) &&
       !/\b(job|career|salary|resume|cv|hiring|recruitment|employee|intern)\b/i.test(q)) ||
      (/\b(how to apply|how do i apply|how can i apply|application)\b/i.test(q) && /\b(partner|partnership|vendor|collaboration|collaborate)\b/i.test(q))
    );

    if (isVendorPartnership) {
      return {
        reply: "Thank you for your interest in collaborating with Velvora Solutions! We actively partner with technology providers, publishing houses, vendor agencies, accessibility consultants, and independent specialists under our **Partnership & Vendor Collaboration Programs**.\n\n" +
               "### Available Collaboration Models:\n\n" +
               "1. **Vendor & Agency Subcontractors:** Strategic white-label subcontracting for high-volume composition, typesetting, XML conversion, and PDF/UA remediation.\n" +
               "2. **Technology Alliance Partners:** Joint software integrations, AI automation, and API partnerships.\n" +
               "3. **Referral Partners:** Revenue-sharing commissions for qualified enterprise client referrals.\n" +
               "4. **Consulting Collaborators:** Joint accessibility auditing, Section 508 / EAA compliance consulting, and CPACC training.\n\n" +
               "### How to Apply for a Vendor or Business Partnership:\n\n" +
               "• **Step 1 — Visit the Partnership Portal:** Navigate to our official **[Partner With Us Page](/partner-with-us)** (also accessible at `/partner`).\n" +
               "• **Step 2 — Submit the Online Partnership Form:** Complete the form with your **Organization Name**, **Contact Person**, **Business Email**, **Partnership Area** (Technology, Publishing, Accessibility Consulting, or Vendor/Agency), and a brief proposal describing your services or synergy.\n" +
               "• **Step 3 — Direct Email Inquiries:** If you have a formal company deck or vendor portfolio, you can email our business alliances desk directly at **info@velvorasolutions.com** or send a message via our **[Contact Us Page](/contact)** specifying *'Vendor Partnership Inquiry'*.\n" +
               "• **Confidentiality & NDA:** All active vendor and business collaborations are protected by mutual **Non-Disclosure Agreements (NDAs)** and formal Service-Level Agreements (SLAs).\n\n" +
               "Our business development team reviews all partnership and vendor submissions within 2–3 business days.",
        sources: [
          { title: 'Partner With Velvora Solutions', url: '/partner-with-us' },
          { title: 'Contact Our Alliances Desk', url: '/contact' }
        ]
      };
    }

    // -------------------------------------------------------------------------
    // INTENT B: "WHAT SHOULD I DO IF I WANT TO WORK WITH YOUR COMPANY?"
    // Intelligent Ambiguity Handling: Disambiguates Client vs Partner vs Career
    // -------------------------------------------------------------------------
    if (
      /\b(want to work with (your|the) company|how can i work with (you|velvora)|work with your company|work with velvora)\b/i.test(q) &&
      !/\b(job|career|hiring|vacancy|internship|resume|cv)\b/i.test(q)
    ) {
      return {
        reply: "We would love to collaborate with you! The best way to get started depends on how you would like to work with Velvora Solutions:\n\n" +
               "### 1. As a Client (Project Services & Quotations):\n" +
               "If you need digital accessibility audits, PDF/UA remediation, ePublishing, XML workflows, AI automation, or software engineering:\n" +
               "• Visit our **[Contact Us Page](/contact)** or email **info@velvorasolutions.com**.\n" +
               "• Share your project scope, volume, and target timeline to receive a comprehensive proposal within 24–48 hours.\n\n" +
               "### 2. As a Business or Vendor Partner:\n" +
               "If you are an agency, technology provider, or consultant looking to partner, subcontract, or refer clients:\n" +
               "• Visit our **[Partner With Us Page](/partner-with-us)** to submit a partnership proposal.\n" +
               "• Or email our business development team at **info@velvorasolutions.com**.\n\n" +
               "### 3. As a Career Applicant or Student Intern:\n" +
               "If you want to join our team as an employee or student intern:\n" +
               "• Explore active openings on our **[Careers Portal](/careers)** and submit your resume online.\n" +
               "• For student training and project internships, visit our **[Training Page](/training)**.",
        sources: [
          { title: 'Contact Us for Projects', url: '/contact' },
          { title: 'Partner With Us', url: '/partner-with-us' },
          { title: 'Careers & Internships', url: '/careers' }
        ]
      };
    }

    // -------------------------------------------------------------------------
    // INTENT C: RESUME SUBMISSION & HOW TO APPLY FOR JOBS
    // Matches: "How can I submit my resume?", "Where to send CV", "How to apply"
    // -------------------------------------------------------------------------
    const isResumeOrJobApply = (
      /\b(submit.*resume|upload.*resume|send.*resume|how.*submit.*resume|where.*send.*resume|submit.*cv|upload.*cv|send.*cv)\b/i.test(q) ||
      (/\b(how to apply|how do i apply|how can i apply|application procedure|application process)\b/i.test(q) &&
       /\b(job|jobs|career|careers|vacancy|vacancies|role|position|fresher|employment)\b/i.test(q))
    );

    if (isResumeOrJobApply) {
      return {
        reply: "You can submit your resume to Velvora Solutions in two easy ways:\n\n" +
               "### 1. Online Through the Careers Portal (Recommended):\n" +
               "1. Visit our **[Careers Portal](/careers)**.\n" +
               "2. Review the list of active job openings (or choose *General Open Application*).\n" +
               "3. Click **Apply Now** to open the candidate application form.\n" +
               "4. Enter your Full Name, Email, Phone Number, and select your preferred role.\n" +
               "5. Attach your resume using the upload box (supports PDF, DOC, and DOCX files up to 10MB).\n" +
               "6. Click **Submit Application** — our talent acquisition team reviews every submission and responds within 24–48 hours.\n\n" +
               "### 2. Direct Email Submission:\n" +
               "You can also email your updated resume directly to our recruitment team at **careers@velvorasolutions.com** or **info@velvorasolutions.com** with the subject line *'Job Application: [Your Name] - [Desired Role]'*.",
        sources: [
          { title: 'Careers Portal & Application Form', url: '/careers' },
          { title: 'Life at Velvora', url: '/about/careers' }
        ]
      };
    }

    // -------------------------------------------------------------------------
    // INTENT D: STANDARDS COMPARISON (WCAG vs PDF/UA)
    // -------------------------------------------------------------------------
    if (
      /\b(difference between wcag and pdf\/ua|difference between wcag and pdf ua|wcag vs pdf\/ua|wcag vs pdf ua|compare wcag and pdf\/ua|what is the difference between wcag and pdf)\b/i.test(q) ||
      (/\b(wcag)\b/i.test(q) && /\b(pdf\/ua|pdf ua)\b/i.test(q) && /\b(difference|different|vs|compare|comparison)\b/i.test(q))
    ) {
      return {
        reply: "While both standards ensure digital information is accessible to individuals with disabilities, **WCAG** and **PDF/UA** have distinct scopes, technical rules, and testing methodologies:\n\n" +
               "### 1. Scope & Origin:\n" +
               "• **WCAG (Web Content Accessibility Guidelines):**\n" +
               "  - Developed by the W3C (World Wide Web Consortium). Current standard is **WCAG 2.2** (Levels A, AA, AAA).\n" +
               "  - Governs **all web and digital electronic content**, including websites, web applications, HTML interfaces, mobile apps, and multimedia.\n" +
               "  - Structured around 4 core principles: **Perceivable, Operable, Understandable, and Robust (POUR)**.\n" +
               "• **PDF/UA (Universal Accessibility - ISO 14289):**\n" +
               "  - Developed by the International Organization for Standardization (ISO). Current standard is **ISO 14289-1 / 14289-2**.\n" +
               "  - Specifically engineered **only for PDF documents**.\n" +
               "  - Provides clear, file-format-specific technical specifications for PDF tagging, structure trees, and reader interaction.\n\n" +
               "### 2. Technical Focus:\n" +
               "• **WCAG** provides general functional criteria (e.g., text must have sufficient contrast, non-text content must have text alternatives).\n" +
               "• **PDF/UA** provides the exact technical implementation rules inside the PDF specification (e.g., all real content must be enclosed in structural tags like `<P>`, `<H1>`–`<H6>`, `<Table>`, `<Figure>`; artifact content must be marked with `/Artifact`; and fonts must be embedded with valid ToUnicode mappings).\n\n" +
               "### 3. How They Work Together:\n" +
               "• PDF/UA acts as the **technical blueprint for achieving WCAG compliance in PDF files**. A document conforming to PDF/UA will satisfy the corresponding WCAG 2.1 and 2.2 Level AA requirements for PDFs.\n" +
               "• **Velvora Solutions delivers dual-certified remediation** conforming to both WCAG 2.2 Level AA and ISO 14289-1 (PDF/UA).",
        sources: [
          { title: 'Digital Accessibility Services', url: '/services/digital-accessibility' },
          { title: 'Accessibility Statement', url: '/accessibility-statement' }
        ]
      };
    }

    // -------------------------------------------------------------------------
    // INTENT E: SOLUTIONS OVERVIEW
    // "Can you explain your solutions?" / "What solutions do you offer?"
    // -------------------------------------------------------------------------
    if (
      /\b(explain your solutions|what are your solutions|tell me about your solutions|solutions overview|list of solutions|what solutions do you provide)\b/i.test(q) ||
      (q === 'solutions' || q === 'what are your solutions' || q === 'industry solutions')
    ) {
      return {
        reply: "Velvora Solutions designs end-to-end **Industry Solutions** tailored for publishers, academic institutions, technology enterprises, and corporate organizations:\n\n" +
               "1. **XML-First Publishing Workflow:**\n" +
               "   A unified production pipeline that ingests raw Word manuscripts, LaTeX, or print files, converting them into validated JATS, BITS, or DITA XML to automatically generate accessible EPUB 3, web HTML, and print-ready PDFs.\n" +
               "2. **End-to-End PDF Accessibility Compliance:**\n" +
               "   Enterprise-grade document remediation for high-volume backlists and live publications, achieving dual conformance to WCAG 2.2 Level AA and PDF/UA (ISO 14289) with screen-reader verification.\n" +
               "3. **AI-Powered Content Processing:**\n" +
               "   Intelligent Document Processing (IDP) combining OCR, NLP entity extraction, and automated metadata classification with human-in-the-loop review for 100% semantic accuracy.\n" +
               "4. **STEM & Mathematical Publishing Pipeline:**\n" +
               "   High-precision composition for scientific, technical, engineering, and medical publications utilizing LaTeX and MathML to ensure complex formulas are rendered accurately and read aloud correctly by assistive software.\n\n" +
               "Visit our **[Industry Solutions Page](/solutions)** to explore tailored workflows and case snapshots.",
        sources: [
          { title: 'Industry Solutions', url: '/solutions' },
          { title: 'Services Catalog', url: '/services' }
        ]
      };
    }

    // -------------------------------------------------------------------------
    // INTENT F: COMPANY PROFILE & ABOUT US
    // "What is Velvora Solutions?" / "Tell me about Velvora"
    // -------------------------------------------------------------------------
    if (
      /\b(what is velvora solutions|what is velvora|tell me about velvora|about velvora solutions|about velvora|who is velvora|company overview|company profile)\b/i.test(q)
    ) {
      return {
        reply: "### Velvora Solutions — Technology & Content Partner\n\n" +
               "**Velvora Solutions** is a premier technology and digital publishing partner headquartered in Cuddalore with branch operations in Porur, Chennai, Tamil Nadu, India. Founded and led by **Iyshwariya Senthil**, the company specializes in:\n\n" +
               "• **Digital Accessibility & Universal Inclusion:** Conforming to WCAG 2.2 Level AA/AAA, PDF/UA (ISO 14289), Section 508, and the European Accessibility Act (EAA).\n" +
               "• **ePublishing & Structured XML:** JATS, BITS, DITA, TEI conversion, accessible EPUB 3, and automated typesetting.\n" +
               "• **AI Automation & Intelligent Solutions:** Intelligent Document Processing (IDP), cognitive NLP tagging, and automated accessibility auditing.\n" +
               "• **Software & Web Development:** Full-stack web applications, secure cloud microservices, and accessible design systems.\n" +
               "• **Data Analytics & BI:** Predictive analytics, ETL pipelines, and executive dashboards.\n" +
               "• **Professional Training & Internships:** 8 specialized academy tracks with 100% live client project experience.\n\n" +
               "Serving publishers, universities, enterprises, and government agencies across 5+ countries globally.",
        sources: [
          { title: 'About Velvora Solutions', url: '/about/company-overview' },
          { title: 'Explore Services', url: '/services' },
          { title: 'Contact Our Team', url: '/contact' }
        ]
      };
    }

    // -------------------------------------------------------------------------
    // INTENT G: SERVICES OVERVIEW
    // "What services do you provide?"
    // -------------------------------------------------------------------------
    if (
      /\b(what services|what do you do|all services|services list|list of services|what can you do|what does velvora do|service overview)\b/i.test(q) ||
      (q === 'services' || q === 'what are your services' || q === 'our services')
    ) {
      return {
        reply: "Velvora Solutions delivers comprehensive content, technology, and marketing services under one roof across six core disciplines:\n\n" +
               "1. **Publishing and XML Services:** ePublishing (EPUB 3, reflowable/fixed layout), structured XML workflows (JATS, BITS, DITA, TEI), and conversion pipelines.\n" +
               "2. **Content Services:** Professional typesetting (InDesign), LaTeX and MathML equation typesetting, OCR & digitization, taxonomy tagging, and multimedia accessibility (captions, audio description).\n" +
               "3. **Digital Accessibility:** End-to-end audits and manual remediation conforming to WCAG 2.2 Level AA/AAA, PDF/UA (ISO 14289-1), Section 508, and the European Accessibility Act (EAA).\n" +
               "4. **AI and Automation Services:** Intelligent Document Processing (IDP), cognitive NLP taxonomy tagging, automated reading order detection, and human-in-the-loop validation.\n" +
               "5. **Software & Web Development:** Enterprise full-stack React and Node/Python applications, cloud microservices, and accessible user interfaces.\n" +
               "6. **Data Analytics & Digital Marketing:** Executive Power BI dashboards, ETL pipelines, technical SEO, and omnichannel growth marketing.\n\n" +
               "Combine services in one project or choose only what you need. Visit our **[Services Catalog](/services)** for detailed specifications.",
        sources: [
          { title: 'Complete Services Catalog', url: '/services' },
          { title: 'Industry Solutions', url: '/solutions' },
          { title: 'Contact Our Team', url: '/contact' }
        ]
      };
    }

    // -------------------------------------------------------------------------
    // INTENT H: SPECIFIC SERVICES (PDF Accessibility, ePublishing, AI Automation)
    // -------------------------------------------------------------------------
    if (
      /\b(pdf accessibility|accessible pdf|pdf remediation|document remediation|tagging pdf|tagged pdf|pdf\/ua|remediate pdf|make pdf accessible)\b/i.test(q)
    ) {
      return {
        reply: "PDF accessibility ensures that PDF documents can be accessed and understood by people with disabilities, including users of screen readers. It involves proper document tagging, logical reading order, headings, alternative text, accessible tables, and other requirements.\n\n" +
               "Velvora Solutions provides enterprise **PDF Accessibility & Document Remediation Services**:\n\n" +
               "• **Standards Compliance:** Conforming to **WCAG 2.2 Level AA/AAA**, **PDF/UA (ISO 14289-1)**, **Section 508**, and the **European Accessibility Act (EAA)**.\n" +
               "• **Logical Tag Tree Architecture:** Rebuilding or fixing document tag hierarchies (`<Document>`, `<Part>`, `<H1>`–`<H6>`, `<P>`, `<Table>`, `<Figure>`, `<List>`) to guarantee correct reading order.\n" +
               "• **Comprehensive Semantic Remediation:**\n" +
               "  - Accurate alt text for complex charts, diagrams, and figures.\n" +
               "  - Properly tagged tabular data associating header cells (`<TH>`) with data cells (`<TD>`).\n" +
               "  - MathML and accessible formula tagging for STEM academic documents.\n" +
               "  - Bookmarks, page labels, language attributes, and metadata tags.\n" +
               "• **Dual-Layer Quality Assurance:** Automated validation (PAC - PDF Accessibility Checker) paired with manual verification using assistive technologies (NVDA and JAWS screen readers).\n" +
               "• **Scanned Document Remediation:** High-accuracy OCR conversion to turn non-searchable scanned PDFs into fully accessible, tagged documents.",
        sources: [
          { title: 'Digital Accessibility Services', url: '/services/digital-accessibility' },
          { title: 'Request an Accessibility Audit', url: '/contact' }
        ]
      };
    }

    if (
      /\b(what is epublishing|explain epublishing|epublishing services|epub services|epub 3|ebook production|ebook conversion)\b/i.test(q)
    ) {
      return {
        reply: "**ePublishing (Electronic Publishing)** refers to the digital production, conversion, formatting, and distribution of books, academic journals, research papers, and corporate documents for digital reading devices and online platforms.\n\n" +
               "At Velvora Solutions, our ePublishing services include:\n\n" +
               "• **EPUB 3 & EPUB 2 Creation:** Reflowable and fixed-layout EPUBs with embedded audio, video, interactive quizzes, and semantic navigation.\n" +
               "• **Accessible eBooks:** Built to EPUB Accessibility 1.1 standards conforming to WCAG 2.2, enabling seamless screen reader navigation for visually impaired readers.\n" +
               "• **Multi-Format Delivery:** Simultaneous output generation for Amazon Kindle (KPF/MOBI), Apple Books, Google Play, Kobo, and web readers from a single structured source.\n" +
               "• **Editorial & Composition Precision:** InDesign page composition, complex mathematical formula typesetting (LaTeX/MathML), and font embedding.\n" +
               "• **Quality Control:** Comprehensive validation against EPUBCheck, Ace by DAISY, and device-level rendering tests.",
        sources: [
          { title: 'ePublishing Services', url: '/services/epublishing' },
          { title: 'Publishing Solutions', url: '/solutions' }
        ]
      };
    }

    if (
      /\b(ai automation|ai services|automation services|artificial intelligence|intelligent document processing|idp|nlp tagging)\b/i.test(q)
    ) {
      return {
        reply: "Velvora Solutions builds practical **AI & Workflow Automation Services** engineered for high-volume publishing, content remediation, and enterprise operations:\n\n" +
               "• **Intelligent Document Processing (IDP):** Automated extraction of text, tables, mathematical equations, and structural hierarchies from raw PDFs, scanned manuscripts, and legacy documents.\n" +
               "• **Cognitive NLP & Metadata Tagging:** Automated keyword indexing, JATS/BITS XML metadata classification, subject taxonomy tagging, and named entity recognition.\n" +
               "• **AI-Assisted Accessibility QA:** Machine-assisted alt text draft generation for complex figures, automated contrast checking, and reading order detection.\n" +
               "• **Custom AI Agents & RAG Systems:** Building domain-specific retrieval-augmented generation (RAG) assistants and intelligent chatbots grounded in proprietary enterprise knowledge.\n" +
               "• **Human-in-the-Loop Validation:** Combining high-speed machine algorithms with certified human specialists to guarantee 100% semantic accuracy and zero hallucination.",
        sources: [
          { title: 'AI and Automation Services', url: '/services/ai-automation' },
          { title: 'Industry Solutions', url: '/solutions' }
        ]
      };
    }

    // Specific Content Services (Typesetting, STEM Math, OCR, Metadata, Captions)
    if (
      /\b(content services|typesetting|typesetting and design|math typesetting|equation typesetting|stem typesetting|latex typesetting|mathml|ocr and digitization|ocr services|metadata indexing|taxonomy tagging|captioning and transcription|audio description)\b/i.test(q)
    ) {
      return {
        reply: "Velvora Solutions delivers comprehensive **Content Services** supporting every stage of the editorial, production, and digitization life cycle:\n\n" +
               "• **Typesetting and Design:** Professional page layout for academic books, journals, reports, and trade titles using Adobe InDesign and automated composition templates.\n" +
               "• **Math and Equation Typesetting:** Precision STEM typesetting transforming complex equations into accessible LaTeX and MathML standards.\n" +
               "• **Metadata, Indexing and Taxonomy:** Structured metadata classification, back-of-the-book indexing, and controlled vocabulary tagging to maximize discovery.\n" +
               "• **OCR and Digitization:** Turning legacy print archives, historical volumes, and scanned documents into fully searchable, editable, and accessible digital assets.\n" +
               "• **Captioning, Transcription and Audio Description:** Accurate timed text, closed captions, and descriptive audio tracks compliant with WCAG video standards.",
        sources: [
          { title: 'Content Services Overview', url: '/services' },
          { title: 'Typesetting & Design', url: '/services/typesetting-and-design' },
          { title: 'OCR & Digitization', url: '/services/ocr-and-digitization' }
        ]
      };
    }

    // Specific Publishing & XML Services
    if (
      /\b(publishing and xml|xml services|jats xml|bits xml|dita xml|tei xml|xml workflows|xml conversion|schema validation)\b/i.test(q)
    ) {
      return {
        reply: "Velvora Solutions provides industry-grade **Publishing & XML Services** built for academic publishers, university presses, and enterprises:\n\n" +
               "• **Structured XML Conversion:** Rapid, schema-valid transformation from Word, PDF, LaTeX, or print files into JATS 1.3, BITS 2.1, DITA, and custom XML schemas.\n" +
               "• **XML-First Production Workflows:** Authoring and validation pipelines where XML serves as the single source of truth for automated multi-format delivery.\n" +
               "• **Automated Quality Checks & Schematron:** Dual-layer validation utilizing automated Schematron rules and manual editorial inspection.\n" +
               "• **ePublishing Integration:** Seamless output generation to reflowable and fixed-layout EPUB 3, web HTML, and print-ready PDFs.",
        sources: [
          { title: 'XML Services', url: '/services/xml' },
          { title: 'ePublishing Services', url: '/services/epublishing' }
        ]
      };
    }

    // Specific Software & Web Development Services
    if (
      /\b(software development|web development|software engineering|react development|frontend development|backend development|api development|cloud architecture|custom software)\b/i.test(q)
    ) {
      return {
        reply: "Velvora Solutions builds enterprise **Software & Web Development Solutions** engineered for speed, security, and universal accessibility:\n\n" +
               "• **Full-Stack Web Applications:** High-performance single page applications and dynamic web portals built with React, modern JavaScript, and component libraries.\n" +
               "• **Resilient Backend Microservices:** RESTful and GraphQL APIs engineered using Node.js, Python (FastAPI), Express, and secure database architectures.\n" +
               "• **Accessible Design Systems:** UI components engineered from scratch to achieve strict WCAG 2.2 AA accessibility and keyboard-navigable conformance.\n" +
               "• **Cloud Integrations & CI/CD:** Scalable cloud deployment pipelines, automated testing, and secure data storage.",
        sources: [
          { title: 'Software & Web Development', url: '/services/software-development' },
          { title: 'Consult With Engineering Team', url: '/contact' }
        ]
      };
    }

    // Specific Data Analytics & BI Services
    if (
      /\b(data analytics|business intelligence|bi dashboards|power bi|predictive modeling|etl pipelines|data visualizations|data engineering)\b/i.test(q)
    ) {
      return {
        reply: "Velvora Solutions delivers end-to-end **Data Analytics & Business Intelligence Services**:\n\n" +
               "• **Executive BI Dashboards:** Interactive Power BI and custom web dashboards providing real-time KPI telemetry and operational visibility.\n" +
               "• **ETL Data Pipelines:** Scalable data ingestion, cleaning, transformation, and automated warehousing from disparate enterprise sources.\n" +
               "• **Predictive Analytics:** Statistical modeling, regression, and trend forecasting to optimize operations and client retention.\n" +
               "• **Accessible Data Visualizations:** High-contrast, screen-reader-friendly charts and reports compliant with accessibility standards.",
        sources: [
          { title: 'Data Analytics & BI Services', url: '/services/data-analytics' },
          { title: 'Contact Analytics Team', url: '/contact' }
        ]
      };
    }

    // Specific Digital Marketing & SEO Services
    if (
      /\b(digital marketing|seo optimization|technical seo|content marketing|social media marketing|performance ppc|paid advertising|growth marketing)\b/i.test(q)
    ) {
      return {
        reply: "Velvora Solutions provides measurable **Digital Marketing & Growth Services**:\n\n" +
               "• **Technical SEO:** Deep website code audits, Core Web Vitals optimization, schema markup, and accessibility-friendly rich snippets.\n" +
               "• **Content Marketing & Thought Leadership:** Industry articles, technical whitepapers, and editorial content strategies that build domain authority.\n" +
               "• **Omnichannel Campaigns:** Targeted paid advertising (PPC) and organic engagement strategies across LinkedIn, Google Ads, and Meta platforms.\n" +
               "• **Conversion Telemetry & Analytics:** Advanced GA4 tracking, conversion rate optimization (CRO), and executive ROI dashboards.",
        sources: [
          { title: 'Digital Marketing Services', url: '/services/digital-marketing' },
          { title: 'Contact Marketing Team', url: '/contact' }
        ]
      };
    }

    // -------------------------------------------------------------------------
    // INTENT I: INTERNSHIPS & STUDENT TRAINING
    // -------------------------------------------------------------------------
    const hasStudentOrFresher = /\b(student|students|college|fresher|freshers|graduate|graduates|intern|internship|internships)\b/i.test(q);
    const hasInternOrTrain = /\b(intern|internship|internships|training|trainee|learn|opportunity|program|work)\b/i.test(q);

    if (
      (/\b(intern|internship|internships)\b/i.test(q) && !/\b(full-time|experienced)\b/i.test(q)) ||
      (hasStudentOrFresher && hasInternOrTrain && !/\b(job|vacancy|permanent)\b/i.test(q))
    ) {
      return {
        reply: "Yes! **Velvora Solutions actively provides structured Internship and Training Programs for students and recent graduates.**\n\n" +
               "Our student programs bridge academic study with hands-on enterprise publishing, digital accessibility, and software pipelines under our **G.R.O.W. Framework** (Growth, Respect, Opportunity, Well-being).\n\n" +
               "### Core Internship Highlights:\n\n" +
               "• **100% Live Production Projects:** Work on real client manuscripts, EPUB 3 files, WCAG 2.2 accessibility remediations, AI models, and software codebases.\n" +
               "• **Specialized Tracks:**\n" +
               "  1. Digital Publishing & XML Production\n" +
               "  2. Digital Accessibility Auditing & QA\n" +
               "  3. AI & Machine Learning Engineering\n" +
               "  4. Data Analytics & Business Intelligence\n" +
               "  5. Full-Stack Software Development\n" +
               "  6. Digital Marketing & Growth SEO\n" +
               "• **Flexible Durations:** 1 Month (Fast-Track), 3 Months (Standard Certification Track), or 6 Months (Comprehensive Capstone).\n" +
               "• **Learning Modes:** Virtual Remote, In-Person Classroom at our Cuddalore Head Office or Chennai Branch Office, or Hybrid.\n" +
               "• **Credentials & Placement:** Official Velvora Solutions Certificate of Completion with QR verification, Letter of Recommendation, and Pre-Placement Offers (PPOs) for top performers.\n\n" +
               "To apply, visit our **[Training & Internships Page](/training)** to submit your details or apply on our **[Careers Portal](/careers)**.",
        sources: [
          { title: 'Flagship Internship Curriculum', url: '/training/internship-program' },
          { title: 'All Training Programs', url: '/training' },
          { title: 'Apply on Careers Portal', url: '/careers' }
        ]
      };
    }

    // -------------------------------------------------------------------------
    // INTENT J: TRAINING PROGRAMS OVERVIEW
    // "What training programs do you offer?"
    // -------------------------------------------------------------------------
    if (
      /\b(training|trainings|workshop|workshops|certification|certifications|cpacc|course|courses|masterclass|skill development|capacity building|upskilling)\b/i.test(q)
    ) {
      return {
        reply: "Yes! Velvora Solutions provides **8 comprehensive industry-standard Training & Skill Development Programs**, having delivered over 2,000+ training hours.\n\n" +
               "Explore our dedicated **[Training & Internships Page](/training)**:\n\n" +
               "1. **ePublishing Training:** EPUB 3, JATS/BITS XML workflows, XSLT, and Adobe InDesign conversion.\n" +
               "2. **AI/ML Training:** Machine learning algorithms, deep learning, PyTorch, computer vision, and NLP.\n" +
               "3. **Generative AI Training:** Advanced prompting, LLM APIs, LangChain, RAG architectures, and autonomous AI agents.\n" +
               "4. **Data Analytics & BI:** Advanced Excel, Power BI, DAX formulas, SQL databases, and predictive analytics.\n" +
               "5. **Digital Accessibility Training:** WCAG 2.2 AA/AAA guidelines, PDF/UA (ISO 14289), screen reader testing (NVDA/JAWS), and CPACC preparation.\n" +
               "6. **Software Development Training:** Full-stack React, Node.js, Python (FastAPI), microservices, and cloud deployments.\n" +
               "7. **Digital Marketing Training:** Technical SEO, Core Web Vitals, Google Analytics 4, and performance advertising.\n" +
               "8. **Flagship Internship Program:** 100% live client project exposure for students and freshers with PPO career pathways.\n\n" +
               "**Delivery Formats:** Online Virtual Live webinars, In-person at our Cuddalore Head Office or Chennai Branch Office, or Hybrid.",
        sources: [
          { title: 'All Training Programs', url: '/training' },
          { title: 'Apply for Internship / Enroll Now', url: '/training#enrollment-form-section' },
          { title: 'Contact Admissions Desk', url: '/contact' }
        ]
      };
    }

    // -------------------------------------------------------------------------
    // INTENT K: REQUEST A QUOTATION & PROJECT PRICING
    // -------------------------------------------------------------------------
    if (
      (/\b(request.*quot|get.*quot|quotation|pricing|project cost|how much does it cost|project inquir|project enquir|quote|estimate)\b/i.test(q) ||
       (/\b(how can i|how do i|how to)\b/i.test(q) && /\b(project|requirement|requirements|scope|quote|quotation|estimate)\b/i.test(q)))
    ) {
      return {
        reply: "To request a customized project quotation and turnaround schedule from Velvora Solutions:\n\n" +
               "1. **Submit via Online Contact Form:**\n" +
               "   Visit our **[Contact Us Page](/contact)** and fill out the enquiry form.\n" +
               "2. **Direct Email Request:**\n" +
               "   Email your project brief directly to **info@velvorasolutions.com**.\n" +
               "3. **Helpful Details to Include for an Accurate Quote:**\n" +
               "   • **Service Required:** e.g., PDF/UA accessibility remediation, JATS XML conversion, EPUB 3 creation, AI workflow automation, or custom software development.\n" +
               "   • **Project Volume:** Total number of pages, documents, books, or feature specifications.\n" +
               "   • **Compliance Standard:** e.g., WCAG 2.2 AA, PDF/UA, Section 508, MathML.\n" +
               "   • **Target Deadline:** Expected completion date or milestone schedule.\n" +
               "   • **Sample Files:** Providing a representative sample file allows our technical estimation team to assess tagging complexity accurately.\n\n" +
               "Our estimation team reviews your requirements and returns a comprehensive proposal within 24–48 hours.",
        sources: [
          { title: 'Request a Project Quote', url: '/contact' },
          { title: 'Explore Services', url: '/services' }
        ]
      };
    }

    // -------------------------------------------------------------------------
    // INTENT L: CONTACT & OFFICE LOCATIONS
    // -------------------------------------------------------------------------
    if (
      /\b(how can i contact|contact team|contact us|phone number|email address|get in touch|reach out|contact info|contact details)\b/i.test(q) ||
      /\b(where is your headquarter|headquarters|head office|where are your offices|office locations|office address|cuddalore office|chennai office|porur office)\b/i.test(q)
    ) {
      return {
        reply: "You can connect directly with the Velvora Solutions team through multiple official channels:\n\n" +
               "• **Head Office (Cuddalore):**\n" +
               "  Velvora Solutions, Indhira Nagar, Cuddalore - 607002, Tamil Nadu, India\n" +
               "• **Branch Office (Chennai):**\n" +
               "  Velvora Solutions, Porur, Chennai, Tamil Nadu, India\n" +
               "• **Email:**\n" +
               "  - General & Project Enquiries: **info@velvorasolutions.com**\n" +
               "  - Careers & Resumes: **careers@velvorasolutions.com**\n" +
               "• **Phone / WhatsApp:**\n" +
               "  - Call: **+91 9500834236**\n" +
               "  - WhatsApp: **[Chat on WhatsApp](https://wa.me/919500834236)**\n" +
               "• **Business Hours:**\n" +
               "  Monday to Saturday: 9:00 AM – 6:30 PM IST (Global projects supported across client timezones)\n" +
               "• **Online Form:**\n" +
               "  Submit your inquiry anytime via our **[Contact Us Page](/contact)**.",
        sources: [
          { title: 'Contact Us', url: '/contact' },
          { title: 'About Velvora', url: '/about/company-overview' }
        ]
      };
    }

    // -------------------------------------------------------------------------
    // INTENT M: CAREERS LISTINGS
    // -------------------------------------------------------------------------
    const isJobQuery = /\b(job|jobs|career|careers|vacancy|vacancies|hiring|opening|openings|recruitment|role|roles|position|positions)\b/i.test(q);
    if (isJobQuery) {
      const activeCareers = this.getCareers({ status: 'Active' });
      if (activeCareers.length > 0) {
        const jobList = activeCareers.map(j => {
          const sk = Array.isArray(j.skills) ? j.skills.slice(0, 3).join(', ') : j.skills;
          return `• **${j.title}** (${j.department}) — *${j.workMode} / ${j.type}*\n  Experience: ${j.experience} | Skills: ${sk}`;
        }).join('\n\n');

        return {
          reply: `We currently have **${activeCareers.length} active positions and internships** open at Velvora Solutions:\n\n` +
                 `${jobList}\n\n` +
                 `Our career framework is built on **G.R.O.W. (Growth, Respect, Opportunity, Well-being)**. You can review full role details and submit your resume directly on our Careers page.`,
          sources: [
            { title: 'Explore Open Positions & Apply', url: '/careers' },
            { title: 'Life at Velvora', url: '/about/careers' }
          ]
        };
      }
    }

    // -------------------------------------------------------------------------
    // INTENT N: MULTI-FACTOR SEMANTIC RAG RETRIEVAL (Across all 63+ Crawled Documents)
    // -------------------------------------------------------------------------
    const rankedDocs = this.retrieveRelevantDocs(resolvedQuery, 3);

    if (rankedDocs.length > 0) {
      const best = rankedDocs[0];
      const titleClean = best.title.replace(/^Solution:\s*/i, '').replace(/^Service:\s*/i, '');

      // Extract highlights from content lines
      let highlights = [];
      if (best.content) {
        const lines = best.content.split('\n')
          .map(l => l.trim())
          .filter(l => l.startsWith('•') || l.startsWith('-') || l.startsWith('▸'));
        if (lines.length > 0) {
          highlights = lines.slice(0, 4);
        }
      }

      let reply = `### ${titleClean}\n\n${best.summary}`;
      if (highlights.length > 0) {
        reply += `\n\n**Key Highlights & Capabilities:**\n${highlights.join('\n')}`;
      }
      reply += `\n\nFor customized project scopes, technical consultations, or inquiries, please connect with our team through our **[Contact Page](/contact)** or email **info@velvorasolutions.com**.`;

      const sources = [
        { title: best.title, url: best.url }
      ];
      if (rankedDocs.length > 1 && rankedDocs[1].url !== best.url) {
        sources.push({ title: rankedDocs[1].title, url: rankedDocs[1].url });
      }

      return {
        reply: reply,
        sources: sources
      };
    }

    // -------------------------------------------------------------------------
    // INTENT O: HONEST GROUNDED FALLBACK (Never Hallucinate or Invent)
    // -------------------------------------------------------------------------
    return {
      reply: "Thank you for reaching out! I don't have verified records regarding that specific question in my knowledge base. To ensure you receive accurate and up-to-date information, please connect directly with our specialist team:\n\n" +
             "• **Email:** info@velvorasolutions.com\n" +
             "• **Phone:** +91 9500834236\n" +
             "• **Official Contact Page:** You can submit your inquiry directly through our **[Contact Us Page](/contact)**, and our team will get back to you within 24 hours.",
      sources: [
        { title: 'Explore Our Services', url: '/services' },
        { title: 'Training & Internships', url: '/training' },
        { title: 'Contact Our Team', url: '/contact' }
      ]
    };
  }
}

export const voraStore = new VoraKnowledgeStore();
export default voraStore;
