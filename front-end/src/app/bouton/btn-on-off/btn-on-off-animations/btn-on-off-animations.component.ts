import { Component } from '@angular/core';
import {AnimationsService} from "../../../../service/animations.service";
import {JeuxCouleursService} from "../../../../service/jeux-couleurs.service";
import {BehaviorSubject, Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-btn-on-off-animations',
  templateUrl: './btn-on-off-animations.component.html',
  styleUrls: ['./btn-on-off-animations.component.scss']
})
export class BtnOnOffAnimationsComponent {

  public isOn : boolean | undefined;
  private subscription: Subscription | undefined;
  contrasteTroubleEnable: boolean = this.jeuxCouleursService.getVisionAttentionStatus();


  constructor(private animationsService: AnimationsService,private jeuxCouleursService: JeuxCouleursService) {
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
    this.isOn = !this.isOn;
    this.animationsService.toggleAnimations();
  }


  get buttonClass() {
    return this.jeuxCouleursService.getVisionColorSelectedString();
  }
}
