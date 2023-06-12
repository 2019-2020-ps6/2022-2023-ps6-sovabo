import { Injectable } from '@angular/core';
import {UserService} from "./user.service";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AnimateurService {
  private animateurState = new BehaviorSubject<boolean>(false);

  constructor(private userService: UserService) {
    this.userService.currentUser$.subscribe(user => {
      if(user) {
        this.animateurState.next(user.configuration.animateur);
      }
      else {
        this.animateurState.next(false);
      }
    });
  }

  setAnimateur(state: boolean) {
    this.animateurState.next(state);
  }

  toggleAnimateur() {
    let currentState = this.animateurState.value;
    this.setAnimateur(!currentState);
  }

  getAnimateur() {
    return this.animateurState;
  }
}
