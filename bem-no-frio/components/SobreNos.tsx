import Image from 'next/image';

export default function SobreNos() {
    return (
        <section id="sobre-nos">
            <div className="container">
                <div className="cols col-1">
                    <p className="pre-titulo">Conheça nossa missão</p>
                    <h2>O que é o Bem no Frio?</h2>
                    <p>
                        O Bem no Frio é uma plataforma digital criada para simplificar a gestão de abrigos emergenciais e a distribuição de recursos vitais durante o frio extremo. Conectamos voluntários a um painel central que exibe, em tempo real, a situação dos abrigos – como vagas – e os níveis de suprimentos essenciais, garantindo que o apoio chegue de forma eficaz a quem precisa.
                    </p>
                </div>
                <div className="cols col-2">
                    <Image
                        src="/img/telas-sistema-1.png"
                        width={756}
                        height={500}
                        alt="Telas do sistema com gráficos"
                    />
                </div>
            </div>
        </section>
    );
}