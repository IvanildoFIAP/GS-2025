import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <nav className="menu">
        <ul>
          <li><Link href="/#">Início</Link></li>
          <li><Link href="/#sobre-nos">Sobre</Link></li>
          <li><Link href="/#funcionamento">Como funciona</Link></li>
          <li><Link href="/#equipe">Equipe</Link></li>
          <li><Link href="/#inscricao">Cadastre-se</Link></li>
        </ul>
      </nav>
      <hr />
      <p>Bem no Frio © 2025. Todos os direitos reservados.</p>
    </footer>
  );
}