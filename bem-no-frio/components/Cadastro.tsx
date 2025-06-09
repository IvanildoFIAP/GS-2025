'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Usuario {
  idUsuario?: number;
  nome: string;
  email: string;
  senhaHash: string;
  perfil: string;
}

export default function Cadastro() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: ''
  });

  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (isLogin) {
        // Lógica de Login usando GET /usuarios/email/{email}
        const response = await fetch(`http://localhost:8080/usuarios/email/${formData.email}`);
        
        if (!response.ok) {
          throw new Error('Usuário não encontrado');
        }

        const usuario: Usuario = await response.json();
        
        // Comparação básica de senha
        if (!usuario || usuario.senhaHash !== formData.senha) {
          throw new Error('Credenciais inválidas');
        }
        
        // Armazena os dados do usuário
        localStorage.setItem('user', JSON.stringify(usuario));
        router.push('/dashboard');
      } else {
        // Lógica de Cadastro usando POST /usuarios
        const response = await fetch('http://localhost:8080/usuarios', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nome: formData.nome,
            email: formData.email,
            senhaHash: formData.senha,
            perfil: "ADMIN"
          })
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Erro detalhado:', {
            status: response.status,
            error: errorText
          });
          throw new Error(errorText || 'Erro no cadastro');
        }

        alert('Cadastro realizado com sucesso! Faça login para continuar.');
        setIsLogin(true);
        setFormData({ nome: '', email: '', senha: '' });
      }
    } catch (err) {
      console.error('Erro completo:', err);
      setError(err instanceof Error ? err.message : 'Erro na operação');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError('');
  };

  return (
    <section id="inscricao">
      <div className="secao-contato" style={{ maxWidth: '1200px', margin: '0 auto', padding: '70px 15px' }}>
        <div className="form-contato" style={{ 
          flex: 6,
          backgroundColor: '#1e88e5',
          padding: '50px',
          borderRadius: '30px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <div className="titulo" style={{ textAlign: 'left', marginBottom: '20px' }}>
            <h2 style={{ color: '#ffffff', marginBottom: '10px' }}>
              {isLogin ? 'Faça login' : 'Cadastre-se'}
            </h2>
            <p style={{ color: '#e3f2fd' }}>
              {isLogin ? 'Acesse sua conta para continuar.' : 'Junte-se a nós e faça a diferença.'}
            </p>
          </div>
          
          {error && (
            <div style={{ 
              color: '#ffcdd2', 
              backgroundColor: '#b71c1c',
              padding: '10px',
              borderRadius: '5px',
              marginBottom: '20px',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {!isLogin && (
              <input
                type="text"
                name="nome"
                placeholder="Nome completo"
                value={formData.nome}
                onChange={handleChange}
                required
                disabled={isLoading}
                style={{
                  width: '100%',
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '25px',
                  fontSize: '1rem',
                  outline: 'none',
                  height: '50px',
                  backgroundColor: isLoading ? '#e3f2fd' : '#42a5f5',
                  color: '#ffffff',
                  cursor: isLoading ? 'not-allowed' : 'text'
                }}
              />
            )}
            
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '25px',
                fontSize: '1rem',
                outline: 'none',
                height: '50px',
                backgroundColor: isLoading ? '#e3f2fd' : '#42a5f5',
                color: '#ffffff',
                cursor: isLoading ? 'not-allowed' : 'text'
              }}
            />
            
            <input
              type="password"
              name="senha"
              placeholder="Senha"
              value={formData.senha}
              onChange={handleChange}
              required
              minLength={6}
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '25px',
                fontSize: '1rem',
                outline: 'none',
                height: '50px',
                backgroundColor: isLoading ? '#e3f2fd' : '#42a5f5',
                color: '#ffffff',
                cursor: isLoading ? 'not-allowed' : 'text'
              }}
            />
            
            <button 
              type="submit"
              disabled={isLoading}
              style={{
                padding: '10px 15px',
                border: 'none',
                borderRadius: '35px',
                backgroundColor: '#ffffff',
                color: '#1e88e5',
                fontSize: '18px',
                fontWeight: '600',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                height: '55px',
                transition: 'all 0.3s ease',
                opacity: isLoading ? 0.7 : 1
              }}
            >
              {isLoading ? (
                <span>Processando...</span>
              ) : isLogin ? (
                <span>Entrar</span>
              ) : (
                <span>Cadastrar</span>
              )}
            </button>
          </form>
          
          <p style={{ 
            textAlign: 'center', 
            marginTop: '20px', 
            color: '#ffffff',
            fontSize: '0.9rem'
          }}>
            {isLogin ? 'Não tem uma conta? ' : 'Já tem uma conta? '}
            <button 
              type="button"
              onClick={toggleForm}
              disabled={isLoading}
              style={{
                background: 'none',
                border: 'none',
                color: '#bbdefb',
                textDecoration: 'underline',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                fontWeight: 'bold',
                opacity: isLoading ? 0.7 : 1,
                fontSize: 'inherit',
                padding: '0',
                marginLeft: '5px'
              }}
            >
              {isLogin ? 'Cadastre-se' : 'Faça login'}
            </button>
          </p>
        </div>
        
        <div className="info-contato" style={{ 
          flex: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '7px',
          padding: '0 30px'
        }}>
          <div className="titulo" style={{ textAlign: 'left', marginBottom: '20px' }}>
            <p className="pre-titulo" style={{ 
              color: '#1e88e5',
              fontWeight: '600',
              marginBottom: '5px'
            }}>
              Junte-se a nós
            </p>
            <h2 style={{ 
              color: '#0d47a1',
              marginBottom: '15px'
            }}>
              Aqueça quem mais precisa neste inverno
            </h2>
            <p style={{ color: '#546e7a' }}>
              Participe da nossa rede para doar, ser voluntário, gerenciar recursos e levar esperança.
            </p>
          </div>
          
          <div className="linha-info" style={{ 
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            fontSize: '18px',
            color: '#333'
          }}>
            <i className="fas fa-phone-alt" style={{ 
              fontSize: '1.2rem',
              color: '#1e88e5'
            }}></i>
            <span>(11) 1234-5678</span>
          </div>
          
          <div className="linha-info" style={{ 
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            fontSize: '18px',
            color: '#333'
          }}>
            <i className="fas fa-envelope" style={{ 
              fontSize: '1.2rem',
              color: '#1e88e5'
            }}></i>
            <span>contato@bemnofrio.com.br</span>
          </div>
        </div>
      </div>
    </section>
  );
}