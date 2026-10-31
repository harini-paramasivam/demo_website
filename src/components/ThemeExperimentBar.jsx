import { useState } from 'react';
import { Check, Sparkles, Sun, Moon } from 'lucide-react';

export const HOMEPAGE_THEMES = [
  /* --- 9 DARK PALETTES --- */
  {
    id: 'default',
    name: 'Original (Navy & Amber)',
    tag: 'Baseline',
    mode: 'dark',
    dotColor: '#f59a3c',
    bgPreview: '#050c1f',
    desc: 'The existing baseline homepage theme'
  },
  {
    id: 'obsidian-gold',
    name: 'Obsidian Gold',
    tag: 'Enterprise AI',
    mode: 'dark',
    dotColor: '#e5b842',
    bgPreview: '#08090c',
    desc: 'Deep charcoal, graphite and royal bullion gold tailored for sovereign AI technology'
  },
  {
    id: 'burnt-orange',
    name: 'Burnt Orange',
    tag: 'High Velocity',
    mode: 'dark',
    dotColor: '#f97316',
    bgPreview: '#040814',
    desc: 'Midnight sapphire, deep navy and high-octane burnt orange'
  },
  {
    id: 'venetian-gold',
    name: 'Venetian Sunburst Gold',
    tag: 'Liquid Bullion',
    mode: 'dark',
    dotColor: '#eab308',
    bgPreview: '#0a0906',
    desc: 'Luminous liquid gold and warm bullion radiance on espresso obsidian'
  },
  {
    id: 'imperial-gold',
    name: 'Imperial 24K Gold',
    tag: 'Sovereign Treasury',
    mode: 'dark',
    dotColor: '#d4af37',
    bgPreview: '#050505',
    desc: 'Pitch-black obsidian, brushed 24K metallic gold leaf and platinum accents'
  },
  {
    id: 'nordic-sage',
    name: 'Nordic Sage & Mint',
    tag: 'Scandinavian High-Tech',
    mode: 'dark',
    dotColor: '#5eead4',
    bgPreview: '#0a110f',
    desc: 'Deep eucalyptus obsidian, soft sage mint and warm champagne gold'
  },
  {
    id: 'sahara-bronze',
    name: 'Sahara Bronze',
    tag: 'Desert Amber Luxury',
    mode: 'dark',
    dotColor: '#d97706',
    bgPreview: '#120c08',
    desc: 'Warm terra-cotta obsidian and rich metallic bullion bronze'
  },
  {
    id: 'emerald-gold',
    name: 'Emerald & Gold',
    tag: 'Sovereign Trust',
    mode: 'dark',
    dotColor: '#eab308',
    bgPreview: '#04120e',
    desc: 'Imperial forest green and antique bullion gold representing institutional trust'
  },
  {
    id: 'burgundy-rosegold',
    name: 'Burgundy & Rose Gold',
    tag: 'Editorial Luxe',
    mode: 'dark',
    dotColor: '#fb7185',
    bgPreview: '#14050a',
    desc: 'Royal velvet wine, dark burgundy and shimmering metallic rose gold'
  },

  /* --- 9 LIGHT PALETTES (INCLUDING VELVORA LOGO-SUITED SHADES) --- */
  {
    id: 'ivory-champagne',
    name: 'Ivory & Champagne',
    tag: 'Editorial Light',
    mode: 'light',
    dotColor: '#c59b4b',
    bgPreview: '#fdfbf7',
    desc: 'Minimal alabaster ivory, soft champagne gold and rich espresso typography'
  },
  {
    id: 'amber-honey',
    name: 'Amber Glow Light',
    tag: 'Logo Amber',
    mode: 'light',
    dotColor: '#f5a623',
    bgPreview: '#fffbf2',
    desc: 'Warm honey alabaster canvas with signature Velvora Amber Glow and rich molasses text'
  },
  {
    id: 'platinum-silver-gold',
    name: 'Platinum Silk & Gold',
    tag: 'Logo Platinum',
    mode: 'light',
    dotColor: '#d4af37',
    bgPreview: '#f8fafc',
    desc: 'Cool platinum silver canvas, charcoal slate ink, brushed steel trims and 24K bullion gold'
  },
  {
    id: 'gilded-cashmere',
    name: 'Gilded Cashmere Light',
    tag: 'Logo Antique Gold',
    mode: 'light',
    dotColor: '#c59b4b',
    bgPreview: '#fcfaf6',
    desc: 'Soft cashmere warm white canvas with deep velvet espresso typography and antique bullion gold'
  },
  {
    id: 'sunburst-gold',
    name: 'Venetian Sunburst Light',
    tag: 'Logo Sunburst',
    mode: 'light',
    dotColor: '#eab308',
    bgPreview: '#fefcf3',
    desc: 'Sunlit vanilla alabaster with liquid bullion gold and dark chocolate typography'
  },
  {
    id: 'pearl-platinum',
    name: 'Pearl Alabaster Light',
    tag: 'Minimalist Light',
    mode: 'light',
    dotColor: '#d4af37',
    bgPreview: '#fafafa',
    desc: 'Minimalist pearl alabaster, sharp obsidian typography, and brushed 24K gold accents'
  },
  {
    id: 'porcelain-azure',
    name: 'Porcelain Azure Light',
    tag: 'Executive Light',
    mode: 'light',
    dotColor: '#0284c7',
    bgPreview: '#f8fafc',
    desc: 'Crisp porcelain white, deep executive navy typography, and royal azure accents'
  },
  {
    id: 'mint-breeze',
    name: 'Mint Breeze Light',
    tag: 'Botanical Light',
    mode: 'light',
    dotColor: '#10b981',
    bgPreview: '#f3f9f6',
    desc: 'Refreshing sage alabaster, evergreen typography, and crisp mint emerald accents'
  },
  {
    id: 'sunrise-peach',
    name: 'Sunrise Peach Light',
    tag: 'Warm Light',
    mode: 'light',
    dotColor: '#f97316',
    bgPreview: '#fdf7f2',
    desc: 'Sunlit Tuscan sand, warm peach tones, rich espresso text, and radiant amber accents'
  }
];

export default function ThemeExperimentBar({ currentTheme, onSelectTheme }) {
  const [filter, setFilter] = useState('all');

  const filteredThemes = filter === 'all' 
    ? HOMEPAGE_THEMES 
    : HOMEPAGE_THEMES.filter((th) => th.mode === filter);

  return (
    <aside 
      className="theme-experiment-bar" 
      aria-label="Homepage Theme Experiment Selector"
      role="region"
    >
      <div className="theme-experiment-label" title="Theme Selector">
        <Sparkles size={14} aria-hidden="true" />
        <span>Theme Lab</span>
      </div>

      <div className="theme-mode-filters" role="tablist" aria-label="Theme Mode Filter">
        <button
          type="button"
          className={`theme-filter-toggle${filter === 'light' ? ' is-active' : ''}`}
          onClick={() => setFilter(filter === 'light' ? 'all' : 'light')}
          title="Show only 9 Light themes"
        >
          <Sun size={12} aria-hidden="true" />
          <span>Light ({HOMEPAGE_THEMES.filter(t => t.mode === 'light').length})</span>
        </button>
        <button
          type="button"
          className={`theme-filter-toggle${filter === 'dark' ? ' is-active' : ''}`}
          onClick={() => setFilter(filter === 'dark' ? 'all' : 'dark')}
          title="Show only 9 Dark themes"
        >
          <Moon size={12} aria-hidden="true" />
          <span>Dark ({HOMEPAGE_THEMES.filter(t => t.mode === 'dark').length})</span>
        </button>
        {filter !== 'all' && (
          <button
            type="button"
            className="theme-filter-toggle"
            onClick={() => setFilter('all')}
            title="Show all themes"
          >
            All (18)
          </button>
        )}
      </div>

      <div className="theme-pills-scroll">
        {filteredThemes.map((th) => {
          const isActive = currentTheme === th.id;
          return (
            <button
              key={th.id}
              type="button"
              className={`theme-pill-btn${isActive ? ' is-active' : ''}${th.mode === 'light' ? ' is-light-theme' : ''}`}
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
      </div>
    </aside>
  );
}
