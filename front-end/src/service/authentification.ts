import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated: boolean = false;

  toggleAuthenticate(): void {
    this.isAuthenticated = !this.isAuthenticated;
  }

  getAuthenticationStatus(): boolean {
    return this.isAuthenticated;
  }
}
