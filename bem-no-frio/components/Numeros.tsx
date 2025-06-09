export default function Numeros() {
  const dados = [
    { numero: '281 mil', descricao: 'Pessoas em situação de rua no Brasil' },
    { numero: '<10°C', descricao: 'Temperatura que já eleva o risco de hipotermia' },
    { numero: '+70%', descricao: 'Aumento médio da procura por abrigos no inverno' },
    { numero: '1', descricao: 'Cobertor aquece uma vida, salva do frio' },
  ];

  return (
    <section id="numeros">
      <div className="quatro-colunas">
        {dados.map((item, index) => (
          <div key={index} className="coluna">
            <h2 className="numero">{item.numero}</h2>
            <p>{item.descricao}</p>
          </div>
        ))}
      </div>
    </section>
  );
}