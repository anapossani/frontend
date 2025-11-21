import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PedidoAjudaService } from '@services/pedido-ajuda';
import { PedidoAjudaDto } from '@models/pedido-ajuda.model';
import { MatExpansionModule } from '@angular/material/expansion'
import { ParticipacaoService } from '@core/services/participacao';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';
import { FiltroPedido } from '@core/models/filtro.model';

export interface AceitarAjudaDialogData {
  titulo: string;
  filtro: FiltroPedido; 
}

@Component({
  selector: 'app-aceitar-ajuda-dialog',
  standalone: true,
  imports: [
    AsyncPipe, MatDialogModule, MatListModule, MatDividerModule,
    MatProgressSpinnerModule, MatButtonModule, MatIconModule,
    MatExpansionModule, DatePipe 
  ],
  templateUrl: './aceitar-ajuda-dialog.html',
  styleUrl: './aceitar-ajuda-dialog.css'
})

export class AceitarAjudaDialog implements OnInit {
  pedidos$!: Observable<PedidoAjudaDto[]>;
  titulo: string;

  constructor(
    public dialogRef: MatDialogRef<AceitarAjudaDialog>,
    @Inject(MAT_DIALOG_DATA) public data: AceitarAjudaDialogData,
    private pedidoAjudaService: PedidoAjudaService,
    private participacaoService: ParticipacaoService,
    private snackBar: MatSnackBar
  ) {
    this.titulo = data.titulo || 'Aceitar ajuda nos pedidos';
  }

  ngOnInit(): void {
    this.pedidos$ = this.pedidoAjudaService.getPedidos(this.data.filtro);
  }

  onClose(): void {
    this.dialogRef.close(true);
  }

  aceitarParticipacao(participacaoId: number): void {
    this.participacaoService.aceitarAjuda(participacaoId).subscribe({
      next: () => {
        this.snackBar.open('Participação aceita!', 'OK', {
          duration: 3000,
          verticalPosition: 'top',
          panelClass: ['success-snackbar']
        });
        this.dialogRef.close({ statusChanged: true }); 
      },
      error: (err: { error: { message: string; }; }) => {
        const errorMessage = err.error?.message || 'Não foi possível aceitar o pedido de ajuda. Tente novamente.';
        this.snackBar.open(errorMessage, 'Fechar', {
          duration: 5000,
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
        console.error('Erro ao aceitar participação:', err);
      }
    });
  }

}

