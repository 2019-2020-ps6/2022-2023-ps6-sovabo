import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnimationsService {
  public isAnimated = false;
  public duration: string | undefined = "5s";


  constructor() { }


  setAnimations(value: boolean) {
    this.isAnimated = value;
  }
}
