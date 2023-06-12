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
  animateur: boolean | undefined;
  animation: boolean | undefined;
  userCourant: any;

  constructor(private jeuxCouleursService: JeuxCouleursService,
              private animateurService: AnimateurService,
              private animationsService : AnimationsService,
              private userService: UserService,
              private router: Router) {


    this.userService.currentUser$.subscribe(user => {
      if (user) {
        this.jeuxCouleursService.setVisionColor(user.configuration.jeuCouleur);
      }
    });

  }

  async ngOnInit(): Promise<void> {
    await this.userService.updateAll();
    this.userCourant = this.userService.getUserCourant();
    await this.loadConfig();

    this.AttentionColorStatus = this.jeuxCouleursService.IsAttentionColorActivated();
    this.contrasteTroubleEnable = this.userService.getUserCourant()?.configuration.contraste || false;
    this.animateur = this.userService.getUserCourant()?.configuration.animateur || false;
    this.animation = this.userService.getUserCourant()?.configuration.animation || false;

    this.userCourant = this.userService.getUserCourant();

    //deverouille l'update
    this.jeuxCouleursService.setUpdateDocument(true);
  }

  loadConfig(){
    this.jeuxCouleursService.setFontWithString(this.userService.getUserCourant()?.configuration.police || this.jeuxCouleursService.listTrouble[3]);
    this.jeuxCouleursService.setVisionColor(this.userService.getUserCourant()?.configuration.jeuCouleur || -1);
    this.jeuxCouleursService.setAttentionColor(this.userService.getUserCourant()?.configuration.contraste || false);
  }

  ngAfterContentChecked(){
    this.jeuxCouleursService.updateDoc(document);
  }

  getAnimateur() {
    return this.animateurService.getAnimateur().value;
  }

  getAnimateurPath() {
    return this.userCourant.imagePath;
  }

  getAnimations() {
    return this.animationsService.isAnimated.value;
  }

  getDuration() {
    return this.animationsService.duration;
  }

  getDelay() {
    // this.animations = this.getUserCourant()?.configuration.animation || false;

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
