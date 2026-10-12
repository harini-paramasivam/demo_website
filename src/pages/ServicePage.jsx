import { Navigate, useParams, Link } from 'react-router-dom';
import { services, accessibilityProcess } from '../data/site.js';
import Icon from '../components/Icon.jsx';
import { PageHero, Notice, EmptyState, CtaBand } from '../components/ui.jsx';

export default function ServicePage() {
  const { slug } = useParams();
  const s = services.find((x) => x.slug === slug);
  if (!s) return <Navigate to="/not-found" replace />;
  const others = services.filter((x) => x.slug !== s.slug);

  return (
    <>
      <PageHero eyebrow="Services" title={s.title} crumbs={['Services', s.title]}>{s.intro}</PageHero>

      <section className="section">
        <div className="container svc">
          <div>
            <Icon name={s.icon} size={40} />
            <h2>What this includes</h2>
            {s.capabilities.length ? (
              <dl className="caps">
                {s.capabilities.map(([t, d]) => (
                  <div key={t}><dt>{t}</dt><dd>{d}</dd></div>
                ))}
              </dl>
            ) : (
              <EmptyState title="Service details coming soon">Verified capability details for this service have not been added yet.</EmptyState>
            )}
            {s.note && <Notice>{s.note}</Notice>}
          </div>
          <aside className="svc__side" aria-label="Other services">
            <h2 className="h3">Other services</h2>
            <ul>{others.map((o) => <li key={o.slug}><Link to={`/services/${o.slug}`}>{o.title}</Link></li>)}</ul>
          </aside>
        </div>
      </section>

      {s.showProcess && (
        <section className="section section--paper">
          <div className="container">
            <h2>Our accessibility workflow</h2>
            <ol className="process process--light">
              {accessibilityProcess.map((p) => <li key={p}><span>{p}</span></li>)}
            </ol>
          </div>
        </section>
      )}
      <CtaBand />
    </>
  );
}
