import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnimateurService {
  private animateur = false;
  duration: string | undefined;
  positionCursorSlider: number = 4;

  constructor() { }

  getAnimateur(): boolean {
    return this.animateur;
  }

  setAnimateur(value: boolean) {
    this.animateur = value;
  }
}
