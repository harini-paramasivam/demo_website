import { useState } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Users, 
  Clock, 
  Lock, 
  Layers, 
  BookOpen, 
  FileCheck2, 
  Sparkles,
  Award,
  SlidersHorizontal
} from 'lucide-react';
import Icon from './Icon.jsx';

const whyItems = [
  {
    num: '01',
    category: 'Standards',
    group: 'standards',
    title: 'Standards-First Approach',
    desc: 'Every deliverable follows industry standards such as WCAG 2.2, PDF/UA, EPUB Accessibility 1.1, and JATS/BITS XML.',
    icon: 'ShieldCheck',
    badge: 'WCAG 2.2 · PDF/UA · JATS XML'
  },
  {
    num: '02',
    category: 'Quality',
    group: 'standards',
    title: 'Human + Tool Quality Checks',
    desc: 'Automated checkers find the obvious issues. Our trained specialists find the rest, using real screen readers.',
    icon: 'CheckCircle2',
    badge: 'Real Screen Readers · Human QA'
  },
  {
    num: '03',
    category: 'Accessibility',
    group: 'standards',
    title: 'Accessible by Design',
    desc: 'Whatever we produce, we build it to support accessibility from the start.',
    icon: 'FileCheck2',
    badge: 'Built-in Semantic Architecture'
  },
  {
    num: '04',
    category: 'Scale',
    group: 'execution',
    title: 'Scalable Teams',
    desc: 'From a single document to thousands of pages a month, we scale without compromising quality.',
    icon: 'Users',
    badge: 'From 1 to 100K+ Pages/mo'
  },
  {
    num: '05',
    category: 'Process',
    group: 'execution',
    title: 'Transparent Process',
    desc: 'Clear timelines, defined checkpoints, and regular updates from kickoff to delivery.',
    icon: 'Clock',
    badge: 'Milestone & Checkpoint Tracking'
  },
  {
    num: '06',
    category: 'Security',
    group: 'execution',
    title: 'Confidential and Secure',
    desc: 'Your content and intellectual property stay protected throughout the project.',
    icon: 'Lock',
    badge: 'Enterprise NDA & Secure Infra'
  },
  {
    num: '07',
    category: 'Integration',
    group: 'partnership',
    title: 'One Partner, Many Services',
    desc: 'Publishing, XML, accessibility, AI, website development, software, data analytics, and digital marketing—managed through a single point of contact.',
    icon: 'Layers',
    badge: 'Unified Point of Contact'
  },
  {
    num: '08',
    category: 'Domain Know-How',
    group: 'partnership',
    title: 'Built for Publishers',
    desc: 'We understand editorial schedules, house styles, and author workflows.',
    icon: 'BookOpen',
    badge: 'Editorial & Author Aligned'
  },
  {
    num: '09',
    category: 'Agility',
    group: 'partnership',
    title: 'Flexible Engagement',
    desc: 'Pilot projects, one-time work, or long-term partnerships.',
    icon: 'Sparkles',
    badge: 'Pilots · Projects · Retainers'
  }
];

const filterTabs = [
  { id: 'all', label: 'All', hint: 'Displaying All 9 Architectural Assurance Pillars' },
  { id: 'standards', label: 'Standards & QA', hint: 'Rigorous Compliance, Dual Screen-Reader QA & Accessibility by Design' },
  { id: 'execution', label: 'Execution & Scale', hint: 'Scalable Team Capacity, Milestone Transparency & Secure Infrastructure' },
  { id: 'partnership', label: 'Partnership & Speed', hint: 'Multi-Service Convergence, Editorial DNA & Agile Engagement Models' }
];

export default function TrustArchitecture() {
  const [activeFilter, setActiveFilter] = useState('standards');

  const currentTab = filterTabs.find((t) => t.id === activeFilter) || filterTabs[0];
  const filteredItems = activeFilter === 'all'
    ? whyItems
    : whyItems.filter((item) => item.group === activeFilter);

  return (
    <div className="why-arch-wrap">
      {/* Interactive Category Selector Tabs (No counts, clean minimalist pills) */}
      <div className="why-filter-bar" role="tablist" aria-label="Why choose Velvora categories">
        {filterTabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeFilter === tab.id}
            className={`why-filter-btn${activeFilter === tab.id ? ' is-active' : ''}`}
            onClick={() => setActiveFilter(tab.id)}
          >
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Dynamic Subtitle Feedback */}
      <div className="why-filter-hint">
        <span className="why-filter-hint__badge">
          {currentTab.label}
        </span>
        <span>— {currentTab.hint}</span>
      </div>

      {/* 9 Ultra-Attractive Glowing Matrix Pods (No reveal class, guaranteed visible) */}
      <div className="why-matrix">
        {filteredItems.map((item, idx) => (
          <article 
            key={item.num} 
            className="why-pod" 
            style={{ animationDelay: `${(idx % 3) * 60}ms` }}
          >
            {/* Hover ambient radial glow */}
            <div className="why-pod__glow" />

            <div className="why-pod__top">
              <div className="why-pod__icon-box">
                <Icon name={item.icon} size={22} />
              </div>
              <div className="why-pod__tags">
                <span className="why-pod__category">{item.category}</span>
                <span className="why-pod__num">{item.num}</span>
              </div>
            </div>

            <h3 className="why-pod__title">{item.title}</h3>
            <p className="why-pod__desc">{item.desc}</p>

            <div className="why-pod__footer">
              <span className="why-pod__spec">
                <span className="why-pod__spec-dot" />
                <span>{item.badge}</span>
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
