import { Comentario } from "./comentario.model";
import { ParticipacaoCreateDto, Participacao } from "./participacao.model";

export interface PedidoAjudaCreateDto {
  titulo: string;
  descricao: string;
  categoriaId: number;
}

export interface PedidoAjuda {
  id: number;
  titulo: string;
  descricao: string;
  status: number;  
  usuario: UsuarioResumo; 
  categoria: Categoria; 
 
}

export interface PedidoAjudaResumo {
  id: number;
  titulo: string;
  status: number;
  dataCriacao: string;
  contagemComentarios: number;
  contagemParticipacoes: number;
}

export interface UsuarioResumo {
  id: number;
  nome: string;
}

export interface Categoria {
  id: number;
  nome: string;
  descricao: string | null; 
}

export interface PedidoAjudaDto {
  id: number;
  titulo: string;
  descricao: string;
  status: number; 
  dataCriacao: string;
  dataConclusao: string | null;
  usuarioId: number;
  categoriaId: number;
  usuario: UsuarioResumo; 
  categoria: Categoria;  
  comentarios: Comentario[]; 
  participacoes?: Participacao[] ;
  totalParticipacoes?: number; 
  totalComentarios?: number; 
}

