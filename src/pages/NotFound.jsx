import { Link } from 'react-router-dom';
import { PageHero } from '../components/ui.jsx';

export default function NotFound() {
  return (
    <PageHero title="Page not found">
      <Link to="/" className="tlink">Return to the homepage</Link>
    </PageHero>
  );
}
