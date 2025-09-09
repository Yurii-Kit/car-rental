import HeroSection from '../../components/HeroSection/HeroSection';
import Container from '../../components/Container/Container';
import css from './HomePage.module.css';

export default function HomePage() {
  return (
    <section className={css.wrapper}>
      <Container>
        <HeroSection />
      </Container>
    </section>
  );
}
