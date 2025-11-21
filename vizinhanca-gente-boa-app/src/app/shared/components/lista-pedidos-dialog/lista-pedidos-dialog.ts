import { Component, OnInit, Inject } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PedidoAjudaService } from '@services/pedido-ajuda';
import { PedidoAjudaDto } from '@models/pedido-ajuda.model';
import { ParticipacaoService } from '@core/services/participacao';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { FiltroPedido } from '@core/models/filtro.model';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface ListaPedidosDialog {
  titulo: string;
  isLoading: boolean;
}

@Component({
  selector: 'app-lista-pedidos-dialog',
  standalone: true,
  imports: [
    AsyncPipe, MatDialogModule, MatListModule, MatDividerModule,
    MatProgressSpinnerModule, MatButtonModule, MatIconModule,
    MatExpansionModule,MatFormField, MatLabel, MatInputModule
],
  templateUrl: './lista-pedidos-dialog.html',
  styleUrl: './lista-pedidos-dialog.css'
})
export class ListaPedidosDialog implements OnInit {
  pedidos$!: Observable<PedidoAjudaDto[]>;
  titulo: string;
  isLoading: boolean;

  constructor(
    public dialogRef: MatDialogRef<ListaPedidosDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ListaPedidosDialog,
    private pedidoAjudaService: PedidoAjudaService,
    private participacaoService : ParticipacaoService,
    private snackBar : MatSnackBar

  ) {
    this.titulo = data.titulo || 'Lista de Pedidos';
    this.isLoading = false;
  }

  ngOnInit(): void {
    const filtro : FiltroPedido = {
      apenasEmAndamento :true,
      apenasMeusPedidos : true
    }
    this.pedidos$ = this.pedidoAjudaService.getPedidos(filtro);
  }

  onClose(): void {
    this.dialogRef.close();
  }
  
  concluirPedido(idPedido : number, comentario?: string): void {
      if (this.isLoading) return;
      this.isLoading = true;
      
      this.pedidoAjudaService.concluirPedido(idPedido, comentario).pipe(
        finalize(() => this.isLoading = false)
      ).subscribe({
        next: () => {
          this.snackBar.open('Pedido marcado como concluído!', 'OK', { duration: 3000 });
          this.dialogRef.close({ statusChanged: true });
        },
        error: (err) => {
          this.snackBar.open(err.error?.message || 'Erro ao concluir o pedido.', 'Fechar');
        }
      });
  }
  
}