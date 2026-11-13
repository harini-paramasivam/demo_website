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
import { CtaBand } from '../components/ui.jsx';

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const article = useMemo(() => getArticleBySlug(slug), [slug]);
  const relatedArticles = useMemo(() => (article ? getRelatedArticles(article.slug, 3) : []), [article]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

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

              {/* Cover Image Feature */}
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
                  <section key={idx} className="blog-prose-section">
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

            {/* Right Sticky Sidebar */}
            <aside className="blog-sidebar" aria-label="Article Sidebar">
              {/* Practice Credibility Box */}
              <div className="blog-sidebar-widget blog-practice-widget">
                <span className="eyebrow">About Velvora</span>
                <h3>Engineering Quality & Inclusion</h3>
                <p>
                  Velvora Solutions is a content and technology services partner. We deliver ePublishing, XML conversion, digital accessibility (WCAG 2.2, PDF/UA, Section 508), and AI automation to global organizations.
                </p>
                <div className="blog-practice-check-list">
                  <div className="blog-practice-check">
                    <CheckCircle2 size={15} className="blog-check-icon" />
                    <span>CPACC & WAS Certified Practice</span>
                  </div>
                  <div className="blog-practice-check">
                    <CheckCircle2 size={15} className="blog-check-icon" />
                    <span>ISO 14289-1 (PDF/UA) Standards</span>
                  </div>
                  <div className="blog-practice-check">
                    <CheckCircle2 size={15} className="blog-check-icon" />
                    <span>DAISY & W3C Validated EPUB 3</span>
                  </div>
                </div>
                <Link to="/about/company-overview" className="blog-sidebar-link">
                  Learn more about our methodology <ChevronRight size={14} />
                </Link>
              </div>

              {/* Rapid Assessment Card */}
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

      {/* 5. CLOSING CTA BAND */}
      <CtaBand
        title="Ready to Ensure Complete Accessibility and Publishing Precision?"
        text="Connect with our practice leaders to schedule a technical discovery call, review sample files, or discuss enterprise SLAs."
        primaryBtnText="Get in Touch with Our Team"
        primaryBtnTo="/contact"
        secondaryBtnText="Explore All Services"
        secondaryBtnTo="/services"
      />
    </article>
  );
}

