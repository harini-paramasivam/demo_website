import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  FolderOpen, 
  Lightbulb, 
  ShieldCheck, 
  Headphones, 
  Video, 
  Sparkles, 
  ArrowRight, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX,
  RotateCcw,
  Clock, 
  Calendar, 
  ChevronRight, 
  CheckCircle2, 
  SlidersHorizontal,
  X,
  ExternalLink,
  Share2,
  FileText,
  Radio
} from 'lucide-react';
import { PageHero, CtaBand } from '../components/ui.jsx';
import { content, insightsData, company } from '../data/site.js';
import { useReveal } from '../components/hooks.jsx';
import Icon from '../components/Icon.jsx';

// Spoken scripts for all 10 podcast episodes
const podcastScripts = {
  1: "Welcome to the Velvora Solutions Podcast series. You are listening to Episode 1: AI Meets Accessibility. In this episode, we explore how machine learning is helping detect and fix accessibility gaps before content reaches readers. From automated alternative text suggestions to layout tree validations and contrast scanning, our engineering team explores how AI accelerates publishing workflows while keeping human expertise at the center.",
  2: "Welcome to the Velvora Solutions Podcast series. You are listening to Episode 2: Metadata Magic. Why metadata is the hidden engine of discoverability in publishing and marketing. We delve into ONIX standards, JATS tagging, schema markup, and how rich structural metadata ensures your books, journals, and digital assets get discovered by global search engines and library catalogues.",
  3: "Welcome to the Velvora Solutions Podcast series. You are listening to Episode 3: From Manuscript to Millions. A walkthrough of modern XML workflows that scale content globally. Learn how structuring manuscripts upfront in JATS and BITS XML cuts downstream production errors, enables multi-format output across EPUB, PDF, and web, and saves substantial time and cost.",
  4: "Welcome to the Velvora Solutions Podcast series. You are listening to Episode 4: Inclusive Learning at Scale. Universities and EdTech platforms share how they deliver accessible learning materials. We discuss mass PDF remediation, lecture video captioning, and building an inclusive campus where every student has equal access to knowledge.",
  5: "Welcome to the Velvora Solutions Podcast series. You are listening to Episode 5: Digital Marketing for Startups. Smart, budget-friendly strategies to amplify reach without burning cash. Discover high-leverage SEO principles, conversion rate optimization, and data-driven performance campaigns that generate measurable organic growth.",
  6: "Welcome to the Velvora Solutions Podcast series. You are listening to Episode 6: The Future of EPUB Accessibility. Exploring standards like EPUB Accessibility 1.1 and the European Accessibility Act. We break down semantic page lists, accessibility metadata, screen-reader validation, and publisher compliance milestones.",
  7: "Welcome to the Velvora Solutions Podcast series. You are listening to Episode 7: Data to Decisions. How analytics transform raw data into actionable insights for enterprises. Discover how clean ETL pipelines and executive BI dashboards give leaders instant clarity across operational performance metrics.",
  8: "Welcome to the Velvora Solutions Podcast series. You are listening to Episode 8: Government and Compliance. Meeting Section 508 and WCAG requirements without slowing down workflows. We cover VPAT and ACR reporting, public portal audits, and building sustainable internal accessibility roadmaps.",
  9: "Welcome to the Velvora Solutions Podcast series. You are listening to Episode 9: Automation in Action. Real stories of AI workflows cutting manual work in publishing and IT services. Hear how automating repetitive document formatting and XML tagging freed editorial teams to focus on high-value creative work.",
  10: "Welcome to the Velvora Solutions Podcast series. You are listening to Episode 10: Global Voices. Perspectives from professionals across 5 plus countries on digital transformation trends, cross-border accessibility challenges, and the future of universal content access."
};

// Spoken scripts for all 10 video clips
const videoScripts = {
  1: "Welcome to Velvora Video Series. Video 1: What is PDF/UA? PDF/UA, or ISO 14289, is the definitive international standard for accessible PDF documents. It mandates proper tag structures, headings, table headers, alt text for figures, and full screen reader navigation. Learn why PDF/UA compliance eliminates procurement risk.",
  2: "Welcome to Velvora Video Series. Video 2: Case Study Spotlight: University Success. Watch how a university with thousands of inaccessible course PDFs achieved 100% compliance across departments, enabling inclusive education for all students.",
  3: "Welcome to Velvora Video Series. Video 3: Top 3 Accessibility Tips for Dashboards. Learn three immediate wins: keep contrast above 4.5 to 1, use glyphs alongside colors, and enable keyboard tabbing across executive KPI cards.",
  4: "Welcome to Velvora Video Series. Video 4: XML in 60 Seconds. Why XML is the backbone of structured publishing. One single source of truth in XML automatically generates print layouts, accessible EPUBs, HTML web pages, and mobile content with zero duplicate labor.",
  5: "Welcome to Velvora Video Series. Video 5: AI Workflow Demo. Experience a visual walkthrough of Velvora's automation tools in action, demonstrating automated document ingestion, alt-text generation, and rapid accessibility QA.",
  6: "Welcome to Velvora Video Series. Video 6: Digital Marketing Quick Wins. Master essential SEO, meta optimization, and conversion hacks tailored for high-growth startups and digital publishers.",
  7: "Welcome to Velvora Video Series. Video 7: Accessible EPUB Explained. Discover how EPUB 3 navigation documents, audio descriptions, and semantic markup provide an enjoyable and compliant reading experience for assistive technology users.",
  8: "Welcome to Velvora Video Series. Video 8: Behind the Scenes: Velvora Team. Meet our skilled engineers, typesetters, and accessibility specialists delivering high-precision services to publishers and enterprises worldwide.",
  9: "Welcome to Velvora Video Series. Video 9: Global Accessibility Regulations. A comprehensive overview of WCAG 2.2, Section 508, the ADA, and the European Accessibility Act deadlines.",
  10: "Welcome to Velvora Video Series. Video 10: Future of Inclusive Tech. Exploring the convergence of generative AI, assistive robotics, and automated universal design. The future of content that works for everyone, everywhere."
};

// Web Audio API broadcast chime generator
function playBroadcastChime() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.11);
      gain.gain.setValueAtTime(0.18, ctx.currentTime + idx * 0.11);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.11 + 0.38);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + idx * 0.11);
      osc.stop(ctx.currentTime + idx * 0.11 + 0.38);
    });
  } catch (err) {
    console.warn('Web Audio chime not available:', err);
  }
}

export default function Insights() {
  useReveal();
  const [activeTab, setActiveTab] = useState('all');
  const [activeMedia, setActiveMedia] = useState(null); // { type: 'podcast' | 'video', item }
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(30);
  const [isMuted, setIsMuted] = useState(false);
  const [speechActive, setSpeechActive] = useState(false);

  const timerRef = useRef(null);

  const blogItems = content.blog?.items || [];
  const caseItems = content['case-studies']?.items || [];

  // Get script for active item
  const getMediaScript = (type, item) => {
    if (!item) return '';
    if (type === 'podcast') {
      return podcastScripts[item.episode] || item.description;
    }
    return videoScripts[item.id] || item.description;
  };

  // Start sound & speech playback
  const startAudioPlayback = (type, item) => {
    // 1. Play immediate audio chime
    playBroadcastChime();

    // 2. Clear existing speech
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    const scriptText = getMediaScript(type, item);
    const estimatedSecs = Math.max(15, Math.round(scriptText.split(' ').length / 2.2));
    setTotalDuration(estimatedSecs);
    setCurrentTime(0);
    setIsPlaying(true);
    setSpeechActive(true);

    // 3. Synthesize human voice narration
    if ('speechSynthesis' in window && !isMuted) {
      // Delay speech slightly so chime sounds first
      setTimeout(() => {
        const utterance = new SpeechSynthesisUtterance(scriptText);
        utterance.rate = 1.0;
        utterance.pitch = 1.0;

        // Choose English voice
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(
          (v) => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('David') || v.name.includes('Zira'))
        ) || voices.find((v) => v.lang.startsWith('en'));

        if (preferredVoice) {
          utterance.voice = preferredVoice;
        }

        utterance.onend = () => {
          setIsPlaying(false);
          setSpeechActive(false);
        };
        utterance.onerror = () => {
          setIsPlaying(false);
          setSpeechActive(false);
        };

        window.speechSynthesis.speak(utterance);
      }, 450);
    }
  };

  // Open media handler from cards
  const handleOpenMedia = (type, item) => {
    setActiveMedia({ type, item });
    startAudioPlayback(type, item);
  };

  // Close media modal
  const handleCloseMedia = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setActiveMedia(null);
    setIsPlaying(false);
    setSpeechActive(false);
    setCurrentTime(0);
  };

  // Toggle play/pause
  const togglePlayPause = () => {
    if (isPlaying) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.pause();
      }
      setIsPlaying(false);
    } else {
      if ('speechSynthesis' in window) {
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        } else {
          startAudioPlayback(activeMedia.type, activeMedia.item);
        }
      }
      setIsPlaying(true);
    }
  };

  // Restart audio
  const handleRestart = () => {
    if (activeMedia) {
      startAudioPlayback(activeMedia.type, activeMedia.item);
    }
  };

  // Toggle mute
  const toggleMute = () => {
    if (!isMuted) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setIsMuted(true);
      setSpeechActive(false);
    } else {
      setIsMuted(false);
      if (activeMedia) {
        startAudioPlayback(activeMedia.type, activeMedia.item);
      }
    }
  };

  // Playback timer ticker
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= totalDuration) {
            setIsPlaying(false);
            return totalDuration;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isPlaying, totalDuration]);

  // Clean up speech on unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      clearInterval(timerRef.current);
    };
  }, []);

  const formatSecs = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <>
      {/* PAGE HERO */}
      <PageHero
        eyebrow="Knowledge & Multimedia Hub"
        title="Velvora Insights"
        crumbs={['Home', 'Resources', 'Insights']}
      >
        Explore in-depth articles, real-world case snapshots, practical checklists, 10 podcast episodes, and 10 video guides covering publishing, accessibility, AI, and analytics.
      </PageHero>

      {/* FILTER TABS DOCK */}
      <section className="career-nav-section-dark netbg" aria-label="Insights Filter Categories">
        <div className="container">
          <div className="career-filter-bar" role="tablist" aria-label="Filter insights categories">
            {insightsData.sections.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                className={`career-filter-btn${activeTab === tab.id ? ' is-active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon name={tab.icon} size={15} aria-hidden="true" />
                <span>{tab.label}</span>
                <span className="why-filter-count" style={{ marginLeft: 6 }}>{tab.count}</span>
              </button>
            ))}
          </div>

          <div className="career-filter-hint">
            <span className="career-filter-hint__badge">
              <span className="career-filter-hint__dot" />
              {activeTab === 'all'
                ? 'All Knowledge Hub Assets (43)'
                : activeTab === 'articles'
                ? 'Articles & Long-Form Trends'
                : activeTab === 'cases'
                ? 'Case Studies & Snapshots'
                : activeTab === 'tips'
                ? 'Tips & Actionable Best Practices'
                : activeTab === 'leadership'
                ? 'Strategic Thought Leadership'
                : activeTab === 'podcasts'
                ? 'Velvora Podcast Series (10 Episodes)'
                : 'Velvora Explainer Video Series (10 Clips)'}
            </span>
            <span className="career-filter-hint__text">
              — {activeTab === 'all'
                ? 'Browsing all 6 publication sub-sections: articles, case snapshots, checklists, thought leadership, podcasts, and video series.'
                : activeTab === 'podcasts'
                ? 'Click "Listen Now" on any episode to hear voice narration and broadcast audio directly in your browser.'
                : activeTab === 'videos'
                ? 'Watch and listen to 10 visual explainers and workflow walkthroughs.'
                : 'Curated by Velvora’s specialists in accessibility, content engineering, and automation.'}
            </span>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT AREA */}
      <section className="section section--paper">
        <div className="container">

          {/* SUB-SECTION 5: PODCASTS (10 EPISODES) */}
          {(activeTab === 'all' || activeTab === 'podcasts') && (
            <div className="insights-subgroup" id="podcasts-section">
              <div className="insights-subgroup__head">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                  <div>
                    <span className="insights-pill-tag">
                      <Headphones size={14} /> Sub-section 5: Podcasts
                    </span>
                    <h2 className="insights-subgroup__title">Velvora Podcast Series (10 Episodes)</h2>
                    <p className="insights-subgroup__desc">
                      In-depth audio episodes on AI in publishing, metadata engines, global compliance, and inclusive learning technologies. Click <strong>Listen Now</strong> on any episode to hear audio.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      playBroadcastChime();
                      if ('speechSynthesis' in window) {
                        const testUtter = new SpeechSynthesisUtterance('Audio output is active and verified. Welcome to Velvora Solutions.');
                        window.speechSynthesis.speak(testUtter);
                      }
                    }}
                    className="btn btn--outline btn--sm"
                    style={{ alignSelf: 'center', fontSize: '.84rem' }}
                    title="Test your browser speaker output"
                  >
                    <Volume2 size={15} />
                    <span>Test Audio Output</span>
                  </button>
                </div>
              </div>

              <div className="insights-podcast-grid">
                {insightsData.podcasts.map((pod) => (
                  <article key={pod.episode} className="podcast-card">
                    <div className="podcast-card__top">
                      <span className="podcast-ep-badge">EP 0{pod.episode}</span>
                      <span className="podcast-duration">
                        <Clock size={13} /> {pod.duration}
                      </span>
                    </div>

                    <h3 className="podcast-card__title">
                      Episode {pod.episode}: {pod.title}
                    </h3>
                    <p className="podcast-card__desc">{pod.description}</p>

                    <div className="podcast-card__bottom">
                      <span className="podcast-tag">{pod.tag}</span>
                      <button
                        type="button"
                        className="podcast-play-btn"
                        onClick={() => handleOpenMedia('podcast', pod)}
                        aria-label={`Listen to Episode ${pod.episode}: ${pod.title}`}
                      >
                        <Play size={14} fill="currentColor" />
                        <span>Listen Now</span>
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* SUB-SECTION 6: VIDEOS (10 CLIPS) */}
          {(activeTab === 'all' || activeTab === 'videos') && (
            <div className="insights-subgroup" id="videos-section" style={{ marginTop: activeTab === 'all' ? '60px' : '0' }}>
              <div className="insights-subgroup__head">
                <div>
                  <span className="insights-pill-tag">
                    <Video size={14} /> Sub-section 6: Videos
                  </span>
                  <h2 className="insights-subgroup__title">Video Series (10 Clips)</h2>
                  <p className="insights-subgroup__desc">
                    Fast visual explainers, workflow demos, and regulatory overviews designed for publishing and engineering teams.
                  </p>
                </div>
              </div>

              <div className="insights-video-grid">
                {insightsData.videos.map((vid) => (
                  <article key={vid.id} className="video-card">
                    <div 
                      className="video-card__thumbnail"
                      onClick={() => handleOpenMedia('video', vid)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => { if (e.key === 'Enter') handleOpenMedia('video', vid); }}
                      aria-label={`Play Video ${vid.id}: ${vid.title}`}
                    >
                      <div className="video-card__overlay">
                        <div className="video-card__play-badge">
                          <Play size={20} fill="currentColor" />
                        </div>
                      </div>
                      <span className="video-card__duration">{vid.duration}</span>
                      <span className="video-card__id-badge">Video 0{vid.id}</span>
                    </div>

                    <div className="video-card__body">
                      <span className="video-card__tag">{vid.tag}</span>
                      <h3 className="video-card__title">
                        Video {vid.id}: {vid.title}
                      </h3>
                      <p className="video-card__desc">{vid.description}</p>
                      <button
                        type="button"
                        className="video-watch-link"
                        onClick={() => handleOpenMedia('video', vid)}
                      >
                        <span>Watch Clip</span>
                        <ArrowRight size={14} aria-hidden="true" />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* SUB-SECTION 1: ARTICLES & TRENDS */}
          {(activeTab === 'all' || activeTab === 'articles') && (
            <div className="insights-subgroup" id="articles-section" style={{ marginTop: activeTab === 'all' ? '60px' : '0' }}>
              <div className="insights-subgroup__head">
                <div>
                  <span className="insights-pill-tag">
                    <BookOpen size={14} /> Sub-section 1: Articles & Trends
                  </span>
                  <h2 className="insights-subgroup__title">Articles & Trends (Long-Form Posts)</h2>
                  <p className="insights-subgroup__desc">
                    Technical breakdowns, format comparisons, and regulatory analyses covering EPUB, XML, Word, and WCAG 2.2.
                  </p>
                </div>
              </div>

              <div className="insights-articles-grid">
                {blogItems.map((article) => (
                  <article key={article.id} className="insight-article-card">
                    <span className="insight-article-tag">{article.tag}</span>
                    <h3 className="insight-article-title">{article.title}</h3>
                    <p className="insight-article-summary">{article.summary}</p>
                    <Link to="/contact" className="tlink" style={{ marginTop: 'auto' }}>
                      Request Full Publication <ArrowRight size={15} aria-hidden="true" />
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* SUB-SECTION 2: CASE STUDIES & SNAPSHOTS */}
          {(activeTab === 'all' || activeTab === 'cases') && (
            <div className="insights-subgroup" id="cases-section" style={{ marginTop: activeTab === 'all' ? '60px' : '0' }}>
              <div className="insights-subgroup__head">
                <div>
                  <span className="insights-pill-tag">
                    <FolderOpen size={14} /> Sub-section 2: Case Studies
                  </span>
                  <h2 className="insights-subgroup__title">Case Studies & Snapshots</h2>
                  <p className="insights-subgroup__desc">
                    Real-world outcomes demonstrating how Velvora transforms accessibility, XML conversion, and compliance at scale.
                  </p>
                </div>
              </div>

              <div className="insights-cases-grid">
                {caseItems.map((cs) => (
                  <article key={cs.id} className="case-snapshot-card">
                    <span className="case-snapshot-badge">Enterprise Case Snapshot</span>
                    <h3 className="case-snapshot-title">{cs.title}</h3>
                    
                    <div className="case-snapshot-block case-snapshot-block--challenge">
                      <strong>The Challenge:</strong>
                      <p>{cs.challenge}</p>
                    </div>

                    <div className="case-snapshot-block case-snapshot-block--solution">
                      <strong>Velvora Solution:</strong>
                      <p>{cs.solution}</p>
                    </div>

                    <div className="case-snapshot-block case-snapshot-block--result">
                      <strong>Measurable Result:</strong>
                      <p>{cs.result}</p>
                    </div>

                    <Link to="/resources/case-studies" className="btn btn--outline btn--block case-snapshot-btn" style={{ marginTop: '16px' }}>
                      <span>View Full Case Report</span>
                      <ArrowRight size={15} aria-hidden="true" />
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* SUB-SECTION 3: TIPS & BEST PRACTICES */}
          {(activeTab === 'all' || activeTab === 'tips') && (
            <div className="insights-subgroup" id="tips-section" style={{ marginTop: activeTab === 'all' ? '60px' : '0' }}>
              <div className="insights-subgroup__head">
                <div>
                  <span className="insights-pill-tag">
                    <Lightbulb size={14} /> Sub-section 3: Tips & Best Practices
                  </span>
                  <h2 className="insights-subgroup__title">Tips & Best Practices</h2>
                  <p className="insights-subgroup__desc">
                    Actionable checklists for document authors, dashboard designers, and content production teams.
                  </p>
                </div>
              </div>

              <div className="insights-tips-grid">
                {insightsData.tips.map((tip) => (
                  <div key={tip.id} className="tip-card">
                    <span className="tip-card__tag">{tip.tag}</span>
                    <h3 className="tip-card__title">{tip.title}</h3>
                    <ul className="tip-checklist">
                      {tip.bullets.map((b, i) => (
                        <li key={i}>
                          <CheckCircle2 size={16} className="tip-check-icon" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                    <Link to={tip.to} className="tlink" style={{ marginTop: 'auto' }}>
                      {tip.linkText} <ArrowRight size={15} aria-hidden="true" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SUB-SECTION 4: THOUGHT LEADERSHIP & TRENDS */}
          {(activeTab === 'all' || activeTab === 'leadership') && (
            <div className="insights-subgroup" id="leadership-section" style={{ marginTop: activeTab === 'all' ? '60px' : '0' }}>
              <div className="insights-subgroup__head">
                <div>
                  <span className="insights-pill-tag">
                    <ShieldCheck size={14} /> Sub-section 4: Thought Leadership
                  </span>
                  <h2 className="insights-subgroup__title">Thought Leadership & Trends</h2>
                  <p className="insights-subgroup__desc">
                    Strategic perspectives on European Accessibility Act enforcement, hybrid AI QA, and digital inclusion ROI.
                  </p>
                </div>
              </div>

              <div className="insights-leadership-grid">
                {insightsData.thoughtLeadership.map((item) => (
                  <article key={item.id} className="leadership-card">
                    <div className="leadership-card__meta">
                      <span className="leadership-card__tag">{item.tag}</span>
                      <span className="leadership-card__date">{item.date}</span>
                    </div>
                    <h3 className="leadership-card__title">{item.title}</h3>
                    <p className="leadership-card__summary">{item.summary}</p>
                    <Link to={item.to} className="btn btn--outline" style={{ marginTop: 'auto', alignSelf: 'flex-start' }}>
                      <span>{item.action}</span>
                      <ArrowRight size={15} aria-hidden="true" />
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>

      {/* AUDIO / VIDEO PLAYER MODAL WITH REAL VOICE & CHIME SOUND */}
      {activeMedia && (
        <div className="media-modal-backdrop" onClick={handleCloseMedia} role="dialog" aria-modal="true">
          <div className="media-modal-card" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="media-modal-close"
              onClick={handleCloseMedia}
              aria-label="Close media player"
            >
              <X size={20} />
            </button>

            <div className="media-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <span className="media-modal-eyebrow" style={{ margin: 0 }}>
                  {activeMedia.type === 'podcast' ? `Podcast Episode 0${activeMedia.item.episode}` : `Video Clip 0${activeMedia.item.id}`}
                </span>
                <span className="audio-live-indicator">
                  <span className={`audio-live-dot${isPlaying ? ' is-pulsing' : ''}`} />
                  {isPlaying ? 'AUDIO ACTIVE' : 'PAUSED'}
                </span>
              </div>
              <h3 className="media-modal-title">{activeMedia.item.title}</h3>
              <p className="media-modal-desc">{activeMedia.item.description}</p>
            </div>

            {/* REAL AUDIO PLAYER SCREEN */}
            <div className="media-player-screen">
              {activeMedia.type === 'podcast' ? (
                <div className="podcast-player-ui">
                  {/* Real animated waveform */}
                  <div className="podcast-player-waveform">
                    {[16, 28, 42, 24, 38, 48, 30, 44, 20, 36, 46, 26, 38, 22].map((h, i) => (
                      <span
                        key={i}
                        className={`wave-bar${isPlaying ? ' is-active' : ''}`}
                        style={{
                          height: isPlaying ? `${Math.max(12, (h * ((currentTime + i) % 7 + 3)) / 7)}px` : '10px',
                          animationDelay: `${i * 0.08}s`
                        }}
                      />
                    ))}
                  </div>

                  {/* Scrubber track */}
                  <div className="player-scrubber-track">
                    <div 
                      className="player-scrubber-fill"
                      style={{ width: `${Math.min(100, (currentTime / totalDuration) * 100)}%` }}
                    />
                  </div>

                  {/* Audio Controls */}
                  <div className="podcast-player-controls">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <button
                        type="button"
                        className="player-main-btn"
                        onClick={togglePlayPause}
                        aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
                        title={isPlaying ? 'Pause' : 'Play'}
                      >
                        {isPlaying ? <Pause size={20} /> : <Play size={20} fill="currentColor" />}
                      </button>

                      <button
                        type="button"
                        className="player-sub-btn"
                        onClick={handleRestart}
                        aria-label="Replay episode narration"
                        title="Replay from start"
                      >
                        <RotateCcw size={16} />
                      </button>

                      <button
                        type="button"
                        className="player-sub-btn"
                        onClick={toggleMute}
                        aria-label={isMuted ? 'Unmute voice' : 'Mute voice'}
                        title={isMuted ? 'Unmute' : 'Mute'}
                      >
                        {isMuted ? <VolumeX size={16} color="#ef4444" /> : <Volume2 size={16} />}
                      </button>
                    </div>

                    <div className="player-meta-line">
                      <span className="player-time">
                        {formatSecs(currentTime)} / {formatSecs(totalDuration)}
                      </span>
                      <span className="player-stream-label">
                        {isMuted ? 'Audio muted' : isPlaying ? 'Voice narration playing' : 'Playback paused'}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="video-player-ui">
                  <div className="video-player-placeholder">
                    <div className="video-play-center" onClick={togglePlayPause} style={{ cursor: 'pointer' }}>
                      {isPlaying ? <Pause size={32} /> : <Play size={32} fill="currentColor" />}
                    </div>
                    <span className="video-now-playing">
                      {isPlaying ? 'Playing Explainer Audio & Visual Preview' : 'Click to Play Explainer'}
                    </span>
                    <span style={{ fontSize: '.78rem', color: '#cbd5e1' }}>
                      {formatSecs(currentTime)} / {formatSecs(totalDuration)}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* SPOKEN SCRIPT READOUT BOX */}
            <div className="media-transcript-box">
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                <Radio size={14} color="var(--orange-light)" />
                <span style={{ fontSize: '.74rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--orange-light)' }}>
                  Narration Audio Script
                </span>
              </div>
              <p className="media-transcript-text">
                &ldquo;{getMediaScript(activeMedia.type, activeMedia.item)}&rdquo;
              </p>
            </div>

            <div className="media-modal-footer">
              <span className="media-modal-host">
                Produced by Velvora Content &amp; Accessibility Labs
              </span>
              <Link to="/contact" className="btn btn--orange" onClick={handleCloseMedia}>
                Discuss Topic with Specialists <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* CLOSING CALL TO ACTION BAND */}
      <CtaBand
        title="Stay Ahead in Publishing, Accessibility, and AI"
        text="Discuss a custom team training masterclass, podcast guest collaboration, or workflow audit."
        primaryBtnText="Consult Our Specialists"
        primaryBtnTo="/contact"
        secondaryBtnText="Explore All Solutions"
        secondaryBtnTo="/solutions"
      />
    </>
  );
}
