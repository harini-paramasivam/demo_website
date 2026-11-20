import { useEffect, useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Share2, 
  Bookmark, 
  Copy, 
  Check, 
  BookOpen, 
  Tag, 
  ExternalLink,
  ShieldCheck,
  Sparkles,
  ChevronRight,
  MessageSquare,
  PenTool,
  Cpu,
  Users
} from 'lucide-react';
import { getArticleBySlug, getRelatedArticles } from '../data/blogData.js';

function getAuthorIcon(author = '', role = '') {
  const text = `${author} ${role}`.toLowerCase();
  if (text.includes('editorial') || text.includes('publishing') || text.includes('formats') || text.includes('composition') || text.includes('press')) {
    return PenTool;
  }
  if (text.includes('accessib') || text.includes('compliance') || text.includes('cpacc') || text.includes('was') || text.includes('qa') || text.includes('quality') || text.includes('assurance')) {
    return ShieldCheck;
  }
  if (text.includes('ai') || text.includes('automation') || text.includes('technology') || text.includes('technical') || text.includes('data') || text.includes('engineering') || text.includes('pdf')) {
    return Cpu;
  }
  if (text.includes('digitiz') || text.includes('ocr')) {
    return BookOpen;
  }
  return Users;
}

// Parses inline markdown like **bold text** and `code` into proper React elements
function formatInlineContent(str) {
  if (!str || typeof str !== 'string') return str;
  const regex = /(\*\*[^*]+\*\*|`[^`]+`)/g;
  const parts = str.split(regex);
  if (parts.length === 1) return str;

  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      return (
        <strong key={i} className="blog-prose-strong">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
      return (
        <code key={i} className="blog-prose-inline-code">
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSec, setActiveSec] = useState(0);

  const article = useMemo(() => getArticleBySlug(slug), [slug]);
  const relatedArticles = useMemo(() => (article ? getRelatedArticles(article.slug, 3) : []), [article]);
  const AuthorIcon = useMemo(() => getAuthorIcon(article?.author, article?.authorRole), [article]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveSec(0);
  }, [slug]);

  // Active section tracking for Table of Contents
  useEffect(() => {
    if (!article || !article.content) return;
    const handleScrollSec = () => {
      const scrollY = window.scrollY;
      article.content.forEach((_, idx) => {
        const el = document.getElementById(`blog-sec-${idx}`);
        if (el) {
          const top = el.offsetTop - 140;
          const bottom = top + el.offsetHeight;
          if (scrollY >= top && scrollY < bottom) {
            setActiveSec(idx);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScrollSec, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollSec);
  }, [article]);

  // Track reading progress
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
          if (totalScroll > 0) {
            const currentProgress = (window.scrollY / totalScroll) * 100;
            setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // SEO Optimization & Structured Data Injection
  useEffect(() => {
    if (!article) return;

    // Document Title
    document.title = `${article.metaTitle || article.title} | Velvora Solutions`;

    // Meta Description
    let metaDescTag = document.querySelector('meta[name="description"]');
    if (!metaDescTag) {
      metaDescTag = document.createElement('meta');
      metaDescTag.name = 'description';
      document.head.appendChild(metaDescTag);
    }
    metaDescTag.setAttribute('content', article.metaDesc || article.summary);

    // Meta Keywords
    if (article.keywords && article.keywords.length > 0) {
      let metaKeywordsTag = document.querySelector('meta[name="keywords"]');
      if (!metaKeywordsTag) {
        metaKeywordsTag = document.createElement('meta');
        metaKeywordsTag.name = 'keywords';
        document.head.appendChild(metaKeywordsTag);
      }
      metaKeywordsTag.setAttribute('content', article.keywords.join(', '));
    }

    // Open Graph Metadata
    const setOgTag = (property, content) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    setOgTag('og:title', article.title);
    setOgTag('og:description', article.summary);
    setOgTag('og:type', 'article');
    setOgTag('og:url', window.location.href);
    if (article.coverImage) {
      setOgTag('og:image', `${window.location.origin}${article.coverImage}`);
    }

    // JSON-LD Structured Data Schema (BlogPosting / Article)
    const schemaScriptId = 'article-json-ld';
    let scriptTag = document.getElementById(schemaScriptId);
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = schemaScriptId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    const schemaData = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: article.title,
      description: article.summary,
      datePublished: article.publishedDate,
      dateModified: article.publishedDate,
      author: {
        '@type': 'Organization',
        name: 'Velvora Solutions',
        url: 'https://velvorasolutions.com'
      },
      publisher: {
        '@type': 'Organization',
        name: 'Velvora Solutions',
        logo: {
          '@type': 'ImageObject',
          url: 'https://velvorasolutions.com/logo.png'
        }
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': window.location.href
      },
      keywords: (article.keywords || []).join(', ')
    };

    scriptTag.text = JSON.stringify(schemaData);

    return () => {
      // Clean up script on unmount
      const existing = document.getElementById(schemaScriptId);
      if (existing) existing.remove();
    };
  }, [article]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  if (!article) {
    return (
      <div className="blog-not-found-section">
        <div className="container">
          <div className="blog-empty-state">
            <BookOpen size={56} className="blog-empty-icon" aria-hidden="true" />
            <h2>Article Not Found</h2>
            <p>The publication you are looking for may have been moved, updated, or archived.</p>
            <div className="btn-row" style={{ justifyContent: 'center', marginTop: '1.5rem' }}>
              <Link to="/blog" className="btn btn--orange">
                <ArrowLeft size={16} aria-hidden="true" /> Back to Knowledge Hub
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const encodedUrl = encodeURIComponent(window.location.href);
  const encodedTitle = encodeURIComponent(article.title);

  return (
    <article className="blog-post-page" itemScope itemType="https://schema.org/BlogPosting">
      {/* 1. TOP READING PROGRESS BAR */}
      <div 
        className="blog-reading-progress" 
        style={{ width: `${scrollProgress}%` }} 
        aria-hidden="true" 
      />

      {/* 2. BREADCRUMBS & ARTICLE HERO WITH VELVORA FUTURISTIC GRAPHICS */}
      <header className="blog-post-hero phero phero--futuristic">
        {/* Full-Bleed Panoramic Cyber Wave Backdrop (Covers entire banner from left to right) */}
        <div className="phero-panoramic-backdrop" aria-hidden="true">
          <svg
            viewBox="0 0 1440 500"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            className="phero-panoramic-svg"
          >
            <defs>
              <linearGradient id="blogPanoGradPrimary" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.18" />
                <stop offset="35%" stopColor="#0284c7" stopOpacity="0.32" />
                <stop offset="70%" stopColor="#38bdf8" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.75" />
              </linearGradient>
              <linearGradient id="blogPanoGradSecondary" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0284c7" stopOpacity="0.12" />
                <stop offset="40%" stopColor="#38bdf8" stopOpacity="0.28" />
                <stop offset="75%" stopColor="#60a5fa" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#00d2ff" stopOpacity="0.6" />
              </linearGradient>
              <filter id="blogPanoGlow" x="-10%" y="-10%" width="120%" height="120%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Undulating Panoramic Topography Wave Mesh Spanning Full Width (0px to 1440px) */}
            <g filter="url(#blogPanoGlow)">
              <path
                d="M -50 380 Q 280 320, 580 360 T 1150 310 Q 1320 280, 1500 340"
                stroke="url(#blogPanoGradPrimary)"
                strokeWidth="1.8"
                strokeDasharray="4 8"
              />
              <path
                d="M -50 410 Q 300 360, 600 400 T 1180 340 Q 1340 310, 1500 370"
                stroke="url(#blogPanoGradSecondary)"
                strokeWidth="1.6"
                strokeDasharray="3 7"
              />
              <path
                d="M -50 440 Q 320 400, 620 430 T 1200 380 Q 1350 340, 1500 410"
                stroke="url(#blogPanoGradPrimary)"
                strokeWidth="1.5"
                strokeDasharray="4 10"
              />
              <path
                d="M -50 470 Q 340 430, 640 465 T 1220 420 Q 1360 380, 1500 450"
                stroke="url(#blogPanoGradSecondary)"
                strokeWidth="1.4"
                strokeDasharray="2 8"
              />
              <path
                d="M -50 160 Q 320 220, 720 180 T 1500 130"
                stroke="url(#blogPanoGradSecondary)"
                strokeWidth="1.2"
                strokeDasharray="6 12"
                opacity="0.35"
              />

              <line x1="120" y1="430" x2="160" y2="350" stroke="url(#blogPanoGradPrimary)" strokeWidth="1.2" strokeDasharray="3 6" opacity="0.4" />
              <line x1="280" y1="440" x2="320" y2="360" stroke="url(#blogPanoGradPrimary)" strokeWidth="1.2" strokeDasharray="3 6" opacity="0.45" />
              <line x1="450" y1="450" x2="490" y2="370" stroke="url(#blogPanoGradPrimary)" strokeWidth="1.2" strokeDasharray="3 6" opacity="0.5" />
              <line x1="640" y1="465" x2="680" y2="385" stroke="url(#blogPanoGradPrimary)" strokeWidth="1.2" strokeDasharray="3 6" opacity="0.55" />
              <line x1="840" y1="450" x2="880" y2="370" stroke="url(#blogPanoGradPrimary)" strokeWidth="1.4" strokeDasharray="3 6" opacity="0.6" />
              <line x1="1050" y1="430" x2="1090" y2="350" stroke="url(#blogPanoGradPrimary)" strokeWidth="1.4" strokeDasharray="3 6" opacity="0.65" />
              <line x1="1260" y1="410" x2="1300" y2="330" stroke="url(#blogPanoGradPrimary)" strokeWidth="1.5" strokeDasharray="3 6" opacity="0.7" />

              <circle cx="80" cy="180" r="3.5" fill="#38bdf8" opacity="0.5" />
              <circle cx="210" cy="140" r="4" fill="#38bdf8" opacity="0.6" />
              <circle cx="360" cy="190" r="3.5" fill="#38bdf8" opacity="0.5" />
              <circle cx="520" cy="130" r="4.5" fill="#60a5fa" opacity="0.65" />
              <circle cx="700" cy="170" r="4" fill="#38bdf8" opacity="0.6" />
              <circle cx="890" cy="120" r="5" fill="#38bdf8" opacity="0.7" />
              <circle cx="1080" cy="160" r="5.5" fill="#60a5fa" opacity="0.75" />
              <circle cx="1290" cy="110" r="6" fill="#38bdf8" opacity="0.8" />

              <line x1="80" y1="180" x2="210" y2="140" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 6" opacity="0.25" />
              <line x1="210" y1="140" x2="360" y2="190" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 6" opacity="0.25" />
              <line x1="360" y1="190" x2="520" y2="130" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 6" opacity="0.3" />
              <line x1="520" y1="130" x2="700" y2="170" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 6" opacity="0.3" />
              <line x1="700" y1="170" x2="890" y2="120" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 6" opacity="0.35" />
              <line x1="890" y1="120" x2="1080" y2="160" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 6" opacity="0.4" />
              <line x1="1080" y1="160" x2="1290" y2="110" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 6" opacity="0.45" />
            </g>
          </svg>
        </div>

        {/* Optical Read-Contrast Scrim (Protects text on the left so graphics NEVER disturb words) */}
        <div className="phero-read-scrim" aria-hidden="true" />

        {/* Volumetric Multi-Spectrum Aurora Glow */}
        <div className="phero-backglow phero-backglow--cyan" aria-hidden="true" />
        <div className="phero-backglow phero-backglow--sapphire" aria-hidden="true" />
        <div className="phero-ambient-orb" aria-hidden="true" />

        {/* Rich 3D Volumetric Isometric & Prismatic Showcase Art Stage on the Right */}
        <div className="phero-art-stage phero-art-stage--resources" aria-hidden="true">
          <svg
            viewBox="0 0 500 500"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="phero-art-svg"
          >
            <defs>
              <filter id="blogPheroGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="12" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="blogPheroCoreGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="18" result="intenseGlow" />
                <feMerge>
                  <feMergeNode in="intenseGlow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <linearGradient id="blogGlowGradCyan" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#0284c7" stopOpacity="0.8" />
              </linearGradient>
              <linearGradient id="blogGlassLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#0369a1" stopOpacity="0.65" />
              </linearGradient>
              <radialGradient id="blogQuantumOrbCyan" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="35%" stopColor="#38bdf8" stopOpacity="0.9" />
                <stop offset="70%" stopColor="#0284c7" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
              </radialGradient>
            </defs>

            <g filter="url(#blogPheroGlow)">
              {/* Deep Space Radial Atmosphere */}
              <circle cx="250" cy="250" r="145" fill="url(#blogQuantumOrbCyan)" opacity="0.3" filter="url(#blogPheroCoreGlow)" />

              {/* 3D Tilted Orbital Gyro Rings */}
              <ellipse cx="250" cy="250" rx="200" ry="70" transform="rotate(-30 250 250)" stroke="url(#blogGlowGradCyan)" strokeWidth="2.5" fill="none" opacity="0.8" />
              <ellipse cx="250" cy="250" rx="175" ry="58" transform="rotate(40 250 250)" stroke="url(#blogGlowGradCyan)" strokeWidth="2" strokeDasharray="16 10" fill="none" opacity="0.85" />
              <ellipse cx="250" cy="250" rx="145" ry="46" transform="rotate(-75 250 250)" stroke="#00f2fe" strokeWidth="2" fill="none" opacity="0.9" />

              {/* Multi-Layer Volumetric Spherical Core */}
              <circle cx="250" cy="250" r="72" fill="url(#blogGlassLeft)" stroke="#38bdf8" strokeWidth="2" />
              <circle cx="250" cy="250" r="50" fill="url(#blogQuantumOrbCyan)" filter="url(#blogPheroCoreGlow)" />
              <circle cx="235" cy="235" r="22" fill="#ffffff" opacity="0.9" />

              {/* Prismatic Horizon Ray */}
              <line x1="50" y1="250" x2="450" y2="250" stroke="url(#blogGlowGradCyan)" strokeWidth="1.8" opacity="0.55" strokeDasharray="8 6" />

              {/* Orbital Satellite Nodes */}
              <circle cx="390" cy="170" r="9" fill="#00f2fe" />
              <circle cx="110" cy="330" r="8" fill="#38bdf8" />
              <circle cx="330" cy="355" r="7" fill="#60a5fa" />
              <circle cx="170" cy="145" r="6" fill="#ffffff" />
            </g>
          </svg>
          <div className="phero-art-flare phero-art-flare--primary phero-art-flare--resources" />
          <div className="phero-art-flare phero-art-flare--secondary phero-art-flare--resources" />
        </div>

        {/* Foreground Content Container */}
        <div className="container" style={{ position: 'relative', zIndex: 4 }}>
          {/* Metadata Row */}
          <div className="blog-post-meta">
            <span className="blog-cat-badge">{article.categoryLabel}</span>
            <span className="blog-post-date">
              <Calendar size={14} aria-hidden="true" />
              <time dateTime={article.publishedDate}>{article.publishedDate}</time>
            </span>
            <span className="blog-post-read">
              <Clock size={14} aria-hidden="true" />
              <span>{article.readTime}</span>
            </span>
          </div>

          {/* Main Article Title */}
          <h1 className="blog-post-h1 phero-title-glow" itemProp="headline">
            {article.title}
          </h1>

          {/* Lead Excerpt */}
          {article.summary && (
            <p className="blog-hero-lead-text phero-lead-glow">
              {article.summary}
            </p>
          )}

          {/* Author Badge */}
          <div className="blog-post-author-bar">
            <div className="blog-author-avatar">
              <AuthorIcon size={20} className="blog-author-icon" aria-hidden="true" />
            </div>
            <div className="blog-author-details">
              <span className="blog-author-name" itemProp="author">{article.author}</span>
              <span className="blog-author-role">{article.authorRole} · Velvora Solutions</span>
            </div>
          </div>
        </div>
      </header>

      {/* 3. MAIN ARTICLE BODY */}
      <div className="section blog-post-body-section">
        <div className="container blog-post-container">
          <div className="blog-post-layout">
            {/* Left Content Column */}
            <main className="blog-main-content">
              {/* Executive Summary & Key Takeaways Card */}
              {article.keyTakeaways && article.keyTakeaways.length > 0 && (
                <aside className="blog-takeaways-card" aria-label="Key Takeaways">
                  <div className="blog-takeaways-card-head">
                    <Sparkles size={18} className="blog-takeaways-icon" aria-hidden="true" />
                    <h3>Executive Summary & Key Takeaways</h3>
                  </div>
                  <p className="blog-takeaways-intro">{article.summary}</p>
                  <ul className="blog-takeaways-list">
                    {article.keyTakeaways.map((takeaway, idx) => (
                      <li key={idx}>
                        <CheckCircle2 size={16} className="blog-takeaway-check" aria-hidden="true" />
                        <span>{formatInlineContent(takeaway)}</span>
                      </li>
                    ))}
                  </ul>
                </aside>
              )}

              {/* Featured Technical Figure */}
              {article.coverImage && (
                <figure className="blog-post-figure">
                  <img
                    src={article.coverImage}
                    alt={article.title}
                    className="blog-post-cover"
                    loading="eager"
                  />
                  <figcaption className="blog-post-figcaption">
                    Technical Architecture · {article.categoryLabel} Overview
                  </figcaption>
                </figure>
              )}

              {/* Rich Prose Content */}
              <div className="blog-prose" itemProp="articleBody">
                {article.content.map((sec, idx) => (
                  <section key={idx} id={`blog-sec-${idx}`} className="blog-prose-section">
                    <h2 className="blog-prose-h2">{sec.heading}</h2>
                    
                    {sec.text && (
                      <div className="blog-prose-paragraphs">
                        {sec.text.split('\n\n').map((paragraph, pIdx) => {
                          if (paragraph.startsWith('• ')) {
                            const bulletItems = paragraph.split('\n• ');
                            return (
                              <ul key={pIdx} className="blog-prose-list">
                                {bulletItems.map((item, bIdx) => (
                                  <li key={bIdx}>{formatInlineContent(item.replace(/^• /, ''))}</li>
                                ))}
                              </ul>
                            );
                          }
                          if (paragraph.match(/^\d+\.\s/)) {
                            const numberedItems = paragraph.split(/\n(?=\d+\.\s)/);
                            return (
                              <ol key={pIdx} className="blog-prose-numlist">
                                {numberedItems.map((item, nIdx) => (
                                  <li key={nIdx}>{formatInlineContent(item.replace(/^\d+\.\s/, ''))}</li>
                                ))}
                              </ol>
                            );
                          }
                          return <p key={pIdx}>{formatInlineContent(paragraph)}</p>;
                        })}
                      </div>
                    )}

                    {sec.callout && (
                      <blockquote className="blog-prose-callout">
                        <p>{formatInlineContent(sec.callout)}</p>
                      </blockquote>
                    )}
                  </section>
                ))}
              </div>

              {/* Contextual Service Connection Card */}
              {article.serviceLink && (
                <div className="blog-service-bridge-card">
                  <div className="blog-bridge-content">
                    <span className="blog-bridge-eyebrow">Enterprise Capability</span>
                    <h4>Looking to Implement These Standards?</h4>
                    <p>
                      Velvora Solutions delivers certified engineering support, high-volume production, and verified compliance guarantees.
                    </p>
                  </div>
                  <Link to={article.serviceLink.to} className="btn btn--orange blog-bridge-btn">
                    <span>{article.serviceLink.label}</span>
                    <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </div>
              )}

              {/* Keywords Tag Strip */}
              {article.keywords && article.keywords.length > 0 && (
                <div className="blog-post-tags-row">
                  <span className="blog-tags-label">
                    <Tag size={15} aria-hidden="true" /> Topics:
                  </span>
                  <div className="blog-tags-list">
                    {article.keywords.map((kw) => (
                      <span key={kw} className="blog-tag-pill">
                        #{kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Share & Feedback Actions Bar */}
              <div className="blog-share-bar">
                <span className="blog-share-label">Share this technical publication:</span>
                <div className="blog-share-btns">
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="blog-share-btn"
                    aria-label="Copy article link"
                    title="Copy Link to Clipboard"
                  >
                    {copied ? <Check size={16} className="text-success" /> : <Copy size={16} />}
                    <span>{copied ? 'Link Copied!' : 'Copy Link'}</span>
                  </button>

                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="blog-share-btn"
                    aria-label="Share on LinkedIn (opens in new tab)"
                  >
                    <span>LinkedIn</span>
                  </a>

                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="blog-share-btn"
                    aria-label="Share on Twitter / X (opens in new tab)"
                  >
                    <span>X (Twitter)</span>
                  </a>

                  <a
                    href={`https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="blog-share-btn"
                    aria-label="Share via WhatsApp"
                  >
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Back to Blog Navigation */}
              <div className="blog-back-nav">
                <Link to="/blog" className="btn btn--outline">
                  <ArrowLeft size={16} aria-hidden="true" />
                  <span>Return to All Articles</span>
                </Link>
                <Link to="/contact" className="btn btn--orange">
                  <span>Consult an Accessibility Specialist</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </main>

            {/* Right Sidebar (Evenly Distributed Content to Eliminate Empty Space) */}
            <aside className="blog-sidebar" aria-label="Article Sidebar">
              {/* 1. Interactive Table of Contents */}
              {article.content && article.content.length > 0 && (
                <div className="blog-sidebar-widget blog-toc-widget">
                  <div className="blog-toc-head">
                    <Bookmark size={16} className="blog-widget-head-icon" aria-hidden="true" />
                    <h4>In This Article</h4>
                  </div>
                  <nav className="blog-toc-list" aria-label="Table of Contents">
                    {article.content.map((sec, idx) => (
                      <a
                        key={idx}
                        href={`#blog-sec-${idx}`}
                        onClick={(e) => {
                          e.preventDefault();
                          const el = document.getElementById(`blog-sec-${idx}`);
                          if (el) {
                            const y = el.getBoundingClientRect().top + window.pageYOffset - 96;
                            window.scrollTo({ top: y, behavior: 'smooth' });
                            setActiveSec(idx);
                          }
                        }}
                        className={`blog-toc-item ${activeSec === idx ? 'is-active' : ''}`}
                      >
                        <span className="blog-toc-num">{String(idx + 1).padStart(2, '0')}</span>
                        <span className="blog-toc-text">{sec.heading}</span>
                      </a>
                    ))}
                  </nav>
                </div>
              )}

              {/* 2. Key Architectural Takeaways */}
              {article.keyTakeaways && article.keyTakeaways.length > 0 && (
                <div className="blog-sidebar-widget blog-takeaways-widget">
                  <div className="blog-sidebar-widget-head">
                    <Sparkles size={16} className="blog-widget-head-icon" aria-hidden="true" />
                    <h4>Executive Highlights</h4>
                  </div>
                  <ul className="blog-sidebar-takeaways">
                    {article.keyTakeaways.map((item, i) => (
                      <li key={i}>
                        <CheckCircle2 size={14} className="blog-check-icon" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* 3. Author & Editorial Authority Badge */}
              <div className="blog-sidebar-widget blog-author-widget">
                <div className="blog-sidebar-widget-head">
                  <ShieldCheck size={16} className="blog-widget-head-icon" aria-hidden="true" />
                  <h4>Practice Authority</h4>
                </div>
                <div className="blog-author-widget-body">
                  <div className="blog-author-widget-avatar">
                    <AuthorIcon size={22} className="blog-author-icon" />
                  </div>
                  <div>
                    <h5 className="blog-author-widget-name">{article.author}</h5>
                    <span className="blog-author-widget-role">{article.authorRole}</span>
                  </div>
                </div>
                <p className="blog-author-widget-note">
                  Peer-reviewed and certified by Velvora Solutions Technical Architecture Division for industry standards compliance.
                </p>
              </div>

              {/* 4. Recommended Reading / Related Technical Publications */}
              {relatedArticles && relatedArticles.length > 0 && (
                <div className="blog-sidebar-widget blog-related-mini-widget">
                  <div className="blog-sidebar-widget-head">
                    <BookOpen size={16} className="blog-widget-head-icon" aria-hidden="true" />
                    <h4>Recommended Reading</h4>
                  </div>
                  <div className="blog-sidebar-related-list">
                    {relatedArticles.map((rel) => (
                      <Link key={rel.id} to={`/blog/${rel.slug}`} className="blog-sidebar-rel-card">
                        <div className="blog-sidebar-rel-thumb">
                          <img src={rel.coverImage} alt="" loading="lazy" />
                        </div>
                        <div className="blog-sidebar-rel-info">
                          <span className="blog-sidebar-rel-cat">{rel.categoryLabel.split('&')[0]}</span>
                          <h5 className="blog-sidebar-rel-title">{rel.title}</h5>
                          <span className="blog-sidebar-rel-read">{rel.readTime}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* 5. Practice Credibility Box */}
              <div className="blog-sidebar-widget blog-practice-widget">
                <span className="eyebrow">About Velvora</span>
                <h3>Engineering Quality &amp; Inclusion</h3>
                <p>
                  Velvora Solutions is a content and technology services partner delivering ePublishing, XML conversion, digital accessibility, and AI automation.
                </p>
                <div className="blog-practice-check-list">
                  <div className="blog-practice-check">
                    <CheckCircle2 size={15} className="blog-check-icon" />
                    <span>CPACC &amp; WAS Certified Practice</span>
                  </div>
                  <div className="blog-practice-check">
                    <CheckCircle2 size={15} className="blog-check-icon" />
                    <span>ISO 14289-1 (PDF/UA) Standards</span>
                  </div>
                  <div className="blog-practice-check">
                    <CheckCircle2 size={15} className="blog-check-icon" />
                    <span>DAISY &amp; W3C Validated EPUB 3</span>
                  </div>
                </div>
                <Link to="/about/company-overview" className="blog-sidebar-link">
                  Learn more about our methodology <ChevronRight size={14} />
                </Link>
              </div>

              {/* 6. Rapid Assessment Card */}
              <div className="blog-sidebar-widget blog-assessment-widget">
                <h4>Have a Similar Technical Challenge?</h4>
                <p>
                  Share your sample files or compliance requirements for a confidential technical evaluation within one business day.
                </p>
                <Link to="/contact" className="btn btn--orange btn--block">
                  Request Technical Assessment <ArrowRight size={15} />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </div>

      {/* 4. RELATED ARTICLES GRID */}
      {relatedArticles.length > 0 && (
        <section className="section section--tint blog-related-section" aria-label="Related Publications">
          <div className="container">
            <div className="blog-related-header">
              <span className="eyebrow">Continue Exploring</span>
              <h2>Related Technical Publications</h2>
              <p className="lead">
                Explore further insights and implementation standards within our digital publishing and accessibility library.
              </p>
            </div>

            <div className="blog-related-grid">
              {relatedArticles.map((rel) => (
                <article key={rel.id} className="blog-card-pro">
                  <div className="blog-card-media">
                    <Link to={`/blog/${rel.slug}`} tabIndex="-1" aria-hidden="true">
                      <img
                        src={rel.coverImage}
                        alt=""
                        className="blog-card-img"
                        loading="lazy"
                      />
                    </Link>
                    <span className="blog-card-cat-badge">{rel.categoryLabel}</span>
                  </div>
                  <div className="blog-card-body">
                    <div className="blog-card-meta">
                      <span className="blog-card-date">
                        <Calendar size={13} aria-hidden="true" />
                        <span>{rel.publishedDate}</span>
                      </span>
                      <span className="blog-card-sep" aria-hidden="true">·</span>
                      <span className="blog-card-read">
                        <Clock size={13} aria-hidden="true" />
                        <span>{rel.readTime}</span>
                      </span>
                    </div>

                    <h3 className="blog-card-title">
                      <Link to={`/blog/${rel.slug}`}>{rel.title}</Link>
                    </h3>

                    <p className="blog-card-summary">{rel.summary}</p>

                    <div className="blog-card-footer">
                      <Link to={`/blog/${rel.slug}`} className="blog-card-link">
                        <span>Read Article</span>
                        <ArrowRight size={15} aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}

