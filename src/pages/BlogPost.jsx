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
  MessageSquare
} from 'lucide-react';
import { getArticleBySlug, getRelatedArticles } from '../data/blogData.js';

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSec, setActiveSec] = useState(0);

  const article = useMemo(() => getArticleBySlug(slug), [slug]);
  const relatedArticles = useMemo(() => (article ? getRelatedArticles(article.slug, 3) : []), [article]);

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

      {/* 2. BREADCRUMBS & ARTICLE HERO */}
      <header className="blog-post-hero">
        <div className="container">
          <div className="blog-hero-layout">
            {/* Left Content Column */}
            <div className="blog-hero-left">
              {/* Breadcrumb Navigation */}
              <nav className="blog-breadcrumbs" aria-label="Breadcrumb">
                <Link to="/">Home</Link>
                <span className="blog-bc-sep">/</span>
                <Link to="/blog">Blog</Link>
                <span className="blog-bc-sep">/</span>
                <span className="blog-bc-cat">{article.categoryLabel}</span>
              </nav>

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
              <h1 className="blog-post-h1" itemProp="headline">
                {article.title}
              </h1>

              {/* Lead Excerpt */}
              {article.summary && (
                <p className="blog-hero-lead-text">
                  {article.summary}
                </p>
              )}

              {/* Author Badge */}
              <div className="blog-post-author-bar">
                <div className="blog-author-avatar">
                  <ShieldCheck size={20} className="blog-author-icon" aria-hidden="true" />
                </div>
                <div className="blog-author-details">
                  <span className="blog-author-name" itemProp="author">{article.author}</span>
                  <span className="blog-author-role">{article.authorRole} · Velvora Solutions</span>
                </div>
              </div>
            </div>

            {/* Right Graphic Banner Card */}
            {article.coverImage && (
              <div className="blog-hero-right">
                <div className="blog-hero-graphic-card">
                  <div className="blog-hero-ambient-glow" aria-hidden="true" />
                  <div className="blog-hero-img-wrap">
                    <img
                      src={article.coverImage}
                      alt={article.title}
                      className="blog-hero-cover-img"
                      loading="eager"
                    />
                    <div className="blog-hero-img-overlay" />
                    <div className="blog-hero-card-badge">
                      <span className="blog-hero-pulse-dot" />
                      <span>{article.categoryLabel}</span>
                    </div>
                  </div>
                  <div className="blog-hero-card-footer">
                    <div className="blog-hero-card-meta-item">
                      <ShieldCheck size={15} className="blog-hero-meta-icon" />
                      <span>Production Architecture</span>
                    </div>
                    <span className="blog-hero-card-spec">ISO / WCAG Audited</span>
                  </div>
                </div>
              </div>
            )}
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
                        <span>{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </aside>
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
                                  <li key={bIdx}>{item.replace(/^• /, '')}</li>
                                ))}
                              </ul>
                            );
                          }
                          if (paragraph.match(/^\d+\.\s/)) {
                            const numberedItems = paragraph.split(/\n(?=\d+\.\s)/);
                            return (
                              <ol key={pIdx} className="blog-prose-numlist">
                                {numberedItems.map((item, nIdx) => (
                                  <li key={nIdx}>{item.replace(/^\d+\.\s/, '')}</li>
                                ))}
                              </ol>
                            );
                          }
                          return <p key={pIdx}>{paragraph}</p>;
                        })}
                      </div>
                    )}

                    {sec.callout && (
                      <blockquote className="blog-prose-callout">
                        <p>{sec.callout}</p>
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
                    <Bookmark size={15} className="accent" aria-hidden="true" />
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
                    <Sparkles size={15} className="accent" aria-hidden="true" />
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
                  <ShieldCheck size={15} className="accent" aria-hidden="true" />
                  <h4>Practice Authority</h4>
                </div>
                <div className="blog-author-widget-body">
                  <div className="blog-author-widget-avatar">
                    <ShieldCheck size={22} className="accent" />
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
                    <BookOpen size={15} className="accent" aria-hidden="true" />
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

