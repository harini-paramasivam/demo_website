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
    id: 'internship-program',
    category: 'internship',
    title: 'Internship Program (Live Industry Projects)',
    tag: 'Career Accelerator & Mentorship',
    badge: '100% Live Projects · PPO Pathway',
    icon: 'GraduationCap',
    duration: '1 Month / 3 Months / 6 Months (Flexible)',
    level: 'Students & Recent Graduates',
    mode: 'Virtual / Remote or In-Person (Cuddalore & Chennai Centers) or Hybrid',
    lead: 'Real-world experience makes learning stick. Velvora’s flagship internship gives students and aspiring professionals the opportunity to work directly on live production projects, learn from seasoned architects, and build a verified portfolio across ePublishing, AI/ML, Data Analytics, Digital Accessibility, or Software Development.',
    whyChoose: 'Not just passive lectures—you will write production code, remediate real client assets, structure XML schemas, build AI models, and defend a verifiable capstone project.',
    isFeatured: true,
    internshipSpecs: {
      whoItsFor: 'College students (B.E, B.Tech, BCA, MCA, B.Sc, M.Sc, Arts, Science, Diploma) and aspiring tech graduates seeking real enterprise credentials.',
      eligibility: 'Enrolled students (any year) or fresh graduates with foundational computer literacy, enthusiasm to learn, and commitment to project timelines.',
      duration: 'Flexible 1 Month (Fast-Track), 3 Months (Standard Certification Track), or 6 Months (Comprehensive Capstone). Available Full-Time or Part-Time.',
      liveProjectExposure: 'Yes — 100% Guaranteed Live Production Project Exposure with direct feedback from senior team leads.',
      perks: [
        '1-on-1 Mentorship from practicing industry tech leads',
        'Direct access to production client datasets and publishing pipelines',
        'Official Velvora Solutions Certificate of Internship Completion with QR verification',
        'Letter of Recommendation & Performance Appraisal for top performers',
        'Pre-Placement Offer (PPO) opportunities for full-time roles under our G.R.O.W. Framework'
      ]
    },
    heroDescription:
      'The Velvora Internship Program bridges the gap between collegiate academia and the demands of modern enterprise technology. Interns are embedded directly into active engineering and publishing sprints under the direct supervision of senior architects in our Cuddalore Head Office, Chennai Branch, or interactive Virtual Live rooms.',
    modules: [
      {
        moduleNumber: '01',
        title: 'Enterprise Onboarding & Tooling Setup',
        duration: 'Week 1',
        overview: 'Familiarization with enterprise dev environments, Git collaboration workflows, agile sprint rituals, and domain fundamentals.',
        topics: [
          'Professional Git workflows: branching, PR reviews, and merge conflicts',
          'Enterprise IDE configuration (VS Code, Oxygen XML, Jupyter, Acrobat Pro)',
          'Agile sprint methodologies and ticketing systems',
          'Data confidentiality, security standards, and production SLAs'
        ]
      },
      {
        moduleNumber: '02',
        title: 'Core Domain Immersion & Guided Labs',
        duration: 'Weeks 2–4',
        overview: 'Deep dive into your chosen specialization (AI/ML, ePublishing, Accessibility, Software Dev, or Data Analytics) through structured labs.',
        topics: [
          'Hands-on architectural tutorials led by domain specialists',
          'Simulated production sprints with real-time error debugging',
          'Dual-layer quality assurance and compliance auditing',
          'Code review feedback and performance optimization'
        ]
      },
      {
        moduleNumber: '03',
        title: 'Live Client Deliverable Execution',
        duration: 'Weeks 5–8',
        overview: 'Full immersion in live production workflows. Interns handle assigned modules of real deliverables under mentor oversight.',
        topics: [
          'Direct asset processing: XML conversion, PDF remediation, or ML training pipelines',
          'Cross-functional team synchronization and daily standups',
          'Adherence to global quality metrics (WCAG 2.2, EPUBCheck, ISO 14289, PEP 8)',
          'Iterative refinement based on client QA defect logs'
        ]
      },
      {
        moduleNumber: '04',
        title: 'Capstone Defense, Certification & PPO Evaluation',
        duration: 'Weeks 9–12',
        overview: 'Formal presentation of your end-to-end capstone project to our Technical Review Board, followed by appraisal and hiring evaluation.',
        topics: [
          'Comprehensive capstone project packaging and documentation',
          'Technical presentation and oral defense before senior engineering leads',
          'Resume and LinkedIn optimization showcasing live project deliverables',
          'Formal appraisal review and Pre-Placement Offer (PPO) interview round'
        ]
      }
    ],
    liveProject: {
      title: 'Enterprise Capstone Project: End-to-End Production Deliverable',
      scope: 'Interns deliver an end-to-end production module tailored to their selected track—such as converting a 500-page academic journal to EPUB 3/JATS XML, remediating a complex government PDF to PDF/UA standards, or training and deploying an intelligent NLP extraction microservice.',
      deliverables: [
        'Production-ready code repository or validated publication bundle',
        'Comprehensive technical report and QA conformance log',
        'Interactive live demonstration during Capstone Defense Day',
        'Verified portfolio entry backed by Velvora Solutions appraisal'
      ],
      evaluation: 'Evaluated by a 3-member Senior Architect panel against production SLAs, code hygiene, compliance accuracy, and technical articulation.'
    },
    toolsLearned: ['Git & GitHub', 'VS Code / Oxygen XML', 'Acrobat Pro / PAC 2024', 'Python / React', 'Power BI / SQL', 'Enterprise Project Board'],
    careerRoles: ['Publishing Intern', 'Accessibility QA Intern', 'AI/ML Intern', 'Junior Web Developer', 'Associate Data Analyst'],
    prerequisites: 'Open to enrolled college students (any discipline) and recent graduates with basic computer literacy and strong desire to learn.',
    targetAudience: 'Pre-final and final year B.E/B.Tech, BCA, MCA, B.Sc/M.Sc students seeking accredited internships and high-growth tech careers.',
    certification: 'Official Velvora Solutions Certificate of Internship Completion with secure digital verification QR code, hours transcript, and Letter of Recommendation.',
    programFaqs: [
            {
                  "q": "Can college students balance this internship with regular college classes?",
                  "a": "Yes! We provide flexible virtual remote schedules and weekend review slots tailored specifically for enrolled college students so it never conflicts with college attendance."
            },
            {
                  "q": "Is there a stipend or Pre-Placement Offer (PPO)?",
                  "a": "High-performing interns who complete their milestones with distinction are actively evaluated for Pre-Placement Offers (PPO) and permanent entry-level hiring at Velvora Solutions."
            },
            {
                  "q": "Can I choose my domain for the internship?",
                  "a": "Absolutely. You can select your focus track: ePublishing, AI/ML, Generative AI, Data Analytics, Digital Accessibility, Software Development, or Digital Marketing during enrollment."
            },
            {
                  "q": "Will my college accept this internship for academic credits?",
                  "a": "Yes. We issue formal Offer Letters, Weekly Attendance Logs, Mid-Term Progress Reports, and Final Completion Certificates formatted to meet university academic credit requirements."
            },
            {
                  "q": "What kind of projects do interns work on during the program?",
                  "a": "Interns contribute directly to real client deliverables: live XML tagging, accessible document remediation, production dashboard engineering, or NLP model pipelines under senior mentor guidance."
            }
      ]
  },
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
    lead: 'Tight deadlines leave zero room for rework. Velvora’s ePublishing training gives trainees hands-on mastery of industry-standard workflows, XML-based publishing, content conversion, EPUB 3 architecture, and automated QA used by global publishing houses.',
    whyChoose: 'Master the end-to-end publishing pipeline used by global academic presses, STM journals, and leading eBook platforms.',
    heroDescription:
      'Digital publishing requires rigorous structural discipline, precise semantic tagging, and absolute conformance with international standards like IDPF EPUB 3, NLM/JATS, BITS, and MathML. In this intensive program, you learn to transform raw manuscripts, InDesign layouts, and scanned books into commercial-grade digital publications ready for Amazon Kindle, Apple Books, and institutional repositories.',
    modules: [
      {
        moduleNumber: '01',
        title: 'Publishing Fundamentals & Modern Digital Formats',
        duration: 'Week 1',
        overview: 'Introduction to digital typography, reflowable vs fixed layout eBooks, document architecture, and semantic styling.',
        topics: [
          'History and evolution of publishing: from print prepress to multi-channel digital',
          'Reflowable EPUB vs Fixed Layout (FXL) for graphic-heavy works',
          'EPUB 3 package structure: OPF package, NCX, NAV, XHTML content documents',
          'Character encoding, UTF-8, CSS3 styling rules for eReaders'
        ]
      },
      {
        moduleNumber: '02',
        title: 'XML Workflows, JATS / BITS DTD & XSLT',
        duration: 'Weeks 2–3',
        overview: 'Deep dive into structured academic publishing schemas, journal article tag sets (JATS), book interchange tag sets (BITS), and transformations.',
        topics: [
          'XML syntax, well-formedness, DTDs, and XML Schema validation',
          'JATS 1.3 XML tagging: front matter, body elements, back matter, citations',
          'BITS tagging for academic textbooks and reference volumes',
          'XSLT and XPath foundations for automated batch conversions',
          'Oxygen XML Editor tips, shortcuts, and batch validation workflows'
        ]
      },
      {
        moduleNumber: '03',
        title: 'MathML, SVG & Advanced EPUB 3 Features',
        duration: 'Weeks 4–5',
        overview: 'Master complex mathematical typography, interactive vector graphics, media overlays, and embedded fonts in digital books.',
        topics: [
          'MathML markup for scientific, technical, and medical (STM) formulas',
          'Scalable Vector Graphics (SVG) integration and responsive scaling',
          'Synchronized Media Overlays (SMIL) for read-aloud audio eBooks',
          'InDesign to EPUB 3 export pipelines and CSS post-processing'
        ]
      },
      {
        moduleNumber: '04',
        title: 'EPUB Accessibility 1.1 Conformance & Automated QA',
        duration: 'Weeks 6–8',
        overview: 'Ensure every digital publication passes EPUBCheck, DAISY Ace, and meets global EPUB Accessibility 1.1 standards.',
        topics: [
          'DAISY Ace accessibility auditor and automated reporting',
          'Structural semantics: epub:type, ARIA role attributes, and reading progression',
          'Alternative text authoring for complex charts, diagrams, and formulas',
          'EPUBCheck validation, debugging fatal parsing errors, and final certification'
        ]
      }
    ],
    liveProject: {
      title: 'Full-Cycle Academic Journal & Multi-Format eBook Conversion',
      scope: 'Trainees receive a 250-page unformatted academic manuscript with complex tables, MathML formulas, and footnotes. The objective is to convert and validate it into publication-ready JATS XML and an accessible EPUB 3 eBook that achieves a zero-error score on EPUBCheck and Ace by DAISY.',
      deliverables: [
        'Fully validated JATS 1.3 XML file with complete metadata',
        'Reflowable EPUB 3 package passing EPUBCheck 5.1 with 100% compliance',
        'DAISY Ace accessibility audit report with zero critical violations',
        'Custom XSLT transformation script for batch content mapping'
      ],
      evaluation: 'Automated compliance pass (EPUBCheck + Ace) followed by a manual visual inspection on Kindle Previewer, Apple Books, and Thorium Reader.'
    },
    toolsLearned: ['JATS / BITS DTD', 'EPUBCheck', 'DAISY Ace', 'Oxygen XML Editor', 'Adobe InDesign', 'Python (XML Automation)', 'Sigil / Calibre'],
    careerRoles: ['ePublishing Specialist', 'XML Production Editor', 'Digital Typesetter', 'eBook QA Analyst', 'Digital Conversion Lead'],
    prerequisites: 'Familiarity with HTML/CSS and basic word processing is helpful; no prior XML experience is required.',
    targetAudience: 'Content production professionals, copyeditors, typesetting operators, and graduates looking to break into global publishing houses.',
    certification: 'Velvora Certified ePublishing Specialist credential with verification badge.',
    programFaqs: [
            {
                  "q": "Do I need a computer science degree to learn ePublishing?",
                  "a": "Not at all. ePublishing is a specialized blend of editorial structure, typography, and clean markup (HTML/XML/CSS). Candidates from Arts, Science, and Engineering succeed equally well."
            },
            {
                  "q": "Are global publishing houses hiring ePublishing specialists in India?",
                  "a": "Yes. Major global publishers like Springer Nature, Elsevier, Taylor & Francis, Wiley, and Pearson run massive content conversion and QA centers in Chennai, Bengaluru, and across India."
            },
            {
                  "q": "Is software like Oxygen XML and InDesign provided during training?",
                  "a": "Yes. In our Cuddalore and Chennai labs, workstations are fully equipped with licensed enterprise tools. Virtual students receive trial setups and guided cloud lab access."
            },
            {
                  "q": "Does this course cover EPUB Accessibility 1.1 standards?",
                  "a": "Yes. You will learn DAISY Ace validation, MathML integration, structural semantic inflection, and accessible pagination directly conforming to European Accessibility Act requirements."
            },
            {
                  "q": "What job roles can I apply for after completing this training?",
                  "a": "Graduates qualify for roles like ePub Developer, XML Production Specialist, Digital Content Executive, Editorial Quality Analyst, and Typesetting Specialist."
            }
      ]
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
    lead: 'AI is no longer optional in a data-driven enterprise. Velvora’s AI/ML training builds practical capabilities in machine learning, feature engineering, neural network architectures, and production model deployment so you can engineer cognitive solutions that work.',
    whyChoose: 'Gain hands-on experience engineering cognitive models and predictive systems with production-grade datasets.',
    heroDescription:
      'Learn how to move machine learning models from Jupyter notebook prototypes into robust, containerized production APIs. This program focuses on mathematical intuition, real-world data pipelines, modern deep learning architectures, Natural Language Processing (NLP), and Computer Vision.',
    modules: [
      {
        moduleNumber: '01',
        title: 'Python for Data Science & Mathematical Foundations',
        duration: 'Weeks 1–2',
        overview: 'Core programming, linear algebra, multivariate calculus, probability distributions, NumPy, and Pandas data wrangling.',
        topics: [
          'Vectorized operations and linear algebra with NumPy',
          'High-performance data cleaning and wrangling with Pandas',
          'Exploratory data analysis (EDA) and data visualization with Seaborn',
          'Probability distributions, hypothesis testing, and statistical significance'
        ]
      },
      {
        moduleNumber: '02',
        title: 'Classical Machine Learning & Feature Engineering',
        duration: 'Weeks 3–5',
        overview: 'Supervised and unsupervised learning algorithms, ensemble techniques, bias-variance tradeoff, and cross-validation.',
        topics: [
          'Linear & Logistic Regression with regularizations (L1/L2 Lasso & Ridge)',
          'Decision Trees, Random Forests, and Gradient Boosting (XGBoost, LightGBM)',
          'Unsupervised clustering: K-Means, DBSCAN, and PCA dimensionality reduction',
          'Feature encoding, scaling pipelines, and handling imbalanced datasets (SMOTE)'
        ]
      },
      {
        moduleNumber: '03',
        title: 'Deep Learning & Neural Architectures with PyTorch',
        duration: 'Weeks 6–8',
        overview: 'Feedforward neural networks, backpropagation, CNNs for computer vision, and RNNs/LSTMs for sequential data.',
        topics: [
          'Building neural networks from scratch and understanding backpropagation',
          'PyTorch tensors, autograd, and training loops',
          'Convolutional Neural Networks (CNNs) for image classification and OCR',
          'Recurrent Neural Networks (RNN/LSTM) and sequence-to-sequence modeling'
        ]
      },
      {
        moduleNumber: '04',
        title: 'NLP, Intelligent Document Processing & MLOps Deployment',
        duration: 'Weeks 9–12',
        overview: 'Hugging Face transformers, text tokenization, named entity recognition (NER), FastAPI model serving, Docker, and CI/CD.',
        topics: [
          'Tokenization, embeddings, and Transformer self-attention mechanisms',
          'Named Entity Recognition (NER) and Intelligent Document Processing (IDP)',
          'Serving ML models via high-throughput FastAPI REST microservices',
          'Docker containerization, model latency profiling, and cloud deployment'
        ]
      }
    ],
    liveProject: {
      title: 'Cognitive Document Intelligence & Automated Information Extraction Pipeline',
      scope: 'Build an end-to-end machine learning system that ingests messy scanned documents, runs computer vision OCR to detect text blocks, classifies document categories, and extracts critical entities (e.g. author, DOI, invoice amount, dates) using a fine-tuned Hugging Face transformer model served via Dockerized FastAPI.',
      deliverables: [
        'Complete Python codebase structured with modular pipelines and unit tests',
        'Trained PyTorch / Scikit-Learn model weights with benchmark metrics',
        'FastAPI backend service with Swagger documentation',
        'Docker container configuration ready for cloud deployment'
      ],
      evaluation: 'Assessed on model precision, recall, F1 score, API latency (<200ms per request), and code cleanliness.'
    },
    toolsLearned: ['Python', 'Scikit-Learn', 'PyTorch', 'XGBoost', 'Hugging Face', 'FastAPI', 'Docker', 'Pandas & NumPy'],
    careerRoles: ['Machine Learning Engineer', 'AI Pipeline Developer', 'NLP Specialist', 'Data Scientist', 'MLOps Engineer'],
    prerequisites: 'Basic knowledge of Python or any programming language; familiarity with high school mathematics.',
    targetAudience: 'Software developers, data analysts, STEM graduates, and engineers looking to specialize in applied machine learning.',
    certification: 'Velvora Certified Applied AI/ML Engineer credential with verifiable repository appraisal.',
    programFaqs: [
            {
                  "q": "Do I need an advanced mathematics or Ph.D background for this course?",
                  "a": "No. We teach the necessary linear algebra, calculus, and probability through intuitive geometric visualizations and practical Python implementations."
            },
            {
                  "q": "Do we use PyTorch or TensorFlow?",
                  "a": "We focus primarily on PyTorch, which is the dominant framework in modern industry and research, while also covering Scikit-Learn for classical tabular workflows."
            },
            {
                  "q": "Are GPU computing environments provided?",
                  "a": "Yes. Trainees are guided in using Google Colab Pro, Kaggle GPU clusters, and our in-house lab workstations for training deep learning models."
            },
            {
                  "q": "What real-world projects will I build during the training?",
                  "a": "You will build real-world models: a customer churn predictor, an NLP document classification transformer, a convolutional computer vision model, and a FastAPI containerized inference service."
            },
            {
                  "q": "Does this program cover MLOps and cloud deployment?",
                  "a": "Yes. We cover Docker containerization, REST API model serving with FastAPI, and automated CI/CD deployment pipelines on modern cloud environments."
            }
      ]
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
    lead: 'Generative AI is transforming how businesses create, automate, and innovate. Our hands-on training helps engineers understand LLM architectures, craft structured prompts, construct Retrieval-Augmented Generation (RAG) pipelines, and deploy autonomous multi-agent systems.',
    whyChoose: 'Move far beyond simple ChatGPT chat prompts to engineering production autonomous AI agents and enterprise vector RAG systems.',
    heroDescription:
      'The modern enterprise does not need people who merely ask questions to a chat box—it needs engineers who can build software with Large Language Models. In this course, you master LLM APIs, function calling, vector database embeddings, Retrieval-Augmented Generation (RAG), and multi-agent coordination using LangChain and LlamaIndex.',
    modules: [
      {
        moduleNumber: '01',
        title: 'LLM Foundations & Advanced Prompt Engineering',
        duration: 'Week 1',
        overview: 'Tokenization, context windows, temperature, hallucinations, zero-shot/few-shot prompting, and structured output formatting.',
        topics: [
          'How LLMs work: transformer architectures, tokens, attention, and probability distributions',
          'Prompt engineering paradigms: Chain-of-Thought (CoT), Tree-of-Thoughts, ReAct',
          'Guaranteed structured JSON generation using schema enforcement and Pydantic',
          'Prompt injection risks, jailbreak defenses, and safety guardrails'
        ]
      },
      {
        moduleNumber: '02',
        title: 'OpenAI, Gemini & Open-Source LLMs (Ollama)',
        duration: 'Weeks 2–3',
        overview: 'API integration, function calling, tool use, running local models with Ollama, and cost-latency tradeoffs.',
        topics: [
          'OpenAI API and Google Gemini API integration in Python',
          'Function calling / Tool use: empowering LLMs to query databases and invoke APIs',
          'Running private, cost-free open models locally via Ollama (Llama 3, Mistral, Qwen)',
          'Benchmarking token usage, latency optimization, and streaming responses'
        ]
      },
      {
        moduleNumber: '03',
        title: 'Vector Databases & Enterprise RAG Architectures',
        duration: 'Weeks 4–5',
        overview: 'Dense vector embeddings, chunking strategies, vector databases (ChromaDB, Pinecone), hybrid search, and semantic retrieval.',
        topics: [
          'Text embedding models (OpenAI text-embedding-3, BGE, HuggingFace embeddings)',
          'Intelligent document chunking strategies (semantic, recursive, markdown-aware)',
          'Vector database indexing and querying with ChromaDB and Pinecone',
          'Building end-to-end RAG pipelines with LangChain and LlamaIndex',
          'Mitigating hallucinations via rerankers and contextual retrieval verification'
        ]
      },
      {
        moduleNumber: '04',
        title: 'Autonomous AI Agents & Multi-Agent Swarms',
        duration: 'Weeks 6–8',
        overview: 'Designing autonomous agents that plan, reason, invoke tools, browse the web, and collaborate to achieve complex objectives.',
        topics: [
          'Agentic design patterns: Reflection, Tool Use, Planning, and Multi-Agent Collaboration',
          'Building agents with LangGraph and CrewAI',
          'Integrating web search, code execution sandboxes, and enterprise databases',
          'Evaluation frameworks (RAGAS) and enterprise deployment monitoring'
        ]
      }
    ],
    liveProject: {
      title: 'Enterprise Multi-Source Knowledge Assistant with Hybrid RAG & Verification',
      scope: 'Build an enterprise AI assistant capable of ingesting hundreds of internal PDFs, Word documents, and API docs. The assistant performs hybrid vector/BM25 retrieval, synthesizes answers with exact citation page numbers, verifies its own answers against source documents, and provides an interactive web chat UI.',
      deliverables: [
        'Complete Python RAG pipeline with LangChain/LlamaIndex and ChromaDB',
        'Document ingestion and chunking parser for PDF and Markdown files',
        'Clean Streamlit / React chat interface with streaming responses and citation badges',
        'RAGAS evaluation report measuring context relevancy, faithfullness, and answer correctness'
      ],
      evaluation: 'Evaluated on hallucination rate (<2%), citation accuracy (100%), and sub-second retrieval performance.'
    },
    toolsLearned: ['LangChain / LangGraph', 'LlamaIndex', 'OpenAI & Gemini APIs', 'ChromaDB / Pinecone', 'Ollama (Local LLMs)', 'Streamlit / FastAPI', 'RAGAS'],
    careerRoles: ['Generative AI Engineer', 'AI Solutions Architect', 'Prompt Engineer', 'LLM Application Developer', 'Automation Specialist'],
    prerequisites: 'Basic Python programming skills. No prior deep learning experience required.',
    targetAudience: 'Software developers, product engineers, system architects, and tech enthusiasts eager to lead the GenAI wave.',
    certification: 'Velvora Certified Generative AI Architect credential with live project repository verification.',
    programFaqs: [
            {
                  "q": "Do I need expensive GPU hardware to run the code in this course?",
                  "a": "No. You will interact with cloud LLM APIs (OpenAI, Gemini) and run lightweight quantized models (Llama 3 8B) on standard laptops via Ollama, plus free Google Colab."
            },
            {
                  "q": "What is the difference between Prompt Engineering and Fine-Tuning?",
                  "a": "We explain when to use in-context prompting, RAG (Retrieval-Augmented Generation), and parameter-efficient fine-tuning (PEFT/LoRA), and practice all three with real datasets."
            },
            {
                  "q": "Will we learn how to build autonomous AI agents?",
                  "a": "Yes. A major section of the curriculum is dedicated to LangChain, LangGraph, and multi-agent coordination frameworks that can search tools, query databases, and execute multi-step workflows."
            },
            {
                  "q": "How do you handle enterprise data privacy with Generative AI?",
                  "a": "We cover enterprise security architectures: local private LLM hosting, vector database access controls, input/output guardrails, and data anonymization pipelines."
            },
            {
                  "q": "What capstone project will I complete by graduation?",
                  "a": "You will engineer a full-stack Enterprise RAG Assistant with citation telemetry, hybrid semantic vector search, and a conversational React frontend."
            }
      ]
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
    lead: 'Data creates value only when it drives a confident decision. Velvora’s data analytics training builds hands-on capabilities in data modeling, advanced SQL, Power BI executive dashboards, DAX calculations, and Python data storytelling.',
    whyChoose: 'Transform raw, disparate business numbers into executive-level interactive visual dashboards that drive tangible ROI.',
    heroDescription:
      'Organizations around the globe are overwhelmed with raw data but starved for actionable insights. In this comprehensive program, you master the end-to-end data analytics lifecycle: querying relational databases with advanced SQL, building star-schema data models, authoring complex DAX measures, and designing stunning executive dashboards in Microsoft Power BI.',
    modules: [
      {
        moduleNumber: '01',
        title: 'Advanced Excel & Analytical Thinking',
        duration: 'Weeks 1–2',
        overview: 'Master dynamic array formulas, XLOOKUP, Power Query ETL transformations, Power Pivot, and data modeling in Excel.',
        topics: [
          'Advanced data manipulation: XLOOKUP, INDEX/MATCH, dynamic arrays, LAMBDA functions',
          'Power Query for automated extraction, transformation, and loading (ETL)',
          'Building relational models in Power Pivot with relationships and calculated columns',
          'Executive KPI summary tables, conditional formatting, and interactive slicers'
        ]
      },
      {
        moduleNumber: '02',
        title: 'Mastering SQL for Business Analytics',
        duration: 'Weeks 3–4',
        overview: 'Write complex analytical queries, multi-table joins, subqueries, Common Table Expressions (CTEs), and window functions.',
        topics: [
          'Database normalization, schemas, and relational integrity',
          'Multi-table INNER, LEFT, RIGHT, and FULL OUTER joins with business logic',
          'Aggregations with GROUP BY, HAVING, and conditional CASE WHEN expressions',
          'Window functions: ROW_NUMBER, RANK, DENSE_RANK, LEAD, LAG, and running totals',
          'Common Table Expressions (CTEs) and recursive queries for cohort analysis'
        ]
      },
      {
        moduleNumber: '03',
        title: 'Power BI: Dimensional Modeling & Advanced DAX',
        duration: 'Weeks 5–7',
        overview: 'Star schema architecture, fact vs dimension tables, DAX measures, time-intelligence calculations, and row-level security (RLS).',
        topics: [
          'Star schema and snowflake dimensional data modeling best practices',
          'Understanding row context vs filter context in DAX',
          'Mastering CALCULATE, FILTER, ALL, ALLEXCEPT, and iterator functions (SUMX, AVERAGEX)',
          'Time intelligence: Year-to-Date (YTD), Year-over-Year (YoY) growth, trailing 12 months',
          'Enterprise governance, Row-Level Security (RLS), and workspace publishing'
        ]
      },
      {
        moduleNumber: '04',
        title: 'Python for Analytics & Executive Storytelling',
        duration: 'Weeks 8–10',
        overview: 'Exploratory data analysis with Pandas, statistical hypothesis testing, data visualization, and presenting to C-suite leadership.',
        topics: [
          'Data analysis and aggregation with Python Pandas and NumPy',
          'Correlation analysis, outlier detection, and trend forecasting',
          'Data visualization with Seaborn and Plotly interactive charts',
          'Storytelling with data: building structured executive presentations and business case memos'
        ]
      }
    ],
    liveProject: {
      title: 'Global Retail & Supply Chain Executive Intelligence Dashboard',
      scope: 'Trainees are provided with a multi-million row transactional database spanning sales, inventory, logistics, and customer churn. You will design an end-to-end Power BI report with 4 dedicated pages (Executive Overview, Regional Sales, Customer Retention, Inventory Optimization) utilizing advanced DAX measures and custom drill-through navigation.',
      deliverables: [
        'Optimized Power BI report (.pbix) with verified star-schema model',
        'Repository of analytical SQL scripts answering 15 critical business questions',
        'Executive summary presentation deck highlighting strategic cost savings',
        'Interactive web-published portfolio dashboard'
      ],
      evaluation: 'Assessed on model query speed, DAX measure efficiency, visual hierarchy, and actionable business insights.'
    },
    toolsLearned: ['Microsoft Power BI', 'Advanced SQL (PostgreSQL/MySQL)', 'Microsoft Excel (Power Query/Pivot)', 'Python (Pandas, Seaborn)', 'Tableau Fundamentals', 'DAX Studio'],
    careerRoles: ['Business Intelligence Analyst', 'Data Analyst', 'Reporting Specialist', 'Analytics Consultant', 'Financial Data Analyst'],
    prerequisites: 'Basic numerical literacy and enthusiasm for problem-solving; no coding background required.',
    targetAudience: 'Graduates in commerce, business, science, engineering, or professionals wanting to transition into high-paying analytics careers.',
    certification: 'Velvora Certified Business Intelligence Analyst credential with verified dashboard portfolio.',
    programFaqs: [
            {
                  "q": "Is coding in Python mandatory to become a Data Analyst?",
                  "a": "No. SQL, Excel, and Power BI alone unlock the vast majority of enterprise data analyst openings. Python is taught as an optional superpower for data wrangling and automation."
            },
            {
                  "q": "Does this course prepare me for the Microsoft PL-300 Power BI Data Analyst certification?",
                  "a": "Yes. Our curriculum aligns closely with Microsoft’s official PL-300 exam objectives, giving you full confidence to clear the certification."
            },
            {
                  "q": "Can non-engineering students succeed in this field?",
                  "a": "Absolutely. Business intelligence values domain logic, communication, and clear thinking above all else. Commerce, Arts, and Science graduates thrive in this domain."
            },
            {
                  "q": "Will I learn complex DAX formulas and star-schema data modeling?",
                  "a": "Yes, extensively. We dedicate multiple weeks to DAX calculated columns, measures, time-intelligence functions, and dimensional star/snowflake schema modeling."
            },
            {
                  "q": "What portfolio assets will I have upon graduation?",
                  "a": "You will finish with an interactive portfolio of 4 executive dashboards (Sales, Financial Performance, HR Analytics, and Logistics) hosted live on Power BI Service."
            }
      ]
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
    lead: 'Remediation fixes today’s files. Training empowers your team to create universally accessible content from the start. Velvora’s accessibility specialists deliver role-based training in WCAG 2.2, PDF/UA (ISO 14289), screen reader auditing, and VPAT / ACR authoring.',
    whyChoose: 'Prepare for IAAP CPACC certification while mastering hands-on document and web accessibility auditing on live client assets.',
    heroDescription:
      'With the European Accessibility Act (EAA), US Section 508, ADA Title II, and global digital inclusion mandates, accessibility is legally mandated worldwide. This program provides deep technical mastery of WCAG 2.2 Level A, AA, and AAA standards, the PDF/UA ISO 14289 standard, assistive technology testing (JAWS, NVDA, VoiceOver), and accessibility compliance auditing.',
    modules: [
      {
        moduleNumber: '01',
        title: 'Disability Types, Legal Frameworks & WCAG 2.2 Core Principles',
        duration: 'Week 1',
        overview: 'Understand sensory, motor, and cognitive disabilities, assistive technologies, ADA, Section 508, EAA, and the POUR principles.',
        topics: [
          'Categories of disability: visual, auditory, motor, speech, and cognitive',
          'Assistive technology landscape: screen readers, screen magnifiers, switch devices, refreshable braille',
          'Global legal mandates: Americans with Disabilities Act (ADA), Section 508, EN 301 549, European Accessibility Act',
          'WCAG 2.2 framework: Perceivable, Operable, Understandable, Robust (POUR) with Level A, AA, AAA criteria'
        ]
      },
      {
        moduleNumber: '02',
        title: 'Mastering PDF/UA & Document Remediation in Adobe Acrobat Pro',
        duration: 'Weeks 2–4',
        overview: 'Tagging trees, reading order, complex data tables, form fields, infographics, and mathematical formulas.',
        topics: [
          'The PDF logical structure tree: tags, content containers, and artifacting decorative elements',
          'Remediating complex data tables: row/column headers, id/headers associations, multi-level spans',
          'Accessible digital forms: tooltip labels, tab order, focus indicators, error announcements',
          'Alternative text authoring for complex STEM infographics, charts, and diagrams',
          'PAC 2024 (PDF Accessibility Checker) validation and ISO 14289-1 conformance'
        ]
      },
      {
        moduleNumber: '03',
        title: 'Web Accessibility & WAI-ARIA Design Patterns',
        duration: 'Weeks 5–6',
        overview: 'Semantic HTML5, keyboard navigation, color contrast ratios, focus traps, and WAI-ARIA widget roles.',
        topics: [
          'Semantic HTML elements vs generic div/span misuse',
          'Keyboard accessibility: tabindex, focus traps, skip navigation links, visible focus outlines',
          'Color contrast calculation (4.5:1 text, 3:1 non-text) with Colour Contrast Analyser (CCA)',
          'WAI-ARIA roles, states, and properties: dialogs, tabs, accordions, comboboxes, and alerts',
          'Automated browser auditing with Axe DevTools, Lighthouse, and WAVE'
        ]
      },
      {
        moduleNumber: '04',
        title: 'Assistive Tech Testing, Auditing & VPAT / ACR Reporting',
        duration: 'Weeks 7–8',
        overview: 'Manual screen reader testing with NVDA and JAWS, creating conformance audit reports, and authoring VPATs.',
        topics: [
          'Manual keyboard testing protocols and shortcut masterclasses',
          'Screen reader audit testing using NVDA (Windows) and VoiceOver (macOS/iOS)',
          'Documenting accessibility defects: severity classification, reproduction steps, and remediation guidance',
          'Authoring Accessibility Conformance Reports (ACR) using the Voluntary Product Accessibility Template (VPAT 2.5)',
          'Preparation roadmap for the IAAP Certified Professional in Accessibility Core Competencies (CPACC)'
        ]
      }
    ],
    liveProject: {
      title: 'Full-Cycle Accessibility Audit & Remediation of Enterprise PDF & Web Portal',
      scope: 'Trainees audit and remediate a 50-page complex annual government report containing complex data tables, multi-column layouts, forms, and charts, bringing it into 100% compliance with PDF/UA (ISO 14289) and WCAG 2.2 AA. You will also conduct a screen reader audit of an interactive web portal and produce a formal VPAT 2.5 Conformance Report.',
      deliverables: [
        'Remediated PDF certified with zero errors on PAC 2024 and Adobe Acrobat Checker',
        'Audio screen reader playback verification log using NVDA',
        'Official VPAT 2.5 Accessibility Conformance Report',
        'Detailed executive accessibility gap analysis report'
      ],
      evaluation: 'Evaluated by a certified IAAP accessibility architect on tag tree precision, semantic accuracy, and complete keyboard/screen reader navigability.'
    },
    toolsLearned: ['Adobe Acrobat Pro', 'PAC 2024 (PDF Accessibility Checker)', 'NVDA Screen Reader', 'JAWS', 'Colour Contrast Analyser', 'Axe DevTools', 'WAVE'],
    careerRoles: ['Digital Accessibility Auditor', 'PDF Remediation Specialist', 'Digital Inclusion Consultant', 'VPAT / ACR Analyst', 'Accessibility QA Lead'],
    prerequisites: 'Basic computer literacy; no prior coding knowledge required. Empathy for inclusive design is essential.',
    targetAudience: 'Publishing staff, QA engineers, web developers, document controllers, and candidates seeking high-demand global remote careers.',
    certification: 'Velvora Certified Digital Accessibility Specialist credential and CPACC preparation endorsement.',
    programFaqs: [
            {
                  "q": "Is digital accessibility a growing career field?",
                  "a": "Enormously. With global legal enforcement like the European Accessibility Act taking effect and US Department of Justice regulations, global companies face intense pressure to hire certified accessibility talent."
            },
            {
                  "q": "Do I need to be a programmer to work in accessibility?",
                  "a": "No! PDF remediation and accessibility QA auditing are largely tag-tree and assistive technology workflows that do not require writing software code."
            },
            {
                  "q": "Does this course help me prepare for the IAAP CPACC exam?",
                  "a": "Yes. Our curriculum covers the official International Association of Accessibility Professionals (IAAP) Body of Knowledge, preparing you directly for CPACC certification."
            },
            {
                  "q": "Which screen readers and testing software will I learn to use?",
                  "a": "You will get hands-on mastery with JAWS, NVDA, Apple VoiceOver, Colour Contrast Analyser, PAC (PDF Accessibility Checker), and axe DevTools."
            },
            {
                  "q": "What hands-on remediation practice is included?",
                  "a": "You will remediate complex real-world documents: inaccessible government PDF forms, academic textbooks, Word documents, and live multi-page React websites."
            }
      ]
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
    lead: 'Technology moves fast, and development teams must build with resilience. Velvora’s full-stack software development training delivers hands-on mastery in modern JavaScript/TypeScript, React.js, Node.js, Python, relational database architecture, and cloud deployment pipelines.',
    whyChoose: 'Build resilient, production-ready full-stack web applications with clean architectural patterns, robust APIs, and modern CI/CD.',
    heroDescription:
      'Become a high-caliber full-stack software engineer capable of architecting scalable web applications from scratch. This intensive engineering program covers computer science fundamentals, modular frontend design with React, high-concurrency backend services with Node.js and Express, relational database schema design with PostgreSQL, RESTful API design, and cloud deployments.',
    modules: [
      {
        moduleNumber: '01',
        title: 'Modern JavaScript (ES6+), TypeScript & Programming Foundations',
        duration: 'Weeks 1–3',
        overview: 'Deep dive into asynchronous programming, event loops, promises, functional programming, and TypeScript static typing.',
        topics: [
          'JavaScript under the hood: execution contexts, closures, prototypes, and the event loop',
          'Modern ES6+ syntax: destructuring, rest/spread, modules, arrow functions',
          'Asynchronous JavaScript: Promises, async/await, and error handling patterns',
          'TypeScript essentials: interfaces, types, generics, and compiler configurations'
        ]
      },
      {
        moduleNumber: '02',
        title: 'Frontend Engineering with React.js & Modern State Architecture',
        duration: 'Weeks 4–7',
        overview: 'Component lifecycle, hooks (useState, useEffect, useMemo, custom hooks), React Router, component styling, and state management.',
        topics: [
          'Component composition, unidirectional data flow, and virtual DOM diffing',
          'Hooks masterclass: useState, useEffect, useRef, useMemo, useCallback, and custom hooks',
          'Single-page application routing with React Router 6+',
          'Global state management strategies (Context API, Zustand, Redux Toolkit)',
          'Responsive design, accessible UI components, and CSS modules'
        ]
      },
      {
        moduleNumber: '03',
        title: 'Backend Architecture with Node.js, Express & PostgreSQL',
        duration: 'Weeks 8–11',
        overview: 'RESTful API design, middleware, authentication (JWT/OAuth), relational database design, indexing, and ORM integration.',
        topics: [
          'Node.js runtime architecture, event-driven I/O, and streams',
          'Building RESTful APIs with Express.js: routing, custom middleware, and validation',
          'Relational database modeling with PostgreSQL: tables, foreign keys, indexes, and constraints',
          'Database access using Prisma ORM and raw SQL queries',
          'Security best practices: password hashing (bcrypt), JWT tokens, CORS, and rate limiting'
        ]
      },
      {
        moduleNumber: '04',
        title: 'Testing, Docker Containerization & Cloud CI/CD',
        duration: 'Weeks 12–14',
        overview: 'Unit and integration testing, Docker containerization, Git collaboration, and automated deployments.',
        topics: [
          'Unit testing with Jest / Vitest and React Testing Library',
          'API testing with Supertest and Postman collections',
          'Dockerizing full-stack applications: Dockerfile, multi-stage builds, docker-compose',
          'Continuous Integration and Continuous Deployment (CI/CD) with GitHub Actions',
          'Deploying production backends to Linux cloud instances and Vercel/Render'
        ]
      }
    ],
    liveProject: {
      title: 'Enterprise Multi-Tenant SaaS Portal with Authentication, Billing & Telemetry',
      scope: 'Design, build, and deploy a production full-stack web application featuring role-based access control (Admin, Manager, Member), JWT authentication, interactive dashboard metrics, automated PDF invoice generation, and real-time database updates.',
      deliverables: [
        'Full-stack GitHub repository following clean architecture and SOLID principles',
        'Fully responsive React.js frontend with dark/light theme support',
        'Secure Node.js / Express backend with documented Swagger REST endpoints',
        'Live deployment URL running on a cloud environment with CI/CD pipeline'
      ],
      evaluation: 'Assessed on system security, code modularity, test coverage (>80%), responsiveness, and database query efficiency.'
    },
    toolsLearned: ['React.js', 'Node.js / Express', 'TypeScript', 'PostgreSQL', 'Prisma ORM', 'Git & GitHub', 'Docker', 'Linux / Bash'],
    careerRoles: ['Full-Stack Developer', 'Frontend Engineer', 'Backend API Developer', 'Software Engineer', 'React Developer'],
    prerequisites: 'Basic understanding of HTML/CSS and logical thinking. We start from foundational JavaScript before advancing.',
    targetAudience: 'Engineering and computer science students, career switchers, and developers looking to modernize their stack to React and Node.',
    certification: 'Velvora Certified Full-Stack Software Engineer credential with live project code review badge.',
    programFaqs: [
            {
                  "q": "Do we learn modern React with Hooks or older class components?",
                  "a": "We teach 100% modern React with functional components, hooks, custom hooks, and modern ecosystem tools like Vite and Zustand."
            },
            {
                  "q": "Will I have a working portfolio by the end of this course?",
                  "a": "Yes. You will complete at least 3 portfolio-ready applications, culminating in a complex full-stack SaaS capstone hosted live on the web."
            },
            {
                  "q": "How are code reviews conducted during the training?",
                  "a": "Every trainee submits assignments via GitHub pull requests. Senior engineers review your code line-by-line, providing feedback on architecture, security, and cleanliness."
            },
            {
                  "q": "Is backend API engineering and database design covered?",
                  "a": "Yes. You will learn Node.js, Express, PostgreSQL, RESTful architecture, JWT authentication, and database indexing for production-ready performance."
            },
            {
                  "q": "Do you cover deployment and cloud hosting?",
                  "a": "Yes. You will learn how to deploy frontends to Vercel/Netlify, backends to Railway/Render, databases to Neon/Supabase, and set up automated GitHub Actions CI/CD."
            }
      ]
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
    lead: 'A commanding online presence requires skill and calculated strategy. Velvora’s digital marketing training gives you practical experience in technical SEO, Google Analytics 4 (GA4), paid performance advertising, content funnels, and conversion optimization.',
    whyChoose: 'Execute end-to-end data-backed campaigns with real advertising frameworks, tracking real conversion metrics and positive ROI.',
    heroDescription:
      'Digital marketing has evolved into a quantitative, data-driven discipline. This program equips marketers and entrepreneurs with the technical and strategic skills needed to dominate search rankings, run high-converting Google and Meta ad campaigns, set up enterprise web telemetry with Google Analytics 4, and design high-converting sales funnels.',
    modules: [
      {
        moduleNumber: '01',
        title: 'Technical & On-Page SEO Architecture',
        duration: 'Weeks 1–2',
        overview: 'Master search engine indexing, keyword research, on-page optimization, Schema.org structured data, and Core Web Vitals.',
        topics: [
          'How Google crawls, renders, and indexes modern websites',
          'Comprehensive keyword research: search intent, difficulty scores, and topic clustering',
          'On-page SEO: title tags, meta descriptions, header hierarchy, and internal linking',
          'Technical SEO: XML sitemaps, robots.txt, canonicalization, and Schema markup (JSON-LD)',
          'Core Web Vitals optimization: LCP, INP, and CLS for organic ranking boosts'
        ]
      },
      {
        moduleNumber: '02',
        title: 'Content Strategy, Copywriting & Inbound Lead Funnels',
        duration: 'Weeks 3–4',
        overview: 'Author compelling copy, design multi-step lead nurture funnels, and build high-converting landing pages.',
        topics: [
          'Direct-response copywriting frameworks: AIDA, PAS, and value propositions',
          'Content marketing strategy: pillar pages, case studies, and lead magnets',
          'Landing page conversion rate optimization (CRO) and UX heatmaps',
          'Email marketing automation: welcome sequences, abandoned cart triggers, and newsletters'
        ]
      },
      {
        moduleNumber: '03',
        title: 'Paid Advertising: Google Ads & Meta Ads Management',
        duration: 'Weeks 5–6',
        overview: 'Search, display, and performance max campaigns on Google Ads; laser-targeted audience campaigns on Facebook and Instagram.',
        topics: [
          'Google Ads search campaigns: keyword match types, quality score optimization, negative keywords',
          'Smart bidding strategies: Target CPA, Target ROAS, and maximize conversions',
          'Meta Ads Manager: custom audiences, lookalike audiences, and pixel event setup',
          'Creative ad copywriting and video/image asset testing frameworks'
        ]
      },
      {
        moduleNumber: '04',
        title: 'Web Analytics (GA4), Tag Manager & Multi-Touch Attribution',
        duration: 'Weeks 7–8',
        overview: 'Master Google Analytics 4, Google Tag Manager (GTM), custom event tracking, and executive ROI reporting.',
        topics: [
          'Google Analytics 4 (GA4) setup: data streams, event-driven tracking model, and user identification',
          'Google Tag Manager (GTM): creating tags, triggers, and variables for button clicks and form submissions',
          'Conversion funnels, path exploration, and drop-off analysis in GA4',
          'Multi-channel attribution models and building automated executive dashboards in Looker Studio'
        ]
      }
    ],
    liveProject: {
      title: 'End-to-End Growth Campaign: Technical SEO Audit, Paid Campaign & GA4 Telemetry',
      scope: 'Trainees conduct an in-depth technical SEO audit of a live website, fix structured data and meta errors, construct a multi-channel paid ad campaign strategy on Google and Meta with negative keywords and ad copy, and build an automated executive reporting dashboard in Looker Studio connected to GA4.',
      deliverables: [
        'Comprehensive 25-point Technical SEO Audit report with actionable fixes',
        'Structured paid ad campaign deck with keyword research and creative ad copy',
        'Google Tag Manager container export with verified conversion triggers',
        'Live interactive Looker Studio executive telemetry dashboard'
      ],
      evaluation: 'Assessed on technical audit depth, keyword selection strategy, landing page CRO principles, and GA4 tracking accuracy.'
    },
    toolsLearned: ['Google Analytics 4', 'Google Tag Manager', 'Google Search Console', 'SEMrush / Ahrefs', 'Google Ads', 'Meta Ads Manager', 'Looker Studio'],
    careerRoles: ['SEO Specialist', 'Digital Marketing Manager', 'Performance Marketer', 'Content Strategist', 'Growth Marketing Analyst'],
    prerequisites: 'Basic internet literacy and interest in business psychology; no coding required.',
    targetAudience: 'Marketing professionals, entrepreneurs, commerce/arts graduates, and career changers aiming for digital growth roles.',
    certification: 'Velvora Certified Digital Growth Strategist credential with live campaign audit verification.',
    programFaqs: [
            {
                  "q": "Does this course teach Google Analytics 4 (GA4)?",
                  "a": "Yes, extensively. Since Universal Analytics was retired, GA4 is the world standard, and we cover its event-based data model, GTM tags, and custom conversions from scratch."
            },
            {
                  "q": "Do I need a large advertising budget to practice during the course?",
                  "a": "No. We demonstrate campaign setups using structured simulation environments and live enterprise accounts so you understand bidding without spending your own money."
            },
            {
                  "q": "Can this training help me market my own business or freelance practice?",
                  "a": "100%. Many of our trainees are small business owners and freelancers who apply these exact SEO, ads, and email funnels to generate their own client pipeline."
            },
            {
                  "q": "Will I learn how to rank websites on Google via Technical and On-Page SEO?",
                  "a": "Yes. You will master keyword research, search intent mapping, schema markup, Core Web Vitals optimization, and high-authority link-building outreach."
            },
            {
                  "q": "What certifications can I earn through this program?",
                  "a": "In addition to the Velvora Solutions Certificate, we guide you to clear Google Search Ads, Google Analytics Individual Qualification (GAIQ), and HubSpot Inbound Marketing certifications."
            }
      ]
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

// Helper functions for dynamic page resolution
export function getTrainingProgramBySlug(slug) {
  if (!slug) return null;
  const cleanSlug = slug.toLowerCase().trim();
  return trainingPrograms.find(
    (p) => p.id === cleanSlug || p.id.replace(/-training$/, '') === cleanSlug
  ) || null;
}

export function getRelatedTrainingPrograms(currentId, limit = 3) {
  return trainingPrograms.filter((p) => p.id !== currentId).slice(0, limit);
}
