import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, '..', 'data', 'vora-knowledge.json');

// Default initial state
const defaultStore = {
  syncMetadata: {
    version: '1.3.0',
    status: 'Completed',
    lastSynchronized: new Date().toISOString(),
    indexedCount: 0,
    errorLogs: []
  },
  careers: [
    {
      id: 'copy-editing-specialist',
      title: 'Copy Editing Specialist',
      department: 'Editorial & Quality Assurance',
      type: 'Full-Time / Hybrid',
      location: 'Cuddalore, TN / Hybrid',
      workMode: 'Hybrid',
      experience: '1-3 years editorial experience',
      skills: ['English Grammar', 'APA', 'Chicago', 'MLA', 'Style Guides', 'Editorial Proofing'],
      eligibility: 'Degree in English, Journalism, Mass Communication, or equivalent editing experience.',
      summary: 'Review and refine content for accuracy, clarity, and consistency across academic and enterprise publications.',
      status: 'Active'
    },
    {
      id: 'ppt-accessibility-specialist',
      title: 'PPT Accessibility Specialist',
      department: 'Digital Accessibility',
      type: 'Full-Time / Hybrid',
      location: 'Cuddalore, TN / Hybrid',
      workMode: 'Hybrid',
      experience: '1+ years document accessibility remediation',
      skills: ['PowerPoint Accessibility', 'WCAG 2.2', 'PDF/UA', 'Screen Reader Testing', 'Alt-Text'],
      eligibility: 'Experience in PowerPoint remediation, reading order setup, table tagging, and color contrast compliance.',
      summary: 'Remediate complex presentations and corporate slide decks to achieve 100% WCAG 2.2 and Section 508 compliance.',
      status: 'Active'
    },
    {
      id: 'typesetting-specialist',
      title: 'Typesetting Specialist',
      department: 'Publishing Production',
      type: 'Full-Time / Hybrid',
      location: 'Cuddalore, TN / Hybrid',
      workMode: 'Hybrid',
      experience: '1-4 years typesetting experience',
      skills: ['InDesign', 'LaTeX', '3B2', 'MathML', 'Grid Composition', 'Pre-press QA'],
      eligibility: 'Proficient in Adobe InDesign, typesetting styles, master pages, and academic book/journal layouts.',
      summary: 'Typeset high-volume academic, scientific, and literary publications from manuscript to print-ready and digital formats.',
      status: 'Active'
    },
    {
      id: 'ai-automation-engineer',
      title: 'AI & Automation Engineer',
      department: 'Engineering & Innovation',
      type: 'Full-Time / Hybrid',
      location: 'Remote / Hybrid',
      workMode: 'Hybrid',
      experience: 'Fresher / 1-2 years experience',
      skills: ['Python', 'FastAPI', 'NLP', 'Prompt Engineering', 'LangChain', 'Workflow Automation'],
      eligibility: 'Degree in Computer Science/IT or equivalent hands-on experience in Python backend development and AI pipelines.',
      summary: 'Build intelligent publishing workflows, OCR extraction pipelines, and automated text processing integrations.',
      status: 'Active'
    },
    {
      id: 'digital-publishing-xml-intern',
      title: 'Digital Publishing & XML Intern',
      department: 'Publishing Production',
      type: 'Internship',
      location: 'Remote',
      workMode: 'Remote',
      experience: 'Fresher / College Students',
      skills: ['HTML', 'XML Basics', 'Content Structuring', 'Proofreading', 'Attention to Detail'],
      eligibility: 'Students or recent graduates in Computer Science, Literature, or Media Studies looking for hands-on publishing tech experience.',
      summary: '3 to 6 months mentorship program in structured XML composition, EPUB generation, and digital publishing pipelines.',
      status: 'Active'
    },
    {
      id: 'accessibility-qa-intern',
      title: 'Accessibility Auditing & QA Intern',
      department: 'Digital Accessibility',
      type: 'Internship',
      location: 'Remote',
      workMode: 'Remote',
      experience: 'Fresher / Final Year Students',
      skills: ['WCAG Guidelines', 'Screen Reader Testing', 'Alt-Text Drafting', 'Detail Focus'],
      eligibility: 'Passionate about digital inclusion, assistive technologies, and Web Accessibility Guidelines (WCAG).',
      summary: 'Learn hands-on PDF/UA, EPUB accessibility auditing, and screen reader testing with industry tools.',
      status: 'Active'
    }
  ],
  pages: [
    {
      id: 'home',
      title: 'Velvora Solutions — Home',
      url: '/',
      category: 'company',
      summary: 'Velvora Solutions is a content and technology services company combining ePublishing, XML, digital accessibility, AI automation, software engineering, and data analytics.',
      topics: ['ePublishing', 'XML', 'Digital Accessibility', 'AI Automation', 'Software Development', 'Data Analytics', 'Digital Marketing'],
      keywords: ['about velvora', 'company overview', 'digital solutions', 'services', 'velvora solutions']
    },
    {
      id: 'company-overview',
      title: 'Company Overview & Mission',
      url: '/about/company-overview',
      category: 'company',
      summary: 'Velvora Solutions’ mission is to build accessible, precision-driven digital solutions uniting advanced technology with human dedication to deliver uncompromising quality for global organizations.',
      topics: ['Mission and Vision', 'Core Values', 'Quality Assurance', 'Global Delivery', 'Universal Design'],
      keywords: ['mission', 'vision', 'values', 'why choose velvora', 'overview', 'goals', 'assurance']
    },
    {
      id: 'our-team',
      title: 'Our Leadership & Team',
      url: '/about/our-team',
      category: 'company',
      summary: 'Velvora Solutions is founded and led by Iyshwariya Senthil (Founder & Managing Director). With over 7 years of executive experience in publishing operations, universal design, and WCAG accessibility standards, she guides Velvora’s strategic roadmap.',
      topics: ['Executive Leadership', 'Iyshwariya Senthil', 'Certified Specialists', 'Publishing Governance', 'Accessibility Experts'],
      keywords: ['leadership', 'founder', 'managing director', 'ceo', 'iyshwariya senthil', 'team', 'executives']
    },
    {
      id: 'careers',
      title: 'Careers at Velvora Solutions',
      url: '/careers',
      category: 'career',
      summary: 'Explore full-time careers and student internships in digital accessibility, ePublishing, editorial proofing, typesetting, and AI engineering at Velvora Solutions.',
      topics: ['Job Openings', 'Internships', 'Work Culture', 'Resume Submission', 'Application Process'],
      keywords: ['jobs', 'careers', 'vacancies', 'internships', 'apply', 'hiring', 'recruitment', 'openings']
    },
    {
      id: 'service-epublishing',
      title: 'ePublishing Services',
      url: '/services/epublishing',
      category: 'service',
      summary: 'Transform manuscripts into seamless digital reading experiences: reflowable and fixed-layout EPUB 3 / EPUB 2, interactive eBooks, and multi-platform quality assurance for Kindle, Apple Books, and Kobo.',
      topics: ['EPUB 3 / EPUB 2', 'Fixed Layout', 'Interactive eBooks', 'Kindle KPF/MOBI', 'Audio Sync Read-Aloud'],
      keywords: ['epublishing', 'epub', 'ebook', 'ebooks', 'kindle', 'manuscript', 'publishing conversion']
    },
    {
      id: 'service-xml',
      title: 'XML Services & Conversion',
      url: '/services/xml',
      category: 'service',
      summary: 'High-volume, schema-compliant XML conversion into JATS 1.3, BITS 2.1, DocBook, and TEI with automated Schematron validation for scientific, technical, and academic publishers.',
      topics: ['JATS XML', 'BITS XML', 'DocBook', 'TEI', 'DTD Schemas', 'Schematron Validation'],
      keywords: ['xml', 'jats', 'bits', 'schema', 'dtd', 'docbook', 'tei', 'xml conversion']
    },
    {
      id: 'service-digital-accessibility',
      title: 'Digital Accessibility Services',
      url: '/services/digital-accessibility',
      category: 'service',
      summary: 'Complete digital accessibility solutions conforming to WCAG 2.2 (Level AA/AAA), PDF/UA (ISO 14289), and Section 508. Testing conducted with real screen readers including JAWS, NVDA, and VoiceOver.',
      topics: ['WCAG 2.2 Compliance', 'PDF/UA Remediation', 'Section 508', 'VPAT Assessments', 'Screen Reader Testing'],
      keywords: ['accessibility', 'wcag', 'pdf/ua', 'section 508', 'vpat', 'jaws', 'nvda', 'screen reader', 'remediation']
    },
    {
      id: 'service-typesetting-and-design',
      title: 'Typesetting and Design Services',
      url: '/services/typesetting-and-design',
      category: 'service',
      summary: 'High-precision page layout, composition, and typesetting for books, journals, and marketing collateral using Adobe InDesign, 3B2, and automated styling templates.',
      topics: ['Book Composition', 'Journal Layout', 'InDesign Typesetting', 'Multilingual Typography', 'Pre-Press QA'],
      keywords: ['typesetting', 'design', 'layout', 'indesign', 'composition', 'page layout']
    },
    {
      id: 'service-math-and-equation-typesetting',
      title: 'Math and Equation Typesetting',
      url: '/services/math-and-equation-typesetting',
      category: 'service',
      summary: 'Precision typesetting of complex mathematical and scientific equations using LaTeX, MathML, MathJax, and AMS-TeX with full screen-reader accessibility.',
      topics: ['LaTeX Typesetting', 'MathML Generation', 'STEM Equations', 'Scientific Formulas', 'MathJax'],
      keywords: ['math', 'equations', 'latex', 'mathml', 'stem', 'formulas', 'math typesetting']
    },
    {
      id: 'service-metadata-indexing-and-taxonomy',
      title: 'Metadata, Indexing and Taxonomy',
      url: '/services/metadata-indexing-and-taxonomy',
      category: 'service',
      summary: 'Semantic metadata enrichment, back-of-the-book indexing, taxonomy creation, and DOI/Crossref metadata generation for academic publications and digital libraries.',
      topics: ['Semantic Indexing', 'Taxonomy', 'DOI Enrichment', 'Crossref Metadata', 'Subject Classification'],
      keywords: ['metadata', 'indexing', 'taxonomy', 'doi', 'crossref', 'thesaurus']
    },
    {
      id: 'service-ocr-and-digitization',
      title: 'OCR and Digitization Services',
      url: '/services/ocr-and-digitization',
      category: 'service',
      summary: 'High-accuracy OCR digitization, document scanning, and legacy book conversion into searchable PDF, Word, XML, and editable archives.',
      topics: ['OCR Processing', 'Legacy Digitization', 'Searchable PDF', 'Document Scanning', 'Text Recognition'],
      keywords: ['ocr', 'digitization', 'scanning', 'legacy conversion', 'text extraction']
    },
    {
      id: 'service-captioning-transcription',
      title: 'Captioning, Transcription and Audio Description',
      url: '/services/captioning-transcription-and-audio-description',
      category: 'service',
      summary: 'Closed captioning, time-coded verbatim transcriptions, and audio description services complying with FCC and WCAG multimedia accessibility guidelines.',
      topics: ['Closed Captioning', 'Time-coded Transcription', 'Audio Description', 'Subtitle Files (SRT/VTT)', 'Video Accessibility'],
      keywords: ['captioning', 'transcription', 'audio description', 'subtitles', 'video accessibility', 'srt']
    },
    {
      id: 'service-accessibility-training',
      title: 'Accessibility Training and Consulting',
      url: '/services/accessibility-training-and-consulting',
      category: 'service',
      summary: 'Specialized enterprise workshops, universal design training, and accessibility consulting for digital publishers, authors, editorial teams, and developers.',
      topics: ['Enterprise Workshops', 'Universal Design', 'Accessible Authoring', 'WCAG Auditing Training', 'Compliance Consulting'],
      keywords: ['accessibility training', 'consulting', 'workshops', 'inclusive design training']
    },
    {
      id: 'solutions-overview',
      title: 'Industry Solutions',
      url: '/solutions',
      category: 'solution',
      summary: 'End-to-end solutions tailored for Academic & Scholarly Publishers, University Presses & Higher Education, Trade Publishers, Enterprises & Corporates, and Government Agencies.',
      topics: ['Academic Publishing', 'University Presses', 'Higher Education', 'Enterprise Documentation', 'Government Accessibility'],
      keywords: ['solutions', 'industries', 'clients', 'enterprises', 'academic publishers']
    },
    {
      id: 'contact',
      title: 'Contact Velvora Solutions',
      url: '/contact',
      category: 'contact',
      summary: 'Get in touch with Velvora Solutions. Head office in Cuddalore and branch office in Chennai (Porur). Direct email: info@velvorasolutions.com, Phone: +91 9500834236.',
      topics: ['Office Locations', 'Contact Form', 'Direct Phone', 'Email Inquiries', 'Working Hours'],
      keywords: ['contact', 'office', 'cuddalore', 'chennai', 'porur', 'address', 'email', 'phone', 'hours']
    },
    {
      id: 'privacy-policy',
      title: 'Privacy Policy',
      url: '/privacy-policy',
      category: 'policy',
      summary: 'Velvora Solutions strictly adheres to international data privacy standards, GDPR alignment, non-disclosure confidentiality, and client data protection.',
      topics: ['Data Privacy', 'Client Confidentiality', 'GDPR Compliance', 'Information Security'],
      keywords: ['privacy', 'confidentiality', 'data protection', 'security', 'gdpr']
    }
  ],
  faqs: [
    {
      q: 'What is Velvora Solutions?',
      a: 'Velvora Solutions is a content and technology partner delivering end-to-end services across digital accessibility, ePublishing, AI automation, software engineering, and data analytics.'
    },
    {
      q: 'Where are Velvora Solutions offices located?',
      a: 'Velvora Solutions operates from our verified offices in Cuddalore (Head Office: Pathirikuppam, Thiruvantthipuram Post) and Chennai (Porur), Tamil Nadu, India.'
    },
    {
      q: 'How can I submit project requirements or request a quote?',
      a: 'You can share project requirements through our Contact page or email info@velvorasolutions.com. Please provide project scope, format specifications, and target timelines.'
    }
  ]
};

export class VoraKnowledgeStore {
  constructor() {
    this.store = defaultStore;
    this.init();
  }

  init() {
    try {
      if (fs.existsSync(DATA_FILE)) {
        const raw = fs.readFileSync(DATA_FILE, 'utf8');
        const parsed = JSON.parse(raw);
        this.store = {
          syncMetadata: parsed.syncMetadata || defaultStore.syncMetadata,
          careers: parsed.careers || defaultStore.careers,
          pages: parsed.pages || defaultStore.pages,
          faqs: parsed.faqs || defaultStore.faqs
        };
      } else {
        this.persist();
      }
    } catch (err) {
      console.warn('Could not read vora-knowledge.json, using defaults:', err.message);
      this.store = defaultStore;
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

  syncAll() {
    const now = new Date().toISOString();
    this.store.syncMetadata.version = '1.3.0';
    this.store.syncMetadata.status = 'Completed';
    this.store.syncMetadata.lastSynchronized = now;
    this.store.syncMetadata.indexedCount = this.store.pages.length + this.store.careers.length;
    this.persist();
    return {
      success: true,
      timestamp: now,
      indexedCount: this.store.syncMetadata.indexedCount,
      version: this.store.syncMetadata.version
    };
  }

  getMetadata() {
    return {
      ...this.store.syncMetadata,
      indexedCount: this.store.pages.length + this.store.careers.length
    };
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
        c.skills.some(s => s.toLowerCase().includes(q))
      );
    }
    return list;
  }

  getCareerById(id) {
    return this.store.careers.find(c => c.id === id);
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
      status: data.status || 'Active'
    };

    const existingIdx = this.store.careers.findIndex(c => c.id === id);
    if (existingIdx !== -1) {
      this.store.careers[existingIdx] = { ...this.store.careers[existingIdx], ...newEntry };
    } else {
      this.store.careers.push(newEntry);
    }

    this.store.syncMetadata.lastSynchronized = new Date().toISOString();
    this.store.syncMetadata.indexedCount = this.store.pages.length + this.store.careers.length;
    this.persist();
    return newEntry;
  }

  updateCareer(id, updates) {
    const idx = this.store.careers.findIndex(c => c.id === id);
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
      this.store.syncMetadata.indexedCount = this.store.pages.length + this.store.careers.length;
      this.persist();
      return true;
    }
    return false;
  }

  getPages() {
    return this.store.pages;
  }

  getFaqs() {
    return this.store.faqs;
  }

  updateFaqs(faqs) {
    this.store.faqs = faqs;
    this.persist();
    return this.store.faqs;
  }

  // =========================================================================
  // ADVANCED INTENT CLASSIFICATION & ANSWER RETRIEVAL ENGINE
  // =========================================================================
  answerQuery(userQuery) {
    const rawQ = (userQuery || '').trim();
    const q = rawQ.toLowerCase();

    // 0. Empty query handling
    if (!q) {
      return {
        reply: "Hello! I'm VORA, your Velvora Solutions assistant. How can I help you today? You can ask about our digital accessibility audits, ePublishing and XML workflows, software development, project quotes, or current career openings.",
        sources: [
          { title: 'Explore Our Services', url: '/services' },
          { title: 'View Careers', url: '/careers' },
          { title: 'Contact Our Team', url: '/contact' }
        ]
      };
    }

    // -------------------------------------------------------------------------
    // 1. BRANCH COUNT (Explicit requirement from prompt)
    // "How many branches does your company have?"
    // -------------------------------------------------------------------------
    if (
      /\b(how many branches|how many branch|branch count|number of branches|how many offices|total branches|total offices)\b/i.test(q)
    ) {
      return {
        reply: "Velvora Solutions' verified branch information is not currently available in my knowledge base. Please contact our team for the latest office location details.",
        sources: [
          { title: 'Contact Our Team', url: '/contact' }
        ]
      };
    }

    // -------------------------------------------------------------------------
    // 2. OFFICE LOCATIONS & HEADQUARTERS
    // "Where are your offices located?" / "Where is your headquarters?"
    // -------------------------------------------------------------------------
    if (
      /\b(where is your headquarter|where is your headquarters|headquarters|head office|where are your offices|where are you located|office locations|office address|cuddalore office|chennai office|porur office)\b/i.test(q) ||
      (/\b(where|location|address)\b/i.test(q) && /\b(office|offices|branch|branches|company|located|situated)\b/i.test(q))
    ) {
      return {
        reply: "Velvora Solutions operates from our verified offices in Tamil Nadu, India:\n\n" +
               "• **Cuddalore Office (Head Office / Operations):** Pathirikuppam, Thiruvantthipuram Post, Cuddalore - 607002, Tamil Nadu, India\n" +
               "• **Chennai Office (Porur):** Velvora Solutions, Porur, Chennai, Tamil Nadu, India\n\n" +
               "• **Email:** info@velvorasolutions.com\n" +
               "• **Phone:** +91 9500834236\n" +
               "• **Office Hours:** Monday to Saturday: 9:00 AM – 6:30 PM IST",
        sources: [
          { title: 'Contact Our Team', url: '/contact' }
        ]
      };
    }

    // -------------------------------------------------------------------------
    // 3. INTERNATIONAL BRANCHES / PHYSICAL OVERSEAS PRESENCE
    // -------------------------------------------------------------------------
    if (
      /\b(international branches|international branch|overseas branch|foreign branch|office outside india|branch outside india)\b/i.test(q)
    ) {
      return {
        reply: "Velvora Solutions does not operate physical branch offices outside India. Our physical office locations are based in Cuddalore and Chennai, Tamil Nadu, while our digital accessibility, publishing, and technology services support global clients and organizations worldwide.",
        sources: [
          { title: 'Contact Our Team', url: '/contact' },
          { title: 'Explore Our Services', url: '/services' }
        ]
      };
    }

    // -------------------------------------------------------------------------
    // 4. INTERNATIONAL CLIENTS / GLOBAL COLLABORATION
    // "Do you work with international clients?"
    // -------------------------------------------------------------------------
    if (
      /\b(international client|international clients|foreign clients|work globally|work with international|clients abroad|accept international projects|overseas clients|outside india clients)\b/i.test(q) ||
      (/\b(international|global|foreign|overseas)\b/i.test(q) && /\b(client|clients|project|projects|work|serve)\b/i.test(q))
    ) {
      return {
        reply: "Velvora Solutions works with clients and global organizations across publishing, academic, and enterprise domains. For specific international project requirements, regional compliance, or contract arrangements, our team can confirm our current client coverage and support options.",
        sources: [
          { title: 'Contact Our Team', url: '/contact' },
          { title: 'Explore Our Services', url: '/services' }
        ]
      };
    }

    // -------------------------------------------------------------------------
    // 5. PROJECT TIMELINES & DEADLINES
    // "If I give you a project, what is the maximum deadline?"
    // -------------------------------------------------------------------------
    if (
      /\b(deadline|deadlines|maximum deadline|max deadline|project timeline|project duration|turnaround time|delivery timeline|delivery time|delivery schedule)\b/i.test(q) ||
      (/\b(how long)\b/i.test(q) && /\b(take|completion|deliver|finish|complete|project)\b/i.test(q))
    ) {
      return {
        reply: "Project delivery timelines depend on the project's size, complexity, features, and requirements. We evaluate each project individually before confirming a delivery schedule. You can share your requirements with our team to receive a realistic timeline and quotation.\n\n" +
               "Key factors affecting project schedules include:\n" +
               "• Project scope and volume (such as total page count, number of digital documents, or software features)\n" +
               "• Technical complexity, required schemas (e.g. JATS XML, PDF/UA), and custom integrations\n" +
               "• Completeness of source materials and assets provided by the client\n" +
               "• Review, quality auditing, revision, and approval cycles",
        sources: [
          { title: 'Contact Our Team for Estimation', url: '/contact' }
        ]
      };
    }

    // -------------------------------------------------------------------------
    // 6. WHAT DOES VELVORA SOLUTIONS DO? / COMPANY INTRODUCTION
    // -------------------------------------------------------------------------
    if (
      /\b(what does velvora do|what does velvora solutions do|what is velvora solutions|what is velvora|tell me about velvora|company overview|about velvora solutions|what do you do|what does your company do)\b/i.test(q) ||
      (q === 'what is velvora' || q === 'what is velvora solutions')
    ) {
      return {
        reply: "Velvora Solutions delivers digital and technology services focused on accessibility, ePublishing, AI automation, and software development.\n\n" +
               "Our key areas of expertise include:\n" +
               "• **Digital Accessibility** – WCAG, PDF/UA, Section 508, and accessible document solutions.\n" +
               "• **ePublishing** – XML conversion, structured content, and digital publishing.\n" +
               "• **AI Automation** – Intelligent workflows and AI-powered business solutions.\n" +
               "• **Software Development** – Websites, web applications, and custom software.\n" +
               "• **Data Analytics** – Data analysis, reporting, and business insights.\n" +
               "• **Digital Marketing** – Online presence, search optimization, and marketing support.\n\n" +
               "We help businesses improve digital accessibility, streamline workflows, and build effective digital solutions.",
        sources: [
          { title: 'Explore Our Services', url: '/services' },
          { title: 'About Our Company', url: '/about/company-overview' }
        ]
      };
    }

    // -------------------------------------------------------------------------
    // 7. WHY CHOOSE VELVORA SOLUTIONS?
    // "Why should I choose Velvora Solutions?"
    // -------------------------------------------------------------------------
    if (
      /\b(why choose velvora|why should i choose velvora|why choose your company|why work with velvora|what makes velvora unique|why velvora solutions|advantages of velvora)\b/i.test(q)
    ) {
      return {
        reply: "Velvora Solutions brings together digital accessibility, publishing expertise, and technology services. Our work focuses on making digital content more accessible, improving publishing workflows, and developing practical technology solutions. Contact our team to discuss your specific requirements and the services relevant to your project.",
        sources: [
          { title: 'Explore Our Services', url: '/services' },
          { title: 'Contact Our Team', url: '/contact' }
        ]
      };
    }

    // -------------------------------------------------------------------------
    // 8. MISSION, VISION & CORE VALUES
    // -------------------------------------------------------------------------
    if (
      /\b(mission|vision|core values|company values|what is your mission|what is your vision)\b/i.test(q)
    ) {
      return {
        reply: "Velvora Solutions' mission is to build accessible, precision-driven digital solutions where advanced technology and human craftsmanship converge to deliver uncompromising quality for global organizations.\n\n" +
               "• **Vision:** To empower publishers, academic institutions, and enterprises worldwide with universal digital accessibility, seamless publishing transformations, and resilient software architectures.\n" +
               "• **Core Values:** Universal inclusion, craftsmanship and technical precision, integrity and data confidentiality, and client-centric innovation.",
        sources: [
          { title: 'Company Overview & Mission', url: '/about/company-overview' },
          { title: 'Contact Our Team', url: '/contact' }
        ]
      };
    }

    // -------------------------------------------------------------------------
    // 8B. INDUSTRIES AND CLIENTS SERVED
    // -------------------------------------------------------------------------
    if (
      /\b(what industries|industries do you serve|types of customers|types of clients|who do you serve|client base|client sectors|industries and clients)\b/i.test(q)
    ) {
      return {
        reply: "Velvora Solutions serves academic and scholarly publishers, university presses, higher education institutions, scientific/technical/medical (STM) journals, global enterprises, and government agencies.\n\n" +
               "We provide tailored solutions for content providers and institutions that require rigorous accessibility compliance (WCAG 2.2, PDF/UA, Section 508), high-volume structured XML conversion, and secure custom software systems.",
        sources: [
          { title: 'Industry Solutions', url: '/solutions' },
          { title: 'Contact Our Team', url: '/contact' }
        ]
      };
    }

    // -------------------------------------------------------------------------
    // 9. LEADERSHIP AND MANAGEMENT
    // "Who leads Velvora Solutions?" / "Who is the founder?"
    // -------------------------------------------------------------------------
    if (
      /\b(who leads|who founded|founder|managing director|ceo|iyshwariya senthil|iyshwariya|leadership team|executive leadership|who is the owner|who runs velvora)\b/i.test(q)
    ) {
      return {
        reply: "Velvora Solutions is founded and led by **Iyshwariya Senthil** (Founder & Managing Director).\n\n" +
               "With over 7 years of executive experience in publishing operations, universal design, and WCAG accessibility standards, she guides Velvora’s strategic vision of uniting technology with human dedication. Our delivery teams are also guided by certified senior specialists in accessibility compliance, composition, and AI systems.",
        sources: [
          { title: 'Meet Our Leadership', url: '/about/our-team' },
          { title: 'Company Overview', url: '/about/company-overview' }
        ]
      };
    }

    // -------------------------------------------------------------------------
    // 10. PROJECT SUBMISSIONS & QUOTATIONS
    // "How can I submit my project requirements?" / "Request quotation"
    // -------------------------------------------------------------------------
    if (
      !/\b(resume|cv|job|jobs|career|careers|intern|internship|apply|application)\b/i.test(q) &&
      (/\b(submit project|submit requirements|request quotation|request quote|get a quote|get quotation|pricing|project cost|how much does it cost|project inquiry|project enquiry)\b/i.test(q) ||
       (/\b(how can i submit|how do i submit)\b/i.test(q) && /\b(project|requirement|requirements|scope)\b/i.test(q)))
    ) {
      return {
        reply: "To submit your project requirements and request a quotation, you can use our online Contact Form or email us directly at **info@velvorasolutions.com**.\n\n" +
               "To help us provide a prompt and accurate estimate, please include:\n" +
               "• Project type and primary objectives (e.g. PDF/UA accessibility audit, XML conversion, custom software development)\n" +
               "• Anticipated scope or volume (such as total page count, number of documents, or software feature specifications)\n" +
               "• Target technical stack or desired delivery formats (e.g. EPUB 3, JATS XML, React/FastAPI)\n" +
               "• Preferred delivery timeline or target deadline\n" +
               "• Any available specifications, guidelines, or sample documents",
        sources: [
          { title: 'Contact Our Team for Quotation', url: '/contact' }
        ]
      };
    }

    // -------------------------------------------------------------------------
    // 11. PROJECT TYPES: CUSTOM SOFTWARE & LARGE-SCALE PROJECTS
    // -------------------------------------------------------------------------
    if (
      /\b(custom software|custom software projects|web applications|build custom software|custom web development|custom app)\b/i.test(q)
    ) {
      return {
        reply: "Yes! Velvora Solutions accepts and delivers custom software projects. Our engineering team develops responsive web applications, accessible digital portals, cloud-native microservices, and custom APIs tailored to enterprise requirements.",
        sources: [
          { title: 'Software Engineering Services', url: '/services' },
          { title: 'Contact Our Team', url: '/contact' }
        ]
      };
    }

    if (
      /\b(large-scale projects|large scale projects|large volume|high volume projects|bulk projects|can you work on large|scale projects)\b/i.test(q)
    ) {
      return {
        reply: "Yes! Velvora Solutions is fully equipped to handle large-scale and high-volume projects. Our production pipelines and dedicated technical teams routinely manage high-volume publishing transformations, tens of thousands of document accessibility remediations, and enterprise-grade software systems.",
        sources: [
          { title: 'Explore Our Services', url: '/services' },
          { title: 'Contact Our Team', url: '/contact' }
        ]
      };
    }

    if (
      /\b(types of projects|what projects does velvora accept|what kind of projects|project types)\b/i.test(q)
    ) {
      return {
        reply: "Velvora Solutions accepts a wide range of projects across publishing, digital accessibility, and software technology, including:\n\n" +
               "• **Accessibility Audits & Remediation:** Document remediation (PDF/UA, Word, PowerPoint), VPAT assessments, and web accessibility conformance.\n" +
               "• **Publishing & Data Structuring:** High-volume XML conversion (JATS/BITS), EPUB 3/2 eBooks, and mathematical typesetting.\n" +
               "• **Software & Web Applications:** Custom websites, web platforms, and automated cloud workflows.\n" +
               "• **AI Workflows:** Automated document classification, OCR extraction, and process automation.",
        sources: [
          { title: 'Explore Our Services', url: '/services' },
          { title: 'Contact Our Team', url: '/contact' }
        ]
      };
    }

    if (
      /\b(ongoing support|maintenance|support after delivery|post-launch support|do you provide support)\b/i.test(q)
    ) {
      return {
        reply: "Yes, Velvora Solutions provides ongoing support, maintenance agreements, periodic accessibility compliance audits, and system updates to ensure your digital assets and software remain secure, standards-compliant, and optimized.",
        sources: [
          { title: 'Contact Our Team', url: '/contact' }
        ]
      };
    }

    // -------------------------------------------------------------------------
    // 12. INDIVIDUAL SERVICES (Direct & In-Depth Explanations)
    // -------------------------------------------------------------------------

    // A. Digital Accessibility
    if (
      /\b(accessibility|wcag|pdf\/ua|section 508|vpat|screen reader|jaws|nvda|voiceover|talkback|remediation|accessible document|accessible documents)\b/i.test(q)
    ) {
      return {
        reply: "Velvora Solutions provides complete **Digital Accessibility Services** to ensure digital content and applications are fully usable by individuals with disabilities, conforming to **WCAG 2.2 (Level AA/AAA)**, **PDF/UA (ISO 14289)**, and **Section 508** standards.\n\n" +
               "Our services include:\n" +
               "• **Comprehensive Audits & VPAT Reports:** Detailed assessments identifying accessibility barriers and compliance roadmaps.\n" +
               "• **Document Remediation:** Remediation of PDF, Microsoft Word, PowerPoint, and Excel files into 100% compliant, tagged documents.\n" +
               "• **Assistive Technology Verification:** Rigorous testing conducted with real screen readers including JAWS, NVDA, and Apple VoiceOver.\n" +
               "• **Accessible Content Creation:** Structural tagging, logical reading order, alt-text descriptions, and color contrast optimization.\n" +
               "• **Training & Consulting:** Custom workshops to help organizational teams maintain accessible design standards.",
        sources: [
          { title: 'Digital Accessibility Services', url: '/services/digital-accessibility' },
          { title: 'Accessibility Training', url: '/services/accessibility-training-and-consulting' }
        ]
      };
    }

    // B. ePublishing & Typesetting
    if (
      /\b(epublishing|epub|epub 3|epub 2|ebook|ebooks|kindle|manuscript|typesetting|indesign|3b2)\b/i.test(q)
    ) {
      return {
        reply: "Velvora's **ePublishing and Typesetting Services** transform raw manuscripts, print layouts, and digital drafts into standardized, multi-format digital publications:\n\n" +
               "• **EPUB 3 & EPUB 2:** Reflowable and fixed-layout eBook conversion conforming to IDPF/W3C and European Accessibility Act (EAA) standards.\n" +
               "• **Typesetting & Design:** Professional page composition using Adobe InDesign, 3B2, and automated styling templates for books and journals.\n" +
               "• **Interactive eBooks:** Enhanced publications with synchronized read-aloud audio, rich media overlays, and interactive assessments.\n" +
               "• **Multi-Platform QA:** Validation across Apple Books, Amazon Kindle (KPF/MOBI), Kobo, and Google Play Books.",
        sources: [
          { title: 'ePublishing Services', url: '/services/epublishing' },
          { title: 'Typesetting and Design', url: '/services/typesetting-and-design' }
        ]
      };
    }

    // C. XML Services & Structured Content
    if (
      /\b(xml|jats|bits|dtd|schema|schematron|docbook|tei|structured content)\b/i.test(q)
    ) {
      return {
        reply: "Velvora's **XML Services** convert complex content into standardized, future-proof, semantic XML schemas including **JATS 1.3**, **BITS 2.1**, **DocBook**, and **TEI**.\n\n" +
               "We deliver:\n" +
               "• High-volume automated schema conversion and validation using custom Schematron rules\n" +
               "• Multi-channel syndication pipelines for scholarly aggregators, PubMed Central, and Crossref\n" +
               "• Custom DTD, XML Schema, and XSLT stylesheet development for academic and commercial publishers",
        sources: [
          { title: 'XML Services & Standards', url: '/services/xml' },
          { title: 'Metadata & Taxonomy', url: '/services/metadata-indexing-and-taxonomy' }
        ]
      };
    }

    // D. AI Automation
    if (
      /\b(ai automation|ai-powered|automation|intelligent workflows|ai workflow|ai solutions|process automation|ocr extraction)\b/i.test(q)
    ) {
      return {
        reply: "Velvora's **AI Automation Services** implement intelligent, AI-powered workflows to automate document processing, content transformation, and business operations.\n\n" +
               "Our capabilities include:\n" +
               "• **Intelligent Document Processing (IDP):** Automated data extraction, OCR recognition, and document structuring from unstructured sources.\n" +
               "• **Automated Metadata & Indexing:** AI-assisted tagging, classification, and subject taxonomy enrichment.\n" +
               "• **Workflow Automation:** Custom API pipelines integrating large language models for content normalization, proofreading support, and validation.",
        sources: [
          { title: 'AI Automation & Engineering', url: '/services' },
          { title: 'Contact Our Team', url: '/contact' }
        ]
      };
    }

    // E. Software Development
    if (
      /\b(software development|web development|website development|web application|custom software|software solutions|backend|frontend)\b/i.test(q)
    ) {
      return {
        reply: "Velvora's **Software Development Services** design, build, and deploy custom websites, web applications, and resilient digital architectures tailored to enterprise requirements.\n\n" +
               "Our services include:\n" +
               "• **Web Application Development:** Modern full-stack applications using React, Next.js, Node.js, and Python/FastAPI.\n" +
               "• **Corporate Websites & Portals:** Accessible, high-performance websites engineered for optimal UX and WCAG conformance.\n" +
               "• **Cloud APIs & Microservices:** Scalable RESTful architectures, secure authentication, and third-party API integrations.",
        sources: [
          { title: 'Software Engineering Services', url: '/services' },
          { title: 'Contact Our Team', url: '/contact' }
        ]
      };
    }

    // F. Data Analytics
    if (
      /\b(data analytics|data processing|reporting and visualization|business insights|dashboards|kpi dashboards|analytics services)\b/i.test(q)
    ) {
      return {
        reply: "Velvora's **Data Analytics Services** help organizations extract actionable business intelligence from their operational, publishing, and customer data.\n\n" +
               "Key offerings include:\n" +
               "• Structured data extraction, cleaning, and automated ETL pipelines\n" +
               "• Interactive executive KPI dashboards and visual reporting\n" +
               "• Publication analytics, content engagement tracking, and performance metrics",
        sources: [
          { title: 'Data Analytics & Reporting', url: '/services' },
          { title: 'Contact Our Team', url: '/contact' }
        ]
      };
    }

    // G. Digital Marketing
    if (
      /\b(digital marketing|seo|search engine optimization|online presence|marketing support|content marketing)\b/i.test(q)
    ) {
      return {
        reply: "Velvora's **Digital Marketing Services** support organizations in enhancing their online presence, organic search visibility, and audience reach.\n\n" +
               "Key services include:\n" +
               "• Technical SEO auditing and structured metadata optimization\n" +
               "• Content marketing strategy and digital presence management\n" +
               "• Search engine visibility and readership growth support",
        sources: [
          { title: 'Digital Marketing Services', url: '/services' },
          { title: 'Contact Our Team', url: '/contact' }
        ]
      };
    }

    // H. Math & Equation Typesetting
    if (
      /\b(math|equation|latex|mathml|mathjax|stem|formulas|equation typesetting)\b/i.test(q)
    ) {
      return {
        reply: "Velvora specializes in **Math and Equation Typesetting** for STEM publications, journals, and university textbooks. We handle complex formulas using **LaTeX**, **MathML**, **MathJax**, and **AMS-TeX** with full screen-reader accessibility.",
        sources: [
          { title: 'Math & Equation Typesetting', url: '/services/math-and-equation-typesetting' }
        ]
      };
    }

    // I. OCR & Digitization
    if (
      /\b(ocr|digitization|scanning|legacy digitization|searchable pdf)\b/i.test(q)
    ) {
      return {
        reply: "Velvora's **OCR and Digitization Services** convert physical documents, historical books, and scanned materials into high-accuracy, searchable digital formats including searchable PDF, Word, and structured XML.",
        sources: [
          { title: 'OCR and Digitization', url: '/services/ocr-and-digitization' }
        ]
      };
    }

    // J. Captioning & Transcription
    if (
      /\b(captioning|transcription|audio description|subtitles|video accessibility)\b/i.test(q)
    ) {
      return {
        reply: "Velvora provides **Captioning, Transcription, and Audio Description Services** for educational, corporate, and broadcast multimedia, conforming with FCC, ADA, and WCAG multimedia accessibility standards.",
        sources: [
          { title: 'Captioning & Transcription', url: '/services/captioning-transcription-and-audio-description' }
        ]
      };
    }

    // -------------------------------------------------------------------------
    // 13. CAREERS, JOBS, INTERNSHIPS & RESUME SUBMISSION
    // -------------------------------------------------------------------------
    const isJobQuery = /\b(job|jobs|career|careers|vacancy|vacancies|hiring|opening|openings|intern|internship|internships|fresher|eligibility|requirements|apply|application|salary|stipend|recruitment|role|roles|position|positions)\b/i.test(q);

    if (isJobQuery) {
      const activeCareers = this.getCareers({ status: 'Active' });
      const closedCareers = this.store.careers.filter(c => c.status === 'Closed');

      // Asking how to apply / resume upload
      if (
        /\b(how to apply|how do i apply|how can i apply|submit.*resume|upload.*resume|application procedure|application process|where to apply|apply for a job|how to submit.*application)\b/i.test(q)
      ) {
        return {
          reply: "To apply for an open position or internship at Velvora Solutions:\n\n" +
                 "1. Visit our **Careers Portal**.\n" +
                 "2. Select your applied role from the list (or choose *General Open Application*).\n" +
                 "3. Fill in your details and upload your resume (supports PDF, DOC, and DOCX up to 10MB).\n" +
                 "4. Submit your application — our recruitment team will review your qualifications and respond within 24–48 hours.",
          sources: [
            { title: 'View Careers & Apply', url: '/careers' },
            { title: 'Contact Our Team', url: '/contact' }
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
          reply: `The **${closedMatch.title}** position is currently closed and not accepting new submissions. However, you can submit an open application on our Careers page so our team can reach out for future openings!`,
          sources: [
            { title: 'Submit Open Application', url: '/careers' }
          ]
        };
      }

      // Check for specific role, skill, or department in active careers
      const specificMatch = activeCareers.find(c =>
        q.includes(c.title.toLowerCase()) ||
        c.skills.some(s => q.includes(s.toLowerCase())) ||
        (c.department && q.includes(c.department.toLowerCase())) ||
        (q.includes('python') && c.skills.some(s => /python/i.test(s))) ||
        (q.includes('fastapi') && c.skills.some(s => /fastapi/i.test(s))) ||
        (q.includes('accessibility') && /accessibility/i.test(c.title)) ||
        (q.includes('typesetting') && /typesetting/i.test(c.title)) ||
        (q.includes('editing') && /editing/i.test(c.title))
      );

      if (specificMatch) {
        return {
          reply: `Yes! We currently have an active opening for **${specificMatch.title}** (${specificMatch.department}).\n\n` +
                 `• **Work Mode:** ${specificMatch.workMode} (${specificMatch.location})\n` +
                 `• **Experience:** ${specificMatch.experience}\n` +
                 `• **Key Skills:** ${specificMatch.skills.join(', ')}\n` +
                 `• **Eligibility:** ${specificMatch.eligibility}\n` +
                 `• **Summary:** ${specificMatch.summary}\n\n` +
                 `You can submit your application and upload your resume (PDF/DOCX up to 10MB) directly on our Careers portal.`,
          sources: [
            { title: `Apply for ${specificMatch.title}`, url: '/careers' },
            { title: 'View All Careers', url: '/careers' }
          ]
        };
      }

      // Asking specifically for internships
      if (/\b(intern|internship|internships|student|students|college)\b/i.test(q)) {
        const internships = activeCareers.filter(c => c.type.toLowerCase().includes('intern'));
        if (internships.length > 0) {
          const listText = internships.map(i =>
            `• **${i.title}** (${i.department})\n  - Work Mode: ${i.workMode}\n  - Eligibility: ${i.eligibility}\n  - Skills: ${i.skills.slice(0, 4).join(', ')}`
          ).join('\n\n');

          return {
            reply: `Here are our currently active **Internship Opportunities**:\n\n${listText}\n\n` +
                   `All internships provide real-world hands-on mentorship across global publishing and technology pipelines. You can apply directly through our Careers page.`,
            sources: [
              { title: 'Apply for Internships', url: '/careers' }
            ]
          };
        }
      }

      // General listing of active jobs
      if (activeCareers.length > 0) {
        const jobList = activeCareers.map(j =>
          `• **${j.title}** (${j.department}) — *${j.workMode} / ${j.type}*\n  Experience: ${j.experience} | Skills: ${j.skills.slice(0, 3).join(', ')}`
        ).join('\n\n');

        return {
          reply: `We currently have **${activeCareers.length} active positions and internships** open at Velvora Solutions:\n\n` +
                 `${jobList}\n\n` +
                 `We welcome applicants across diverse backgrounds. You can review full role details and submit your resume directly on our Careers page.`,
          sources: [
            { title: 'Explore Open Positions & Apply', url: '/careers' },
            { title: 'Contact Our Team', url: '/contact' }
          ]
        };
      } else {
        return {
          reply: "There are currently no active vacancies open at this moment. However, we accept open applications year-round! You can submit your resume on our Careers page, and our recruitment team will keep it on file for upcoming opportunities.",
          sources: [
            { title: 'Submit Open Application', url: '/careers' }
          ]
        };
      }
    }

    // -------------------------------------------------------------------------
    // 14. CONTACT INFORMATION & BUSINESS HOURS
    // -------------------------------------------------------------------------
    if (
      /\b(how to contact|how can i contact|contact information|contact details|email address|phone number|call you|phone|working hours|business hours|open hours)\b/i.test(q)
    ) {
      return {
        reply: "You can reach Velvora Solutions directly through our official communication channels:\n\n" +
               "• **Email:** info@velvorasolutions.com\n" +
               "• **Phone:** +91 9500834236\n" +
               "• **Office Hours:** Monday to Saturday: 9:00 AM – 6:30 PM IST\n\n" +
               "• **Cuddalore Office:** Pathirikuppam, Thiruvantthipuram Post, Cuddalore - 607002, TN\n" +
               "• **Chennai Office:** Porur, Chennai, TN",
        sources: [
          { title: 'Contact Our Team', url: '/contact' }
        ]
      };
    }

    // -------------------------------------------------------------------------
    // 15. UNSUPPORTED / OUT-OF-SCOPE SERVICE INQUIRIES (Zero Hallucination Guard)
    // -------------------------------------------------------------------------
    const outOfScopePatterns = [
      { regex: /\b(surgery|medical treatment|hospital|doctor|dentist|healthcare clinic|medicine)\b/i, category: 'medical or clinical' },
      { regex: /\b(hardware manufacturing|assemble hardware|pc assembly|manufacture chips|hardware production|manufacture computer hardware|manufacture hardware|manufacture.*hardware|computer hardware)\b/i, category: 'hardware manufacturing' },
      { regex: /\b(loan|loans|banking|mortgage|credit card|financial loans)\b/i, category: 'banking or loan' },
      { regex: /\b(legal counsel|court lawyer|attorney services|legal lawsuits)\b/i, category: 'legal advocacy' },
      { regex: /\b(flight booking|airline tickets|travel agency|hotel reservation)\b/i, category: 'travel booking' },
      { regex: /\b(automobile repair|car maintenance|mechanic services|vehicle repair)\b/i, category: 'automotive repair' }
    ];

    for (const pat of outOfScopePatterns) {
      if (pat.regex.test(q)) {
        return {
          reply: `Velvora Solutions specializes in digital accessibility, ePublishing, AI automation, software engineering, and data analytics. We do not provide ${pat.category} services. If you have an inquiry related to our digital and publishing solutions, our team would be pleased to assist you.`,
          sources: [
            { title: 'Explore Our Services', url: '/services' },
            { title: 'Contact Our Team', url: '/contact' }
          ]
        };
      }
    }

    // -------------------------------------------------------------------------
    // 16. PAGE-LEVEL SEMANTIC MATCHING (FALLBACK RETRIEVAL)
    // -------------------------------------------------------------------------
    let bestPage = null;
    let highestScore = 0;

    for (const page of this.store.pages) {
      let score = 0;
      for (const kw of page.keywords) {
        if (q.includes(kw)) score += 3;
      }
      for (const top of page.topics) {
        if (q.includes(top.toLowerCase())) score += 4;
      }
      if (q.includes(page.title.toLowerCase())) score += 5;
      if (score > highestScore) {
        highestScore = score;
        bestPage = page;
      }
    }

    if (bestPage && highestScore >= 4) {
      return {
        reply: `${bestPage.summary}\n\nKey areas covered:\n${bestPage.topics.map(t => `• ${t}`).join('\n')}`,
        sources: [
          { title: bestPage.title, url: bestPage.url },
          { title: 'Contact Our Team', url: '/contact' }
        ]
      };
    }

    // -------------------------------------------------------------------------
    // 17. HONEST UNCERTAINTY ACKNOWLEDGEMENT (Never Guess)
    // -------------------------------------------------------------------------
    return {
      reply: "I don't have verified information regarding that specific question in my knowledge base. Please reach out directly to our team at **info@velvorasolutions.com** or through our Contact page, and a specialist will be happy to assist you.",
      sources: [
        { title: 'Explore Our Services', url: '/services' },
        { title: 'Contact Our Team', url: '/contact' }
      ]
    };
  }
}

export const voraStore = new VoraKnowledgeStore();
export default voraStore;
