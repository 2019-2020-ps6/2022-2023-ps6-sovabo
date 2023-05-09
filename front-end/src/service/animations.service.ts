import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnimationsService {
  public isAnimated = false;
  public duration: string | undefined = "5s";
  public positionCursorSlider: number = 4;

  public delay: number | undefined = 0;


  constructor() { }


  setAnimations(value: boolean) {
    this.isAnimated = value;
  }
}
