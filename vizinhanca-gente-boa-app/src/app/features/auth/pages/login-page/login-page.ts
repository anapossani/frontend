import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '@services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login-page',
  standalone: true,
  
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css'
})
export class LoginPage implements OnInit {
      
  loginForm!: FormGroup;
  loginError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    public dialogRef: MatDialogRef<LoginPage>    
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha_hash: ['', [Validators.required]]
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  onSubmit(): void {
    this.loginError = null;

    if (this.loginForm.invalid) {
      return;
    }

    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        console.log('Login bem-sucedido!', response);
        localStorage.setItem('authToken', response.token);
        this.dialogRef.close();
        this.router.navigate(['/pedidos']);
      },      
      error: (err) => {
        console.error('Erro no login:', err);
        this.loginError = 'Email ou senha inválidos. Tente novamente.';
      }
    });
  }
}