import { UsuarioResumo } from './usuario.model';

export interface ComentarioResumo {
  id: number;
  texto: string;
  nomeUsuario: string;
  pedidoId: number;
  tituloPedido: string;
  dataCriacao: string;
}

export interface ComentarioCreateDto {
  pedidoId: number;
  mensagem: string;
}

export interface Comentario {
  id: number;
  mensagem: string;
  dataCriacao: string;
  usuarioId: number;
  pedidoId: number;
  usuario: UsuarioResumo; 
}