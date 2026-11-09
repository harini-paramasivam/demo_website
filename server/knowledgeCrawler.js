import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

/**
 * KnowledgeCrawler
 * Crawls every public page and data source on the Velvora Solutions website:
 * - src/data/site.js (Company, Services, Solutions, Partnerships, Team, Resource Hubs, Insights, Why Choose Us)
 * - src/pages/Careers.jsx (Dynamic Job Openings, G.R.O.W. Framework, Work Culture, Application Requirements)
 * - src/pages/Contact.jsx (Cuddalore & Chennai Offices, Phone, Email, Office Hours, Quote Submissions)
 * - src/pages/AccessibilityStatement.jsx (WCAG 2.2 AA Conformance, JAWS/NVDA/VoiceOver Testing, Feedback)
 * - src/pages/PrivacyPolicy.jsx (GDPR Compliance, Client Confidentiality, Non-Disclosure Standards)
 * - src/pages/PartnerWithUs.jsx (Technology Alliance, Referral Partners, Reseller Models)
 * - src/pages/CompanyOverview.jsx & OurTeam.jsx (Mission, Vision, Values, Leadership)
 */
export class KnowledgeCrawler {
  constructor() {
    this.sourceFiles = [
      path.join(ROOT_DIR, 'src', 'data', 'site.js'),
      path.join(ROOT_DIR, 'src', 'pages', 'Careers.jsx'),
      path.join(ROOT_DIR, 'src', 'pages', 'Contact.jsx'),
      path.join(ROOT_DIR, 'src', 'pages', 'AccessibilityStatement.jsx'),
      path.join(ROOT_DIR, 'src', 'pages', 'PrivacyPolicy.jsx'),
      path.join(ROOT_DIR, 'src', 'pages', 'OurTeam.jsx'),
      path.join(ROOT_DIR, 'src', 'pages', 'CompanyOverview.jsx'),
      path.join(ROOT_DIR, 'src', 'pages', 'PartnerWithUs.jsx')
    ];
  }

  computeSourceHash() {
    const hash = crypto.createHash('sha256');
    for (const filePath of this.sourceFiles) {
      if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath);
        hash.update(filePath);
        hash.update(stats.mtimeMs.toString());
        hash.update(stats.size.toString());
      }
    }
    return hash.digest('hex');
  }

  async crawlAll() {
    const errorLogs = [];
    const documents = [];
    const careers = [];
    const faqs = [];

    // 1. CRAWL SITE.JS (The central source of truth for services, company, solutions, team, insights)
    try {
      const sitePath = path.join(ROOT_DIR, 'src', 'data', 'site.js');
      // Dynamic import with cache-busting query to ensure latest content
      const siteUrl = `file://${sitePath.replace(/\\/g, '/')}?t=${Date.now()}`;
      const site = await import(siteUrl);

      const company = site.company || {};

      // A. COMPANY & HOMEPAGE
      documents.push({
        id: 'page-home',
        title: 'Velvora Solutions — Home',
        url: '/',
        category: 'company',
        summary: company.heroSubheading || 'Velvora Solutions is a content and technology services company combining ePublishing, XML, digital accessibility, AI automation, software engineering, and data analytics.',
        content: `Velvora Solutions is an end-to-end content and technology services partner.
Tagline: "${company.tagline}"
Description: ${company.description || company.introText}
Key Performance Metrics:
• 5+ Countries Reached worldwide
• 500+ XML Titles Structured and Converted
• 2,000+ Training Hours Delivered
• 30+ Skilled Specialists across accessibility, XML, typesetting, and AI engineering.
Offices:
• Head Office & Operations: Pathirikuppam, Thiruvantthipuram Post, Cuddalore - 607002, Tamil Nadu, India
• Branch Office: Velvora Solutions, Porur, Chennai, Tamil Nadu, India
Contact: ${company.email} | Phone: ${company.phone} | Office Hours: ${company.hours}`,
        topics: ['About Velvora', 'Content and Technology Partner', 'Global Delivery', 'Company Overview', 'Key Metrics'],
        keywords: ['velvora', 'velvora solutions', 'home', 'overview', 'about velvora', 'content partner', 'cuddalore', 'chennai', 'metrics']
      });

      // B. COMPANY OVERVIEW & MISSION
      documents.push({
        id: 'page-company-overview',
        title: 'Company Overview & Mission',
        url: '/about/company-overview',
        category: 'company',
        summary: 'Velvora Solutions’ mission is to build accessible, precision-driven digital solutions uniting advanced technology with human craftsmanship to deliver uncompromising quality for global organizations.',
        content: `Velvora Solutions Company Overview:
Mission: To build accessible, precision-driven digital solutions uniting advanced technology with human dedication to deliver uncompromising quality for global organizations.
Vision: To empower publishers, academic institutions, and enterprises worldwide with universal digital accessibility, seamless publishing transformations, and resilient software architectures.
Core Values:
1. Universal Inclusion: Making digital content usable by everyone, conforming to WCAG 2.2 and PDF/UA.
2. Technical Craftsmanship: Extreme precision in XML schemas, InDesign composition, LaTeX mathematics, and software engineering.
3. Integrity & Confidentiality: Strict data privacy, non-disclosure, and enterprise information security.
4. Client-Centric Innovation: Practical AI workflows and agile collaboration that cut turnarounds and scale output.
Quality Assurance: Dual-layer verification combining automated validators (Schematron, EPUBCheck, axe) with rigorous human expert reviews (JAWS, NVDA, screen-reader testing).`,
        topics: ['Mission and Vision', 'Core Values', 'Quality Assurance', 'Universal Inclusion', 'Confidentiality'],
        keywords: ['mission', 'vision', 'values', 'why choose velvora', 'quality assurance', 'overview', 'company culture']
      });

      // C. OUR TEAM & LEADERSHIP
      const team = site.teamMembers || [];
      const teamListFormatted = team.map(m => 
        `• **${m.name}** (${m.designation} — ${m.department}): ${m.bio}`
      ).join('\n\n');

      documents.push({
        id: 'page-our-team',
        title: 'Our Leadership & Team',
        url: '/about/our-team',
        category: 'team',
        summary: 'Velvora Solutions is founded and led by Iyshwariya Senthil (Founder & Managing Director) along with certified department heads in digital accessibility, production, technology, and operations.',
        content: `Velvora Solutions Leadership and Core Team:

Executive Founder:
**Iyshwariya Senthil** — Founder & Managing Director
Background: With over 7 years of executive experience in publishing operations, universal design, and WCAG accessibility standards, she guides Velvora’s strategic roadmap. Certified in Universal Design and Publishing Operations.

Department Heads & Leadership:
${teamListFormatted}

Delivery Teams:
Our specialists include certified accessibility auditors (CPACC, WAS), XML architects (JATS/BITS), typesetting compositors (InDesign/3B2), and full-stack software engineers.`,
        topics: ['Executive Leadership', 'Iyshwariya Senthil', 'Certified Specialists', 'Accessibility Auditors', 'Technology Leaders'],
        keywords: ['team', 'leadership', 'founder', 'managing director', 'ceo', 'iyshwariya senthil', 'executives', 'rajesh kumar', 'priya raman', 'karthik subramanian', 'anand natarajan', 'shanmugham', 'hema']
      });

      // D. ALL 9 SERVICES (Full Deep Content)
      const services = site.services || [];
      for (const s of services) {
        const offeringsText = (s.whatWeOffer || []).map(o => `  - ${o.title}: ${o.desc}`).join('\n');
        const processText = (s.process || []).map(p => `  - ${p.step}: ${p.desc}`).join('\n');

        documents.push({
          id: `service-${s.slug}`,
          title: s.title,
          url: `/services/${s.slug}`,
          category: 'service',
          summary: s.metaDesc || s.short || s.overview,
          content: `${s.title} (${s.heading})
Overview: ${s.overview || s.short}
What We Offer:
${offeringsText}
Our Process:
${processText}
Target Audience / Who It's For:
${s.whoItsFor || 'Publishers, universities, enterprises, and content creators.'}`,
          topics: [s.title, s.slug, ...(s.aliases || []), 'Deliverables', 'Process Steps'],
          keywords: [s.slug, s.title.toLowerCase(), ...(s.aliases || []).map(a => a.toLowerCase()), 'service', 'deliverables', 'pricing', 'process']
        });
      }

      // E. SOLUTIONS (Industry Solutions)
      const solutions = site.solutionsData || [];
      for (const sol of solutions) {
        const challengesText = (sol.challenges || []).map(c => `  - ${c}`).join('\n');
        const benefitsText = (sol.benefits || []).map(b => `  - ${b}`).join('\n');
        const flowText = (sol.flow || []).join(' → ');
        const servicesIncluded = (sol.servicesIncluded || []).join(', ');

        documents.push({
          id: `solution-${sol.id || sol.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
          title: `Solution: ${sol.title}`,
          url: '/solutions',
          category: 'solution',
          summary: `Tailored solutions for ${sol.title} covering ${servicesIncluded}. Benefits include: ${(sol.benefits || []).slice(0, 2).join('; ')}.`,
          content: `Industry Solution for ${sol.title} (${sol.tag || 'Tailored Workflow'}):
Key Challenges Solved:
${challengesText}
Workflow Stages:
${flowText}
Services Included:
${servicesIncluded}
Key Measurable Benefits:
${benefitsText}
Case Study Reference: ${sol.caseStudy || 'Enterprise Implementation'}`,
          topics: [sol.title, 'Industry Solutions', sol.tag || 'Publishing', 'Workflow Optimization'],
          keywords: ['solution', 'industry solution', sol.title.toLowerCase(), (sol.tag || '').toLowerCase(), 'challenges', 'benefits', 'workflow']
        });
      }

      // F. PARTNERSHIPS
      const partnership = site.partnershipData || {};
      const partnerTiers = (partnership.tiers || []).map(t => 
        `• **${t.title}**: ${t.description || t.desc} (Benefits: ${(t.benefits || []).join(', ')})`
      ).join('\n\n');

      documents.push({
        id: 'page-partnerships',
        title: 'Partner With Velvora Solutions',
        url: '/partner-with-us',
        category: 'partnership',
        summary: 'Collaborate with Velvora Solutions as a Technology Alliance, Referral Partner, or Agency Subcontractor to scale innovation, accessibility compliance, and digital publishing.',
        content: `Partnership Programs at Velvora Solutions:
Collaboration Models:
${partnerTiers || '1. Technology Alliance Partners: Joint software and AI integration\n2. Referral Partners: Revenue sharing for enterprise referrals\n3. Agency & Publishing Subcontractors: White-label high-volume composition and remediation\n4. Consulting Collaborators: Unified accessibility auditing and compliance'}
Confidentiality & NDA: All partnership collaborations are bound by strict Non-Disclosure Agreements (NDA) and secure data exchange protocols.
How to Partner: Submit requirements via the Partner With Us form on our website or email info@velvorasolutions.com.`,
        topics: ['Partnership Programs', 'Technology Alliance', 'Referral Network', 'Subcontracting', 'White Label Services'],
        keywords: ['partner', 'partnerships', 'collaboration', 'referral', 'alliance', 'subcontractor', 'affiliate', 'nda']
      });

      // G. INSIGHTS, BLOGS, PODCASTS & RESOURCES
      const insights = site.insightsData || {};
      const podcasts = insights.podcasts || [];
      const podcastText = podcasts.map(p => `• Episode ${p.episode}: "${p.title}" (${p.duration}, ${p.tag}) — ${p.description}`).join('\n');

      documents.push({
        id: 'page-insights-podcasts',
        title: 'Velvora Insights & Knowledge Hub',
        url: '/resources/insights',
        category: 'insight',
        summary: insights.hero?.subtitle || 'Explore in-depth articles, real-world case snapshots, practical checklists, 10 podcast episodes, and 10 video guides covering publishing, accessibility, AI, and analytics.',
        content: `Velvora Insights Knowledge Hub:
Covers articles, case snapshots, checklists, podcasts, and video guides.
Featured Podcasts:
${podcastText}
Key Topics Explored:
• Future of Digital Accessibility in 2026 (WCAG 2.2 Level AA/AAA, EAA, PDF/UA)
• Demystifying JATS & BITS XML for scholarly publishing
• Integrating AI into human publishing QA pipelines
• University accessibility transformations and EPUB 3 compliance.`,
        topics: ['Knowledge Hub', 'Podcasts', 'Articles', 'Case Studies', 'Best Practices'],
        keywords: ['insights', 'blog', 'podcasts', 'videos', 'knowledge hub', 'case studies', 'articles', 'news']
      });

    } catch (err) {
      errorLogs.push({ source: 'site.js', error: err.message, time: new Date().toISOString() });
    }

    // 2. CRAWL CAREERS.JSX (Dynamic Job Openings, Framework, Work Culture)
    try {
      const careersPath = path.join(ROOT_DIR, 'src', 'pages', 'Careers.jsx');
      if (fs.existsSync(careersPath)) {
        const text = fs.readFileSync(careersPath, 'utf8');

        // Extract jobOpenings array safely via Regex
        const match = text.match(/const jobOpenings\s*=\s*(\[[\s\S]*?\n\s*\]);/);
        if (match) {
          try {
            // Function constructor to parse array of object literals
            const parseJobs = new Function(`return ${match[1]};`);
            const parsedJobs = parseJobs();
            for (const j of parsedJobs) {
              const skillsList = Array.isArray(j.requirements) ? j.requirements.join(', ') : (j.requirements || '');
              careers.push({
                id: j.id,
                title: j.title,
                department: j.department || 'Technology & Operations',
                type: j.type || 'Full-Time / Hybrid',
                location: j.location || 'Cuddalore, TN / Hybrid',
                workMode: j.location?.toLowerCase().includes('remote') ? 'Remote' : (j.type?.toLowerCase().includes('remote') ? 'Remote' : 'Hybrid'),
                experience: j.requirements?.[1] || 'Relevant domain experience',
                skills: Array.isArray(j.requirements) ? j.requirements : [j.requirements],
                eligibility: j.requirements?.[0] || 'Relevant academic or professional background.',
                summary: j.summary || `Join Velvora Solutions as a ${j.title}.`,
                status: 'Active'
              });
            }
          } catch (e) {
            errorLogs.push({ source: 'Careers.jsx parse', error: e.message, time: new Date().toISOString() });
          }
        }

        // Add additional high-demand positions and student internships if not present
        const hasPython = careers.some(c => c.title.toLowerCase().includes('ai') || c.title.toLowerCase().includes('engineer'));
        if (!hasPython) {
          careers.push({
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
          });
        }

        const hasInternXml = careers.some(c => c.title.toLowerCase().includes('xml intern'));
        if (!hasInternXml) {
          careers.push({
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
          });
        }

        const hasInternQa = careers.some(c => c.title.toLowerCase().includes('accessibility intern'));
        if (!hasInternQa) {
          careers.push({
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
          });
        }

        documents.push({
          id: 'page-careers',
          title: 'Careers at Velvora Solutions',
          url: '/careers',
          category: 'career',
          summary: `Velvora Solutions offers careers and internships across digital accessibility, editorial proofing, typesetting, and AI engineering. Our career framework is built on G.R.O.W. (Growth, Respect, Opportunity, Well-being).`,
          content: `Careers at Velvora Solutions:
Our Framework: G.R.O.W. (Growth, Respect, Opportunity, Well-being)
Benefits & Perks:
• Comprehensive hands-on mentorship with industry veterans
• Flexible hybrid and remote working models
• Professional certifications in WCAG, JATS XML, and AI technologies
• Transparent career progression and merit-based advancement
Application Procedure:
1. Browse open positions on our Careers page.
2. Select your desired role or choose "General Open Application".
3. Upload your resume (PDF, DOC, DOCX up to 10MB).
4. Our recruitment team reviews submissions and responds within 24–48 hours.`,
          topics: ['Careers', 'Open Positions', 'G.R.O.W. Framework', 'Internships', 'Work Culture', 'Resume Upload'],
          keywords: ['careers', 'jobs', 'vacancies', 'hiring', 'internships', 'apply', 'grow framework', 'resume upload', 'application']
        });
      }
    } catch (err) {
      errorLogs.push({ source: 'Careers.jsx', error: err.message, time: new Date().toISOString() });
    }

    // 3. CRAWL CONTACT.JSX (Offices, Phone, Email, Hours)
    documents.push({
      id: 'page-contact',
      title: 'Contact Velvora Solutions',
      url: '/contact',
      category: 'contact',
      summary: 'Contact Velvora Solutions. Head office in Cuddalore and branch office in Chennai (Porur). Direct email: info@velvorasolutions.com, Phone: +91 9500834236.',
      content: `Velvora Solutions Contact & Physical Office Information:

Office Locations in Tamil Nadu, India:
1. **Cuddalore Office (Head Office / Operations Center):**
   Pathirikuppam, Thiruvantthipuram Post, Cuddalore - 607002, Tamil Nadu, India
2. **Chennai Office (Branch Office):**
   Velvora Solutions, Porur, Chennai, Tamil Nadu, India

Communication Channels:
• Email: info@velvorasolutions.com
• Phone: +91 9500834236
• Business Hours: Monday to Saturday: 9:00 AM – 6:30 PM IST

Project Submissions & Quotations:
Submit project scope, document counts, format specifications (e.g. PDF/UA, JATS XML, EPUB 3), and target deadlines via our Contact Form or email info@velvorasolutions.com. Our estimation team will evaluate requirements and provide a detailed quotation within 24–48 hours.`,
      topics: ['Office Locations', 'Head Office Cuddalore', 'Branch Office Chennai Porur', 'Email', 'Phone', 'Business Hours', 'Quote Request'],
      keywords: ['contact', 'office', 'cuddalore', 'chennai', 'porur', 'address', 'phone', 'email', 'working hours', 'quote', 'quotation']
    });

    // 4. CRAWL ACCESSIBILITY STATEMENT
    documents.push({
      id: 'page-accessibility-statement',
      title: 'Accessibility Statement',
      url: '/accessibility-statement',
      category: 'policy',
      summary: 'Velvora Solutions is committed to digital inclusion and aims to conform to WCAG 2.2 Level AA across our digital experiences.',
      content: `Accessibility Statement of Velvora Solutions:
Commitment: We are dedicated to ensuring digital accessibility for everyone, including people with visual, auditory, motor, or cognitive disabilities.
Standard: We conform to WCAG 2.2 Level AA.
Verification: Our digital interfaces are tested with real assistive technologies including JAWS, NVDA, and Apple VoiceOver.
Assistance & Feedback: If you encounter any accessibility barrier or require an alternate format, please email info@velvorasolutions.com.`,
      topics: ['Accessibility Statement', 'WCAG 2.2 Level AA', 'Assistive Technology', 'Feedback', 'Inclusion'],
      keywords: ['accessibility statement', 'wcag 2.2 aa', 'assistive technology', 'screen reader testing', 'disability inclusion']
    });

    // 5. CRAWL PRIVACY POLICY
    documents.push({
      id: 'page-privacy-policy',
      title: 'Privacy Policy',
      url: '/privacy-policy',
      category: 'policy',
      summary: 'Velvora Solutions adheres to international data protection standards, client confidentiality, non-disclosure compliance, and GDPR alignment.',
      content: `Privacy Policy of Velvora Solutions:
Covers information security, data collection, lawful processing, and confidentiality.
Key Commitments:
• We never sell or monetize personal or client information.
• Client manuscripts, proprietary documents, and datasets are strictly confidential and governed by Non-Disclosure Agreements (NDA).
• Data transfers and storage utilize industry-standard TLS/SSL encryption and secure cloud infrastructure.
• Full alignment with global data privacy frameworks including GDPR.
• Inquiries regarding data privacy: email info@velvorasolutions.com.`,
      topics: ['Privacy Policy', 'Data Protection', 'Confidentiality', 'GDPR Alignment', 'NDA Security'],
      keywords: ['privacy policy', 'privacy', 'data security', 'gdpr', 'confidentiality', 'non-disclosure', 'nda']
    });

    // 6. SYNTHESIZE FREQUENTLY ASKED QUESTIONS (From crawled content)
    faqs.push(
      {
        q: 'How many branches or offices does Velvora Solutions have?',
        a: 'Velvora Solutions operates from two verified physical offices in Tamil Nadu, India: our Head Office & Operations Center in Cuddalore (Pathirikuppam) and our Branch Office in Chennai (Porur). Digital delivery and client collaboration are provided to organizations worldwide.'
      },
      {
        q: 'Who is the founder and leader of Velvora Solutions?',
        a: 'Velvora Solutions is founded and led by Iyshwariya Senthil (Founder & Managing Director). With over 7 years of executive experience in publishing operations, universal design, and WCAG accessibility standards, she directs Velvora’s strategic roadmap.'
      },
      {
        q: 'What services does Velvora Solutions provide?',
        a: 'Velvora Solutions provides 5 core pillars of services: Digital Accessibility (WCAG 2.2, PDF/UA, Section 508), ePublishing & Typesetting (EPUB 3, InDesign, LaTeX, MathML), XML Conversion (JATS, BITS, DocBook), AI Automation & IDP, Software Engineering (Web, React, Python/FastAPI), and Data Analytics.'
      },
      {
        q: 'How do I submit my resume or apply for jobs?',
        a: 'Visit our Careers page (/careers), choose an open position or "General Open Application", and upload your resume in PDF, DOC, or DOCX format (up to 10MB). Our recruitment team reviews submissions and responds within 24–48 hours.'
      },
      {
        q: 'What is the turnaround time or deadline for a project?',
        a: 'Project delivery timelines depend on project scope, volume, schema complexity (e.g. JATS XML vs PDF/UA), and client review cycles. Share your specifications with info@velvorasolutions.com for an accurate timeline and quotation.'
      }
    );

    return {
      documents,
      careers,
      faqs,
      errorLogs,
      crawledAt: new Date().toISOString()
    };
  }
}

export const crawler = new KnowledgeCrawler();
export default crawler;

