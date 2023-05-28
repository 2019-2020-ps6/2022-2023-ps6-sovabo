import { Component } from '@angular/core';
import { JeuxCouleursService } from 'src/service/jeux-couleurs.service';
import {AnimateurService} from "../../service/animateur.service";
import {AnimationsService} from "../../service/animations.service";
import {UserService} from "../../service/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent {
  AttentionColorStatus: boolean = false;
  contrasteTroubleEnable: boolean = this.jeuxCouleursService.getVisionAttentionStatus();
  showAlert: boolean = false;
  alertMessage: string | null = null;
  accesAutorise: boolean | undefined;


  constructor(private jeuxCouleursService: JeuxCouleursService,
              private animateurService: AnimateurService,
              private animationsService : AnimationsService,
              private userService: UserService,
              private router: Router) {}

  ngOnInit(): void {
    this.AttentionColorStatus = this.jeuxCouleursService.IsAttentionColorActivated();
    if (this.jeuxCouleursService.isDefaultActive) {
      this.jeuxCouleursService.collectDefaultStyles();
    }
    else {
      this.jeuxCouleursService.changeFont(document);
    }
    console.log(this.userService.loadUsersFromServer());
  }

  ngAfterViewInit(){
    this.jeuxCouleursService.changeFontSize(document);
  }


  getAnimateur() {
    return this.animateurService.getAnimateur();
  }

  getAnimations() {
    return this.animationsService.isAnimated;
  }

  getDuration() {
    return this.animationsService.duration;
  }

  getDelay() {
    return this.animationsService.delay != undefined ? this.animationsService.delay : 0;
  }

  showAlertNotif() { // Ajoutez le paramètre `message` ici
    this.alertMessage = "test"; // Stocker le message dans la propriété `alertMessage`
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
      this.alertMessage = null; // Effacez le message une fois l'alerte fermée
    }, 4000);
  }

  isAccessible(route: string) {
    if (this.userService.getUserCourant()) {
      this.accesAutorise = true;
      this.router.navigate([route]);
    } else {
      this.accesAutorise = false;
      this.showAlertNotif();
    }
  }


  closeAlert() {
    this.showAlert = false;
  }
}
