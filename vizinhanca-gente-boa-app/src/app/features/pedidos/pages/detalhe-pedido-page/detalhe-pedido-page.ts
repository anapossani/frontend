import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card'; 
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PedidoAjudaService } from '@core/services/pedido-ajuda';
import { PedidoAjudaDto} from '@models/pedido-ajuda.model'
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input'; 
import { MatListModule } from '@angular/material/list';
import { ParticipacaoService } from '@services/participacao' 
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize, tap } from 'rxjs/operators';
import { MatIcon } from "@angular/material/icon";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; 
import { ComentarioService } from '@services/comentario'; 
import { ComentarioCreateDto } from '@models/comentario.model'; 
import { AuthService } from '@core/services/auth.service';
import { StatusPedidoPipe } from '@shared/pipes/status-pedido-pipe';
import { StatusPedido } from '@core/enums/status-pedido.enum';

@Component({
  selector: 'app-detalhe-pedido-page',
  standalone: true,
  imports: [
    AsyncPipe,
    MatProgressSpinnerModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatIcon,
    ReactiveFormsModule,
    StatusPedidoPipe
  ],
  templateUrl: './detalhe-pedido-page.html',
  styleUrl: './detalhe-pedido-page.css'
})
export class DetalhePedidoPage implements OnInit {
  
  pedido$!: Observable<PedidoAjudaDto>;
  isLoading$: Observable<boolean>; 
  isLoadingAcao = false;
  commentForm!: FormGroup;
  isOwner = false;
  public readonly StatusPedido = StatusPedido

  constructor(
  public dialogRef: MatDialogRef<DetalhePedidoPage>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number },
    private pedidoAjudaService: PedidoAjudaService,
    private snackBar: MatSnackBar,
    public participacaoService: ParticipacaoService,
    private comentarioService: ComentarioService,
    private fb: FormBuilder, 
    private authService: AuthService
    ) {
    this.isLoading$ = this.participacaoService.isLoading$;
    }

  ngOnInit(): void {
    if (this.data.id) {
      this.pedido$ = this.pedidoAjudaService.getPedidoById(this.data.id);
      this.commentForm = this.fb.group({
        mensagem: ['', Validators.required]
    });

    } else {
      console.error("ID do pedido não foi informado!");
      this.dialogRef.close();
    }
    this.recarrregarPedido();
    console.log(this.isOwner);
  }

  isPedidoAtivo(status: number): boolean {
     return status !== StatusPedido.Concluido && status !== StatusPedido.Cancelado;
    }
    

  recarrregarPedido(): void {
    if (this.data.id) {
        this.pedido$ = this.pedidoAjudaService.getPedidoById(this.data.id).pipe(
        tap(pedido => {
            const usuarioLogadoId = this.authService.getUserId();
            this.isOwner = (usuarioLogadoId === pedido.usuarioId);
        }
        )
      );
    } else {
      console.error("ID do pedido não foi fornecido para o modal!");
      this.dialogRef.close();
    }    
  }

  onAddComment(pedidoId: number): void {
  if (this.commentForm.invalid || this.isLoadingAcao) {
    return;
  }

  this.isLoadingAcao = true;

  const comentarioData: ComentarioCreateDto = {
    pedidoId: pedidoId,
    mensagem: this.commentForm.value.mensagem
  };

  this.comentarioService.createComentario(comentarioData).pipe(
    finalize(() => this.isLoadingAcao = false)
  ).subscribe({
    next: (novoComentario) => {
      this.snackBar.open('Comentário adicionado!', 'OK', { duration: 2000, verticalPosition: 'top' });
      this.commentForm.reset(); 
      this.recarrregarPedido();
    },
    error: (err) => {
      this.snackBar.open('Erro ao adicionar comentário.', 'Fechar', { duration: 3000, panelClass: ['error-snackbar'] });
      }
    });
  }

  onQueroAjudar(pedidoId: number): void {
 
    this.participacaoService.oferecerAjuda(pedidoId);
     }

  onClose(): void {
      this.dialogRef.close(); 
    }

  onCancelarPedido(pedidoId: number): void {
      if (this.isLoadingAcao) return;
      this.isLoadingAcao = true;
      this.pedidoAjudaService.cancelarPedido(pedidoId).pipe(
        finalize(() => this.isLoadingAcao = false)
      ).subscribe({
        next: () => {
          this.snackBar.open('Pedido cancelado com sucesso.', 'OK', { duration: 3000 });
          this.dialogRef.close({ statusChanged: true });
        },
        error: (err) => {
          this.snackBar.open(err.error?.message || 'Erro ao cancelar o pedido.', 'Fechar');
        }
      });
    }

    onConcluirPedido(pedidoId: number): void {
      if (this.isLoadingAcao) return;
      this.isLoadingAcao = true;
      
      this.pedidoAjudaService.concluirPedido(pedidoId).pipe(
        finalize(() => this.isLoadingAcao = false)
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