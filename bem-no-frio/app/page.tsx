import Head from 'next/head';
import Cabecalho from '@/components/Header';
import Hero from '@/components/Hero';
import SobreNos from '@/components/SobreNos';
import Numeros from '@/components/Numeros';
import Funcionamento from '@/components/Funcionamento';
import Equipe from '@/components/Equipe';
import Cadastro from '@/components/Cadastro';
import Rodape from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Head>
        <title>EcoLevel</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/png" href="/img/ecolevel-favicon.png" sizes="100x100" />
        <link rel="apple-touch-icon" href="/img/ecolevel-favicon.png" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100..900;1,100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
          rel="stylesheet"
        />
      </Head>

      <Cabecalho />
      <main>
        <Hero />
        <SobreNos />
        <Numeros />
        <Funcionamento />
        <Equipe />
        <Cadastro />
      </main>
      <Rodape />
    </>
  );
}