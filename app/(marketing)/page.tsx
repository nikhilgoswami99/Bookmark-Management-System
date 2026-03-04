import LandingNavbar from '@/components/landingNavbar/LandingNavbar';
import styles from './page.module.css';
import Hero from '@/components/hero/Hero';
import Features from '@/components/features/Features';

export default function LandingPage() {
  return (
    <div className={styles.container} data-theme="dark">
      <LandingNavbar />
      
      <main className={styles.main}>
        <Hero />
        <Features />
      </main>

      <footer className={styles.footer}>
        <p>&copy; 2024 Sangrah. Elevate your browsing.</p>
      </footer>
    </div>
  );
}
