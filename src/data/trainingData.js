// Comprehensive Course & Internship Offerings for Velvora Solutions Academy
// "Transforming Knowledge into Skills and Skills into Opportunities."

export const trainingHero = {
  badge: 'Velvora Academy & Skill Development Lab',
  headingPrefix: 'Transforming Knowledge into Skills and',
  headingAccent: 'Skills into Opportunities.',
  subheading:
    'Hands-on, industry-standard training programs and real-world internships engineered by Velvora Solutions. Learn directly from practicing architects, work on live enterprise assets, and build high-demand career competencies across ePublishing, AI/ML, Generative AI, Data Analytics, Digital Accessibility, and Software Development.',
  stats: [
    { value: '2,000+', label: 'Training Hours Delivered' },
    { value: '100%', label: 'Live Project Experience' },
    { value: '8', label: 'Specialized Career Tracks' },
    { value: '2', label: 'Learning Centers (Cuddalore & Chennai)' }
  ]
};

export const trainingCategories = [
  { id: 'all', label: 'All Programs' },
  { id: 'ai-data', label: 'AI, GenAI & Data' },
  { id: 'publishing', label: 'Publishing & Accessibility' },
  { id: 'tech-growth', label: 'Software & Marketing' },
  { id: 'internship', label: 'Internship Program' }
];

export const trainingPrograms = [
  {
    id: 'epublishing-training',
    category: 'publishing',
    title: 'ePublishing Training',
    tag: 'Publishing & Formats',
    badge: 'Industry Standard',
    icon: 'BookOpen',
    duration: '4 to 8 Weeks',
    level: 'Beginner to Advanced',
    mode: 'Online Live / Classroom (Cuddalore & Chennai) / Hybrid',
    lead: 'Tight deadlines leave little room for rework. Velvora’s ePublishing training gives your team hands-on experience with industry-standard workflows, XML-based publishing, content conversion, and quality assurance. Build in-house expertise and streamline your publishing process from first file to final output.',
    whyChoose: 'Master the end-to-end publishing pipeline used by global academic presses and major publishing houses.',
    advancedTopics: [
      'Advanced EPUB 3 (fixed-layout, media overlays, MathML, SVG)',
      'JATS / BITS XML workflows & DTD validation',
      'XSLT & XPath transformations',
      'EPUBCheck validation & QA automation',
      'Accessible EPUB (EPUB Accessibility 1.1 conformance)',
      'Conversion automation with Python & regular expressions',
      'InDesign composition to reflowable digital assets'
    ],
    toolsLearned: ['JATS / BITS DTD', 'EPUBCheck', 'DAISY Ace', 'Oxygen XML', 'Python', 'Adobe InDesign'],
    careerRoles: ['ePublishing Specialist', 'XML Production Editor', 'Digital Typesetter', 'eBook QA Analyst']
  },
  {
    id: 'ai-ml-training',
    category: 'ai-data',
    title: 'AI/ML Training',
    tag: 'Artificial Intelligence & Machine Learning',
    badge: 'High Demand',
    icon: 'Cpu',
    duration: '6 to 12 Weeks',
    level: 'Intermediate to Advanced',
    mode: 'Online Live / Classroom / Hybrid',
    lead: 'AI is no longer optional in a data-driven world. Velvora’s AI/ML experts provide practical training that builds strong foundations in machine learning, from data preparation and model development to real-world applications, so you can put intelligent solutions to work.',
    whyChoose: 'Gain hands-on experience engineering cognitive models and predictive systems with production-grade datasets.',
    advancedTopics: [
      'Ensemble methods & gradient boosting (XGBoost, LightGBM)',
      'Feature engineering & dimensionality selection',
      'Model evaluation, hyperparameter tuning & cross-validation',
      'Deep learning architectures (CNN, RNN, Transformers)',
      'Natural Language Processing (NLP) & Computer Vision',
      'Model deployment pipelines, containerization & MLOps',
      'Intelligent Document Processing (IDP) integration'
    ],
    toolsLearned: ['Python', 'Scikit-Learn', 'PyTorch / TensorFlow', 'XGBoost', 'Hugging Face', 'Docker', 'FastAPI'],
    careerRoles: ['Machine Learning Engineer', 'AI Pipeline Developer', 'NLP Specialist', 'Data Scientist']
  },
  {
    id: 'generative-ai-training',
    category: 'ai-data',
    title: 'Generative AI Training',
    tag: 'Cutting-Edge AI & LLMs',
    badge: 'Next-Gen Technology',
    icon: 'Sparkles',
    duration: '4 to 8 Weeks',
    level: 'All Levels',
    mode: 'Online Live / Classroom / Hybrid',
    lead: 'Generative AI is changing how businesses create, automate and innovate. Our hands-on training helps teams understand GenAI technologies, write effective prompts, build AI-powered workflows and apply them to real business needs, while following industry best practices.',
    whyChoose: 'Move beyond simple chat prompts to engineering production autonomous AI agents and enterprise RAG systems.',
    advancedTopics: [
      'Structured reasoning prompts & advanced prompting techniques',
      'LLM APIs, function calling & fine-tuning concepts',
      'Retrieval-Augmented Generation (RAG) with vector databases',
      'AI autonomous agents & multi-step tool-use workflows',
      'Evaluation, safety guardrails & responsible AI practices',
      'Enterprise workflow automation & document synthesis'
    ],
    toolsLearned: ['LangChain / LlamaIndex', 'OpenAI / Gemini APIs', 'ChromaDB / Pinecone', 'Python', 'Ollama', 'Prompt Engineering'],
    careerRoles: ['Generative AI Engineer', 'AI Solutions Architect', 'Prompt Engineer', 'Automation Specialist']
  },
  {
    id: 'data-analytics-bi-training',
    category: 'ai-data',
    title: 'Data Analytics & Business Intelligence Training',
    tag: 'BI & Executive Telemetry',
    badge: 'Career Essential',
    icon: 'BarChart3',
    duration: '6 to 10 Weeks',
    level: 'Beginner to Advanced',
    mode: 'Online Live / Classroom / Hybrid',
    lead: 'Data creates value only when it informs a decision. Velvora’s data analytics training builds practical skills in visualization, reporting, business intelligence and analytical thinking, so professionals can turn raw data into clear insights and make smarter decisions.',
    whyChoose: 'Transform raw, disparate business numbers into executive-level interactive visual dashboards that drive ROI.',
    advancedTopics: [
      'Advanced Excel (Power Query, Power Pivot, dynamic arrays)',
      'Advanced SQL (window functions, CTEs, query optimization)',
      'Power BI data modelling, star schemas & complex DAX',
      'Row-level security (RLS) & enterprise governance',
      'Statistical analysis, correlation & trend forecasting',
      'Python for data analytics (Pandas, NumPy, Matplotlib, Seaborn)'
    ],
    toolsLearned: ['Power BI', 'Advanced SQL', 'Microsoft Excel', 'Python (Pandas)', 'Tableau Basics', 'ETL Pipelines'],
    careerRoles: ['Business Intelligence Analyst', 'Data Analyst', 'Reporting Specialist', 'Analytics Consultant']
  },
  {
    id: 'digital-marketing-training',
    category: 'tech-growth',
    title: 'Digital Marketing Training',
    tag: 'SEO & Performance Growth',
    badge: 'Growth Driven',
    icon: 'Megaphone',
    duration: '4 to 8 Weeks',
    level: 'Beginner to Intermediate',
    mode: 'Online Live / Classroom / Hybrid',
    lead: 'A strong online presence takes both skill and strategy. Our digital marketing experts offer hands-on training in SEO, social media, content marketing, email campaigns, PPC advertising and analytics, so you can plan, run and measure campaigns that make an impact.',
    whyChoose: 'Execute end-to-end data-backed campaigns with real advertising budgets, tracking real conversion ROI.',
    advancedTopics: [
      'Technical SEO, schema markup & Core Web Vitals optimization',
      'Advanced PPC search & display bidding strategies',
      'Marketing automation, email sequences & lead funnels',
      'Google Analytics 4 (GA4) setup & custom conversion tracking',
      'A/B testing methodologies & conversion rate optimization (CRO)',
      'Multi-touch attribution modelling & executive ROI analysis'
    ],
    toolsLearned: ['Google Analytics 4', 'Google Search Console', 'SEMrush / Ahrefs', 'Google Ads', 'Meta Ads Manager', 'Mailchimp'],
    careerRoles: ['SEO Specialist', 'Digital Marketing Manager', 'Performance Marketer', 'Content Strategist']
  },
  {
    id: 'digital-accessibility-training',
    category: 'publishing',
    title: 'Digital Accessibility Training',
    tag: 'Universal Inclusion & Compliance',
    badge: 'Global Compliance',
    icon: 'FileCheck2',
    duration: '4 to 8 Weeks',
    level: 'Beginner to Professional',
    mode: 'Online Live / Classroom / Hybrid',
    lead: 'Remediation fixes today’s files. Training helps your team create accessible content from the start. Velvora’s accessibility experts offer practical, role-based training and consulting that help organizations build in-house skills, reduce rework and meet their accessibility goals.',
    whyChoose: 'Prepare for IAAP CPACC certification while mastering hands-on document and web accessibility auditing.',
    advancedTopics: [
      'Advanced PDF remediation (tagging tree, PDF/UA ISO 14289)',
      'WCAG 2.2 (Level AA & AAA), Section 508 & EN 301 549 standards',
      'Remediating complex data tables, nested forms, infographics & MathML',
      'Assistive technology audit testing (JAWS, NVDA, VoiceOver, TalkBack)',
      'WAI-ARIA design patterns & accessible web components',
      'Accessibility audits, conformance scoring & ACR / VPAT reporting'
    ],
    toolsLearned: ['Adobe Acrobat Pro', 'PAC 2024 / PDF Accessibility Checker', 'NVDA', 'JAWS', 'Colour Contrast Analyser', 'Axe DevTools'],
    careerRoles: ['Accessibility Auditor', 'PDF Remediation Specialist', 'Digital Inclusion Consultant', 'VPAT / ACR Analyst']
  },
  {
    id: 'software-development-training',
    category: 'tech-growth',
    title: 'Software Development Training',
    tag: 'Full-Stack Modern Engineering',
    badge: 'Enterprise Architecture',
    icon: 'Code',
    duration: '8 to 14 Weeks',
    level: 'Beginner to Advanced',
    mode: 'Online Live / Classroom / Hybrid',
    lead: 'Technology moves quickly, and development teams need to keep pace. Velvora’s software development experts provide hands-on training in modern programming languages, frameworks, application development, testing and deployment, helping you build technical expertise and ship high-quality software.',
    whyChoose: 'Build resilient, production-ready full-stack applications with clean architectural patterns and modern CI/CD.',
    advancedTopics: [
      'Data structures, algorithms & space-time complexity',
      'Design patterns, SOLID principles & clean modular architecture',
      'REST APIs, microservices & authentication (JWT, OAuth 2.0)',
      'Advanced relational database design, indexing & ORM optimization',
      'Automated unit/integration testing & CI/CD deployment pipelines',
      'Cloud hosting, Docker containerization & production monitoring'
    ],
    toolsLearned: ['React.js', 'Node.js / Express', 'Python (FastAPI)', 'PostgreSQL / MongoDB', 'Git & GitHub', 'Docker', 'Linux'],
    careerRoles: ['Full-Stack Developer', 'Frontend Engineer', 'Backend API Developer', 'Software Engineer']
  },
  {
    id: 'internship-program',
    category: 'internship',
    title: 'Internship Program (Live Industry Projects)',
    tag: 'Career Accelerator & Mentorship',
    badge: '100% Live Projects · PPO Pathway',
    icon: 'GraduationCap',
    duration: '1 Month / 3 Months / 6 Months (Flexible)',
    level: 'Students & Recent Graduates',
    mode: 'Virtual / Remote or In-Person (Cuddalore & Chennai Centers) or Hybrid',
    lead: 'Real-world experience makes learning stick. Velvora’s internship program gives students and aspiring professionals the chance to work on live projects, learn from industry experts and build practical, career-focused skills across ePublishing, AI/ML, Generative AI, Data Analytics, Digital Marketing, Accessibility and Software Development.',
    whyChoose: 'Not just lectures—you will write code, remediate real client assets, structure XML schemas, and build portfolio capstones.',
    isFeatured: true,
    internshipSpecs: {
      whoItsFor: 'College students (B.E, B.Tech, BCA, MCA, B.Sc, M.Sc, Arts, Science, Diploma) and aspiring professionals seeking real enterprise experience.',
      eligibility: 'Enrolled students (any year) or fresh graduates with foundational computer literacy, enthusiasm to learn, and commitment to project timelines.',
      duration: 'Flexible 1 Month (Fast-Track), 3 Months (Standard Project), or 6 Months (Comprehensive Capstone). Available Full-Time or Part-Time.',
      liveProjectExposure: 'Yes — 100% Guaranteed Live Production Project Exposure with direct feedback from senior team leads.',
      perks: [
        '1-on-1 Mentorship from practicing industry specialists',
        'Real production client datasets and real publishing pipelines',
        'Official Velvora Solutions Certificate of Internship Completion',
        'Letter of Recommendation & Performance Appraisal',
        'Pre-Placement Offer (PPO) opportunities for outstanding performers under the G.R.O.W. Framework'
      ]
    },
    advancedTopics: [
      'Live sprint planning & agile team collaboration',
      'Git version control & professional code review workflows',
      'Real-world client deliverable standards & SLA adherence',
      'Quality assurance verification & dual-layer auditing',
      'Resume refinement, LinkedIn optimization & mock technical interviews'
    ],
    toolsLearned: ['Git / GitHub', 'Enterprise Project Management', 'Domain-Specific Tools', 'Production QA Checkers'],
    careerRoles: ['Publishing Intern', 'Accessibility QA Intern', 'AI/ML Intern', 'Junior Web Developer', 'Associate Analyst']
  }
];

export const learningRoadmap = [
  {
    step: '01',
    title: 'Interactive Foundations & Tooling',
    desc: 'Master the core concepts, development environments, standards, and practical toolkits with live instructor-led guidance.'
  },
  {
    step: '02',
    title: 'Real-World Production Scenarios',
    desc: 'Work directly on simulated and actual client-grade assets, applying industry schemas, compliance guidelines, and code architectures.'
  },
  {
    step: '03',
    title: '1-on-1 Mentorship & Capstone Defense',
    desc: 'Receive detailed code and deliverable reviews from senior architects. Defend your capstone project before an expert evaluation panel.'
  },
  {
    step: '04',
    title: 'Certification & Career Launch',
    desc: 'Earn your verified Velvora Solutions credential, receive interview coaching, and access direct hiring/PPO opportunities.'
  }
];

export const trainingFaqs = [
  {
    q: 'Can college students apply for the internship program while attending classes?',
    a: 'Yes! We offer flexible part-time and virtual remote schedules so students can gain real project experience alongside their college coursework without attendance conflicts.'
  },
  {
    q: 'Do I receive an official certificate after completing the training or internship?',
    a: 'Yes, every graduate receives an official, verifiable Certificate of Completion from Velvora Solutions detailing the track, project title, tools mastered, and hours completed. Outstanding interns also receive a formal Letter of Recommendation.'
  },
  {
    q: 'Are the training sessions conducted online or in person?',
    a: 'We support all three modes: Online Virtual Live Interactive sessions, In-Person Classroom sessions at our Cuddalore (Head Office) and Chennai (Porur Branch) centers, or a Hybrid model.'
  },
  {
    q: 'Is there a placement guarantee or Pre-Placement Offer (PPO) opportunity?',
    a: 'While we focus on career-focused practical skills, high-performing interns and trainees are regularly evaluated for full-time job openings at Velvora Solutions under our G.R.O.W. Framework.'
  },
  {
    q: 'What are the prerequisites for AI/ML and Software Development training?',
    a: 'Basic familiarity with computer science fundamentals or any programming language is helpful. Our mentors begin with foundational concepts before moving into advanced algorithms and real-world architectures.'
  }
];

