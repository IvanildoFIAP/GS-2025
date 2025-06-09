// src/types/index.ts
export interface Usuario {
  idUsuario?: number;
  nome: string;
  email: string;
  senha?: string;
  senhaHash?: string;
  perfil?: 'ADMIN' | 'VOLUNTARIO' | string;
}

export interface TipoRecurso {
  id: number;
  nome: string;
}

export interface Recurso {
  idRecurso?: number;
  idAbrigo: number;
  idTipo: number;
  quantidade: number;
  estoqueIdeal: number;
}

export interface Abrigo {
  idAbrigo?: number;
  nome: string;
  endereco: string;
  telefone: string;
  capacidadeTotal: number;
  observacoes?: string;
}

export interface LoginResponse {
  usuario: Usuario;
  token: string;
}