'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Cabecalho from '@/components/Header';
import Rodape from '@/components/Footer';

interface TipoRecurso {
  id: number;
  nome: string;
}

interface Recurso {
  idRecurso: number;
  idAbrigo: number;
  idTipo: number;
  nome: string;
  quantidade: number;
  estoqueIdeal: number;
}

interface Abrigo {
  idAbrigo: number;
  nome: string;
  endereco: string;
  telefone: string;
  capacidadeTotal: number;
  observacoes: string;
}

export default function AbrigoDetalhes({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [abrigo, setAbrigo] = useState<Abrigo | null>(null);
  const [recursos, setRecursos] = useState<Recurso[]>([]);
  const [tiposRecurso, setTiposRecurso] = useState<TipoRecurso[]>([]);
  const [editando, setEditando] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedRecurso, setSelectedRecurso] = useState<Recurso | null>(null);
  const [quantidadeDoacao, setQuantidadeDoacao] = useState<number>(0);
  const [formData, setFormData] = useState<Abrigo>({
    idAbrigo: 0,
    nome: '',
    endereco: '',
    telefone: '',
    capacidadeTotal: 0,
    observacoes: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    carregarDados();
    carregarTiposRecurso();
  }, [params.id]);

  const carregarDados = async () => {
    try {
      setLoading(true);
      setError(null);

      // Carregar dados do abrigo
      const responseAbrigo = await fetch(`http://localhost:8080/abrigos/${params.id}`);
      if (!responseAbrigo.ok) {
        throw new Error('Erro ao carregar dados do abrigo');
      }
      const dataAbrigo = await responseAbrigo.json();
      setAbrigo(dataAbrigo);
      setFormData(dataAbrigo);

      // Carregar recursos do abrigo
      const responseRecursos = await fetch(`http://localhost:8080/recursos/abrigo/${params.id}`);
      if (!responseRecursos.ok) {
        throw new Error('Erro ao carregar recursos do abrigo');
      }
      const dataRecursos = await responseRecursos.json();
      setRecursos(dataRecursos);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  };

  const carregarTiposRecurso = async () => {
    try {
      const response = await axios.get('http://localhost:8080/tipos-recurso');
      setTiposRecurso(response.data);
    } catch (error) {
      console.error('Erro ao carregar tipos de recurso:', error);
    }
  };

  const getNomeTipoRecurso = (idTipo: number) => {
    const tipo = tiposRecurso.find(t => t.id === idTipo);
    return tipo ? tipo.nome : 'Recurso não identificado';
  };

  const calcularPorcentagem = (quantidade: number, estoqueIdeal: number) => {
    return Math.round((quantidade / estoqueIdeal) * 100);
  };

  const getCorBarra = (porcentagem: number) => {
    if (porcentagem >= 80) return '#28a745'; // Verde
    if (porcentagem >= 50) return '#ffc107'; // Amarelo
    return '#dc3545'; // Vermelho
  };

  const handleDoacao = async () => {
    if (!selectedRecurso || quantidadeDoacao <= 0) return;

    try {
      const novaQuantidade = selectedRecurso.quantidade + quantidadeDoacao;
      
      const response = await fetch('http://localhost:8080/recursos', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idRecurso: selectedRecurso.idRecurso,
          idAbrigo: selectedRecurso.idAbrigo,
          idTipo: selectedRecurso.idTipo,
          quantidade: novaQuantidade,
          estoqueIdeal: selectedRecurso.estoqueIdeal
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao processar doação');
      }

      // Atualizar a lista de recursos mantendo os dados do tipo
      setRecursos(recursos.map(recurso => 
        recurso.idRecurso === selectedRecurso.idRecurso 
          ? { ...recurso, quantidade: novaQuantidade }
          : recurso
      ));

      setShowModal(false);
      setQuantidadeDoacao(0);
      setSelectedRecurso(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao processar doação');
    }
  };

  const handleEdit = () => {
    setEditando(true);
  };

  const handleCancel = () => {
    setEditando(false);
    setFormData(abrigo!);
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:8080/abrigos/${params.id}`, formData);
      setAbrigo(formData);
      setEditando(false);
      alert('Abrigo atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar abrigo:', error);
      alert('Erro ao atualizar abrigo. Por favor, tente novamente.');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Tem certeza que deseja excluir este abrigo?')) {
      try {
        await axios.delete(`http://localhost:8080/abrigos/${params.id}`);
        alert('Abrigo excluído com sucesso!');
        router.push('/dashboard');
      } catch (error) {
        console.error('Erro ao excluir abrigo:', error);
        alert('Erro ao excluir abrigo. Por favor, tente novamente.');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Cabecalho />
        <main className="pt-[120px]">
          <div className="container mx-auto px-4">
            <div className="text-center py-8">Carregando...</div>
          </div>
        </main>
        <Rodape />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Cabecalho />
        <main className="pt-[120px]">
          <div className="container mx-auto px-4">
            <div className="text-center py-8 text-red-600">{error}</div>
          </div>
        </main>
        <Rodape />
      </div>
    );
  }

  if (!abrigo) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Cabecalho />
        <main className="pt-[120px]">
          <div className="container mx-auto px-4">
            <div className="text-center py-8">Abrigo não encontrado</div>
          </div>
        </main>
        <Rodape />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Cabecalho />
      <main className="pt-[120px]">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">{abrigo.nome}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600"><i className="fas fa-map-marker-alt mr-2"></i>{abrigo.endereco}</p>
                <p className="text-gray-600"><i className="fas fa-phone mr-2"></i>{abrigo.telefone}</p>
                <p className="text-gray-600"><i className="fas fa-users mr-2"></i>Capacidade: {abrigo.capacidadeTotal} pessoas</p>
              </div>
              {abrigo.observacoes && (
                <div>
                  <p className="text-gray-600"><i className="fas fa-info-circle mr-2"></i>Observações:</p>
                  <p className="text-gray-600 mt-2">{abrigo.observacoes}</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Recursos Disponíveis</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recursos.map((recurso) => (
                <div key={recurso.idRecurso} className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">{recurso.nome}</h3>
                  <p className="text-gray-600">Quantidade: {recurso.quantidade}</p>
                  <div className="progress-bar-container">
                    <div 
                      className="progress-bar"
                      style={{
                        width: `${Math.min(100, (recurso.quantidade / recurso.estoqueIdeal) * 100)}%`,
                        backgroundColor: recurso.quantidade < recurso.estoqueIdeal ? '#f44336' : '#4caf50'
                      }}
                    />
                  </div>
                  <p className="progress-text">
                    {Math.round((recurso.quantidade / recurso.estoqueIdeal) * 100)}% do estoque ideal
                  </p>
                  <button
                    onClick={() => {
                      setSelectedRecurso(recurso);
                      setShowModal(true);
                    }}
                    className="mt-2 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
                  >
                    Doar
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {showModal && selectedRecurso && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Doar {selectedRecurso.nome}</h3>
            <p>Quantidade atual: {selectedRecurso.quantidade}</p>
            <p>Estoque ideal: {selectedRecurso.estoqueIdeal}</p>
            <div className="mt-4">
              <label className="block text-gray-700 mb-2">Quantidade a doar:</label>
              <input
                type="number"
                min="1"
                value={quantidadeDoacao}
                onChange={(e) => setQuantidadeDoacao(Number(e.target.value))}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => {
                  setShowModal(false);
                  setQuantidadeDoacao(0);
                  setSelectedRecurso(null);
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancelar
              </button>
              <button
                onClick={handleDoacao}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Confirmar Doação
              </button>
            </div>
          </div>
        </div>
      )}

      <Rodape />
    </div>
  );
}
