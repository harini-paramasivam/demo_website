import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, '..', 'data', 'vora-knowledge.json');

// Default initial state
const defaultStore = {
  syncMetadata: {
    version: '1.2.0',
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
      responsibilities: [
        'Review and refine content for accuracy, clarity, and consistency.',
        'Ensure adherence to publishing standards and client style guides (APA, Chicago, MLA).',
        'Collaborate with content, design, and accessibility teams.'
      ],
      requirements: [
        'Strong command of English grammar, syntax, and publishing style guides.',
        'Experience in academic, technical, or corporate editing.',
        'Exceptional attention to detail and ability to meet project deadlines.'
      ],
      status: 'Active',
      applyUrl: '/careers',
      updatedAt: new Date().toISOString()
    },
    {
      id: 'ppt-accessibility-specialist',
      title: 'PPT Accessibility Specialist',
      department: 'Digital Accessibility',
      type: 'Full-Time / Hybrid',
      location: 'Cuddalore, TN / Hybrid',
      workMode: 'Hybrid',
      experience: '1+ years document accessibility remediation',
      skills: ['PowerPoint', 'WCAG 2.2', 'PDF/UA', 'Section 508', 'JAWS', 'NVDA', 'Alt Text'],
      eligibility: 'Proficiency in MS PowerPoint, accessibility guidelines (WCAG, Section 508), and screen reader testing.',
      summary: 'Remediate PowerPoint presentations to conform to WCAG 2.2, PDF/UA, and Section 508 standards.',
      responsibilities: [
        'Remediate PowerPoint files to meet accessibility standards (WCAG 2.2, Section 508).',
        'Add meaningful alt text, proper reading order in selection panes, and accessible slide formatting.',
        'Collaborate with clients and internal teams to deliver fully inclusive presentation decks.'
      ],
      requirements: [
        'Knowledge of accessibility guidelines (WCAG, Section 508) and assistive technologies (JAWS, NVDA).',
        'Hands-on experience with accessible document remediation and slide design.',
        'Strong communication, problem-solving skills, and empathy for diverse users.'
      ],
      status: 'Active',
      applyUrl: '/careers',
      updatedAt: new Date().toISOString()
    },
    {
      id: 'typesetting-specialist',
      title: 'Typesetting Specialist',
      department: 'Publishing Production',
      type: 'Full-Time / Hybrid',
      location: 'Cuddalore, TN / Hybrid',
      workMode: 'Hybrid',
      experience: '1-4 years typesetting experience',
      skills: ['InDesign', 'LaTeX', 'MathML', 'EPUB 3', 'JATS XML', 'Typography Grid Design'],
      eligibility: 'Demonstrated experience in InDesign, LaTeX, MathML, or XML publishing production.',
      summary: 'Format and design manuscripts, journals, and books for print and multi-format digital publishing.',
      responsibilities: [
        'Format and design manuscripts, journals, and books for digital and print publishing.',
        'Apply consistent styles, layouts, and templates across large volumes of complex content.',
        'Ensure compliance with publishing standards (EPUB 3, JATS/BITS XML, PDF).'
      ],
      requirements: [
        'Hands-on experience with typesetting tools (InDesign, LaTeX, MathML, or XML workflows).',
        'Strong eye for typography, layout design, grid structure, and detail.',
        'Ability to manage multiple concurrent titles and meet delivery schedules.'
      ],
      status: 'Active',
      applyUrl: '/careers',
      updatedAt: new Date().toISOString()
    },
    {
      id: 'ai-automation-engineer',
      title: 'AI & Automation Engineer',
      department: 'Engineering & Innovation',
      type: 'Full-Time / Hybrid',
      location: 'Cuddalore, TN / Hybrid',
      workMode: 'Hybrid / Remote',
      experience: 'Fresher / 1-2 years experience',
      skills: ['Python', 'FastAPI', 'NLP', 'LLMs', 'Document Processing', 'Automated QA', 'REST APIs'],
      eligibility: 'Degree in Computer Science, Data Science, or related field with solid Python programming and automation skills.',
      summary: 'Build intelligent workflow pipelines using Python, NLP, and modern LLMs to accelerate content publishing.',
      responsibilities: [
        'Architect AI pipelines that parse, remediate, and validate complex publication manuscripts.',
        'Develop automated quality gates for XML and EPUB conversion pipelines.',
        'Collaborate across cross-disciplinary teams to integrate generative AI safely and accurately.'
      ],
      requirements: [
        'Proficiency with Python, API integration, and machine learning/NLP concepts.',
        'Interest in accessibility standards and automated document processing.',
        'Strong problem-solving and proactive debugging abilities.'
      ],
      status: 'Active',
      applyUrl: '/careers',
      updatedAt: new Date().toISOString()
    },
    {
      id: 'digital-publishing-xml-intern',
      title: 'Digital Publishing & XML Intern',
      department: 'Publishing Production',
      type: 'Internship',
      location: 'Cuddalore / Remote',
      workMode: 'Remote',
      experience: 'Fresher / College Students',
      skills: ['HTML', 'XML Basics', 'Content Structuring', 'Proofreading', 'Curiosity to learn'],
      eligibility: 'Students or recent graduates in Computer Science, Literature, or Media Studies looking for hands-on publishing tech experience.',
      summary: '3-6 months paid internship learning production XML structuring, EPUB standards, and digital editorial pipelines.',
      responsibilities: [
        'Assist production teams with XML tag validation and structuring.',
        'Learn EPUB 3 transformation workflows and quality checks.',
        'Participate in editorial QA rounds for university and enterprise clients.'
      ],
      requirements: [
        'Keen interest in digital publishing and semantic structure.',
        'Good English communication skills and enthusiasm to learn new tools.'
      ],
      status: 'Active',
      applyUrl: '/careers',
      updatedAt: new Date().toISOString()
    },
    {
      id: 'accessibility-qa-intern',
      title: 'Accessibility Auditing & QA Intern',
      department: 'Digital Accessibility',
      type: 'Internship',
      location: 'Cuddalore / Remote',
      workMode: 'Remote',
      experience: 'Fresher / Final Year Students',
      skills: ['WCAG Guidelines', 'Screen Reader Testing', 'Alt-Text Drafting', 'Detail Focus'],
      eligibility: 'Passionate about digital inclusion, assistive technologies, and Web Accessibility Guidelines (WCAG).',
      summary: 'Gain certified training in assistive tech testing (NVDA, JAWS) and PDF/UA remediation.',
      responsibilities: [
        'Learn automated and manual accessibility audit tools.',
        'Draft descriptive alternative text for educational and enterprise diagrams.',
        'Assist specialists in verifying Section 508 and WCAG compliance.'
      ],
      requirements: [
        'Empathy for users with disabilities.',
        'Strong analytical mindset and willingness to master accessibility tools.'
      ],
      status: 'Active',
      applyUrl: '/careers',
      updatedAt: new Date().toISOString()
    }
  ],
  pages: [],
  faqs: [
    {
      q: 'What does Velvora Solutions do?',
      a: 'Velvora Solutions is a content and technology partner delivering ePublishing, XML transformation, digital accessibility (WCAG 2.2 & PDF/UA), AI automation pipelines, web development, data analytics, and digital marketing.',
      url: '/about/company-overview'
    },
    {
      q: 'Who leads Velvora Solutions?',
      a: 'Velvora Solutions is founded and led by Iyshwariya Senthil (Founder & Managing Director). She brings 7+ years of executive leadership in digital publishing operations, universal design, and WCAG accessibility standards.',
      url: '/about/our-team'
    },
    {
      q: 'Where are Velvora offices located?',
      a: 'Velvora has offices in Cuddalore (Pathirikuppam, Thiruvantthipuram Post) and Chennai (Porur), Tamil Nadu, India. Office hours are Monday to Saturday, 9:00 AM – 6:30 PM.',
      url: '/contact'
    },
    {
      q: 'How do I apply for jobs or internships at Velvora?',
      a: 'You can view all current active openings and submit your application with a resume (PDF, DOC, DOCX up to 10MB) directly on our official Careers page. Applications are reviewed within 24–48 hours.',
      url: '/careers'
    },
    {
      q: 'What file formats and limits are accepted for job applications?',
      a: 'We accept PDF, DOC, and DOCX formats up to 10MB. Please ensure your contact details and applied position are clearly specified.',
      url: '/careers'
    },
    {
      q: 'What accessibility standards do you comply with?',
      a: 'We test and remediate digital publications, PDFs, PowerPoint decks, and web portals to achieve 100% conformance with WCAG 2.2 (Level AA/AAA), PDF/UA (ISO 14289), Section 508, and the European Accessibility Act (EAA).',
      url: '/services/digital-accessibility'
    }
  ]
};

// Ingest static website pages
function generatePagesKnowledge() {
  return [
    {
      id: 'home',
      title: 'Velvora Solutions — Home',
      url: '/',
      category: 'company',
      summary: 'Velvora Solutions is a content and technology partner from manuscript to millions of readers. Combining ePublishing, XML, digital accessibility, AI automation, software engineering, and data analytics.',
      topics: ['ePublishing', 'XML', 'Digital Accessibility', 'AI Automation', 'Software Engineering', 'Data Analytics', 'Digital Marketing'],
      keywords: ['home', 'velvora', 'overview', 'about', 'services', 'solutions', 'mission', 'clients', 'publishing'],
      versionId: 'v-2026-11-09-01',
      lastUpdated: new Date().toISOString()
    },
    {
      id: 'company-overview',
      title: 'Company Overview & Mission',
      url: '/about/company-overview',
      category: 'company',
      summary: 'At Velvora Solutions, we believe that content is only as powerful as its accessibility and clarity. Our mission is to bridge editorial craft with digital precision to make publications universally usable.',
      topics: ['Mission', 'Vision', 'Core Values', 'Global Clients', 'Standards & Ethics'],
      keywords: ['about', 'company', 'mission', 'history', 'overview', 'values', 'governance'],
      versionId: 'v-2026-11-09-01',
      lastUpdated: new Date().toISOString()
    },
    {
      id: 'our-team',
      title: 'Our Leadership & Team',
      url: '/about/our-team',
      category: 'company',
      summary: 'Guided by Iyshwariya Senthil (Founder & Managing Director, 7+ years of experience in universal design & publishing operations). Our multidisciplinary specialists span editorial, XML architectures, accessibility testing, and cloud development.',
      topics: ['Leadership', 'Iyshwariya Senthil', 'Specialists', 'Editorial Team', 'Accessibility Testers'],
      keywords: ['team', 'leadership', 'founder', 'managing director', 'iyshwariya', 'senthil', 'executives', 'people'],
      versionId: 'v-2026-11-09-01',
      lastUpdated: new Date().toISOString()
    },
    {
      id: 'careers',
      title: 'Careers at Velvora Solutions',
      url: '/careers',
      category: 'career',
      summary: 'Build skills, create impact, and shape the future at Velvora. We offer full-time positions and paid internships with equal opportunity, mentoring, G.R.O.W.T.H. framework, and inclusive workplace culture.',
      topics: ['Job Openings', 'Internships', 'G.R.O.W.T.H. Framework', 'Diversity & Inclusion', 'Application Form', 'Resume Upload'],
      keywords: ['careers', 'jobs', 'vacancies', 'hiring', 'internships', 'fresher', 'apply', 'work', 'culture', 'openings', 'resume'],
      versionId: 'v-2026-11-09-01',
      lastUpdated: new Date().toISOString()
    },
    {
      id: 'service-epublishing',
      title: 'ePublishing Services',
      url: '/services/epublishing',
      category: 'service',
      summary: 'End-to-end ePublishing from raw manuscript to reflowable and fixed-layout EPUB 3, EPUB 2, interactive eBooks, accessibility tagging, and multi-format delivery for global bookstores (Apple Books, Amazon Kindle, Kobo).',
      topics: ['EPUB 3', 'Fixed Layout', 'Reflowable eBooks', 'Enhanced Interactive', 'Kindle KPF/MOBI', 'Multi-device QA'],
      keywords: ['epublishing', 'epub', 'ebook', 'kindle', 'manuscript', 'publishing', 'books', 'conversion'],
      versionId: 'v-2026-11-09-01',
      lastUpdated: new Date().toISOString()
    },
    {
      id: 'service-xml',
      title: 'XML Services & Conversion',
      url: '/services/xml',
      category: 'service',
      summary: 'Industry-standard structured XML services: JATS 1.3, BITS 2.1, DocBook, TEI, and custom DTD/Schema conversion. Ensuring long-term preservation, rapid cross-media publishing, and semantic discovery.',
      topics: ['JATS XML', 'BITS XML', 'DocBook', 'TEI', 'DTD Schema Design', 'Automated Schematron QA'],
      keywords: ['xml', 'jats', 'bits', 'dtd', 'schema', 'structuring', 'conversion', 'journals', 'nlm'],
      versionId: 'v-2026-11-09-01',
      lastUpdated: new Date().toISOString()
    },
    {
      id: 'service-digital-accessibility',
      title: 'Digital Accessibility Services',
      url: '/services/digital-accessibility',
      category: 'service',
      summary: 'Complete accessibility audits, remediation, and certification. Conforming with WCAG 2.2 AA/AAA, PDF/UA (ISO 14289), Section 508, and EAA. Tested with real assistive technologies (JAWS, NVDA, VoiceOver, TalkBack).',
      topics: ['WCAG 2.2', 'PDF/UA Remediation', 'PowerPoint & Word Accessibility', 'Screen Reader QA', 'VPAT Conformance', 'Audio Description'],
      keywords: ['accessibility', 'accessible', 'wcag', 'pdf/ua', 'section 508', 'screen reader', 'jaws', 'nvda', 'vpat', 'audit', 'remediation'],
      versionId: 'v-2026-11-09-01',
      lastUpdated: new Date().toISOString()
    },
    {
      id: 'service-typesetting-and-design',
      title: 'Typesetting and Design Services',
      url: '/services/typesetting-and-design',
      category: 'service',
      summary: 'High-end layout, composition, and book design for trade, academic, and complex multilingual publications. Mastering Adobe InDesign, QuarkXPress, and automated template-driven composition.',
      topics: ['InDesign Typesetting', 'Multilingual Composition', 'Cover & Interior Design', 'Grid Systems', 'Print & Digital PDF'],
      keywords: ['typesetting', 'design', 'indesign', 'layout', 'composition', 'typography', 'book design'],
      versionId: 'v-2026-11-09-01',
      lastUpdated: new Date().toISOString()
    },
    {
      id: 'service-math-and-equation-typesetting',
      title: 'Math and Equation Typesetting',
      url: '/services/math-and-equation-typesetting',
      category: 'service',
      summary: 'Specialized STEM composition handling complex mathematical, statistical, and chemical notation using LaTeX, MathML, MathJax, and AMS-TeX, fully compliant with digital accessibility and screen readers.',
      topics: ['LaTeX', 'MathML', 'ChemDraw', 'Equations', 'STEM Journals', 'Accessible Math'],
      keywords: ['math', 'equation', 'latex', 'mathml', 'stem', 'science', 'chemistry', 'formulas'],
      versionId: 'v-2026-11-09-01',
      lastUpdated: new Date().toISOString()
    },
    {
      id: 'service-metadata-indexing-and-taxonomy',
      title: 'Metadata, Indexing and Taxonomy',
      url: '/services/metadata-indexing-and-taxonomy',
      category: 'service',
      summary: 'Subject indexing, back-of-the-book indexes, hierarchical taxonomy development, DOI/Crossref registration, and ONIX 3.0 metadata feeds to maximize content discoverability and sales telemetry.',
      topics: ['Subject Indexing', 'Taxonomy', 'ONIX 3.0', 'DOI Crossref', 'Thesaurus Structuring'],
      keywords: ['metadata', 'indexing', 'taxonomy', 'onix', 'discovery', 'doi', 'thesaurus', 'search'],
      versionId: 'v-2026-11-09-01',
      lastUpdated: new Date().toISOString()
    },
    {
      id: 'service-ocr-and-digitization',
      title: 'OCR and Digitization Services',
      url: '/services/ocr-and-digitization',
      category: 'service',
      summary: 'High-accuracy optical character recognition (OCR) and archival digitization for legacy books, brittle paper manuscripts, rare historical documents, and multi-language archives with 99.995% character accuracy.',
      topics: ['Archival Scanning', 'High-Accuracy OCR', 'Legacy Digitization', 'Double-Keying', 'Searchable PDF/A'],
      keywords: ['ocr', 'digitization', 'scanning', 'archives', 'legacy', 'historical', 'double keying'],
      versionId: 'v-2026-11-09-01',
      lastUpdated: new Date().toISOString()
    },
    {
      id: 'service-captioning-transcription',
      title: 'Captioning, Transcription and Audio Description',
      url: '/services/captioning-transcription-and-audio-description',
      category: 'service',
      summary: 'Accurate closed captioning (CC), subtitles in 20+ languages, verbatim transcripts, and synthesized/human audio description tracks for video and podcast media meeting FCC and WCAG multimedia rules.',
      topics: ['Closed Captioning', 'Audio Description', 'SRT / VTT / DFXP', 'Multilingual Subtitling', 'Verbatim Transcription'],
      keywords: ['captioning', 'subtitles', 'transcription', 'audio description', 'video', 'podcasts', 'media'],
      versionId: 'v-2026-11-09-01',
      lastUpdated: new Date().toISOString()
    },
    {
      id: 'service-accessibility-training',
      title: 'Accessibility Training and Consulting',
      url: '/services/accessibility-training-and-consulting',
      category: 'service',
      summary: 'Empower your internal editorial and engineering teams with tailored accessibility workshops, VPAT assessments, policy drafting, and executive digital inclusion roadmaps.',
      topics: ['Corporate Workshops', 'VPAT Assessments', 'WCAG Roadmaps', 'Inclusive Design Coaching'],
      keywords: ['training', 'consulting', 'workshops', 'vpat', 'compliance', 'corporate coaching'],
      versionId: 'v-2026-11-09-01',
      lastUpdated: new Date().toISOString()
    },
    {
      id: 'solutions-overview',
      title: 'Industry Solutions',
      url: '/solutions',
      category: 'solution',
      summary: 'Tailored content and workflow engineering for Academic & Higher Ed, STM Publishers, EdTech Innovators, Global Enterprises, Legal & Regulatory bodies, and Trade Publishers.',
      topics: ['Higher Education', 'STM Publishers', 'EdTech', 'Global Enterprises', 'Legal & Regulatory', 'Trade Publishing'],
      keywords: ['solutions', 'industries', 'academic', 'stm', 'edtech', 'enterprises', 'legal', 'publishers'],
      versionId: 'v-2026-11-09-01',
      lastUpdated: new Date().toISOString()
    },
    {
      id: 'contact',
      title: 'Contact Velvora Solutions',
      url: '/contact',
      category: 'contact',
      summary: 'Get in touch with our team for project quotes, audits, and partnership discussions. Offices in Cuddalore and Chennai Porur. Email: info@velvorasolutions.com, Phone: +91 9500834236.',
      topics: ['Project Enquiry', 'Offices', 'Cuddalore', 'Chennai', 'Email', 'Phone', 'Consultation'],
      keywords: ['contact', 'email', 'phone', 'address', 'offices', 'location', 'reach out', 'quote', 'support', 'hours'],
      versionId: 'v-2026-11-09-01',
      lastUpdated: new Date().toISOString()
    },
    {
      id: 'privacy-policy',
      title: 'Privacy Policy',
      url: '/privacy-policy',
      category: 'policy',
      summary: 'Velvora Solutions strictly protects visitor privacy, client project data, and job application resumes. Data is never shared or sold to third parties.',
      topics: ['Data Confidentiality', 'Applicant Privacy', 'GDPR & DPDP Compliance', 'Cookies & Analytics'],
      keywords: ['privacy', 'policy', 'confidentiality', 'data', 'security', 'gdpr', 'terms'],
      versionId: 'v-2026-11-09-01',
      lastUpdated: new Date().toISOString()
    }
  ];
}

class VoraKnowledgeStore {
  constructor() {
    this.store = null;
    this.init();
  }

  init() {
    try {
      if (fs.existsSync(DATA_FILE)) {
        const raw = fs.readFileSync(DATA_FILE, 'utf-8');
        this.store = JSON.parse(raw);
      } else {
        this.store = {
          ...defaultStore,
          pages: generatePagesKnowledge()
        };
        this.store.syncMetadata.indexedCount = this.store.pages.length + this.store.careers.length;
        this.persist();
      }
    } catch (err) {
      console.error('Error loading Vora Knowledge Store:', err.message);
      this.store = {
        ...defaultStore,
        pages: generatePagesKnowledge()
      };
    }
  }

  persist() {
    try {
      const dir = path.dirname(DATA_FILE);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(DATA_FILE, JSON.stringify(this.store, null, 2), 'utf-8');
      return true;
    } catch (err) {
      console.error('Failed to write vora-knowledge.json:', err.message);
      return false;
    }
  }

  // Synchronize / Re-index website content
  syncAll() {
    try {
      const freshPages = generatePagesKnowledge();
      this.store.pages = freshPages;
      this.store.syncMetadata.status = 'Completed';
      this.store.syncMetadata.lastSynchronized = new Date().toISOString();
      this.store.syncMetadata.version = `1.${Date.now().toString().slice(-4)}`;
      this.store.syncMetadata.indexedCount = this.store.pages.length + this.store.careers.length;
      this.persist();
      return { success: true, metadata: this.store.syncMetadata };
    } catch (err) {
      this.store.syncMetadata.status = 'Failed';
      this.store.syncMetadata.errorLogs.push({
        time: new Date().toISOString(),
        error: err.message
      });
      this.persist();
      return { success: false, error: err.message };
    }
  }

  getMetadata() {
    return this.store.syncMetadata;
  }

  getCareers(filter = {}) {
    let list = [...this.store.careers];
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

  addCareer(item) {
    const newId = item.id || item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const record = {
      ...item,
      id: newId,
      status: item.status || 'Active',
      applyUrl: '/careers',
      updatedAt: new Date().toISOString()
    };
    this.store.careers.unshift(record);
    this.store.syncMetadata.lastSynchronized = new Date().toISOString();
    this.store.syncMetadata.indexedCount = this.store.pages.length + this.store.careers.length;
    this.persist();
    return record;
  }

  updateCareer(id, updates) {
    const idx = this.store.careers.findIndex(c => c.id === id);
    if (idx === -1) return null;
    this.store.careers[idx] = {
      ...this.store.careers[idx],
      ...updates,
      updatedAt: new Date().toISOString()
    };
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

  // Core semantic scoring and answering algorithm
  answerQuery(userQuery) {
    const q = (userQuery || '').trim().toLowerCase();
    if (!q) {
      return {
        reply: "Hi there! I'm VORA, your Velvora Assistant. How can I help you today? You can ask about our ePublishing & XML services, accessibility audits, current job openings, or internships!",
        sources: [
          { title: 'Explore Services', url: '/services' },
          { title: 'Career Openings', url: '/careers' },
          { title: 'Contact Us', url: '/contact' }
        ]
      };
    }

    // 1. RECRUITMENT / CAREERS / JOBS / INTERNSHIPS (Strict Authority)
    const isJobQuery = /\b(job|jobs|career|careers|vacancy|vacancies|hiring|opening|openings|open|intern|internship|internships|fresher|eligibility|requirements|apply|application|salary|stipend|recruitment|role|roles|position|positions|specialist|engineer|developer)\b/i.test(q);

    if (isJobQuery) {
      const activeCareers = this.getCareers({ status: 'Active' });
      const closedCareers = this.store.careers.filter(c => c.status === 'Closed');

      // Asking how to apply / resume upload
      if (/\b(how to apply|how do i apply|submit resume|upload resume|application process|where to apply)\b/i.test(q)) {
        return {
          reply: `To apply for any position or internship at Velvora Solutions:\n\n` +
                 `1. Visit our **[Careers Portal](/careers)**.\n` +
                 `2. Select your applied role from the list (or choose *General Open Application*).\n` +
                 `3. Upload your resume document (supports PDF, DOC, and DOCX up to 10MB).\n` +
                 `4. Submit the form — our talent team will review your application and respond within 24–48 hours.`,
          sources: [
            { title: 'Submit Resume on Careers Portal', url: '/careers' },
            { title: 'Contact Talent Team', url: '/contact' }
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

      // Check for specific role, skill, or keyword in active careers
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
            { title: 'View All Openings', url: '/careers' }
          ]
        };
      }

      // Asking for internships
      if (/\b(intern|internship|internships|student|college)\b/i.test(q)) {
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
            { title: 'Contact Us', url: '/contact' }
          ]
        };
      } else {
        return {
          reply: `There are currently no active vacancies open at this moment. However, we accept open applications year-round! You can submit your resume on our Careers page, and our recruitment team will keep it on file for upcoming opportunities.`,
          sources: [
            { title: 'Submit Open Application', url: '/careers' }
          ]
        };
      }
    }

    // 2. CHECK SPECIFIC SERVICES
    if (/\b(accessibility|wcag|pdf\/ua|section 508|vpat|screen reader|jaws|nvda)\b/i.test(q)) {
      return {
        reply: `Velvora Solutions provides complete **Digital Accessibility Services** conforming with **WCAG 2.2 (Level AA/AAA)**, **PDF/UA (ISO 14289)**, and **Section 508**.\n\n` +
               `Our services include:\n` +
               `• Comprehensive audits & VPAT assessments\n` +
               `• Document & PDF/UA remediation\n` +
               `• PowerPoint, Word, and EPUB accessibility\n` +
               `• Real assistive technology verification with JAWS, NVDA, and VoiceOver\n` +
               `• Inclusive design training for enterprise teams`,
        sources: [
          { title: 'Digital Accessibility Services', url: '/services/digital-accessibility' },
          { title: 'Accessibility Statement', url: '/accessibility-statement' },
          { title: 'Contact for Audit', url: '/contact' }
        ]
      };
    }

    if (/\b(epublishing|epub|ebook|kindle|manuscript|typesetting|indesign)\b/i.test(q)) {
      return {
        reply: `Velvora’s **ePublishing & Typesetting Services** transform raw manuscripts into refined, multi-format digital experiences:\n\n` +
               `• Reflowable and Fixed-Layout **EPUB 3 / EPUB 2**\n` +
               `• Interactive eBooks with audio & read-aloud sync\n` +
               `• Multi-device QA for Apple Books, Amazon Kindle, and Kobo\n` +
               `• InDesign typesetting, grid layout, and multilingual typography`,
        sources: [
          { title: 'ePublishing Services', url: '/services/epublishing' },
          { title: 'Typesetting & Design', url: '/services/typesetting-and-design' }
        ]
      };
    }

    if (/\b(xml|jats|bits|dtd|schema|docbook|tei)\b/i.test(q)) {
      return {
        reply: `Our **XML Services** convert complex content into structured, future-proof formats including **JATS 1.3**, **BITS 2.1**, **DocBook**, and **TEI**.\n\n` +
               `We provide automated validation with Schematron, multi-channel syndication, and DTD/Schema customization for academic publishers and research institutions.`,
        sources: [
          { title: 'XML Services & Standards', url: '/services/xml' },
          { title: 'Get in Touch', url: '/contact' }
        ]
      };
    }

    if (/\b(math|equation|latex|mathml|stem|formulas)\b/i.test(q)) {
      return {
        reply: `We specialize in **Math and Equation Typesetting** for STEM publications, journals, and university textbooks. We handle complex formulas using **LaTeX**, **MathML**, **MathJax**, and **AMS-TeX** with 100% accessible screen-reader compliance.`,
        sources: [
          { title: 'Math & Equation Typesetting', url: '/services/math-and-equation-typesetting' }
        ]
      };
    }

    // 3. COMPANY LEADERSHIP, OFFICES, CONTACT
    if (/\b(leader|leadership|founder|managing director|ceo|iyshwariya|senthil|who leads|who run|who runs|who founded)\b/i.test(q)) {
      return {
        reply: `Velvora Solutions is founded and led by **Iyshwariya Senthil** (Founder & Managing Director).\n\n` +
               `With over 7 years of executive experience in universal design, digital publishing workflows, and WCAG accessibility standards, she guides Velvora’s strategic vision of uniting technology with human dedication.`,
        sources: [
          { title: 'Meet Our Leadership & Team', url: '/about/our-team' },
          { title: 'Company Overview', url: '/about/company-overview' }
        ]
      };
    }

    if (/\b(office|address|location|cuddalore|chennai|porur|phone|hours|contact)\b/i.test(q)) {
      return {
        reply: `You can reach Velvora Solutions through our direct offices and channels:\n\n` +
               `• **Cuddalore Office:** Pathirikuppam, Thiruvantthipuram Post, Cuddalore, TN\n` +
               `• **Chennai Office:** Porur, Chennai, TN\n` +
               `• **Email:** [info@velvorasolutions.com](mailto:info@velvorasolutions.com)\n` +
               `• **Phone:** +91 9500834236\n` +
               `• **Office Hours:** Monday to Saturday: 9:00 AM – 6:30 PM IST`,
        sources: [
          { title: 'Contact Us & Send Message', url: '/contact' },
          { title: 'About Us', url: '/about/company-overview' }
        ]
      };
    }

    // 4. GENERAL SEMANTIC KEYWORD MATCHING AGAINST ALL PAGES
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

    if (bestPage && highestScore >= 3) {
      return {
        reply: `${bestPage.summary}\n\nKey areas covered:\n${bestPage.topics.map(t => `• ${t}`).join('\n')}`,
        sources: [
          { title: bestPage.title, url: bestPage.url },
          { title: 'Contact Velvora Team', url: '/contact' }
        ]
      };
    }

    // Fallback response with helpful links
    return {
      reply: `At Velvora Solutions, we specialize in **ePublishing, structured XML, digital accessibility (WCAG 2.2 / PDF/UA), AI workflows, and software engineering**.\n\n` +
             `Could you please clarify your question, or select one of the helpful sections below?`,
      sources: [
        { title: 'Services Overview', url: '/services' },
        { title: 'Industry Solutions', url: '/solutions' },
        { title: 'Career Openings', url: '/careers' },
        { title: 'Contact Us', url: '/contact' }
      ]
    };
  }
}

export const voraStore = new VoraKnowledgeStore();
export default voraStore;
