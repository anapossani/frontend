import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';
import { DashboardService } from '@services/dashboard.service';
import { DashboardData } from '@models/dashboard.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AsyncPipe } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ListaPedidosDialog } from '@shared/components/lista-pedidos-dialog/lista-pedidos-dialog';
import { DetalhePedidoPage } from '@features/pedidos/pages/detalhe-pedido-page/detalhe-pedido-page';
import { MatCardActions } from '@angular/material/card';
import { StatusPedidoPipe } from '@shared/pipes/status-pedido-pipe';
import { AceitarAjudaDialog } from '@shared/components/aceitar-ajuda-dialog/aceitar-ajuda-dialog';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatDividerModule,
    RouterModule,
    MatProgressSpinnerModule,
    AsyncPipe,
    MatDialogModule,
    MatCardActions,
    StatusPedidoPipe
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css'
})

export class HomePage implements OnInit {
   data: DashboardData | null = null;
   isLoading = true;

  constructor(
    private dashboardService: DashboardService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
        this.dashboardService.getDashboardData().subscribe({
      next: (apiData) => {
        this.data = apiData; 
        this.isLoading = false; 
      },
      error: (err) => {
        console.error('Erro ao buscar dados da dashboard:', err);
        this.isLoading = false; 
      }
    });
  }

    abrirModalMeusPedidos(): void {
        this.dialog.open(ListaPedidosDialog, {
          width: '800px',
          maxWidth: '95vw',
          data: {
            titulo: 'Meus Pedidos de Ajuda',
            filtro: {
              apenasMeusPedidos: true 
            }
          }          
        });
      }           

    abrirDetalhesPedido(pedidoId: number): void {
        const dialogRef = this.dialog.open(DetalhePedidoPage, {
          width: '800px', 
          maxWidth: '90vw', 
          data: { id: pedidoId } 
        });   

       dialogRef.afterClosed().subscribe(result => {
          if (result?.statusChanged) {
          this.recarrregarDashboard();
        }        
      })
    }  

    abrirPedidosAprovacao(): void {
    const dialogRef = this.dialog.open(AceitarAjudaDialog, {
      width: '800px',
      maxWidth: '95vw',
      data: {
        titulo: 'Aceitar Ajuda',
        filtro: {
          apenasMeusPedidos: true, 
          apenasEmAberto: true,
          apenasPedidosComParticipacao: true
        }
      }          
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result?.statusChanged) {
      this.recarrregarDashboard();
    }        
  })

  }   

    private recarrregarDashboard(): void {
      this.isLoading = true;
      this.dashboardService.getDashboardData().subscribe({
        next: (apiData) => {
          this.data = apiData;
          this.isLoading = false;
        },
        error: (err) => { this.isLoading = false; }
      });      
    }   
}  

