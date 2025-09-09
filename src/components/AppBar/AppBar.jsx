import { Link } from 'react-router-dom';
import css from './AppBar.module.css';
import Container from '../Container/Container';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';

export default function AppBar() {
  return (
    <header className={css.header}>
      <Container className={css.container}>
        <Logo />
        <Navigation />
      </Container>
    </header>
  );
}
