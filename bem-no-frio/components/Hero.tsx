import Link from 'next/link';

export default function Hero() {
  return (
    <section>
      <div className="banner">
        <video autoPlay muted loop>
          <source src="/videos/video-home.mp4" type="video/mp4" />
        </video>
        <div className="content">
          <p className="pre-titulo">Bem no Frio</p>
          <h1>Neste inverno, aqueça um coração e espalhe solidariedade</h1>
          <p>
            Participe: doe, seja voluntário ou ajude a gerenciar recursos de abrigos para proteger quem mais precisa do frio.
          </p>
          <div className="cta-container">
            <Link href="#inscricao" className="btn cta-primario">Participe Agora</Link>
            <Link href="#sobre-nos" className="btn cta-secundario">Saiba Mais</Link>
          </div>
        </div>
      </div>
    </section>
  );
}