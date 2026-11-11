import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Clock, 
  Calendar, 
  ArrowRight, 
  BookOpen, 
  Sparkles, 
  Tag, 
  CheckCircle2, 
  X,
  FileText,
  ShieldCheck,
  Cpu,
  Layers,
  ChevronRight
} from 'lucide-react';
import { blogArticles, blogCategories, getFeaturedArticle } from '../data/blogData.js';
import { PageHero, CtaBand } from '../components/ui.jsx';

export default function BlogOverview() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(6);

  // SEO Document Title and Meta Description
  useEffect(() => {
    document.title = 'Industry Blog & Knowledge Hub | Digital Publishing, WCAG & PDF/UA | Velvora Solutions';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Explore technical guides, compliance roadmaps, and industry insights on Digital Publishing, EPUB 3, XML workflows, WCAG 2.2, PDF/UA compliance, and AI automation by Velvora Solutions.'
      );
    }
  }, []);

  const featured = useMemo(() => getFeaturedArticle(), []);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts = { all: blogArticles.length };
    blogArticles.forEach((art) => {
      counts[art.category] = (counts[art.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Filtered articles
  const filteredArticles = useMemo(() => {
    return blogArticles.filter((article) => {
      const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesCategory;

      const matchesText =
        article.title.toLowerCase().includes(query) ||
        article.summary.toLowerCase().includes(query) ||
        article.categoryLabel.toLowerCase().includes(query) ||
        (article.keywords && article.keywords.some((k) => k.toLowerCase().includes(query)));

      return matchesCategory && matchesText;
    });
  }, [selectedCategory, searchQuery]);

  const displayedArticles = useMemo(() => {
    return filteredArticles.slice(0, visibleCount);
  }, [filteredArticles, visibleCount]);

  const handleCategoryChange = (catId) => {
    setSelectedCategory(catId);
    setVisibleCount(6);
  };

  const handleClearFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setVisibleCount(6);
  };

  const hasActiveFilters = selectedCategory !== 'all' || searchQuery.trim().length > 0;

  return (
    <div className="blog-page">
      {/* 1. PAGE HERO */}
      <PageHero
        eyebrow="Velvora Knowledge Hub"
        title="Insights, Engineering Guides & Accessibility Standards"
        crumbs={['Blog']}
      >
        Authoritative research, practical implementation blueprints, and regulatory guides on Digital Publishing, XML-first workflows, PDF/UA, WCAG 2.2, and enterprise AI automation.
      </PageHero>

      {/* 2. FEATURED ARTICLE SPOTLIGHT */}
      {!hasActiveFilters && featured && (
        <section className="section section--tint blog-featured-section" aria-label="Featured Industry Article">
          <div className="container">
            <div className="blog-featured-card">
              <div className="blog-featured-media">
                <img
                  src={featured.coverImage}
                  alt={featured.title}
                  className="blog-featured-img"
                  loading="eager"
                />
                <span className="blog-featured-pill">
                  <Sparkles size={13} aria-hidden="true" />
                  <span>Featured Editorial</span>
                </span>
              </div>
              <div className="blog-featured-content">
                <div className="blog-meta-row">
                  <span className="blog-cat-badge">{featured.categoryLabel}</span>
                  <span className="blog-date">
                    <Calendar size={14} aria-hidden="true" />
                    <span>{featured.publishedDate}</span>
                  </span>
                  <span className="blog-read-time">
                    <Clock size={14} aria-hidden="true" />
                    <span>{featured.readTime}</span>
                  </span>
                </div>

                <h2 className="blog-featured-title">
                  <Link to={`/blog/${featured.slug}`}>{featured.title}</Link>
                </h2>

                <p className="blog-featured-summary">{featured.summary}</p>

                {featured.keyTakeaways && (
                  <div className="blog-takeaways-mini">
                    <span className="blog-takeaways-title">Key Insights:</span>
                    <ul>
                      {featured.keyTakeaways.slice(0, 2).map((takeaway, idx) => (
                        <li key={idx}>
                          <CheckCircle2 size={14} className="blog-check-icon" aria-hidden="true" />
                          <span>{takeaway}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="blog-featured-footer">
                  <Link to={`/blog/${featured.slug}`} className="btn btn--orange">
                    Read Full Article <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                  <span className="blog-author-tag">
                    By <strong>{featured.author}</strong> ({featured.authorRole})
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. SEARCH & CATEGORY FILTERING CONTROLS */}
      <section className="section blog-feed-section" id="blog-feed">
        <div className="container">
          <div className="blog-controls-wrapper">
            {/* Search Input */}
            <div className="blog-search-box">
              <Search size={18} className="blog-search-icon" aria-hidden="true" />
              <input
                type="text"
                placeholder="Search articles by keyword (e.g., WCAG 2.2, PDF/UA, JATS, EPUB)..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setVisibleCount(6);
                }}
                className="blog-search-input"
                aria-label="Search articles by keyword"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="blog-search-clear"
                  aria-label="Clear search text"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Category Pills */}
            <div className="blog-category-tabs" role="tablist" aria-label="Article Categories">
              {blogCategories.map((cat) => {
                const count = categoryCounts[cat.id] || 0;
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => handleCategoryChange(cat.id)}
                    className={`blog-cat-tab ${isActive ? 'is-active' : ''}`}
                  >
                    <span>{cat.label}</span>
                    <span className="blog-cat-count">{count}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Query Status Indicator */}
            {hasActiveFilters && (
              <div className="blog-active-filter-bar">
                <span className="blog-filter-status">
                  Showing <strong>{filteredArticles.length}</strong> {filteredArticles.length === 1 ? 'article' : 'articles'}
                  {searchQuery && (
                    <> matching "<em>{searchQuery}</em>"</>
                  )}
                  {selectedCategory !== 'all' && (
                    <> in <strong>{blogCategories.find((c) => c.id === selectedCategory)?.label}</strong></>
                  )}
                </span>
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="blog-reset-btn"
                >
                  <X size={14} /> Clear Filters
                </button>
              </div>
            )}
          </div>

          {/* 4. ARTICLES CARD GRID */}
          {filteredArticles.length === 0 ? (
            <div className="blog-empty-state">
              <BookOpen size={48} className="blog-empty-icon" aria-hidden="true" />
              <h3>No articles found</h3>
              <p>We couldn't find any articles matching your search query. Try broader keywords or reset the category filter.</p>
              <button type="button" onClick={handleClearFilters} className="btn btn--outline">
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="blog-grid">
              {displayedArticles.map((article) => (
                <article key={article.id} className="blog-card-pro">
                  <div className="blog-card-media">
                    <Link to={`/blog/${article.slug}`} tabIndex="-1" aria-hidden="true">
                      <img
                        src={article.coverImage}
                        alt=""
                        className="blog-card-img"
                        loading="lazy"
                      />
                    </Link>
                    <span className="blog-card-cat-badge">{article.categoryLabel}</span>
                  </div>

                  <div className="blog-card-body">
                    <div className="blog-card-meta">
                      <span className="blog-card-date">
                        <Calendar size={13} aria-hidden="true" />
                        <span>{article.publishedDate}</span>
                      </span>
                      <span className="blog-card-sep" aria-hidden="true">·</span>
                      <span className="blog-card-read">
                        <Clock size={13} aria-hidden="true" />
                        <span>{article.readTime}</span>
                      </span>
                    </div>

                    <h3 className="blog-card-title">
                      <Link to={`/blog/${article.slug}`}>{article.title}</Link>
                    </h3>

                    <p className="blog-card-summary">{article.summary}</p>

                    {article.keywords && article.keywords.length > 0 && (
                      <div className="blog-card-chips">
                        {article.keywords.slice(0, 2).map((k) => (
                          <span key={k} className="blog-card-chip">#{k}</span>
                        ))}
                      </div>
                    )}

                    <div className="blog-card-footer">
                      <Link to={`/blog/${article.slug}`} className="blog-card-link">
                        <span>Read Full Guide</span>
                        <ArrowRight size={15} aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* 5. LOAD MORE BUTTON */}
          {visibleCount < filteredArticles.length && (
            <div className="blog-load-more-row">
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => prev + 6)}
                className="btn btn--secondary blog-load-more-btn"
              >
                <span>Load More Articles</span>
                <ChevronRight size={16} aria-hidden="true" />
              </button>
              <span className="blog-load-count">
                Showing {displayedArticles.length} of {filteredArticles.length} articles
              </span>
            </div>
          )}
        </div>
      </section>

      {/* 6. TOPICS ARCHITECTURE BAND */}
      <section className="section section--tint blog-topics-section">
        <div className="container">
          <div className="blog-topics-header">
            <span className="eyebrow">Domain Expertise</span>
            <h2>Core Practice Areas & Technical Coverage</h2>
            <p className="lead">
              Our engineering and editorial teams continuously publish authoritative benchmarks, standard blueprints, and regulatory briefings across the digital publishing lifecycle.
            </p>
          </div>

          <div className="blog-topics-grid">
            <div className="blog-topic-card" onClick={() => handleCategoryChange('digital-publishing')}>
              <div className="blog-topic-icon blog-topic-icon--blue">
                <BookOpen size={22} />
              </div>
              <h4>Digital Publishing</h4>
              <p>EPUB 3 conversion, XML-first composition, JATS/BITS workflows, and multi-format delivery.</p>
              <span className="blog-topic-count">{categoryCounts['digital-publishing'] || 4} Articles</span>
            </div>

            <div className="blog-topic-card" onClick={() => handleCategoryChange('digital-accessibility')}>
              <div className="blog-topic-icon blog-topic-icon--cyan">
                <ShieldCheck size={22} />
              </div>
              <h4>Digital Accessibility</h4>
              <p>WCAG 2.2 AA conformance, Section 508 legal compliance, EAA mandates, and VPAT authoring.</p>
              <span className="blog-topic-count">{categoryCounts['digital-accessibility'] || 5} Articles</span>
            </div>

            <div className="blog-topic-card" onClick={() => handleCategoryChange('pdf-remediation')}>
              <div className="blog-topic-icon blog-topic-icon--purple">
                <FileText size={22} />
              </div>
              <h4>PDF/UA & Remediation</h4>
              <p>ISO 14289 tagging architecture, reading order restructuring, and PAC validator compliance.</p>
              <span className="blog-topic-count">{categoryCounts['pdf-remediation'] || 4} Articles</span>
            </div>

            <div className="blog-topic-card" onClick={() => handleCategoryChange('ai-automation')}>
              <div className="blog-topic-icon blog-topic-icon--amber">
                <Cpu size={22} />
              </div>
              <h4>AI & Workflow Automation</h4>
              <p>Intelligent Document Processing (IDP), cognitive NLP tagging, and human-in-the-loop QA.</p>
              <span className="blog-topic-count">{categoryCounts['ai-automation'] || 4} Articles</span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CLOSING CTA BAND */}
      <CtaBand
        title="Need Expert Assistance with Digital Publishing or Accessibility?"
        text="Whether you require bulk PDF remediation, EPUB 3 conversion, or a comprehensive WCAG 2.2 audit, our certified specialists are ready to help."
        primaryBtnText="Discuss Your Project"
        primaryBtnTo="/contact"
        secondaryBtnText="Explore All Services"
        secondaryBtnTo="/services"
      />
    </div>
  );
}
