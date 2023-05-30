import {Component, OnDestroy} from '@angular/core';
import {AnimateurService} from "../../../../service/animateur.service";
import {JeuxCouleursService} from "../../../../service/jeux-couleurs.service";
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-btn-on-off-animateur',
  templateUrl: './btn-on-off-animateur.component.html',
  styleUrls: ['./btn-on-off-animateur.component.scss']
})
export class BtnOnOffAnimateurComponent implements OnDestroy {
  isOn: boolean | undefined;
  contrasteTroubleEnable: boolean = this.jeuxCouleursService.getVisionAttentionStatus();

  private subscription: Subscription | undefined;

  constructor(private animateurService: AnimateurService, private jeuxCouleursService: JeuxCouleursService) {
  }

  ngOnInit() {
    this.subscription = this.animateurService.getAnimateur().subscribe(state => {
      this.isOn = state;
    });
  }

  ngOnDestroy() {
    // @ts-ignore
    this.subscription.unsubscribe();
  }

  toggleState() {
    this.animateurService.toggleAnimateur();
    this.isOn = !this.isOn;
  }
}
