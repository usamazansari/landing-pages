import { Home } from './Home';
import { HomeFooter } from './HomeFooter';
import { HomeHeader } from './HomeHeader';

export function HomePage() {
  return (
    <>
      <nav className="sticky top-0 left-0 right-0 z-10">
        <HomeHeader />
      </nav>
      <main>
        <Home />
      </main>
      <footer>
        <HomeFooter />
      </footer>
    </>
  );
}
