import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnimationsService {
  private animations = false;

  constructor() { }

  getAnimations(): boolean {
    return this.animations;
  }

  setAnimations(value: boolean) {
    this.animations = value;
  }
}
