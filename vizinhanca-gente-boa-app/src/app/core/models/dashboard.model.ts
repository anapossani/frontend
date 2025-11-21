import { PedidoAjudaResumo } from "./pedido-ajuda.model";


export interface DashboardData {
  nomeUsuario: string;
  stats: DashboardStats;
  ultimosPedidos: PedidoAjudaResumo[]
}

export interface DashboardStats {
  pedidosCriados: number;
  ajudasOferecidas: number;
  conexoesFeitas: number;
}

