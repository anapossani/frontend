import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@services/auth.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith, switchMap, tap } from 'rxjs/operators';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AsyncPipe } from '@angular/common';
import { LocalidadeService, Estado } from '@services/localidade';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { finalize } from 'rxjs/operators'; 
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    AsyncPipe, 
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule, 
    MatAutocompleteModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './register-page.html',
  styleUrl: './register-page.css' 
})
export class RegisterPage implements OnInit { 
  registerForm!: FormGroup;
  registerError: string | null = null;
  estados$!: Observable<Estado[]>;
  todasCidades: string[] = [];
  cidadesFiltradas!: Observable<string[]>;
  isLoading = false;
  //private snackBar: MatSnackBar ;    

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    public dialogRef: MatDialogRef<RegisterPage>,
    private localidadeService: LocalidadeService
  ) {}

  get email() { return this.registerForm.get('email'); }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      estado: ['', Validators.required],
      cidade: ['', Validators.required],
      bairro: ['', Validators.required],
    });
  
    this.estados$ = this.localidadeService.getEstados();

    this.registerForm.get('estado')!.valueChanges.pipe(
    tap(() => {
      this.registerForm.get('cidade')!.setValue('');
      this.todasCidades = [];
    }),
    switchMap(estadoSigla => this.localidadeService.getMunicipios(estadoSigla))
    ).subscribe(municipios => {
      this.todasCidades = municipios.map(m => m.nome);
    });

   this.cidadesFiltradas = this.registerForm.get('cidade')!.valueChanges.pipe(
    startWith(''),
    map(value => this._filter(value || '')),
  );

  }
  
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.todasCidades.filter(option => option.toLowerCase().includes(filterValue));
  }
 
  onSubmit(): void {
    this.registerError = null;
    if (this.registerForm.invalid) {
      return;
    }
   this.isLoading = true;
   this.dialogRef.disableClose = true;

  this.authService.register(this.registerForm.value).pipe(

    finalize(() => {
       this.isLoading = false;
       this.dialogRef.disableClose = false; // <<-- REABILITA O FECHAMENTO (importante!)
    })

    ).subscribe({
      next: (newUser) => {
        console.log('Cadastro realizado com sucesso!', newUser);
          /*this.snackBar.open('Usuário cadastrado com sucesso!', 'Fechar', {
          duration: 3000, 
          verticalPosition: 'top', 
          panelClass: ['success-snackbar'] 
        });        */
        this.dialogRef.close({ registered: true });
      },
      error: (err) => {
        console.error('Erro no cadastro:', err);
        this.registerError = 'Não foi possível realizar o cadastro. Verifique os dados ou tente novamente mais tarde.';
      }
    });
  }
}