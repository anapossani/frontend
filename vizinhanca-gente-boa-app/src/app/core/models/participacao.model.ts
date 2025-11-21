export interface ParticipacaoCreateDto {
  pedidoId: number;
}

export interface Participacao {
  id: number;
  pedidoId: number;
  usuarioId: number;
  status: string; 
  usuarioNome: string;
  dataParticipacao: Date;
}

export interface ParticipacaoAceitarDto {
  id: number;
}