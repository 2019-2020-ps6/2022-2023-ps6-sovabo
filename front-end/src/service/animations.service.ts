import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class AnimationsService {
  public isAnimated = new BehaviorSubject<boolean>(false);
  public duration = new BehaviorSubject<string>("5s");
  public positionCursorSlider = new BehaviorSubject<number>(4);
  public delay : number = 0.4;


  constructor(private userService: UserService) {
    this.userService.currentUser$.subscribe(user => {
      if(user) {
        this.isAnimated.next(user.configuration.animation);
        this.duration.next(user.configuration.duration);
        this.positionCursorSlider.next(user.configuration.sliderPosition);
        console.log(user.configuration.sliderPosition);
        this.delay = (user.configuration.sliderPosition-8)/(-10);

      }
      else {
        this.isAnimated.next(false);
        this.duration.next("5s");
        this.positionCursorSlider.next(4);
        this.delay = 0.4;
      }
    });
  }

  toggleAnimations() {
    let currentState = this.isAnimated.value;
    this.setAnimations(!currentState);
  }


  setAnimations(state: boolean) {
    this.isAnimated.next(state);
  }

  getAnimations() {
    return this.isAnimated;
  }
}
