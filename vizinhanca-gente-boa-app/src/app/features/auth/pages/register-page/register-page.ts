import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@services/auth.service';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './register-page.html',
  styleUrls: [    
    './register-page.css'     
  ]  
  
})
export class RegisterPage implements OnInit {
  registerForm!: FormGroup;
  registerError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    public dialogRef: MatDialogRef<RegisterPage>    
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      senha_hash: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get email() {
    return this.registerForm.get('email');
  }
 
  onSubmit(): void {
    this.registerError = null;
    if (this.registerForm.invalid) {
      return;
    }

    this.authService.register(this.registerForm.value).subscribe({
      next: (newUser) => {
        console.log('Cadastro realizado com sucesso!', newUser);
        this.dialogRef.close({ registered: true });
      },
      error: (err) => {
        console.error('Erro no cadastro:', err);
        this.registerError = 'Não foi possível realizar o cadastro. Verifique os dados ou tente novamente mais tarde.';
      }
    });
  }
}