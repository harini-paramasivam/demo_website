import React, { useState } from 'react';
import { 
  Search, 
  FileCode, 
  Layers, 
  ShieldCheck, 
  Rocket, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  RefreshCw,
  Cpu,
  BookOpen,
  Eye,
  FileCheck2,
  Binary,
  Code2,
  BarChart3,
  TrendingUp,
  Workflow,
  Headphones,
  ScanLine
} from 'lucide-react';

// Domain-specific tailored deliverables & iconography for all 12 services
const SERVICE_STAGES_MAP = {
  epublishing: [
    {
      num: '01',
      title: 'Analyze',
      tag: 'Source Audit & Scoping',
      icon: Search,
      color: '#38bdf8',
      summary: 'We review your source files, asset hierarchy, requirements, and target retail platforms.',
      deliverables: ['Manuscript & Asset Audit', 'Semantic Structure Scoping', 'Multi-Retailer Specifications']
    },
    {
      num: '02',
      title: 'Plan',
      tag: 'Specifications & Rules',
      icon: FileCode,
      color: '#818cf8',
      summary: 'We agree on conversion specifications, custom CSS style rules, accessibility tags, and timelines.',
      deliverables: ['House Style Guide Matching', 'Custom CSS Architecture', 'Accessibility Compliance Plan']
    },
    {
      num: '03',
      title: 'Produce',
      tag: 'EPUB 3 / KPF Conversion',
      icon: Layers,
      color: '#00f2fe',
      summary: 'Our specialist compositors convert, format, and structure your content with semantic precision.',
      deliverables: ['Reflowable / Fixed-Layout EPUB 3', 'Clean HTML5 & MathML', 'Amazon KPF / MOBI Build']
    },
    {
      num: '04',
      title: 'Validate',
      tag: 'EPUBCheck & Device QA',
      icon: ShieldCheck,
      color: '#10b981',
      summary: 'Automated EPUBCheck validation, physical Kindle/iPad cross-device QA, and screen reader tests.',
      deliverables: ['Zero-Error EPUBCheck', 'Physical Device Verification', 'Screen Reader Auditing']
    },
    {
      num: '05',
      title: 'Deliver',
      tag: 'Certified Retail Release',
      icon: Rocket,
      color: '#f59e0b',
      summary: 'Final publication-ready files delivered strictly on time with embedded ONIX metadata and QA reports.',
      deliverables: ['Retail-Ready Distribution Files', 'Embedded ONIX 3.0 Metadata', 'Comprehensive QA Audit Report']
    }
  ],
  xml: [
    {
      num: '01',
      title: 'Analyze & Audit',
      tag: 'Schema & Input Audit',
      icon: Search,
      color: '#38bdf8',
      summary: 'We inspect input manuscripts, citation conventions, and target DTD schemas (JATS, BITS, DITA).',
      deliverables: ['Input Manuscript & Formula Audit', 'DTD/Schema Compatibility Matrix', 'Crossref Citation Scoping']
    },
    {
      num: '02',
      title: 'Schema Mapping',
      tag: 'XSLT & Tagging Rules',
      icon: FileCode,
      color: '#818cf8',
      summary: 'We configure custom XSLT parsers, semantic tag mappings, and automated validation rules.',
      deliverables: ['XSLT Parsing Configuration', 'Semantic Tagging Architecture', 'Validation Rules Definition']
    },
    {
      num: '03',
      title: 'Tagging & Conversion',
      tag: 'JATS/BITS Extraction',
      icon: Binary,
      color: '#00f2fe',
      summary: 'Specialists extract structured elements, MathML equations, and Crossref citation metadata.',
      deliverables: ['Clean JATS/BITS XML Extraction', 'Embedded MathML & Tables', 'Crossref DOI Metadata Integration']
    },
    {
      num: '04',
      title: 'Validation QA',
      tag: 'Schematron & DTD Checks',
      icon: ShieldCheck,
      color: '#10b981',
      summary: 'Rigorous automated DTD parsing, Schematron checks, and manual editorial verification.',
      deliverables: ['Automated Schematron Validation', 'DTD Parser Compliance Check', 'Editorial Accuracy Verification']
    },
    {
      num: '05',
      title: 'Transformation',
      tag: 'Multi-Format Output',
      icon: Rocket,
      color: '#f59e0b',
      summary: 'Delivery of 100% valid XML packages ready for PubMed, Crossref, and web CMS publishing.',
      deliverables: ['Validated XML Repository Package', 'Multi-Format Transformation Scripts', 'Final Compliance Certification']
    }
  ],
  'digital-accessibility': [
    {
      num: '01',
      title: 'Assess & Audit',
      tag: 'WCAG & PDF Scanner',
      icon: Search,
      color: '#38bdf8',
      summary: 'Comprehensive automated scanner sweep and manual review to identify WCAG & PDF/UA violations.',
      deliverables: ['WCAG 2.2 AA / AAA Baseline Audit', 'Automated Tool Scanner Sweep', 'Section 508 / EAA Scope Definition']
    },
    {
      num: '02',
      title: 'Remediation Plan',
      tag: 'Testing Matrix & Scope',
      icon: FileCode,
      color: '#818cf8',
      summary: 'Detailed issue prioritization, screen reader testing matrix, and architectural remediation roadmap.',
      deliverables: ['Detailed Remediation Roadmap', 'Assistive Tech Testing Matrix', 'Design & UX Color Alignment']
    },
    {
      num: '03',
      title: 'Structural Fixes',
      tag: 'Reading Order & Semantics',
      icon: Layers,
      color: '#00f2fe',
      summary: 'Hands-on tagging, reading order optimization, table markup, and contrast remediation.',
      deliverables: ['Reading Order & Semantic Tagging', 'Alt Text & Table Structure Fixes', 'Keyboard Focus & Contrast Tuning']
    },
    {
      num: '04',
      title: 'Screen Reader QA',
      tag: 'JAWS & NVDA Verification',
      icon: ShieldCheck,
      color: '#10b981',
      summary: 'End-to-end verification with native screen readers (JAWS, NVDA, VoiceOver) and PAC syntax testers.',
      deliverables: ['Screen Reader Verification (JAWS/NVDA)', 'PDF/UA & PAC Syntax Checks', 'Color & Cognitive Access Review']
    },
    {
      num: '05',
      title: 'Certify & Report',
      tag: 'VPAT 2.4 & Final ACR',
      icon: Rocket,
      color: '#f59e0b',
      summary: 'Delivery of 100% compliant assets accompanied by court-defensible VPAT 2.4 and ACR reports.',
      deliverables: ['Court-Defensible VPAT 2.4 / ACR', 'Fully Remediated Production Files', 'Accessibility Compliance Certificate']
    }
  ],
  'typesetting-and-design': [
    {
      num: '01',
      title: 'Manuscript Audit',
      tag: 'Trim Size & House Style',
      icon: Search,
      color: '#38bdf8',
      summary: 'We review manuscripts, trim sizes, typographical specifications, and house style guidelines.',
      deliverables: ['Manuscript Analysis & Asset Audit', 'Specification & Trim Size Scoping', 'House Typography Guidelines']
    },
    {
      num: '02',
      title: 'Sample Spreads',
      tag: 'Grid & Typography Design',
      icon: FileCode,
      color: '#818cf8',
      summary: 'We craft bespoke sample page spreads, grid architectures, and font pairings for stakeholder sign-off.',
      deliverables: ['Sample Spread Layout Options', 'Font Pairing & Grid Architecture', 'Master Page Template Creation']
    },
    {
      num: '03',
      title: 'Composition',
      tag: 'Full Page Flow & Figures',
      icon: Layers,
      color: '#00f2fe',
      summary: 'Complete editorial typesetting with unified styling, complex tables, illustrations, and callouts.',
      deliverables: ['Full Monograph / Book Composition', 'Complex Table & Figure Placement', 'Footnotes & Endnotes Anchoring']
    },
    {
      num: '04',
      title: 'Proofing QA',
      tag: 'Multi-Pass Proofing Checks',
      icon: ShieldCheck,
      color: '#10b981',
      summary: 'Exhaustive first and second pass proofing, widow/orphan elimination, and cross-reference checks.',
      deliverables: ['Multi-Pass Proofreading QA', 'Widow, Orphan & Hyphen Tuning', 'Index & TOC Cross-Check']
    },
    {
      num: '05',
      title: 'Press Delivery',
      tag: 'Certified Print-Ready PDF',
      icon: Rocket,
      color: '#f59e0b',
      summary: 'Delivery of prepress-certified PDF/X files, interactive digital editions, and packaged source files.',
      deliverables: ['High-Res Print-Ready Certified PDF', 'Interactive Digital Distribution PDF', 'Packaged InDesign Source Assets']
    }
  ],
  'math-and-equation-typesetting': [
    {
      num: '01',
      title: 'Notation Audit',
      tag: 'LaTeX / MathML Scoping',
      icon: Search,
      color: '#38bdf8',
      summary: 'We audit source formulas, complex notation conventions, and target academic publication platforms.',
      deliverables: ['Complex Notation & Formula Review', 'MathML / LaTeX Convention Scoping', 'Symbol Font Requirement Audit']
    },
    {
      num: '02',
      title: 'Style Definition',
      tag: 'Formula Rules & Specs',
      icon: FileCode,
      color: '#818cf8',
      summary: 'We define typographical rules for inline versus display formulas, fractions, matrices, and symbols.',
      deliverables: ['Equation Styling Specifications', 'Inline vs Display Formula Rules', 'Structural Architecture Mapping']
    },
    {
      num: '03',
      title: 'Precision Markup',
      tag: 'MathML / LaTeX Encoding',
      icon: Binary,
      color: '#00f2fe',
      summary: 'High-precision equation composition and encoding with semantic MathML, LaTeX, and MathJax.',
      deliverables: ['High-Precision MathML / LaTeX Markup', 'Equation Numbering & Anchoring', 'High-Res Vector Rendering']
    },
    {
      num: '04',
      title: 'Visual Proofing',
      tag: 'Original vs Rendered QA',
      icon: ShieldCheck,
      color: '#10b981',
      summary: 'Double-pass comparison against author manuscripts plus screen-reader math accessibility audits.',
      deliverables: ['Double-Pass Visual Formula Proofing', 'Screen Reader Speech-Rule Testing', 'Validation Against Golden Originals']
    },
    {
      num: '05',
      title: 'Package Delivery',
      tag: 'MathML & Vector Output',
      icon: Rocket,
      color: '#f59e0b',
      summary: 'Final publication-ready equation packages integrated into XML, InDesign, or digital web editions.',
      deliverables: ['Integrated Journal MathML Package', 'Print-Ready Mathematical Vector PDF', 'Verification QA Summary']
    }
  ],
  'metadata-indexing-and-taxonomy': [
    {
      num: '01',
      title: 'Taxonomy Scoping',
      tag: 'Vocabulary & Classification',
      icon: Search,
      color: '#38bdf8',
      summary: 'We assess target audiences, classification schemas, and discoverability channels for your catalog.',
      deliverables: ['Audience & Platform Ingestion Scope', 'Taxonomy & Keyword Landscape', 'Controlled Vocabulary Identification']
    },
    {
      num: '02',
      title: 'Schema Definition',
      tag: 'Ontology & Rule Mapping',
      icon: FileCode,
      color: '#818cf8',
      summary: 'We establish indexing rules, authority files, hierarchical thesauri, and metadata mappings.',
      deliverables: ['Thesaurus & Schema Rule Definition', 'Classification Hierarchy Mapping', 'Indexing Guidelines Formulation']
    },
    {
      num: '03',
      title: 'Semantic Indexing',
      tag: 'Deep Tagging & Cross-Links',
      icon: Layers,
      color: '#00f2fe',
      summary: 'Professional indexers generate comprehensive back-of-book indexes and embedded subject taxonomy.',
      deliverables: ['Comprehensive Semantic Tagging', 'Back-of-Book / Embedded Indexing', 'Cross-Reference Linking']
    },
    {
      num: '04',
      title: 'Discovery QA',
      tag: 'Search Engine Audit',
      icon: ShieldCheck,
      color: '#10b981',
      summary: 'Editorial review and automated validation to ensure schema conformance and retrieval accuracy.',
      deliverables: ['Vocabulary Consistency Audit', 'Search Engine Discoverability Test', 'Subject Matter Expert Review']
    },
    {
      num: '05',
      title: 'Catalog Package',
      tag: 'Normalized ONIX & MARC',
      icon: Rocket,
      color: '#f59e0b',
      summary: 'Delivery of verified ONIX 3.0, MARC21, and schema.org metadata files ready for global distributors.',
      deliverables: ['Normalized ONIX / MARC Metadata Package', 'Structured XML Index Deliverable', 'Catalog Integration Guide']
    }
  ],
  'ocr-and-digitization': [
    {
      num: '01',
      title: 'Assess & Ingest',
      tag: 'Condition & Format Scoping',
      icon: Search,
      color: '#38bdf8',
      summary: 'Condition audit, scanner resolution calibration, and digitization format scoping for archival preservation.',
      deliverables: ['Physical Material & Condition Review', 'Resolution & Scanner Setting Audit', 'Target Output Format Scoping']
    },
    {
      num: '02',
      title: 'High-Res Capture',
      tag: 'Deskew & Pre-Processing',
      icon: ScanLine,
      color: '#818cf8',
      summary: 'High-resolution scanning, automated deskewing, binarization, and contrast tuning for optimal OCR fidelity.',
      deliverables: ['Color Calibration & Image Capture', 'Deskew, Despeckle & Contrast Tuning', 'Image Pre-Processing Pipeline']
    },
    {
      num: '03',
      title: 'Neural OCR',
      tag: 'Multi-Engine Recognition',
      icon: Binary,
      color: '#00f2fe',
      summary: 'Multi-engine optical recognition with custom character, mathematical, and multi-language dictionaries.',
      deliverables: ['Multi-Engine Optical Character Recognition', 'Complex Layout Zone Segmentation', 'Language Model Recognition Pass']
    },
    {
      num: '04',
      title: 'Proofreading QA',
      tag: 'Character-by-Character Tagging',
      icon: ShieldCheck,
      color: '#10b981',
      summary: 'Character-by-character manual proofreading and semantic structural tagging conforming to 99.95%+ accuracy.',
      deliverables: ['Character-by-Character Human Proofing', 'Structural Header & Tag Encoding', 'OCR Confidence Verification']
    },
    {
      num: '05',
      title: 'Digital Delivery',
      tag: 'Searchable PDF/A & XML',
      icon: Rocket,
      color: '#f59e0b',
      summary: 'Format validation and delivery of searchable PDF/A, editable Word, XML, or EPUB with comprehensive QA report.',
      deliverables: ['Searchable Multi-Layer PDF/A', 'Fully Structured Word / XML Export', 'Archival Quality Ingestion Report']
    }
  ],
  'captioning-transcription-and-audio-description': [
    {
      num: '01',
      title: 'Media Review',
      tag: 'Media Length & Standards',
      icon: Search,
      color: '#38bdf8',
      summary: 'We inspect media files, run times, dialect nuances, and compliance guidelines (FCC, ADA, WCAG).',
      deliverables: ['Media Ingestion & Length Assessment', 'Speaker & Tone Identification', 'FCC / ADA Regulatory Target Scope']
    },
    {
      num: '02',
      title: 'Transcription',
      tag: 'Frame-Accurate Time-Sync',
      icon: FileCode,
      color: '#818cf8',
      summary: 'Trained human specialists generate frame-accurate, verbatim transcripts with speaker IDs and sound cues.',
      deliverables: ['Time-Synchronized Text Transcription', 'Multi-Speaker Labeling & Sound Cues', 'Audio Description Script Drafting']
    },
    {
      num: '03',
      title: 'Audio Description',
      tag: 'Sound & Narration Sync',
      icon: Headphones,
      color: '#00f2fe',
      summary: 'Crafting non-verbal visual cues, sound effect tags, and professionally synchronized audio description narration.',
      deliverables: ['Narration Voice Recording & Mixing', 'Subtitle Formatting & Line Breaks', 'Frame-Accurate Caption Synchronization']
    },
    {
      num: '04',
      title: 'Readability QA',
      tag: 'Speed & Legibility Checks',
      icon: ShieldCheck,
      color: '#10b981',
      summary: 'Double-pass human review for reading speed, line breaks, character limits, and caption legibility.',
      deliverables: ['Speech-to-Text Accuracy Verification', 'Reading Speed & Legibility Audit', 'WCAG Caption Conformance Testing']
    },
    {
      num: '05',
      title: 'Compliant Output',
      tag: 'Certified SRT/VTT/SCC',
      icon: Rocket,
      color: '#f59e0b',
      summary: 'Broadcast-ready distribution in SRT, VTT, SCC, SMPTE-TT, or mixed audio tracks with compliance certification.',
      deliverables: ['Certified SRT, VTT, SCC Closed Captions', 'Broadcast Quality Mixed Audio Track', 'Transcript & QA Certification']
    }
  ],
  'ai-automation': [
    {
      num: '01',
      title: 'Workflow Audit',
      tag: 'Bottleneck & ROI Scoping',
      icon: Search,
      color: '#38bdf8',
      summary: 'We map current content production bottlenecks and identify high-ROI automation targets.',
      deliverables: ['Editorial Workflow Bottleneck Audit', 'High-ROI Automation Target Mapping', 'Golden Training Dataset Ingestion']
    },
    {
      num: '02',
      title: 'Pipeline Design',
      tag: 'Model Selection & Gates',
      icon: Workflow,
      color: '#818cf8',
      summary: 'We architect custom AI modules, schema validators, model guardrails, and human review gates.',
      deliverables: ['Custom AI Architecture & Pipeline Spec', 'Model Selection & Guardrail Design', 'Human Review Gate Specifications']
    },
    {
      num: '03',
      title: 'Implementation',
      tag: 'Schematron & NLP Modules',
      icon: Cpu,
      color: '#00f2fe',
      summary: 'Engineers construct end-to-end automated pipelines, document parsers, and human-in-the-loop interfaces.',
      deliverables: ['End-to-End Pipeline Engineering', 'Automated Schematron & Parser Modules', 'Human-in-the-Loop Integration']
    },
    {
      num: '04',
      title: 'Benchmark QA',
      tag: 'Accuracy vs Golden Files',
      icon: ShieldCheck,
      color: '#10b981',
      summary: 'We benchmark automated precision against verified golden sample files and stress-test edge cases.',
      deliverables: ['Benchmark Testing Against Golden Files', 'Edge-Case Stress & Security Testing', 'Accuracy & Throughput Validation']
    },
    {
      num: '05',
      title: 'Cloud Deployment',
      tag: 'Telemetry & Monitoring',
      icon: Rocket,
      color: '#f59e0b',
      summary: 'Seamless integration into cloud infrastructure, FTP, or editorial CMS with real-time health telemetry.',
      deliverables: ['Production System Cloud Deployment', 'Automated Telemetry & Health Dashboard', 'Continuous Optimization Plan']
    }
  ],
  'software-development': [
    {
      num: '01',
      title: 'Architecture',
      tag: 'System & UX Scoping',
      icon: Search,
      color: '#38bdf8',
      summary: 'Technical requirements discovery, cloud system architecture planning, security baseline, and UX wireframing.',
      deliverables: ['Technical Requirements Gathering', 'System Architecture & Data Modeling', 'Security & Compliance Baseline']
    },
    {
      num: '02',
      title: 'Sprint Planning',
      tag: 'Design System & Roadmaps',
      icon: FileCode,
      color: '#818cf8',
      summary: 'Detailed sprint milestone mapping, interactive UI/UX design systems, and API schema contracts.',
      deliverables: ['Sprint Milestone Roadmap & Backlog', 'Interactive UX / UI Design System', 'API Schema & Database Specifications']
    },
    {
      num: '03',
      title: 'Agile Coding',
      tag: 'Full-Stack Development',
      icon: Code2,
      color: '#00f2fe',
      summary: 'Rapid iterative full-stack development with clean modular code, accessible UI components, and secure APIs.',
      deliverables: ['Full-Stack Agile Development', 'Accessible Frontend & REST/GraphQL APIs', 'Automated Unit & Integration Tests']
    },
    {
      num: '04',
      title: 'Testing & QA',
      tag: 'Security & WCAG Audits',
      icon: ShieldCheck,
      color: '#10b981',
      summary: 'Automated CI test suites, manual screen-reader auditing, penetration testing, and load benchmarking.',
      deliverables: ['WCAG Accessibility & Pen-Testing', 'Cross-Browser Performance Profiling', 'User Acceptance Testing (UAT)']
    },
    {
      num: '05',
      title: 'Cloud Rollout',
      tag: 'CI/CD Zero-Downtime',
      icon: Rocket,
      color: '#f59e0b',
      summary: 'Zero-downtime deployment to AWS/Azure/Vercel with automated CI/CD pipelines, documentation, and SLA monitoring.',
      deliverables: ['Zero-Downtime CI/CD Cloud Deployment', 'Comprehensive API & System Docs', 'Production SLA Monitoring Setup']
    }
  ],
  'data-analytics': [
    {
      num: '01',
      title: 'Data Ingestion',
      tag: 'Source Inventory & Auditing',
      icon: Search,
      color: '#38bdf8',
      summary: 'Comprehensive audit of enterprise data sources, schemas, governance rules, and analytical requirements.',
      deliverables: ['Data Source Inventory & Schema Audit', 'KPI & Analytical Goal Definition', 'Security & Governance Scoping']
    },
    {
      num: '02',
      title: 'ETL Pipelines',
      tag: 'Cleaning & Transformation',
      icon: Workflow,
      color: '#818cf8',
      summary: 'We build secure, automated ETL/ELT connectors to clean, deduplicate, and model raw enterprise data.',
      deliverables: ['Automated ETL Ingestion Pipeline Build', 'Data Cleaning & Transformation Logic', 'Normalized Data Warehouse Modeling']
    },
    {
      num: '03',
      title: 'BI Dashboards',
      tag: 'Metrics & Visualization',
      icon: BarChart3,
      color: '#00f2fe',
      summary: 'Structuring dimensional data models and crafting high-performance, accessible executive BI dashboards.',
      deliverables: ['Interactive BI Dashboard Engineering', 'Role-Based Access & Security Setup', 'Predictive Analysis Model Tuning']
    },
    {
      num: '04',
      title: 'Validation QA',
      tag: 'Reconciliation & Testing',
      icon: ShieldCheck,
      color: '#10b981',
      summary: 'Reconciling calculated metrics against source records and conducting stakeholder acceptance testing.',
      deliverables: ['Metric Calculation Re-Verification', 'Source Data Reconciliation Audit', 'Executive User Acceptance Testing']
    },
    {
      num: '05',
      title: 'Telemetry Deploy',
      tag: 'Automated Scheduled Sync',
      icon: Rocket,
      color: '#f59e0b',
      summary: 'Deploying automated refresh schedules, alert thresholds, and interactive training for internal teams.',
      deliverables: ['Automated Scheduled Data Refresh', 'Production Executive Dashboard Access', 'User Training & Reference Manual']
    }
  ],
  'digital-marketing': [
    {
      num: '01',
      title: 'Landscape Audit',
      tag: 'Competitor & SEO Analysis',
      icon: Search,
      color: '#38bdf8',
      summary: 'In-depth analysis of website technical health, competitor keywords, audience intent, and conversion funnels.',
      deliverables: ['Digital Footprint & Competitor Audit', 'High-Intent Keyword Opportunity Map', 'Audience Segmentation & Persona Build']
    },
    {
      num: '02',
      title: 'Strategy Plan',
      tag: 'Audience & Channel Matrix',
      icon: FileCode,
      color: '#818cf8',
      summary: 'Defining target buyer personas, cross-channel media mix, content calendar, and budget allocations.',
      deliverables: ['Multi-Channel Strategy Formulation', 'Campaign Budget & KPI Allocation', 'Conversion Funnel & Tracking Blueprint']
    },
    {
      num: '03',
      title: 'Campaign Setup',
      tag: 'SEO & High-Converting Copy',
      icon: TrendingUp,
      color: '#00f2fe',
      summary: 'Implementing on-page SEO schema, crafting high-converting ad copy, landing pages, and campaign tags.',
      deliverables: ['On-Page SEO & Schema Optimization', 'Ad Creative & High-Converting Copy', 'Multi-Platform Campaign Launch']
    },
    {
      num: '04',
      title: 'Conversion QA',
      tag: 'A/B Testing & Tracking',
      icon: ShieldCheck,
      color: '#10b981',
      summary: 'Multi-variant A/B testing, pixel and event attribution verification, and bounce rate optimization.',
      deliverables: ['A/B Testing & Funnel Telemetry', 'Bid Optimization & CAC Management', 'Lead Quality & Bounce Rate Audit']
    },
    {
      num: '05',
      title: 'Scale & Optimize',
      tag: 'Full-Funnel ROI Reporting',
      icon: Rocket,
      color: '#f59e0b',
      summary: 'Real-time performance analytics, budget reallocations to top performers, and quarterly growth roadmaps.',
      deliverables: ['Full-Funnel ROI & Growth Report', 'Optimized Evergreen Marketing Funnel', 'Quarterly Scale & Expansion Strategy']
    }
  ]
};

// Domain hero images for the mobile hub banner
const SERVICE_IMAGES_MAP = {
  epublishing: '/hero-epublishing.jpg',
  xml: '/hero-epublishing.jpg',
  'digital-accessibility': '/card-accessibility.jpg',
  'typesetting-and-design': '/about-manuscript.jpg',
  'math-and-equation-typesetting': '/about-manuscript.jpg',
  'metadata-indexing-and-taxonomy': '/card-content-services.jpg',
  'ocr-and-digitization': '/about-manuscript.jpg',
  'captioning-transcription-and-audio-description': '/card-content-services.jpg',
  'ai-automation': '/hero-robot-ai.jpg',
  'software-development': '/hero-velvora-elite.jpg',
  'data-analytics': '/card-content-services.jpg',
  'digital-marketing': '/card-marketing.jpg'
};

export default function EpublishingProductionWheel({ service }) {
  const [activeIdx, setActiveIdx] = useState(2); // Default to '03' stage

  const slug = service?.slug || 'epublishing';
  const stages = SERVICE_STAGES_MAP[slug] || SERVICE_STAGES_MAP.epublishing;
  const hubImage = SERVICE_IMAGES_MAP[slug] || '/hero-epublishing.jpg';
  const serviceName = service?.title || 'Production';

  const activeStage = stages[activeIdx] || stages[0];
  const ActiveIcon = activeStage.icon || Workflow;

  return (
    <div className="epub-wheel-container">
      {/* DESKTOP CIRCULAR ORBITAL SHOWCASE */}
      <div className="epub-wheel-desktop" aria-hidden="false">
        {/* SVG Orbital Track & Connection Flow Lines */}
        <svg className="epub-wheel-svg" viewBox="0 0 680 640" fill="none" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="orbitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#818cf8" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#00f2fe" stopOpacity="0.4" />
            </linearGradient>
            <radialGradient id="centerCoreGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.35" />
              <stop offset="60%" stopColor="#0284c7" stopOpacity="0.12" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Glowing Ambient Core Backdrop */}
          <circle cx="340" cy="260" r="160" fill="url(#centerCoreGlow)" />

          {/* Main Orbital Track Rings */}
          <circle cx="340" cy="260" r="215" stroke="rgba(56, 189, 248, 0.2)" strokeWidth="1.5" strokeDasharray="6 8" />
          <circle cx="340" cy="260" r="145" stroke="rgba(56, 189, 248, 0.3)" strokeWidth="1" strokeDasharray="3 6" />

          {/* Vector Flow Connector Polygon linking the 5 Nodes sequentially */}
          <path
            d="M 175 95 L 505 95 L 572 280 L 340 540 L 108 280 Z"
            stroke="url(#orbitGrad)"
            strokeWidth="2"
            strokeDasharray="8 6"
            strokeOpacity="0.55"
          />

          {/* Radial Rays from Center Hub to each Node */}
          <line x1="340" y1="260" x2="175" y2="95" stroke="rgba(56, 189, 248, 0.25)" strokeWidth="1.2" />
          <line x1="340" y1="260" x2="505" y2="95" stroke="rgba(56, 189, 248, 0.25)" strokeWidth="1.2" />
          <line x1="340" y1="260" x2="572" y2="280" stroke="rgba(56, 189, 248, 0.25)" strokeWidth="1.2" />
          <line x1="340" y1="260" x2="340" y2="540" stroke="rgba(56, 189, 248, 0.25)" strokeWidth="1.2" />
          <line x1="340" y1="260" x2="108" y2="280" stroke="rgba(56, 189, 248, 0.25)" strokeWidth="1.2" />
        </svg>

        {/* 1. CENTRAL PRODUCTION CORE HUB */}
        <div className="epub-wheel-center-hub" role="region" aria-label="Velvora Production Hub">
          <div className="center-hub-pulse-ring" aria-hidden="true" />
          <div className="center-hub-inner">
            <span className="center-hub-icon-wrap">
              <Cpu size={20} className="accent" />
            </span>
            <span className="center-hub-title">PRODUCTION</span>
            <span className="center-hub-sub">{serviceName.split(' ')[0]} Core</span>
            <span className="center-hub-badge">5-Stage Continuous Cycle</span>
          </div>
        </div>

        {/* 2. FIVE ORBITING NODES (Calculated 5-point layout) */}
        {stages.map((stage, idx) => {
          const NodeIcon = stage.icon || Workflow;
          const isActive = activeIdx === idx;
          return (
            <div
              key={stage.num}
              className={`epub-wheel-node epub-wheel-node--${idx + 1} ${isActive ? 'is-active' : ''}`}
              onClick={() => setActiveIdx(idx)}
              onMouseEnter={() => setActiveIdx(idx)}
              role="button"
              tabIndex={0}
              aria-label={`Stage ${stage.num}: ${stage.title}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') setActiveIdx(idx);
              }}
            >
              <div className="node-badge-row">
                <span className="node-num-pill">{stage.num}</span>
                <span className="node-icon-bubble">
                  <NodeIcon size={16} />
                </span>
              </div>
              <h4 className="node-title">{stage.title}</h4>
              <span className="node-tag">{stage.tag}</span>
            </div>
          );
        })}
      </div>

      {/* 3. ACTIVE STAGE INSPECTOR BAR (Full Rich Details with Zero Empty Void) */}
      <div className="epub-stage-detail-panel">
        <div className="detail-panel-left">
          <div className="detail-panel-badge-row">
            <span className="detail-panel-num">{activeStage.num}</span>
            <span className="detail-panel-icon">
              <ActiveIcon size={20} />
            </span>
            <div>
              <span className="detail-panel-eyebrow">Active Stage Protocol</span>
              <h3 className="detail-panel-title">{activeStage.title}</h3>
            </div>
          </div>
          <p className="detail-panel-desc">{activeStage.summary}</p>
        </div>

        <div className="detail-panel-right">
          <span className="detail-deliverables-heading">Stage Deliverables:</span>
          <div className="detail-deliverables-pills">
            {activeStage.deliverables.map((item, i) => (
              <span key={i} className="detail-pill">
                <CheckCircle2 size={13} className="pill-check" />
                <span>{item}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 4. QUICK STAGE SELECTOR TABS (1-Click Switcher for All Viewports) */}
      <div className="epub-stage-selector-bar" role="tablist" aria-label="Production Stages">
        {stages.map((stage, idx) => {
          const TabIcon = stage.icon || Workflow;
          const isActive = activeIdx === idx;
          return (
            <button
              key={stage.num}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`epub-stage-tab ${isActive ? 'is-active' : ''}`}
              onClick={() => setActiveIdx(idx)}
            >
              <span className="tab-num">{stage.num}</span>
              <TabIcon size={14} className="tab-icon" />
              <span className="tab-title">{stage.title}</span>
            </button>
          );
        })}
      </div>

      {/* 5. MOBILE RESPONSIVE INTERCONNECTED VERTICAL PIPELINE (For Small Screens) */}
      <div className="epub-wheel-mobile">
        <div className="mobile-hub-banner">
          <div className="mobile-hub-img-circle">
            <img
              src={hubImage}
              alt={`${serviceName} Production Core`}
              className="mobile-hub-img"
            />
            <span className="mobile-hub-img-glow" aria-hidden="true" />
          </div>
          <div className="mobile-hub-text-wrap">
            <h4 className="mobile-hub-title">{serviceName.toUpperCase()} CORE</h4>
            <span className="mobile-hub-subtitle">Disciplined 5-Stage Lifecycle</span>
          </div>
        </div>

        <ol className="mobile-stage-list">
          {stages.map((stage, idx) => {
            const StageIcon = stage.icon || Workflow;
            const isActive = activeIdx === idx;
            return (
              <li
                key={stage.num}
                className={`mobile-stage-item ${isActive ? 'is-active' : ''}`}
                onClick={() => setActiveIdx(idx)}
              >
                <div className="mobile-stage-spine" aria-hidden="true">
                  <span className="spine-dot">{stage.num}</span>
                  {idx < stages.length - 1 && <span className="spine-line" />}
                </div>
                <div className="mobile-stage-content">
                  <div className="mobile-stage-header">
                    <span className="mobile-stage-icon">
                      <StageIcon size={15} />
                    </span>
                    <h4 className="mobile-stage-title">{stage.title}</h4>
                    <span className="mobile-stage-tag">{stage.tag}</span>
                  </div>
                  <p className="mobile-stage-desc">{stage.summary}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
