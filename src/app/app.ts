import { ChangeDetectorRef, Component, signal } from '@angular/core';
import { RouterLink , RouterOutlet, Router } from '@angular/router';
import { Api } from './service/api';


@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('DinePOS');

  constructor(
    private api: Api,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  isAuthenticated(): boolean {
    return this.api.isAuthenticated();
  }
  isAdmin(): boolean {
    return this.api.isAdmin();
  }

  logOut(): void {
    this.api.logout();
    this.router.navigate(['/login']);
    this.cdr.detectChanges();
  }
}
