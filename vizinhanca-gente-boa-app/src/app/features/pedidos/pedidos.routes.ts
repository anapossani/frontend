import { Routes } from '@angular/router';
import { NovoPedidoPage } from './pages/novo-pedido-page/novo-pedido-page';
import { ListarPedidosPage } from './pages/listar-pedidos-page/listar-pedidos-page';

const PEDIDOS_ROUTES: Routes = [
  {
    path: 'novo', 
    component: NovoPedidoPage
  },
  {
    path: '', 
    component: ListarPedidosPage
  }

];

export default PEDIDOS_ROUTES;