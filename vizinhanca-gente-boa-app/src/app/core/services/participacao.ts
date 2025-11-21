import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, finalize, Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '@env/environment';
import { Participacao, ParticipacaoCreateDto, ParticipacaoAceitarDto } from '@models/participacao.model';

@Injectable({
  providedIn: 'root'
})
export class ParticipacaoService {
  private apiUrl = `${environment.apiUrl}/participacoes`;
  private _isLoading = new Subject<boolean>();
  public readonly isLoading$ = this._isLoading.asObservable();

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar
   ) { }

    oferecerAjuda(pedidoId: number): void {
    this._isLoading.next(true); 

    const dto: ParticipacaoCreateDto = { pedidoId: pedidoId };

    this.http.post<Participacao>(this.apiUrl, dto).pipe(
      finalize(() => this._isLoading.next(false)) 
    ).subscribe({
      next: () => {
        this.snackBar.open('Seu oferecimento de ajuda foi enviado!', 'OK', {
          duration: 3000,
          verticalPosition: 'top',
          panelClass: ['success-snackbar']
        });
      },
      error: (err) => {
        const errorMessage = err.error?.message || 'Não foi possível enviar sua ajuda. Tente novamente.';
        this.snackBar.open(errorMessage, 'Fechar', {
          duration: 5000,
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
      }
    }) ;
  }

 aceitarAjuda(participacaoId: number): Observable<any> { 
    this._isLoading.next(true);
    const dto: ParticipacaoAceitarDto = { id: participacaoId };
    const url = `${this.apiUrl}/${participacaoId}/aceitar`;
    console.log(url)

    return this.http.post(url, dto).pipe(  finalize(() => this._isLoading.next(false))
    );
  }

  createParticipacao(data: Participacao): Observable<Participacao> {
    return this.http.post<Participacao>(this.apiUrl, data);
  }
}