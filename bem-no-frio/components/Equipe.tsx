import Image from 'next/image';
import Link from 'next/link';

export default function Equipe() {
  const membros = [
    {
      nome: "Ivanildo Silva",
      rm: "RM 560049 | 1TDSZ",
      imagem: "/img/integrante-ivanildo.jpg",
      alt: "Homem de pele branca e cabelo escuro",
      redes: [
        { 
          icone: "fab fa-linkedin", 
          link: "https://www.linkedin.com/in/ivanildo-silva-589167324/" 
        },
        { 
          icone: "fab fa-github", 
          link: "https://github.com/IvanildoFIAP" 
        },
        { 
          icone: "fas fa-envelope", 
          link: "mailto:rm560049@fiap.com.br" 
        }
      ]
    },
    {
      nome: "Jennyfer Lee",
      rm: "RM 561020 | 1TDSZ",
      imagem: "/img/integrante-jennyfer.jpg",
      alt: "Mulher amarela, asiática de cabelo preto no comprimento do ombro",
      redes: [
        { 
          icone: "fab fa-linkedin", 
          link: "https://www.linkedin.com/in/jennyfer-lee-a5a292282" 
        },
        { 
          icone: "fab fa-github", 
          link: "https://github.com/Jennyfer56" 
        },
        { 
          icone: "fas fa-envelope", 
          link: "mailto:rm561020@fiap.com.br" 
        }
      ]
    },
    {
      nome: "Leticia Sousa",
      rm: "RM 559258 | 1TDSZ",
      imagem: "/img/integrante-leticia.jpg",
      alt: "Mulher negra, com cabelos de cor preta e sorrindo",
      redes: [
        { 
          icone: "fab fa-linkedin", 
          link: "https://www.linkedin.com/in/leticia-sousa-9ab643222" 
        },
        { 
          icone: "fab fa-github", 
          link: "https://github.com/letprado" 
        },
        { 
          icone: "fas fa-envelope", 
          link: "mailto:rm559258@fiap.com.br" 
        }
      ]
    }
  ];

  return (
    <section id="equipe">
      <div className="equipe">
        <div className="equipe-descricao">
          <p className="pre-titulo">Conheça a equipe</p>
          <h2>Nosso time</h2>
          <p>
            Somos um time dedicado a construir uma resposta solidária e eficiente ao frio extremo, unindo tecnologia, criatividade e comprometimento para tornar o Bem no Frio uma realidade que aquece e protege vidas.
          </p>
        </div>
        
        <div className="equipe-cards">
          {membros.map((membro, index) => (
            <div key={index} className="equipe-card">
              <Image 
                src={membro.imagem} 
                alt={membro.alt}
                width={300}
                height={320}
                className="foto-equipe"
              />
              <div className="info">
                <div className="texto">
                  <h3>{membro.nome}</h3>
                  <p>{membro.rm}</p>
                </div>
                <div className="icones-social">
                  {membro.redes.map((rede, i) => (
                    <Link 
                      key={i} 
                      href={rede.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="social-icon"
                    >
                      <i className={rede.icone}></i>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}