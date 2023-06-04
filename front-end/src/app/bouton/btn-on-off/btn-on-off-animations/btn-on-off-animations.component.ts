import {Component, OnDestroy} from '@angular/core';
import {AnimationsService} from "../../../../service/animations.service";
import {JeuxCouleursService} from "../../../../service/jeux-couleurs.service";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {UserService} from "../../../../service/user.service";

@Component({
  selector: 'app-btn-on-off-animations',
  templateUrl: './btn-on-off-animations.component.html',
  styleUrls: ['./btn-on-off-animations.component.scss']
})
export class BtnOnOffAnimationsComponent implements OnDestroy{
  isOn : boolean | undefined;
  contrasteTroubleEnable: boolean = this.jeuxCouleursService.getVisionAttentionStatus();

  private subscription: Subscription | undefined;

  constructor(private animationsService: AnimationsService,private jeuxCouleursService: JeuxCouleursService, private userService: UserService) {
    this.userService.currentUser$.subscribe(user => {
      if (user) {
        this.contrasteTroubleEnable = user.configuration.contraste;
      }
    });
  }

  ngOnInit() {
    this.subscription = this.animationsService.isAnimated.subscribe(state => {
      this.isOn = state;
    });

  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  toggleState() {
    this.animationsService.toggleAnimations();
    this.isOn = !this.animationsService.getAnimations().getValue();
  }


  get buttonClass() {
    return this.jeuxCouleursService.getVisionColorSelectedString();
  }
}
