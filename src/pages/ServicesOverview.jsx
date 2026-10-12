import { PageHero, CtaBand } from '../components/ui.jsx';
import ServiceCards from '../components/ServiceCards.jsx';
import { useReveal } from '../components/hooks.jsx';

export default function ServicesOverview() {
  useReveal();
  return (
    <>
      <PageHero eyebrow="Services" title="What Velvora delivers" crumbs={['Services']}>
        Accessibility, automation and technology services for businesses, publishers and organizations.
      </PageHero>
      <section className="section"><div className="container"><ServiceCards /></div></section>
      <CtaBand />
    </>
  );
}
