import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  ArrowRight, 
  RotateCcw, 
  ShieldCheck, 
  ExternalLink, 
  Briefcase, 
  CheckCircle2, 
  Plus, 
  RefreshCw, 
  Volume2, 
  VolumeX, 
  Database,
  Building2,
  AlertCircle
} from 'lucide-react';
import VoraRobotMascot from './VoraRobotMascot.jsx';
import VoraRobotIntro from './VoraRobotIntro.jsx';

export default function VoraChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'vora',
      text: "Hello! 👋 I'm **Velza**, your Velvora Solutions assistant. I'm dynamically synced with our latest services, publications, leadership details, and live career openings.\n\nHow can I help you today?",
      sources: [
        { title: 'Explore Services', url: '/services' },
        { title: 'View Careers', url: '/careers' },
        { title: 'Contact Team', url: '/contact' }
      ],
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [adminOpen, setAdminOpen] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const [isAbsorbing, setIsAbsorbing] = useState(false);
  const [syncStatus, setSyncStatus] = useState(null);
  const [careersList, setCareersList] = useState([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [newJobForm, setNewJobForm] = useState({
    title: '',
    department: 'Engineering & Technology',
    type: 'Full-Time / Hybrid',
    workMode: 'Hybrid',
    experience: 'Fresher / 1-2 years',
    skills: 'Python, FastAPI, SQL, Problem Solving',
    eligibility: 'Relevant degree or equivalent experience.'
  });

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Formatter for markdown, bolding, links, and bullet lists
  const renderFormattedLine = (rawLine) => {
    // Sanitize any raw stray 'svg' artifacts
    let clean = (rawLine || '').replace(/\bsvg\b/gi, '').trim();
    if (!clean) return null;

    const isBullet = clean.startsWith('• ') || clean.startsWith('- ');
    if (isBullet) {
      clean = clean.replace(/^[•\-]\s*/, '');
    }

    // Split on **bold** and [title](url)
    const tokenRegex = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;
    const parts = clean.split(tokenRegex);

    const nodes = parts.map((part, idx) => {
      if (!part) return null;
      if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
        return <strong key={idx} className="vora-text-bold">{part.slice(2, -2)}</strong>;
      }
      const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch) {
        const title = linkMatch[1];
        const url = linkMatch[2];
        if (url.startsWith('/')) {
          return (
            <Link key={idx} to={url} onClick={() => setIsOpen(false)} className="vora-inline-link">
              {title}
            </Link>
          );
        }
        return (
          <a key={idx} href={url} target="_blank" rel="noopener noreferrer" className="vora-inline-link">
            {title}
          </a>
        );
      }
      return part;
    });

    if (isBullet) {
      return (
        <span className="vora-bullet-line">
          <span className="vora-bullet-dot" aria-hidden="true">▸</span>
          <span className="vora-bullet-content">{nodes}</span>
        </span>
      );
    }
    return nodes;
  };

  // Fetch sync metadata and careers on mount
  useEffect(() => {
    fetchSyncStatus();

    const handleAbsorbed = () => {
      setIntroDone(true);
      setIsAbsorbing(true);
      playSoftChime();
      setTimeout(() => setIsAbsorbing(false), 1500);
    };
    window.addEventListener('vora_launcher_absorbed', handleAbsorbed);
    return () => window.removeEventListener('vora_launcher_absorbed', handleAbsorbed);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen, messages]);

  const fetchSyncStatus = async () => {
    try {
      const res = await fetch('/api/vora/knowledge');
      const data = await res.json();
      if (data.success) {
        setSyncStatus(data.metadata);
        if (data.activeCareers) {
          setCareersList(data.activeCareers);
        }
      }
    } catch (err) {
      console.warn('VORA: Could not load initial knowledge metadata', err);
    }
  };

  const playSoftChime = () => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.14); // A5
      gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.22);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.22);
    } catch (e) {}
  };

  const handleSendMessage = async (queryText = null) => {
    const textToSend = typeof queryText === 'string' ? queryText : inputVal;
    if (!textToSend.trim() || isTyping) return;

    const userMsg = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: textToSend.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/vora/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend.trim() })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setMessages(prev => [
          ...prev,
          {
            id: `v-${Date.now()}`,
            sender: 'vora',
            text: data.reply,
            sources: data.sources || [],
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
        playSoftChime();
        if (data.metadata) setSyncStatus(data.metadata);
      } else {
        throw new Error(data.error || 'Connection paused');
      }
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          id: `v-${Date.now()}`,
          sender: 'vora',
          text: "I'm having a brief connection pause. You can explore our verified sections below or contact our team directly!",
          sources: [
            { title: 'Explore Services', url: '/services' },
            { title: 'Careers Portal', url: '/careers' },
            { title: 'Contact Us', url: '/contact' }
          ],
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleTriggerSync = async () => {
    setIsSyncing(true);
    try {
      const res = await fetch('/api/vora/sync', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setSyncStatus(data.metadata);
        await fetchSyncStatus();
        alert('Knowledge Base successfully synchronized with latest website content!');
      }
    } catch (e) {
      alert('Sync failed: ' + e.message);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleToggleJobStatus = async (careerId, currentStatus) => {
    const newStatus = currentStatus === 'Active' ? 'Closed' : 'Active';
    try {
      const res = await fetch(`/api/vora/careers/${careerId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        await fetchSyncStatus();
      }
    } catch (e) {
      alert('Failed to update job status');
    }
  };

  const handleCreateNewJob = async (e) => {
    e.preventDefault();
    if (!newJobForm.title.trim()) return;

    try {
      const res = await fetch('/api/vora/careers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newJobForm)
      });
      const data = await res.json();
      if (data.success) {
        alert(`New vacancy "${newJobForm.title}" published! Velza can now answer questions about it immediately.`);
        setNewJobForm({
          title: '',
          department: 'Engineering & Technology',
          type: 'Full-Time / Hybrid',
          workMode: 'Hybrid',
          experience: 'Fresher / 1-2 years',
          skills: 'Python, FastAPI, SQL, Problem Solving',
          eligibility: 'Relevant degree or equivalent experience.'
        });
        await fetchSyncStatus();
      }
    } catch (e) {
      alert('Error creating career listing');
    }
  };

  const handleReplayIntro = () => {
    try {
      localStorage.removeItem('vora_intro_seen_v1');
      localStorage.removeItem('vora_intro_seen_v5');
      sessionStorage.removeItem('vora_intro_seen_v1');
      sessionStorage.removeItem('vora_intro_seen_v5');
    } catch (e) {}
    setIsOpen(false);
    setAdminOpen(false);
    setIntroDone(false);
    setIsAbsorbing(false);
    window.dispatchEvent(new CustomEvent('vora_replay_intro'));
  };

  const quickPromptChips = [
    'What services do you provide?',
    'Current job vacancies?',
    'Do you have Python developer roles?',
    'Digital accessibility & WCAG audits?',
    'How do I submit my resume?'
  ];

  return (
    <>
      {/* 1. FIRST-VISIT ROBOT ANIMATION CONTROLLER */}
      <VoraRobotIntro 
        onIntroComplete={() => setIntroDone(true)} 
        onDockingStart={() => {
          setIntroDone(true);
          setIsAbsorbing(true);
        }}
      />

      {/* 2. CHATBOT LAUNCHER BUTTON (Bottom-Right Floating Dock) */}
      <div className={`vora-launcher-container ${introDone ? 'is-placed' : 'is-hidden-for-intro'}`}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`vora-launcher-btn ${isOpen ? 'is-active' : ''} ${isAbsorbing ? 'is-absorbing' : ''}`}
          aria-label={isOpen ? 'Close Velza Assistant' : 'Chat with Velza AI Assistant'}
          title="Chat with Velza"
        >
          {isAbsorbing && (
            <span className="vora-absorb-ripple-ring" aria-hidden="true" />
          )}
          <div className="vora-launcher-inner">
            <span className="vora-launcher-pulse" aria-hidden="true" />
            <VoraRobotMascot size={42} isWalking={false} isTalking={isOpen} />
            <span className="vora-online-dot" title="Knowledge Base Live" />
          </div>
          <span className="vora-launcher-badge">Ask Velza</span>
        </button>
      </div>

      {/* 3. VORA CHAT DRAWER / WINDOW */}
      {isOpen && (
        <div 
          className="vora-chat-window" 
          role="dialog" 
          aria-labelledby="vora-chat-title"
          aria-modal="true"
        >
          {/* Header */}
          <div className="vora-chat-header">
            <div className="vora-header-left">
              <div className="vora-avatar-wrap">
                <VoraRobotMascot size={36} isTalking={isTyping} />
              </div>
              <div>
                <h3 id="vora-chat-title" className="vora-bot-name">
                  Velza
                  <span className="vora-status-chip">AI Assistant</span>
                </h3>
                <div className="vora-sync-label">
                  <span className="sync-dot-green" />
                  <span>Synced with Website Content (v{syncStatus?.version || '1.2'})</span>
                </div>
              </div>
            </div>

            <div className="vora-header-actions">
              <button 
                type="button" 
                onClick={() => {
                  setIsOpen(false);
                  setIntroDone(false);
                  window.dispatchEvent(new CustomEvent('vora_replay_intro'));
                }}
                className="vora-hdr-btn"
                title="Watch / Replay Velza Mascot Intro"
                aria-label="Replay Velza Mascot Intro"
              >
                <Sparkles size={16} />
              </button>

              <button 
                type="button" 
                onClick={() => setSoundEnabled(!soundEnabled)} 
                className="vora-hdr-btn"
                title={soundEnabled ? 'Mute sound' : 'Enable sound'}
                aria-label={soundEnabled ? 'Mute sound' : 'Enable sound'}
              >
                {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
              </button>

              <button 
                type="button" 
                onClick={() => setAdminOpen(true)} 
                className="vora-hdr-btn"
                title="Knowledge Control & Live Recruitment Admin"
                aria-label="Knowledge Control Panel"
              >
                <Database size={16} />
              </button>

              <button 
                type="button" 
                onClick={() => setMessages([messages[0]])} 
                className="vora-hdr-btn"
                title="Reset conversation"
                aria-label="Reset conversation"
              >
                <RotateCcw size={16} />
              </button>

              <button 
                type="button" 
                onClick={() => setIsOpen(false)} 
                className="vora-hdr-btn vora-close-btn"
                title="Close chat"
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="vora-messages-body">
            {messages.map((msg) => (
              <div key={msg.id} className={`vora-msg-row vora-msg-row--${msg.sender}`}>
                {msg.sender === 'vora' && (
                  <div className="vora-msg-avatar">
                    <VoraRobotMascot size={26} />
                  </div>
                )}
                <div className={`vora-msg-bubble vora-msg-bubble--${msg.sender}`}>
                  <div className="vora-msg-text">
                    {msg.text.split('\n\n').map((paragraph, pIdx) => (
                      <p key={pIdx}>
                        {paragraph.split('\n').map((line, lIdx) => (
                          <React.Fragment key={lIdx}>
                            {renderFormattedLine(line)}
                            {lIdx < paragraph.split('\n').length - 1 && <br />}
                          </React.Fragment>
                        ))}
                      </p>
                    ))}
                  </div>

                  {/* Smart Source Linking Pills */}
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="vora-sources-box">
                      <span className="vora-sources-label">Verified Website Links:</span>
                      <div className="vora-sources-pills">
                        {msg.sources.map((src, sIdx) => (
                          <Link 
                            key={sIdx} 
                            to={src.url} 
                            onClick={() => setIsOpen(false)}
                            className="vora-source-pill"
                          >
                            <span className="pill-title">{src.title}</span>
                            <ArrowRight size={12} className="pill-arrow" aria-hidden="true" focusable="false" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  <span className="vora-msg-time">{msg.time}</span>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="vora-msg-row vora-msg-row--vora">
                <div className="vora-msg-avatar">
                  <VoraRobotMascot size={26} isTalking={true} />
                </div>
                <div className="vora-typing-indicator" aria-label="VORA is retrieving answers">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions Dock */}
          <div className="vora-quick-dock">
            <span className="vora-dock-heading">Quick Prompts:</span>
            <div className="vora-chips-scroll">
              {quickPromptChips.map((chip, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSendMessage(chip)}
                  className="vora-prompt-chip"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>

          {/* Input Bar */}
          <form 
            className="vora-input-bar" 
            onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
          >
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask Velza about services, XML, accessibility, or career openings..."
              className="vora-text-input"
              aria-label="Ask Velza a question"
            />
            <button 
              type="submit" 
              disabled={!inputVal.trim() || isTyping}
              className="vora-send-btn"
              aria-label="Send message"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. ADMIN KNOWLEDGE CONTROL & LIVE RECRUITMENT MODAL */}
      {/* ========================================================================= */}
      {adminOpen && (
        <div className="vora-admin-backdrop" onClick={() => setAdminOpen(false)}>
          <div className="vora-admin-dialog" onClick={(e) => e.stopPropagation()} role="dialog" aria-labelledby="admin-title">
            <div className="vora-admin-header">
              <div className="admin-title-row">
                <ShieldCheck size={22} className="accent" />
                <h3 id="admin-title">Velza Knowledge Control &amp; Live Recruitment Center</h3>
              </div>
              <button 
                type="button" 
                onClick={() => setAdminOpen(false)}
                className="vora-hdr-btn"
                aria-label="Close control panel"
              >
                <X size={20} />
              </button>
            </div>

            <div className="vora-admin-body">
              {/* Sync Status Banner */}
              <div className="admin-sync-card">
                <div className="admin-sync-card__left">
                  <span className="admin-label">KNOWLEDGE SYNCHRONIZATION STATUS</span>
                  <div className="admin-status-flex">
                    <span className="status-badge-active">● {syncStatus?.status || 'Completed'}</span>
                    <span className="admin-ver">Version: v{syncStatus?.version || '1.2.0'}</span>
                  </div>
                  <small className="admin-time">
                    Last synchronized: {syncStatus?.lastSynchronized ? new Date(syncStatus.lastSynchronized).toLocaleString() : 'Live'}
                  </small>
                </div>
                <div className="admin-sync-card__right">
                  <button 
                    type="button"
                    onClick={handleTriggerSync}
                    disabled={isSyncing}
                    className="btn btn--orange btn--sm"
                  >
                    <RefreshCw size={15} className={isSyncing ? 'spin-icon' : ''} />
                    <span>{isSyncing ? 'Synchronizing...' : 'Re-Sync Knowledge Now'}</span>
                  </button>
                </div>
              </div>

              {/* Developer Test Trigger: Replay Intro Animation */}
              <div className="admin-feature-strip">
                <div>
                  <strong>Test Robot Introduction Animation:</strong>
                  <p>Reset first-visit flag to review the walking sequence and speech greeting.</p>
                </div>
                <button 
                  type="button" 
                  onClick={handleReplayIntro}
                  className="btn btn--outline btn--sm"
                >
                  <RotateCcw size={14} />
                  <span>Replay Intro Animation</span>
                </button>
              </div>

              {/* Recruitment Management */}
              <div className="admin-careers-section">
                <div className="careers-header-flex">
                  <h4>Live Careers &amp; Internship Authority</h4>
                  <span className="count-pill">{careersList.length} Active Records</span>
                </div>
                <p className="admin-lead-desc">
                  Changes made here update the backend database instantly. When visitors ask VORA about job vacancies, eligibility, or work modes, VORA always serves the latest published records.
                </p>

                <div className="admin-job-cards-list">
                  {careersList.map((job) => (
                    <div key={job.id} className="admin-job-item">
                      <div className="job-item-info">
                        <strong>{job.title}</strong>
                        <span className="job-meta">
                          {job.department} • {job.workMode} • {job.type}
                        </span>
                        <small className="job-eligibility">
                          <em>Eligibility:</em> {job.eligibility}
                        </small>
                      </div>
                      <div className="job-item-actions">
                        <span className={`job-status-pill status-${job.status.toLowerCase()}`}>
                          {job.status}
                        </span>
                        <button 
                          type="button"
                          onClick={() => handleToggleJobStatus(job.id, job.status)}
                          className="btn btn--outline btn--xs"
                        >
                          {job.status === 'Active' ? 'Close Vacancy' : 'Reactivate'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Form to Add New Vacancy / Internship */}
                <form onSubmit={handleCreateNewJob} className="admin-add-job-form">
                  <h5>Add New Live Vacancy or Internship</h5>
                  <div className="form-grid-2">
                    <input
                      type="text"
                      placeholder="Role Title (e.g. Python Developer)"
                      value={newJobForm.title}
                      onChange={(e) => setNewJobForm({ ...newJobForm, title: e.target.value })}
                      required
                      className="contact-input"
                    />
                    <input
                      type="text"
                      placeholder="Department (e.g. AI Engineering)"
                      value={newJobForm.department}
                      onChange={(e) => setNewJobForm({ ...newJobForm, department: e.target.value })}
                      className="contact-input"
                    />
                  </div>
                  <div className="form-grid-2">
                    <select
                      value={newJobForm.workMode}
                      onChange={(e) => setNewJobForm({ ...newJobForm, workMode: e.target.value })}
                      className="contact-input"
                    >
                      <option value="Remote">Remote</option>
                      <option value="Hybrid">Hybrid</option>
                      <option value="On-Site">On-Site (Cuddalore/Chennai)</option>
                    </select>
                    <select
                      value={newJobForm.type}
                      onChange={(e) => setNewJobForm({ ...newJobForm, type: e.target.value })}
                      className="contact-input"
                    >
                      <option value="Full-Time / Hybrid">Full-Time</option>
                      <option value="Internship">Internship (Paid)</option>
                      <option value="Part-Time">Part-Time</option>
                    </select>
                  </div>
                  <div className="form-grid-2">
                    <input
                      type="text"
                      placeholder="Required Skills (comma separated)"
                      value={newJobForm.skills}
                      onChange={(e) => setNewJobForm({ ...newJobForm, skills: e.target.value })}
                      className="contact-input"
                    />
                    <input
                      type="text"
                      placeholder="Eligibility (e.g. Fresher / CS Degree)"
                      value={newJobForm.eligibility}
                      onChange={(e) => setNewJobForm({ ...newJobForm, eligibility: e.target.value })}
                      className="contact-input"
                    />
                  </div>
                  <button type="submit" className="btn btn--orange btn--sm" style={{ marginTop: '10px' }}>
                    <Plus size={16} />
                    <span>Publish Vacancy to Live Database</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

