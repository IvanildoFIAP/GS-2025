// src/services/api.ts
import axios from 'axios';
import {
  Usuario,
  Abrigo,
  Recurso,
  TipoRecurso,
  LoginResponse
} from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000,
  withCredentials: true
});

// Interceptor para adicionar token às requisições
api.interceptors.request.use(config => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const ApiService = {
  // Autenticação
  login: async (email: string, senha: string): Promise<LoginResponse> => {
    const response = await api.post('/auth/login', { email, senha });
    return response.data;
  },

  // Usuários
  criarUsuario: async (usuario: Omit<Usuario, 'idUsuario'>): Promise<Usuario> => {
    const response = await api.post('/usuarios', usuario);
    return response.data;
  },

  buscarUsuarioPorEmail: async (email: string): Promise<Usuario> => {
    const response = await api.get(`/usuarios/email/${email}`);
    return response.data;
  },

  // Abrigos
  listarAbrigos: async (): Promise<Abrigo[]> => {
    const response = await api.get('/abrigos');
    return response.data;
  },

  criarAbrigo: async (abrigo: Omit<Abrigo, 'idAbrigo'>): Promise<Abrigo> => {
    const response = await api.post('/abrigos', abrigo);
    return response.data;
  },

  atualizarAbrigo: async (id: number, abrigo: Partial<Abrigo>): Promise<Abrigo> => {
    const response = await api.put(`/abrigos/${id}`, abrigo);
    return response.data;
  },

  // Recursos
  listarRecursos: async (idAbrigo?: number): Promise<Recurso[]> => {
    const url = idAbrigo ? `/recursos?idAbrigo=${idAbrigo}` : '/recursos';
    const response = await api.get(url);
    return response.data;
  },

  criarRecurso: async (recurso: Omit<Recurso, 'idRecurso'>): Promise<Recurso> => {
    const response = await api.post('/recursos', recurso);
    return response.data;
  },

  // Tipos de Recurso
  listarTiposRecurso: async (): Promise<TipoRecurso[]> => {
    const response = await api.get('/tipos-recurso');
    return response.data;
  }
};