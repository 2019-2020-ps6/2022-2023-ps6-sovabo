import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JeuxCouleursService {
  private jeuxCouleurs = false;

  constructor() { }

  getJeuxCouleurs(): boolean {
    return this.jeuxCouleurs;
  }

  setJeuxCouleurs(value: boolean) {
    this.jeuxCouleurs = value;
  }
}
