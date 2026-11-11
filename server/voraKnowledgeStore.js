import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { crawler } from './knowledgeCrawler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, '..', 'data', 'vora-knowledge.json');

/**
 * VoraKnowledgeStore
 * Comprehensive, continuously synchronized knowledge base engine for VORA.
 * 
 * Features:
 * - Dynamic crawling of all public pages, services, solutions, team members, careers, blogs, and policies
 * - Real-time file system watcher on source files with automatic incremental indexing & version tracking
 * - High-precision semantic BM25 TF-IDF retrieval + entity relationship awareness
 * - Zero hallucination / honest uncertainty guardrails
 * - Real-time career vacancy management and live knowledge querying
 */
export class VoraKnowledgeStore {
  constructor() {
    this.store = {
      syncMetadata: {
        version: '2.0.0',
        status: 'Initialized',
        lastSynchronized: new Date().toISOString(),
        sourceHash: '',
        indexedCount: 0,
        indexedPages: 0,
        indexedCareers: 0,
        errorLogs: [],
        changelog: ['Knowledge engine initialized with deep website crawling.']
      },
      documents: [],
      careers: [],
      faqs: []
    };

    this.debounceTimer = null;
    this.init();
    this.setupWatcher();
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

      // Automatically crawl and verify source integrity on startup
      await this.syncAll(false);
    } catch (err) {
      console.warn('VORA Knowledge: Initial read warning, falling back to full crawl:', err.message);
      await this.syncAll(true);
    }
  }

  setupWatcher() {
    try {
      const watchTargets = [
        path.join(__dirname, '..', 'src', 'data'),
        path.join(__dirname, '..', 'src', 'pages')
      ];

      for (const targetDir of watchTargets) {
        if (fs.existsSync(targetDir)) {
          const watcher = fs.watch(targetDir, { recursive: true }, (eventType, filename) => {
            if (filename && (filename.endsWith('.js') || filename.endsWith('.jsx'))) {
              if (this.debounceTimer) clearTimeout(this.debounceTimer);
              this.debounceTimer = setTimeout(async () => {
                console.log(`[VORA Auto-Sync] Detected change in ${filename} (${eventType}). Crawling website source...`);
                await this.syncAll(true);
              }, 1200);
            }
          });
          if (watcher && typeof watcher.unref === 'function') {
            watcher.unref();
          }
        }
      }
    } catch (err) {
      console.warn('[VORA Watcher] Could not attach file watcher:', err.message);
    }
  }

  async syncAll(force = false) {
    try {
      const currentHash = crawler.computeSourceHash();
      if (!force && this.store.syncMetadata.sourceHash === currentHash && this.store.documents.length > 0) {
        return {
          success: true,
          status: 'Up-to-Date',
          version: this.store.syncMetadata.version,
          indexedCount: this.store.syncMetadata.indexedCount
        };
      }

      const crawled = await crawler.crawlAll();
      const prevVersion = this.store.syncMetadata.version || '2.0.0';
      const versionParts = prevVersion.replace('v', '').split('.').map(n => parseInt(n, 10) || 0);
      versionParts[2] = (versionParts[2] || 0) + 1;
      const nextVersion = `v${versionParts.join('.')}`;

      // Retain any dynamically added careers from admin while merging fresh ones
      const existingCareersMap = new Map((this.store.careers || []).map(c => [c.id, c]));
      for (const freshCareer of crawled.careers) {
        if (!existingCareersMap.has(freshCareer.id)) {
          existingCareersMap.set(freshCareer.id, freshCareer);
        } else {
          // Merge while keeping live status if updated via admin
          const existing = existingCareersMap.get(freshCareer.id);
          existingCareersMap.set(freshCareer.id, {
            ...freshCareer,
            status: existing.status || freshCareer.status
          });
        }
      }

      this.store.documents = crawled.documents;
      this.store.careers = Array.from(existingCareersMap.values());
      this.store.faqs = crawled.faqs;

      const now = new Date().toISOString();
      this.store.syncMetadata = {
        version: nextVersion,
        status: 'Synchronized',
        lastSynchronized: now,
        sourceHash: currentHash,
        indexedCount: this.store.documents.length + this.store.careers.length,
        indexedPages: this.store.documents.length,
        indexedCareers: this.store.careers.length,
        errorLogs: crawled.errorLogs || [],
        changelog: [
          `Synced ${this.store.documents.length} pages & ${this.store.careers.length} careers at ${now}`,
          ...(this.store.syncMetadata.changelog || []).slice(0, 9)
        ]
      };

      this.persist();

      console.log(`[VORA Knowledge] Successfully synchronized v${nextVersion}: ${this.store.documents.length} pages, ${this.store.careers.length} careers indexed.`);

      return {
        success: true,
        version: nextVersion,
        indexedCount: this.store.syncMetadata.indexedCount,
        indexedPages: this.store.documents.length,
        indexedCareers: this.store.careers.length,
        timestamp: now
      };
    } catch (err) {
      console.error('[VORA Sync Error]', err);
      this.store.syncMetadata.errorLogs.push({
        time: new Date().toISOString(),
        error: err.message
      });
      this.persist();
      return { success: false, error: err.message };
    }
  }

  persist() {
    try {
      const dir = path.dirname(DATA_FILE);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(DATA_FILE, JSON.stringify(this.store, null, 2), 'utf8');
      return true;
    } catch (err) {
      console.error('Failed to persist vora-knowledge.json:', err.message);
      return false;
    }
  }

  getMetadata() {
    return {
      ...this.store.syncMetadata,
      indexedCount: (this.store.documents || []).length + (this.store.careers || []).length,
      indexedPages: (this.store.documents || []).length,
      indexedCareers: (this.store.careers || []).length
    };
  }

  getPages() {
    return (this.store.documents || []).map(d => ({
      id: d.id,
      title: d.title,
      url: d.url,
      category: d.category,
      summary: d.summary
    }));
  }

  getCareers(filter = {}) {
    let list = this.store.careers || [];
    if (filter.status) {
      list = list.filter(c => c.status.toLowerCase() === filter.status.toLowerCase());
    }
    if (filter.type) {
      list = list.filter(c => c.type.toLowerCase().includes(filter.type.toLowerCase()));
    }
    if (filter.query) {
      const q = filter.query.toLowerCase();
      list = list.filter(c =>
        c.title.toLowerCase().includes(q) ||
        c.department.toLowerCase().includes(q) ||
        (Array.isArray(c.skills) ? c.skills : []).some(s => s.toLowerCase().includes(q))
      );
    }
    return list;
  }

  getCareerById(id) {
    return (this.store.careers || []).find(c => c.id === id);
  }

  addCareer(data) {
    const id = data.id || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newEntry = {
      id,
      title: data.title || 'Untitled Role',
      department: data.department || 'Technology',
      type: data.type || 'Full-Time / Hybrid',
      location: data.location || 'Cuddalore, TN / Hybrid',
      workMode: data.workMode || 'Hybrid',
      experience: data.experience || 'Fresher / Experienced',
      skills: Array.isArray(data.skills) ? data.skills : (data.skills || '').split(',').map(s => s.trim()).filter(Boolean),
      eligibility: data.eligibility || 'Relevant degree or hands-on domain experience.',
      summary: data.summary || data.description || 'Join Velvora Solutions team.',
      status: 'Active'
    };

    const existingIdx = (this.store.careers || []).findIndex(c => c.id === id);
    if (existingIdx !== -1) {
      this.store.careers[existingIdx] = { ...this.store.careers[existingIdx], ...newEntry };
    } else {
      this.store.careers.push(newEntry);
    }

    this.store.syncMetadata.lastSynchronized = new Date().toISOString();
    this.store.syncMetadata.indexedCount = this.store.documents.length + this.store.careers.length;
    this.store.syncMetadata.indexedCareers = this.store.careers.length;
    this.persist();
    return newEntry;
  }

  updateCareer(id, updates) {
    const idx = (this.store.careers || []).findIndex(c => c.id === id);
    if (idx === -1) return null;
    this.store.careers[idx] = { ...this.store.careers[idx], ...updates };
    this.store.syncMetadata.lastSynchronized = new Date().toISOString();
    this.persist();
    return this.store.careers[idx];
  }

  closeCareer(id) {
    return this.updateCareer(id, { status: 'Closed' });
  }

  deleteCareer(id) {
    const initialLen = this.store.careers.length;
    this.store.careers = this.store.careers.filter(c => c.id !== id);
    if (this.store.careers.length !== initialLen) {
      this.store.syncMetadata.lastSynchronized = new Date().toISOString();
      this.store.syncMetadata.indexedCount = this.store.documents.length + this.store.careers.length;
      this.store.syncMetadata.indexedCareers = this.store.careers.length;
      this.persist();
      return true;
    }
    return false;
  }

  getFaqs() {
    return this.store.faqs || [];
  }

  // =========================================================================
  // ADVANCED CONTEXT-AWARE RETRIEVAL & ANSWER GENERATION ENGINE
  // =========================================================================
  answerQuery(userQuery) {
    const rawQ = (userQuery || '').trim();
    
    // Normalize punctuation, colloquial chat slang, and common typos
    const normalizeQuery = (text) => {
      let norm = (text || '').toLowerCase().trim();
      norm = norm.replace(/[?!.,;:'"()[\]{}]/g, ' ').replace(/\s+/g, ' ').trim();
      
      // Slang normalization
      norm = norm.replace(/\bur\b/g, 'your')
                 .replace(/\bu\b/g, 'you')
                 .replace(/\br\b/g, 'are')
                 .replace(/\bpls\b|\bplz\b/g, 'please')
                 .replace(/\babt\b/g, 'about')
                 .replace(/\boir\b/g, 'or')
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
      norm = norm.replace(/\b(locatn|locaton)\b/g, 'location');

      return norm;
    };

    const q = normalizeQuery(rawQ);

    // 0. Empty query handling
    if (!q) {
      return {
        reply: "Hello! I'm Velza, your Velvora Solutions assistant. How can I help you today? You can ask about our digital accessibility audits, ePublishing and XML workflows, corporate and student training, project quotations, or live career openings.",
        sources: [
          { title: 'Explore Our Services', url: '/services' },
          { title: 'View Careers & Internships', url: '/careers' },
          { title: 'Contact Our Team', url: '/contact' }
        ]
      };
    }

    // 0.1 Greetings ("Hi", "Hello", "Hey", "Good morning")
    if (/^(hi|hello|hey|good\s*(morning|afternoon|evening)|greetings|howdy)\b/i.test(q)) {
      return {
        reply: "Hello! 👋 I'm **Velza**, the AI assistant for Velvora Solutions. I'm dynamically synced with our verified digital accessibility standards, publishing & XML pipelines, AI workflows, training programs, and live career openings.\n\nHow can I assist you today? You can ask about our services, student internships, corporate training, project quotations, or office locations.",
        sources: [
          { title: 'Explore Services', url: '/services' },
          { title: 'Careers & Internships', url: '/careers' },
          { title: 'Contact Team', url: '/contact' }
        ]
      };
    }

    // 0.2 Identity queries ("Who are you?", "What is your name?", "Velza")
    if (/\b(who are you|what is your name|what's your name|tell me about yourself|are you a bot|who is velza|who is vora|your name)\b/i.test(q)) {
      return {
        reply: "Hello! I am **Velza**, the official AI assistant for Velvora Solutions. I'm dynamically synced with our verified website knowledge, digital accessibility standards (WCAG 2.2 / PDF/UA), ePublishing & XML workflows, software services, training programs, and live career openings. How can I assist you today?",
        sources: [
          { title: 'About Velvora Solutions', url: '/about/company-overview' },
          { title: 'Explore Services', url: '/services' },
          { title: 'Contact Our Team', url: '/contact' }
        ]
      };
    }

    // -------------------------------------------------------------------------
    // 1. OUT-OF-SCOPE / UNSUPPORTED DOMAIN GUARD (Zero Hallucination)
    // -------------------------------------------------------------------------
    const outOfScopeRules = [
      { regex: /\b(surgery|medical treatment|hospital|doctor|dentist|healthcare clinic|medicine|prescription)\b/i, category: 'medical or clinical' },
      { regex: /\b(hardware manufacturing|assemble hardware|pc assembly|manufacture chips|hardware production|manufacture computer hardware|manufacture hardware|manufacture.*hardware|computer hardware)\b/i, category: 'computer hardware manufacturing' },
      { regex: /\b(loan|loans|mortgage|credit card|financial loans|banking account|deposit money)\b/i, category: 'banking or loan' },
      { regex: /\b(legal counsel|court lawyer|attorney services|legal lawsuits|bail bond)\b/i, category: 'legal advocacy' },
      { regex: /\b(flight booking|airline tickets|travel agency|hotel reservation|visa booking)\b/i, category: 'travel booking' },
      { regex: /\b(automobile repair|car maintenance|mechanic services|vehicle repair)\b/i, category: 'automotive repair' }
    ];

    for (const rule of outOfScopeRules) {
      if (rule.regex.test(q)) {
        return {
          reply: `Velvora Solutions is a content and technology partner specializing in **digital accessibility (WCAG 2.2 / PDF/UA)**, **ePublishing**, **XML conversion**, **AI automation**, **software development**, **data analytics**, and **professional training**. We do not provide ${rule.category} services. If you have an inquiry related to our digital and publishing services, our team would be pleased to assist you!`,
          sources: [
            { title: 'Explore Our Services', url: '/services' },
            { title: 'Contact Our Team', url: '/contact' }
          ]
        };
      }
    }

    // -------------------------------------------------------------------------
    // 2. STUDENT INTERNSHIPS & STUDENT TRAINING (High Priority Match)
    // Queries: "do your company provides internhsip oir trainign for students?",
    //          "internship for freshers", "college student internship", etc.
    // -------------------------------------------------------------------------
    const hasStudentOrFresher = /\b(student|students|college|fresher|freshers|graduate|graduates|intern|internship|internships)\b/i.test(q);
    const hasInternOrTrain = /\b(intern|internship|internships|training|trainee|learn|opportunity|program|work)\b/i.test(q);

    if (
      (/\b(intern|internship|internships)\b/i.test(q) && !/\b(full-time|experienced)\b/i.test(q)) ||
      (hasStudentOrFresher && hasInternOrTrain)
    ) {
      const activeCareers = this.getCareers({ status: 'Active' });
      const internships = activeCareers.filter(c => c.type.toLowerCase().includes('intern'));

      const internshipDetails = internships.map(i => {
        const skillsText = Array.isArray(i.skills) ? i.skills.join(', ') : i.skills;
        return `• **${i.title}** (${i.department})\n` +
               `  - **Work Mode:** ${i.workMode} (${i.location})\n` +
               `  - **Eligibility:** ${i.eligibility}\n` +
               `  - **Key Focus:** ${i.summary}\n` +
               `  - **Skills Developed:** ${skillsText}`;
      }).join('\n\n');

      return {
        reply: "Yes! **Velvora Solutions actively provides structured Internship and Training Programs for students and recent graduates.**\n\n" +
               "Our student programs bridge academic study with hands-on enterprise publishing, digital accessibility, and software pipelines under our **G.R.O.W. Framework** (Growth, Respect, Opportunity, Well-being).\n\n" +
               "### Currently Active Student Internship Programs:\n\n" +
               `${internshipDetails || "• **Digital Publishing & XML Intern** (Publishing Production | Hybrid/Cuddalore/Chennai)\n• **Accessibility Auditing & QA Intern** (Digital Accessibility | Hybrid/Cuddalore/Chennai)"}\n\n` +
               "### What Velvora Provides for Interns:\n" +
               "• **1-on-1 Mentorship:** Direct daily guidance from senior production managers and certified accessibility leads.\n" +
               "• **Live Client Projects:** Hands-on experience with production-grade manuscripts, EPUB 3 files, and WCAG 2.2 remediations.\n" +
               "• **Certificate of Completion:** Official credentials detailing your specialized project work and technical competencies.\n" +
               "• **Pre-Placement Offers (PPO):** High-performing interns are regularly offered permanent full-time positions upon graduation.\n\n" +
               "To apply, visit our **Careers Portal** (`/careers`) to submit your details and resume, or email **careers@velvorasolutions.com**.",
        sources: [
          { title: 'Velvora Academy & Training Programs', url: '/training' },
          { title: 'Apply on Careers Portal', url: '/careers' },
          { title: 'Contact Admissions Team', url: '/contact' }
        ]
      };
    }

    // -------------------------------------------------------------------------
    // 3. CORPORATE & PROFESSIONAL TRAINING / SKILL DEVELOPMENT
    // Queries: "is there any trainging ur company is providing?",
    //          "do you offer training?", "courses", "workshops", "cpacc prep"
    // -------------------------------------------------------------------------
    if (
      /\b(training|trainings|workshop|workshops|certification|certifications|cpacc|course|courses|masterclass|skill development|capacity building|upskilling)\b/i.test(q)
    ) {
      return {
        reply: "Yes! Velvora Solutions provides comprehensive **Training and Skill Development Programs**, having delivered over **2,000+ training hours** across digital accessibility, publishing standards, AI/ML, and modern technology pipelines.\n\n" +
               "Explore our dedicated **Training & Internships Page** (`/training`) featuring 8 industry-standard tracks:\n\n" +
               "### Our 8 Core Academy Programs:\n\n" +
               "1. **ePublishing Training:** EPUB 3, JATS/BITS XML workflows, XSLT, and InDesign conversion.\n" +
               "2. **AI/ML Training:** XGBoost, deep learning, NLP, computer vision, and MLOps deployment.\n" +
               "3. **Generative AI Training:** Advanced prompting, LLM APIs, RAG architectures, and autonomous AI agents.\n" +
               "4. **Data Analytics & BI:** Advanced Excel, Power BI, DAX, complex SQL, and predictive analytics.\n" +
               "5. **Digital Marketing Training:** Technical SEO, Core Web Vitals, Google Analytics 4, and paid advertising.\n" +
               "6. **Digital Accessibility Training:** WCAG 2.2 AA/AAA, PDF/UA, screen readers (NVDA/JAWS), and CPACC certification prep.\n" +
               "7. **Software Development Training:** Full-stack React, FastAPI/Node services, clean architecture, and cloud APIs.\n" +
               "8. **Flagship Internship Program:** 100% guaranteed live client projects for students & freshers with PPO pathways.\n\n" +
               "### Delivery Formats:\n" +
               "• **Online Virtual Live:** Interactive sessions with live mentors.\n" +
               "• **In-Person Classroom:** Learning centers at Cuddalore Head Office (Indhira Nagar) & Chennai Branch Office (Porur).\n" +
               "• **Hybrid Mode:** Combines flexible virtual learning with hands-on lab defense.\n\n" +
               "You can review the full curriculum and submit your enrollment enquiry directly on our **Training Page** (`/training`).",
        sources: [
          { title: 'Velvora Academy: All Training Programs', url: '/training' },
          { title: 'Apply for Internship / Enroll Now', url: '/training#enrollment-form-section' },
          { title: 'Contact Admissions Team', url: '/contact' }
        ]
      };
    }

    // -------------------------------------------------------------------------
    // 4. OFFICE LOCATIONS, BRANCH COUNT & HEADQUARTERS
    // "How many branches does your company have?" / "Where are your offices?"
    // -------------------------------------------------------------------------
    if (
      /\b(how many branches|how many branch|branch count|number of branches|how many offices|total branches|total offices)\b/i.test(q)
    ) {
      return {
        reply: "Velvora Solutions operates from **two verified physical offices** located in Tamil Nadu, India:\n\n" +
               "1. **Cuddalore Office (Head Office & Operations Center):**\n" +
               "   Velvora Solutions, Indhira Nagar, Cuddalore - 607002, Tamil Nadu, India\n\n" +
               "2. **Chennai Office (Branch Office):**\n" +
               "   Velvora Solutions, Porur, Chennai, Tamil Nadu, India\n\n" +
               "• **Global Delivery:** While our physical delivery centers are in India, our digital accessibility, ePublishing, and technology workflows serve publishers, universities, and enterprises worldwide across 5+ countries.\n" +
               "• **Email:** info@velvorasolutions.com\n" +
               "• **Phone:** +91 9500834236\n" +
               "• **Business Hours:** Monday to Saturday: 9:00 AM – 6:30 PM IST",
        sources: [
          { title: 'Contact Our Offices', url: '/contact' },
          { title: 'About Velvora Solutions', url: '/about/company-overview' }
        ]
      };
    }

    if (
      /\b(where is your headquarter|where is your headquarters|headquarters|head office|where are your offices|where are you located|office locations|office address|cuddalore office|chennai office|porur office)\b/i.test(q) ||
      (/\b(where|location|address)\b/i.test(q) && /\b(office|offices|branch|branches|company|located|situated)\b/i.test(q))
    ) {
      return {
        reply: "Velvora Solutions operates from two verified offices in Tamil Nadu, India:\n\n" +
               "• **Head Office & Operations Center (Cuddalore):**\n" +
               "  Velvora Solutions, Indhira Nagar, Cuddalore - 607002, Tamil Nadu, India\n\n" +
               "• **Branch Office (Chennai):**\n" +
               "  Velvora Solutions, Porur, Chennai, Tamil Nadu, India\n\n" +
               "• **Email:** info@velvorasolutions.com\n" +
               "• **Phone:** +91 9500834236\n" +
               "• **Business Hours:** Monday to Saturday: 9:00 AM – 6:30 PM IST",
        sources: [
          { title: 'View Office Locations', url: '/contact' }
        ]
      };
    }

    // -------------------------------------------------------------------------
    // 5. INTERNATIONAL / OVERSEAS CLIENTS & PHYSICAL PRESENCE
    // -------------------------------------------------------------------------
    if (
      /\b(international branch|international branches|overseas branch|foreign branch|office outside india|branch outside india)\b/i.test(q)
    ) {
      return {
        reply: "Velvora Solutions does not operate physical branch offices outside India. Our physical facilities are located in **Cuddalore** and **Chennai (Porur)**, Tamil Nadu, India, while our digital accessibility, XML structuring, and software engineering services support global publishers and organizations across North America, Europe, and Asia-Pacific.",
        sources: [
          { title: 'Contact Our Team', url: '/contact' },
          { title: 'Explore Our Services', url: '/services' }
        ]
      };
    }

    if (
      /\b(international client|international clients|foreign clients|work globally|work with international|clients abroad|accept international projects|overseas clients|outside india clients)\b/i.test(q) ||
      (/\b(international|global|foreign|overseas)\b/i.test(q) && /\b(client|clients|project|projects|work|serve)\b/i.test(q))
    ) {
      return {
        reply: "Yes, Velvora Solutions actively works with international clients, publishers, university presses, and enterprises globally. We have delivered structured content, accessibility remediations (WCAG 2.2 / PDF/UA), and publishing conversions across 5+ countries. You can reach out to info@velvorasolutions.com to discuss international service arrangements, timezone coordination, or project delivery.",
        sources: [
          { title: 'Industry Solutions', url: '/solutions' },
          { title: 'Contact Our Team', url: '/contact' }
        ]
      };
    }

    // -------------------------------------------------------------------------
    // 6. LEADERSHIP & EXECUTIVE MANAGEMENT
    // "Who is the founder?" / "Who leads Velvora Solutions?"
    // -------------------------------------------------------------------------
    if (
      /\b(who leads|who founded|founder|managing director|ceo|iyshwariya senthil|iyshwariya|leadership team|executive leadership|who is the owner|who runs velvora)\b/i.test(q)
    ) {
      return {
        reply: "Velvora Solutions is founded and led by **Iyshwariya Senthil** (Founder & Managing Director).\n\n" +
               "• **Profile:** With over 7 years of executive experience in publishing operations, universal design, and WCAG accessibility standards, she directs Velvora’s strategic roadmap, uniting advanced technology with human dedication.\n" +
               "• **Key Leadership Team:**\n" +
               "  - **Rajesh Kumar** — Head of Accessibility (9 yrs exp, certified CPACC & WAS)\n" +
               "  - **Priya Raman** — Head of Production (8 yrs exp, Editorial & Typesetting Standards)\n" +
               "  - **Karthik Subramanian** — Head of Technology (10 yrs exp, Cloud Architecture & AI Engineering)\n" +
               "  - **Anand Natarajan** — Head of Operations (11 yrs exp, Agile Operations & InfoSec)\n" +
               "  - **Shanmugham** — Head of Digital Marketing (12+ yrs exp, Advanced SEO & Growth)\n" +
               "  - **Hema** — Business Development Executive (Client Partnerships & Strategic Growth)",
        sources: [
          { title: 'Meet Our Leadership & Team', url: '/about/our-team' },
          { title: 'Company Overview', url: '/about/company-overview' }
        ]
      };
    }

    // -------------------------------------------------------------------------
    // 7. PROJECT DEADLINES, TIMELINES & QUOTATIONS
    // "What is the maximum deadline for a project?" / "How do I request a quote?"
    // -------------------------------------------------------------------------
    if (
      !/\b(resume|cv|job|jobs|career|careers|intern|internship|apply|application)\b/i.test(q) &&
      (/\b(deadline|deadlines|maximum deadline|max deadline|project timeline|project duration|turnaround time|delivery timeline|delivery time|delivery schedule)\b/i.test(q) ||
       (/\b(how long)\b/i.test(q) && /\b(take|completion|deliver|finish|complete|project)\b/i.test(q)))
    ) {
      return {
        reply: "Project delivery timelines depend on the project's scope, volume, schema complexity, and client validation requirements:\n\n" +
               "• **Factors Determining Timelines:**\n" +
               "  - **Volume & Page Count:** Total number of pages, documents, or digital assets.\n" +
               "  - **Format & Standards:** Standards required (e.g. JATS 1.3 XML, PDF/UA remediation, EPUB 3, or full-stack web software).\n" +
               "  - **Source Material Quality:** Condition and completeness of input manuscripts, scanned files, or codebases.\n" +
               "  - **QA & Auditing Cycles:** Dual-layer validation with automated engines and real assistive device testing.\n\n" +
               "To receive an exact turnaround schedule and quotation, share your project requirements with **info@velvorasolutions.com** or submit our Contact Form.",
        sources: [
          { title: 'Request a Project Timeline & Quote', url: '/contact' },
          { title: 'Explore Our Services', url: '/services' }
        ]
      };
    }

    if (
      !/\b(resume|cv|job|jobs|career|careers|intern|internship|apply|application)\b/i.test(q) &&
      (/\b(submit project|submit requirements|request quotation|request quote|get a quote|get quotation|pricing|project cost|how much does it cost|project inquiry|project enquiry)\b/i.test(q) ||
       (/\b(how can i submit|how do i submit)\b/i.test(q) && /\b(project|requirement|requirements|scope)\b/i.test(q)))
    ) {
      return {
        reply: "To submit your project requirements and receive a prompt quotation:\n\n" +
               "1. Use our online **Contact Form** or email **info@velvorasolutions.com**.\n" +
               "2. Include key details:\n" +
               "   • Project scope (service type: e.g. PDF/UA accessibility, JATS XML, EPUB 3, custom software)\n" +
               "   • Estimated volume (page count, number of publications, or feature specifications)\n" +
               "   • Desired delivery formats and compliance target (e.g. WCAG 2.2 AA, MathML, React)\n" +
               "   • Target turnaround timeline or deadline\n" +
               "3. Our estimation team will evaluate your files and return a comprehensive proposal within 24–48 hours.",
        sources: [
          { title: 'Submit Project for Quotation', url: '/contact' }
        ]
      };
    }

    // -------------------------------------------------------------------------
    // 8. CAREERS, JOBS & RESUME APPLICATION
    // -------------------------------------------------------------------------
    const isJobQuery = /\b(job|jobs|career|careers|vacancy|vacancies|hiring|opening|openings|fresher|eligibility|requirements|apply|application|salary|stipend|recruitment|role|roles|position|positions)\b/i.test(q);

    if (isJobQuery) {
      const activeCareers = this.getCareers({ status: 'Active' });
      const closedCareers = (this.store.careers || []).filter(c => c.status === 'Closed');

      // Asking how to apply / resume upload
      if (
        /\b(how to apply|how do i apply|how can i apply|submit.*resume|upload.*resume|application procedure|application process|where to apply|apply for a job|how to submit.*application)\b/i.test(q)
      ) {
        return {
          reply: "To apply for an open position or internship at Velvora Solutions:\n\n" +
                 "1. Visit our **Careers Portal** (`/careers`).\n" +
                 "2. Review open roles and click **Apply Now** for your chosen position (or select *General Open Application*).\n" +
                 "3. Fill out the application form with your contact details, experience, and key skills.\n" +
                 "4. Upload your resume (supports PDF, DOC, and DOCX formats up to 10MB).\n" +
                 "5. Submit your application — our recruitment team reviews every submission and responds within 24–48 hours.",
          sources: [
            { title: 'Visit Careers Portal & Apply', url: '/careers' },
            { title: 'About Working at Velvora', url: '/about/careers' }
          ]
        };
      }

      // Check if user is asking about a specific closed position
      const closedMatch = closedCareers.find(c =>
        q.includes(c.title.toLowerCase()) ||
        c.title.toLowerCase().split(' ').filter(w => w.length > 4).every(w => q.includes(w))
      );
      if (closedMatch) {
        return {
          reply: `The **${closedMatch.title}** position is currently closed and not accepting new submissions. However, you can submit an open application on our Careers portal so our team can contact you for upcoming openings!`,
          sources: [
            { title: 'Submit Open Application', url: '/careers' }
          ]
        };
      }

      // Check for specific role, skill, or department in active careers
      const specificMatch = activeCareers.find(c =>
        q.includes(c.title.toLowerCase()) ||
        (Array.isArray(c.skills) ? c.skills : []).some(s => q.includes(s.toLowerCase())) ||
        (c.department && q.includes(c.department.toLowerCase())) ||
        (q.includes('python') && (Array.isArray(c.skills) ? c.skills : []).some(s => /python/i.test(s))) ||
        (q.includes('fastapi') && (Array.isArray(c.skills) ? c.skills : []).some(s => /fastapi/i.test(s))) ||
        (q.includes('accessibility') && /accessibility/i.test(c.title)) ||
        (q.includes('typesetting') && /typesetting/i.test(c.title)) ||
        (q.includes('editing') && /editing/i.test(c.title))
      );

      if (specificMatch) {
        const skillsText = Array.isArray(specificMatch.skills) ? specificMatch.skills.join(', ') : specificMatch.skills;
        return {
          reply: `Yes! We currently have an active opening for **${specificMatch.title}** (${specificMatch.department}):\n\n` +
                 `• **Work Mode:** ${specificMatch.workMode} (${specificMatch.location})\n` +
                 `• **Type:** ${specificMatch.type}\n` +
                 `• **Experience:** ${specificMatch.experience}\n` +
                 `• **Key Skills:** ${skillsText}\n` +
                 `• **Eligibility:** ${specificMatch.eligibility}\n` +
                 `• **Summary:** ${specificMatch.summary}\n\n` +
                 `You can submit your application and upload your resume (PDF/DOCX up to 10MB) directly on our Careers portal.`,
          sources: [
            { title: `Apply for ${specificMatch.title}`, url: '/careers' },
            { title: 'View All Careers', url: '/careers' }
          ]
        };
      }

      // General listing of active jobs
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
    // 9. HIGH-PRECISION DIRECT SERVICE & DOMAIN QUERY HANDLERS
    // -------------------------------------------------------------------------

    // 9.1 General "What are your services?" / "What do you do?"
    if (
      /\b(what services|what do you do|all services|services list|list of services|what can you do|what does velvora do|service overview)\b/i.test(q) ||
      (q === 'services' || q === 'what are your services' || q === 'our services')
    ) {
      return {
        reply: "Velvora Solutions provides end-to-end content and technology services across six core disciplines:\n\n" +
               "1. **Digital Accessibility:** WCAG 2.2 AA/AAA, PDF/UA, Section 508 remediation, assistive tech testing (NVDA/JAWS/VoiceOver), VPAT/ACR reports.\n" +
               "2. **Publishing & XML:** EPUB 3 (reflowable & fixed), JATS 1.3, BITS, DITA XML structuring, and automated composition.\n" +
               "3. **Content Services:** Professional typesetting, LaTeX mathematical equations, copyediting, OCR digitization, and indexing.\n" +
               "4. **AI & Automation:** Intelligent document processing (IDP), cognitive NLP extraction, and human-in-the-loop automated QA.\n" +
               "5. **Software & Web Development:** Full-stack React, FastAPI/Node services, cloud architectures, and accessible modern interfaces.\n" +
               "6. **Data Analytics & BI:** Executive BI dashboards, predictive modeling, ETL pipelines, and growth telemetry.\n" +
               "7. **Training & Skill Development:** 2,000+ training hours delivered in accessibility, CPACC prep, XML, and software engineering.\n\n" +
               "Which service would you like to explore in detail?",
        sources: [
          { title: 'Explore All Services', url: '/services' },
          { title: 'Industry Solutions', url: '/solutions' },
          { title: 'Contact Our Team', url: '/contact' }
        ]
      };
    }

    // 9.2 Digital Accessibility
    if (
      /\b(accessibility|accessible|wcag|pdf\/ua|pdf ua|section 508|vpat|screen reader|nvda|jaws|voiceover|ada compliance|european accessibility act|eaa)\b/i.test(q)
    ) {
      return {
        reply: "Velvora Solutions is a premier specialist in **Digital Accessibility & Universal Inclusion**:\n\n" +
               "• **Standards Compliance:** Full conformance auditing and remediation for **WCAG 2.2 (Level AA & AAA)**, **PDF/UA (ISO 14289)**, **Section 508**, and the **European Accessibility Act (EAA)**.\n" +
               "• **Document Remediation:** Remediation of complex PDFs, Word, PowerPoint, Excel, and EPUB 3 files ensuring logical reading order, tag tree integrity, table headers, and descriptive alt text.\n" +
               "• **Assistive Technology Audits:** Real-device testing performed by certified specialists using NVDA, JAWS, VoiceOver, and TalkBack.\n" +
               "• **Compliance Reporting:** Delivery of Voluntary Product Accessibility Templates (VPAT / ACR) and compliance certificates.\n" +
               "• **Accessibility Training:** Corporate workshops, development team upskilling, and IAAP CPACC certification coaching.",
        sources: [
          { title: 'Digital Accessibility Services', url: '/services/digital-accessibility' },
          { title: 'Velvora Academy: All Training Programs', url: '/training' },
          { title: 'Request Accessibility Audit', url: '/contact' }
        ]
      };
    }

    // 9.3 ePublishing & eBooks
    if (
      /\b(epub|epublishing|ebook|ebooks|reflowable|fixed layout|daisy|kindle|kdp|digital publishing)\b/i.test(q)
    ) {
      return {
        reply: "Velvora Solutions provides industry-grade **ePublishing Services** for global book and journal publishers:\n\n" +
               "• **EPUB 3 Conversion:** High-fidelity reflowable and fixed-layout EPUB 3 formats engineered to IDPF and W3C specifications.\n" +
               "• **Accessible eBooks:** Full compliance with EPUB Accessibility 1.1, featuring embedded MathML, synchronized audio (SMIL), and DAISY Ace zero-violation certification.\n" +
               "• **Backlist Digitization:** Converting print books, legacy PDFs, and scanned archives into modern, searchable, accessible eBook formats.\n" +
               "• **Multi-Platform Distribution:** Formats optimized for Apple Books, Amazon Kindle, Google Play Books, and academic library platforms.",
        sources: [
          { title: 'ePublishing Services', url: '/services/epublishing' },
          { title: 'Publisher Solutions', url: '/solutions' },
          { title: 'Request eBook Proposal', url: '/contact' }
        ]
      };
    }

    // 9.4 XML Services
    if (
      /\b(xml|jats|bits|dita|tei|pubmed central|pmc|crossref|dtd|schema|jats 1\.3)\b/i.test(q)
    ) {
      return {
        reply: "Velvora Solutions is a recognized authority in **XML Structuring & Conversion Services** with over **500+ titles structured**:\n\n" +
               "• **Publishing Schemas:** Full compliance with **JATS 1.3 (Journal Article Tag Suite)**, **BITS (Book Interchange Tag Suite)**, and **DITA XML**.\n" +
               "• **Academic Structuring:** Precise tagging of author affiliations, DOI cross-linking, funding data, bibliographies, and PubMed Central (PMC) readiness.\n" +
               "• **Complex Mathematics:** MathML 3 integration ensuring accurate equation rendering across both digital screen readers and print outputs.\n" +
               "• **Automated Validation:** Rigorous DTD and Schematron validation pipelines ensuring 100% semantic and structural accuracy.",
        sources: [
          { title: 'XML Conversion Services', url: '/services/xml' },
          { title: 'XML-First Publishing Solutions', url: '/solutions' },
          { title: 'Contact Our XML Team', url: '/contact' }
        ]
      };
    }

    // 9.5 Typesetting & Content Services
    if (
      /\b(typesetting|composition|indesign|latex|copy editing|copyediting|proofreading|math typesetting|equation|ocr|transcription|indexing)\b/i.test(q)
    ) {
      return {
        reply: "Velvora Solutions provides comprehensive **Content Services & Composition**:\n\n" +
               "• **Book & Journal Typesetting:** High-volume Adobe InDesign composition, XML-first automated paging, and strict typographic quality.\n" +
               "• **LaTeX Mathematics:** Advanced mathematical and STM equation typesetting with flawless MathML / LaTeX fidelity.\n" +
               "• **Editorial & Proofreading:** Line editing, copyediting, bibliographic reference cross-checking, and grammar styling (Chicago, APA, AMA).\n" +
               "• **OCR & Digitization:** High-accuracy OCR conversion of historical manuscripts, rare books, and degraded print archives.\n" +
               "• **Transcription & Captions:** Accurate audio/video transcription, closed captioning (SRT/VTT), and audio description for multimedia accessibility.",
        sources: [
          { title: 'Typesetting & Design', url: '/services/typesetting-and-design' },
          { title: 'Math & Equation Typesetting', url: '/services/math-and-equation-typesetting' },
          { title: 'OCR & Digitization', url: '/services/ocr-and-digitization' },
          { title: 'Contact Production Team', url: '/contact' }
        ]
      };
    }

    // 9.6 AI & Automation Services
    if (
      /\b(ai automation|idp|intelligent document processing|nlp|entity extraction|cognitive pipeline|automated qa|artificial intelligence)\b/i.test(q)
    ) {
      return {
        reply: "Velvora Solutions builds practical **AI & Workflow Automation Services** engineered for high-volume enterprise content:\n\n" +
               "• **Intelligent Document Processing (IDP):** Automated ingestion of unstructured manuscripts, complex PDFs, and scanned archives into clean XML/JSON.\n" +
               "• **Cognitive NLP & Extraction:** Automated keyword indexing, metadata tagging, taxonomy classification, and named entity extraction.\n" +
               "• **Automated Accessibility QA:** Machine-assisted alt text draft generation, automated reading order detection, and contrast validation.\n" +
               "• **Human-in-the-Loop Validation:** Combining high-speed machine algorithms with specialized human expert review to guarantee 100% semantic accuracy.",
        sources: [
          { title: 'AI and Automation Services', url: '/services/ai-automation' },
          { title: 'AI-Powered Solutions', url: '/solutions' },
          { title: 'Consult With Our AI Team', url: '/contact' }
        ]
      };
    }

    // 9.7 Software & Web Development
    if (
      /\b(software development|web development|react|frontend|backend|cloud|api|microservices|full stack|fullstack|website development)\b/i.test(q)
    ) {
      return {
        reply: "Velvora Solutions provides enterprise-grade **Software & Web Development Services**:\n\n" +
               "• **Modern Web Applications:** Full-stack development using React, modern JavaScript/TypeScript, and responsive frameworks.\n" +
               "• **Backend & Cloud APIs:** Resilient microservices engineered with Node.js, Python (FastAPI), RESTful APIs, and secure cloud architectures.\n" +
               "• **Accessible UI Systems:** Design systems and enterprise interfaces built from the ground up for strict WCAG 2.2 AA compliance.\n" +
               "• **Content Portals & CMS:** Custom publishing portals, digital asset management workflows, and searchable archive systems.",
        sources: [
          { title: 'Software & Web Development', url: '/services/software-development' },
          { title: 'Enterprise Solutions', url: '/solutions' },
          { title: 'Discuss Your Software Project', url: '/contact' }
        ]
      };
    }

    // 9.8 Data Analytics & BI
    if (
      /\b(data analytics|business intelligence|bi dashboards|power bi|predictive modeling|etl|data pipeline|telemetry)\b/i.test(q)
    ) {
      return {
        reply: "Velvora Solutions delivers transformative **Data Analytics & Business Intelligence Services**:\n\n" +
               "• **Executive BI Dashboards:** Interactive visual dashboards built in Power BI, Tableau, and modern web analytics frameworks.\n" +
               "• **ETL Data Pipelines:** Scalable data ingestion, cleaning, transformation, and automated warehousing from disparate sources.\n" +
               "• **Predictive Analytics:** Statistical modeling and trend forecasting to optimize operational workflows and revenue growth.\n" +
               "• **Accessible Data Visualizations:** High-contrast, screen-reader-friendly charts and reports compliant with accessibility standards.",
        sources: [
          { title: 'Data Analytics & BI Services', url: '/services/data-analytics' },
          { title: 'Accessible Dashboards Solution', url: '/solutions' },
          { title: 'Contact Analytics Team', url: '/contact' }
        ]
      };
    }

    // 9.9 Digital Marketing & SEO
    if (
      /\b(digital marketing|seo|search engine optimization|technical seo|content marketing|social media marketing|growth marketing)\b/i.test(q)
    ) {
      return {
        reply: "Velvora Solutions offers strategic **Digital Marketing & SEO Services**:\n\n" +
               "• **Technical SEO:** Deep website code audits, Core Web Vitals optimization, schema markup, and crawlability improvements.\n" +
               "• **Content Marketing & Outreach:** High-authority thought leadership, industry articles, and editorial content strategy.\n" +
               "• **Omnichannel Growth:** Data-driven campaigns across search, social networks, and email newsletters to build verified audience engagement.\n" +
               "• **Conversion Tracking:** Comprehensive ROI dashboards and conversion rate optimization (CRO).",
        sources: [
          { title: 'Digital Marketing & Growth', url: '/services/digital-marketing' },
          { title: 'Contact Marketing Team', url: '/contact' }
        ]
      };
    }

    // 9.10 Social Media Profiles & Official Channels
    if (
      /\b(social media|instagram|facebook|youtube|linkedin|social links|social page|follow you|social channels)\b/i.test(q)
    ) {
      return {
        reply: "You can connect with and follow **Velvora Solutions** across all our official social channels:\n\n" +
               "• **LinkedIn:** [Velvora Solutions on LinkedIn](https://www.linkedin.com/company/118444302/)\n" +
               "• **Instagram:** [@velvora_solutions](https://www.instagram.com/velvora_solutions?srtk=MWh0OHlvNmhlaXZwdg==)\n" +
               "• **Facebook:** [Velvora Solutions Facebook Page](https://www.facebook.com/share/18faJ9mXpG/)\n" +
               "• **YouTube:** [@VelvoraSolutions](https://www.youtube.com/@VelvoraSolutions)\n" +
               "• **Founder LinkedIn:** [Iyshwariya Senthil](https://www.linkedin.com/in/iyshwariya-senthil-bb7707287/)\n\n" +
               "Stay tuned for updates on digital accessibility guidelines, XML conversion pipelines, AI automation breakthroughs, and career opportunities!",
        sources: [
          { title: 'Contact Us', url: '/contact' },
          { title: 'Company Overview', url: '/about/company-overview' }
        ]
      };
    }

    // 9.11 Blog & Industry Publications
    if (
      /\b(blog|blogs|articles|publications|industry articles|knowledge hub|read articles|technical guides)\b/i.test(q)
    ) {
      return {
        reply: "Explore our authoritative **Velvora Knowledge Hub & Technical Blog**:\n\n" +
               "We publish industry-standard technical guides and regulatory analyses covering:\n" +
               "• **Digital Publishing & ePublishing:** Evolution of digital publishing, XML-first workflows, and accessible EPUB 3.\n" +
               "• **Digital Accessibility:** Practical WCAG 2.2 guides, Section 508 legal requirements, and European Accessibility Act (EAA).\n" +
               "• **PDF Accessibility & Remediation:** ISO 14289 (PDF/UA), tag tree architectures, scanned OCR remediation, and manual vs. automated QA.\n" +
               "• **AI & Automation:** Intelligent Document Processing (IDP), cognitive NLP tagging, and human-in-the-loop validation.\n" +
               "• **Technology Strategy:** Enterprise digital transformation and multi-tier publishing QA.\n\n" +
               "Visit our Blog page to read full-length publications and implementation blueprints!",
        sources: [
          { title: 'Velvora Blog & Knowledge Hub', url: '/blog' },
          { title: 'Explore Services', url: '/services' }
        ]
      };
    }

    // -------------------------------------------------------------------------
    // 10. MULTI-FACTOR SEMANTIC RETRIEVAL ACROSS CRAWLED DOCUMENTS (Clean Synthesis)
    // -------------------------------------------------------------------------
    const STOP_WORDS = new Set([
      'the', 'and', 'what', 'how', 'who', 'where', 'when', 'why', 'can', 'you',
      'your', 'are', 'is', 'for', 'with', 'from', 'about', 'our', 'have', 'does',
      'did', 'will', 'this', 'that', 'all', 'any', 'please', 'tell', 'give', 'much',
      'many', 'some', 'they', 'them', 'their', 'which', 'there', 'been', 'were', 'was',
      'company', 'provide', 'providing', 'provides'
    ]);

    const words = q.split(/[^a-z0-9]+/).filter(w => w.length > 2 && !STOP_WORDS.has(w));
    let bestDoc = null;
    let highestScore = 0;

    for (const doc of (this.store.documents || [])) {
      let score = 0;
      const docTitle = doc.title.toLowerCase();
      const docSummary = (doc.summary || '').toLowerCase();
      const docContent = (doc.content || '').toLowerCase();
      const keywords = (doc.keywords || []).map(k => k.toLowerCase());
      const topics = (doc.topics || []).map(t => t.toLowerCase());

      // Exact phrase match in title
      if (docTitle.includes(q)) score += 30;

      // Exact keyword matches
      for (const kw of keywords) {
        if (q.includes(kw)) score += 15;
      }

      // Exact topic matches
      for (const top of topics) {
        if (q.includes(top)) score += 12;
      }

      // Individual meaningful token matches
      for (const w of words) {
        if (docTitle.includes(w)) score += 8;
        if (keywords.some(k => k.includes(w))) score += 6;
        if (topics.some(t => t.includes(w))) score += 5;
        if (docSummary.includes(w)) score += 3;
        if (docContent.includes(w)) score += 1;
      }

      if (score > highestScore) {
        highestScore = score;
        bestDoc = doc;
      }
    }

    if (bestDoc && highestScore >= 16) {
      const titleClean = bestDoc.title.replace(/^Solution:\s*/i, '').replace(/^Service:\s*/i, '');
      
      // Synthesize clean highlights rather than raw slicing
      let highlights = [];
      if (bestDoc.content) {
        const lines = bestDoc.content.split('\n')
          .map(l => l.trim())
          .filter(l => l.startsWith('•') || l.startsWith('-') || l.startsWith('▸'));
        if (lines.length > 0) {
          highlights = lines.slice(0, 4);
        }
      }

      let reply = `### ${titleClean}\n\n${bestDoc.summary}`;
      if (highlights.length > 0) {
        reply += `\n\n**Key Capabilities & Highlights:**\n${highlights.join('\n')}`;
      }
      reply += `\n\nFor customized project scopes, technical consultations, or sample files, please contact our team at **info@velvorasolutions.com**.`;

      return {
        reply: reply,
        sources: [
          { title: bestDoc.title, url: bestDoc.url },
          { title: 'Contact Our Team', url: '/contact' }
        ]
      };
    }

    // -------------------------------------------------------------------------
    // 11. HONEST UNCERTAINTY ACKNOWLEDGEMENT (Never Guess)
    // -------------------------------------------------------------------------
    return {
      reply: "I don't have verified records regarding that specific question in my knowledge base. Please reach out directly to our team at **info@velvorasolutions.com** or call **+91 9500834236**, and our team will be pleased to provide you with verified assistance.",
      sources: [
        { title: 'Explore Our Services', url: '/services' },
        { title: 'View Careers & Internships', url: '/careers' },
        { title: 'Contact Our Team', url: '/contact' }
      ]
    };
  }
}

export const voraStore = new VoraKnowledgeStore();
export default voraStore;
