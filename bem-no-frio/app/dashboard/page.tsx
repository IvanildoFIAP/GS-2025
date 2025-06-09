'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Cabecalho from '@/components/Header';
import Rodape from '@/components/Footer';

export default function DashboardPage() {
  const router = useRouter();
  const [abrigos, setAbrigos] = useState([]);
  const [novoAbrigo, setNovoAbrigo] = useState({
    nome: '',
    endereco: '',
    telefone: '',
    capacidadeTotal: 0,
    observacoes: ''
  });

  useEffect(() => {
    carregarAbrigos();
  }, []);

  const carregarAbrigos = async () => {
    try {
      const response = await axios.get('http://localhost:8080/abrigos');
      setAbrigos(response.data);
    } catch (error) {
      console.error('Erro ao carregar abrigos:', error);
      alert('Erro ao carregar abrigos. Por favor, tente novamente.');
    }
  };

  const cadastrarAbrigo = async () => {
    try {
      if (!novoAbrigo.nome || !novoAbrigo.endereco || !novoAbrigo.telefone || novoAbrigo.capacidadeTotal <= 0) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
      }

      await axios.post('http://localhost:8080/abrigos', novoAbrigo);
      
      setNovoAbrigo({
        nome: '',
        endereco: '',
        telefone: '',
        capacidadeTotal: 0,
        observacoes: ''
      });
      
      await carregarAbrigos();
      alert('Abrigo cadastrado com sucesso!');
    } catch (error) {
      console.error('Erro ao cadastrar abrigo:', error);
      alert('Erro ao cadastrar abrigo. Por favor, tente novamente.');
    }
  };

  const handleAbrigoClick = (idAbrigo: number) => {
    router.push(`/dashboard/${idAbrigo}`);
  };

  return (
    <div className="internal-page">
      <Cabecalho />
      <main style={{ paddingTop: '120px' }}>
        <section id="dashboard">
          <div className="titulo">
            <p className="pre-titulo">Painel de Controle</p>
            <h2>Gerenciamento de Abrigos</h2>
            <p>Cadastre e gerencie os abrigos disponíveis para pessoas em situação de rua</p>
          </div>

          <div className="dashboard-container">
            {/* Formulário de Cadastro */}
            <div className="dashboard-form">
              <h3>Novo Abrigo</h3>
              <div className="dashboard-form-container">
                <input
                  type="text"
                  placeholder="Nome"
                  value={novoAbrigo.nome}
                  onChange={(e) => setNovoAbrigo({ ...novoAbrigo, nome: e.target.value })}
                  className="dashboard-input"
                />
                <input
                  type="text"
                  placeholder="Endereço"
                  value={novoAbrigo.endereco}
                  onChange={(e) => setNovoAbrigo({ ...novoAbrigo, endereco: e.target.value })}
                  className="dashboard-input"
                />
                <input
                  type="text"
                  placeholder="Telefone"
                  value={novoAbrigo.telefone}
                  onChange={(e) => setNovoAbrigo({ ...novoAbrigo, telefone: e.target.value })}
                  className="dashboard-input"
                />
                <div>
                  <label htmlFor="capacidade" style={{ color: 'white', marginBottom: '0.5rem', display: 'block' }}>
                    Capacidade Total (número de pessoas)
                  </label>
                  <input
                    id="capacidade"
                    type="number"
                    placeholder="Capacidade Total"
                    value={novoAbrigo.capacidadeTotal}
                    onChange={(e) => setNovoAbrigo({ ...novoAbrigo, capacidadeTotal: parseInt(e.target.value) || 0 })}
                    className="dashboard-input"
                  />
                </div>
                <textarea
                  placeholder="Observações"
                  value={novoAbrigo.observacoes}
                  onChange={(e) => setNovoAbrigo({ ...novoAbrigo, observacoes: e.target.value })}
                  className="dashboard-input dashboard-textarea"
                />
                <button 
                  onClick={cadastrarAbrigo}
                  className="dashboard-button"
                >
                  Cadastrar Abrigo
                </button>
              </div>
            </div>

            {/* Lista de Abrigos */}
            <div className="dashboard-list">
              <h3>Abrigos Cadastrados</h3>
              {abrigos.length === 0 ? (
                <div className="dashboard-empty">
                  Nenhum abrigo cadastrado ainda.
                </div>
              ) : (
                <div className="dashboard-cards">
                  {abrigos.map((abrigo: any) => (
                    <div 
                      key={abrigo.idAbrigo} 
                      className="dashboard-card"
                      onClick={() => handleAbrigoClick(abrigo.idAbrigo)}
                    >
                      <h4>{abrigo.nome}</h4>
                      <p>
                        <i className="fas fa-map-marker-alt"></i>
                        {abrigo.endereco}
                      </p>
                      <p>
                        <i className="fas fa-phone"></i>
                        {abrigo.telefone}
                      </p>
                      <p>
                        <i className="fas fa-users"></i>
                        Capacidade: {abrigo.capacidadeTotal} pessoas
                      </p>
                      {abrigo.observacoes && (
                        <p className="observacoes">
                          <i className="fas fa-info-circle"></i>
                          {abrigo.observacoes}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Rodape />
    </div>
  );
}
