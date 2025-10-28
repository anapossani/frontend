import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LoginPage } from '@features/auth/pages/login-page/login-page';
import { RegisterPage } from '@features/auth/pages/register-page/register-page';

@Component({
  selector: 'app-landing-page',
  imports: [RouterModule, MatDialogModule],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]  
})

export class LandingPage {
  
  constructor(public dialog: MatDialog) { }
openLoginDialog(): void {
    const dialogRef = this.dialog.open(LoginPage, {
      width: '450px', 
      panelClass: 'auth-dialog-container' 
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('O modal de login foi fechado');
    });
  }

  openRegisterDialog(): void {
    const dialogRef = this.dialog.open(RegisterPage, {
      width: '450px',
      panelClass: 'auth-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('O modal de cadastro foi fechado');
    });
  }

}