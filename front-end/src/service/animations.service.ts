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
        this.isAnimated.next(user.configuration.animateur);
        this.duration.next(user.configuration.duration);
        this.positionCursorSlider.next(user.configuration.sliderPosition);
        
      }
      else {
        this.isAnimated.next(false);
        this.duration.next("5s");
        this.positionCursorSlider.next(4);

      }
    });
  }

  toggleAnimations() {
    this.setAnimations(!this.isAnimated.value);
  }


  setAnimations(value: boolean) {
    this.isAnimated.next(value);
  }

}
