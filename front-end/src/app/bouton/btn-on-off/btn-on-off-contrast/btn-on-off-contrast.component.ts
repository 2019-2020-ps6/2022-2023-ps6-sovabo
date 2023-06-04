import {Component, OnDestroy} from '@angular/core';
import {AnimateurService} from "../../../../service/animateur.service";
import {JeuxCouleursService} from "../../../../service/jeux-couleurs.service";
import {Subscription} from "rxjs";
import {UserService} from "../../../../service/user.service";

@Component({
  selector: 'app-btn-on-off-contrast',
  templateUrl: './btn-on-off-contrast.component.html',
  styleUrls: ['./btn-on-off-contrast.component.scss']
})
export class BtnOnOffContrastComponent implements OnDestroy{
  isOn: boolean = false;
  contrasteTroubleEnable :boolean = this.jeuxCouleursService.getVisionAttentionStatus();

  private subscription: Subscription | undefined;


  constructor(private animateurService: AnimateurService,private jeuxCouleursService: JeuxCouleursService,private userService: UserService) {
    this.userService.currentUser$.subscribe(user => {
      if (user) {
        this.contrasteTroubleEnable = user.configuration.contraste;
      }
    });
  }

  ngOnInit() {
    this.subscription = this.jeuxCouleursService.getAttentionColorStatusSubject().subscribe(state => {
      this.isOn = state;
    });
  }

  ngOnDestroy() {
    // @ts-ignore
    this.subscription.unsubscribe();
  }

  toggleState() {
    this.jeuxCouleursService.toggleVisionAttentionStatus();
    this.isOn = !this.jeuxCouleursService.getVisionAttentionStatus();
  }

  get buttonClass() {
    return this.jeuxCouleursService.getVisionColorSelectedString();
  }

}
