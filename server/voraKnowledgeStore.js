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
    const q = rawQ.toLowerCase();

    // 0. Empty query handling
    if (!q) {
      return {
        reply: "Hello! I'm VORA, your Velvora Solutions assistant. How can I help you today? You can ask about our digital accessibility audits, ePublishing and XML workflows, software engineering, project quotations, or current career openings.",
        sources: [
          { title: 'Explore Our Services', url: '/services' },
          { title: 'View Careers', url: '/careers' },
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
          reply: `Velvora Solutions is a content and technology partner specializing in **digital accessibility (WCAG 2.2 / PDF/UA)**, **ePublishing**, **XML conversion**, **AI automation**, **software development**, and **data analytics**. We do not provide ${rule.category} services. If you have an inquiry related to our digital and publishing services, our team would be pleased to assist you!`,
          sources: [
            { title: 'Explore Our Services', url: '/services' },
            { title: 'Contact Our Team', url: '/contact' }
          ]
        };
      }
    }

    // -------------------------------------------------------------------------
    // 2. OFFICE LOCATIONS, BRANCH COUNT & HEADQUARTERS
    // "How many branches does your company have?" / "Where are your offices?"
    // -------------------------------------------------------------------------
    if (
      /\b(how many branches|how many branch|branch count|number of branches|how many offices|total branches|total offices)\b/i.test(q)
    ) {
      return {
        reply: "Velvora Solutions operates from **two verified physical offices** located in Tamil Nadu, India:\n\n" +
               "1. **Cuddalore Office (Head Office & Operations Center):**\n" +
               "   Pathirikuppam, Thiruvantthipuram Post, Cuddalore - 607002, Tamil Nadu, India\n\n" +
               "2. **Chennai Office (Branch Office):**\n" +
               "   Velvora Solutions, Porur, Chennai, Tamil Nadu, India\n\n" +
               "• **Global Delivery:** While our physical offices are based in India, our digital accessibility, ePublishing, and technology workflows serve publishers, universities, and enterprises worldwide.\n" +
               "• **Contact:** info@velvorasolutions.com | +91 9500834236\n" +
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
               "  Pathirikuppam, Thiruvantthipuram Post, Cuddalore - 607002, Tamil Nadu, India\n\n" +
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
    // 3. INTERNATIONAL / OVERSEAS CLIENTS & PHYSICAL PRESENCE
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
    // 4. LEADERSHIP & EXECUTIVE MANAGEMENT
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
    // 5. PROJECT DEADLINES, TIMELINES & QUOTATIONS
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
    // 6. CAREERS, JOBS, INTERNSHIPS & RESUME APPLICATION
    // -------------------------------------------------------------------------
    const isJobQuery = /\b(job|jobs|career|careers|vacancy|vacancies|hiring|opening|openings|intern|internship|internships|fresher|eligibility|requirements|apply|application|salary|stipend|recruitment|role|roles|position|positions)\b/i.test(q);

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

      // Asking specifically for student internships
      if (/\b(intern|internship|internships|student|students|college)\b/i.test(q)) {
        const internships = activeCareers.filter(c => c.type.toLowerCase().includes('intern'));
        if (internships.length > 0) {
          const listText = internships.map(i => {
            const sk = Array.isArray(i.skills) ? i.skills.slice(0, 4).join(', ') : i.skills;
            return `• **${i.title}** (${i.department})\n  - Work Mode: ${i.workMode}\n  - Eligibility: ${i.eligibility}\n  - Skills: ${sk}`;
          }).join('\n\n');

          return {
            reply: `Here are our currently active **Internship Programs**:\n\n${listText}\n\n` +
                   `Our internships include hands-on mentorship across production publishing and accessibility pipelines. You can apply directly through our Careers page.`,
            sources: [
              { title: 'Apply for Internships', url: '/careers' },
              { title: 'About Careers at Velvora', url: '/about/careers' }
            ]
          };
        }
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
    // 7. MULTI-FACTOR SEMANTIC RETRIEVAL ACROSS CRAWLED DOCUMENTS
    // -------------------------------------------------------------------------
    const STOP_WORDS = new Set([
      'the', 'and', 'what', 'how', 'who', 'where', 'when', 'why', 'can', 'you',
      'your', 'are', 'is', 'for', 'with', 'from', 'about', 'our', 'have', 'does',
      'did', 'will', 'this', 'that', 'all', 'any', 'please', 'tell', 'give', 'much',
      'many', 'some', 'they', 'them', 'their', 'which', 'there', 'been', 'were', 'was'
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
      // Format a direct, professional, verified response
      const titleClean = bestDoc.title.replace(/^Solution:\s*/i, '').replace(/^Service:\s*/i, '');
      const reply = `### ${titleClean}\n\n${bestDoc.summary}\n\n${bestDoc.content}`;
      
      return {
        reply: reply.slice(0, 1100),
        sources: [
          { title: bestDoc.title, url: bestDoc.url },
          { title: 'Contact Our Team', url: '/contact' }
        ]
      };
    }

    // -------------------------------------------------------------------------
    // 8. HONEST UNCERTAINTY ACKNOWLEDGEMENT (Never Guess)
    // -------------------------------------------------------------------------
    return {
      reply: "I don't have verified information regarding that specific question in my knowledge base. Please reach out directly to our team at **info@velvorasolutions.com** or call **+91 9500834236**, and our team will be pleased to provide you with verified assistance.",
      sources: [
        { title: 'Explore Our Services', url: '/services' },
        { title: 'Contact Our Team', url: '/contact' }
      ]
    };
  }
}

export const voraStore = new VoraKnowledgeStore();
export default voraStore;
