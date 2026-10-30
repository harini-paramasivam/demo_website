import { useState, useEffect } from 'react';
import { Palette, Check, Sparkles } from 'lucide-react';

export const HOMEPAGE_THEMES = [
  {
    id: 'default',
    name: 'Original (Navy & Amber)',
    tag: 'Baseline',
    dotColor: '#f59a3c',
    bgPreview: '#050c1f',
    desc: 'The existing baseline homepage theme'
  },
  {
    id: 'obsidian-gold',
    name: 'Obsidian Gold',
    tag: 'Enterprise AI',
    dotColor: '#e5b842',
    bgPreview: '#08090c',
    desc: 'Deep charcoal, graphite and royal bullion gold tailored for sovereign AI technology'
  },
  {
    id: 'burnt-orange',
    name: 'Burnt Orange',
    tag: 'High Velocity',
    dotColor: '#f97316',
    bgPreview: '#040814',
    desc: 'Midnight sapphire, deep navy and high-octane burnt orange'
  },
  {
    id: 'venetian-gold',
    name: 'Venetian Sunburst Gold',
    tag: 'Liquid Bullion',
    dotColor: '#eab308',
    bgPreview: '#0a0906',
    desc: 'Luminous liquid gold and warm bullion radiance on espresso obsidian'
  },
  {
    id: 'imperial-gold',
    name: 'Imperial 24K Gold',
    tag: 'Sovereign Treasury',
    dotColor: '#d4af37',
    bgPreview: '#050505',
    desc: 'Pitch-black obsidian, brushed 24K metallic gold leaf and platinum accents'
  },
  {
    id: 'nordic-sage',
    name: 'Nordic Sage & Mint',
    tag: 'Scandinavian High-Tech',
    dotColor: '#5eead4',
    bgPreview: '#0a110f',
    desc: 'Deep eucalyptus obsidian, soft sage mint and warm champagne gold'
  },
  {
    id: 'sahara-bronze',
    name: 'Sahara Bronze',
    tag: 'Desert Amber Luxury',
    dotColor: '#d97706',
    bgPreview: '#120c08',
    desc: 'Warm terra-cotta obsidian and rich metallic bullion bronze'
  },
  {
    id: 'emerald-gold',
    name: 'Emerald & Gold',
    tag: 'Sovereign Trust',
    dotColor: '#eab308',
    bgPreview: '#04120e',
    desc: 'Imperial forest green and antique bullion gold representing institutional trust'
  },
  {
    id: 'ivory-champagne',
    name: 'Ivory & Champagne',
    tag: 'Editorial Light',
    dotColor: '#c59b4b',
    bgPreview: '#fdfbf7',
    desc: 'Minimal alabaster ivory, soft champagne gold and rich espresso typography'
  },
  {
    id: 'burgundy-rosegold',
    name: 'Burgundy & Rose Gold',
    tag: 'Editorial Luxe',
    dotColor: '#fb7185',
    bgPreview: '#14050a',
    desc: 'Royal velvet wine, dark burgundy and shimmering metallic rose gold'
  }
];

export default function ThemeExperimentBar({ currentTheme, onSelectTheme }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside 
      className="theme-experiment-bar" 
      aria-label="Homepage Theme Experiment Selector"
      role="region"
    >
      <div className="theme-experiment-label" title="Compare 5 homepage colour themes live">
        <Sparkles size={14} aria-hidden="true" />
        <span>Theme Lab</span>
      </div>

      {HOMEPAGE_THEMES.map((th) => {
        const isActive = currentTheme === th.id;
        return (
          <button
            key={th.id}
            type="button"
            className={`theme-pill-btn${isActive ? ' is-active' : ''}`}
            onClick={() => onSelectTheme(th.id)}
            aria-pressed={isActive}
            title={th.desc}
          >
            <span 
              className="theme-pill-dot" 
              style={{ backgroundColor: th.dotColor }} 
              aria-hidden="true" 
            />
            <span>{th.name}</span>
            {isActive && <Check size={12} strokeWidth={3} aria-hidden="true" />}
          </button>
        );
      })}
    </aside>
  );
}
