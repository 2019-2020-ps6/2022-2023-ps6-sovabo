import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnimationsService {
  public isAnimated = false;
  public duration: string | undefined = "5s";


  constructor() { }

  getAnimations(): boolean {
    return this.isAnimated;
  }

  setAnimations(value: boolean) {
    this.isAnimated = value;
  }
}
