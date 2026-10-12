import { Link } from 'react-router-dom';
import { content } from '../data/site.js';
import { PageHero, EmptyState, CtaBand } from '../components/ui.jsx';

export default function ResourcePage({ type }) {
  const c = content[type];
  const crumbs = type === 'blog' ? ['Blog'] : ['Resources', c.title];
  return (
    <>
      <PageHero eyebrow={type === 'blog' ? 'Blog' : 'Resources'} title={c.title} crumbs={crumbs}>{c.intro}</PageHero>
      <section className="section">
        <div className="container">
          {c.items.length === 0 ? (
            <EmptyState
              title={c.empty}
              action={<p><Link to="/contact" className="tlink">Contact Velvora</Link></p>}
            >
              Published items will appear here. Add entries to <code>src/data/site.js</code> under <code>content[&apos;{type}&apos;].items</code>.
            </EmptyState>
          ) : (
            <ul className="list">
              {c.items.map((i) => (
                <li key={i.title}>
                  <article>
                    {i.tag && <p className="eyebrow">{i.tag}</p>}
                    <h2 className="h3">{i.href ? <Link to={i.href}>{i.title}</Link> : i.title}</h2>
                    {i.date && <p className="meta"><time dateTime={i.date}>{i.date}</time></p>}
                    <p>{i.summary}</p>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
