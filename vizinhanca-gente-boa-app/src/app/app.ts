import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { HeaderComponent } from '@shared/components/header/header';
import { FooterComponent } from '@shared/components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  title = 'vizinhanca-gente-boa-app';
  
  isLandingPage = false;

  @HostBinding('class.is-landing') get isLanding() { return this.isLandingPage; }

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.isLandingPage = (event.urlAfterRedirects === '/');
    });
  }
}

