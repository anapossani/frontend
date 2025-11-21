export interface UsuarioCreateDto {
  nome: string;
  email: string;
  senha_hash: string;
  telefone: string;
  bairro: string

}

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  bairro: string
  
}

export interface UsuarioResumo {
  id: number;
  nome: string;
}