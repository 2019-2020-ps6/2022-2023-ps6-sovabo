import { Component } from '@angular/core';
import {AnimationsService} from "../../../service/animations.service";
import {AnimateurService} from "../../../service/animateur.service";
import {JeuxCouleursService} from "../../../service/jeux-couleurs.service";
import {UserService} from "../../../service/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../../models/user.model";
import {Action} from "rxjs/internal/scheduler/Action";
import {ConfigurationModel} from "../../../models/configuration.model";

@Component({
  selector: 'app-config-attention',
  templateUrl: './config-attention.component.html',
  styleUrls: ['./config-attention.component.scss']
})
export class ConfigAttentionComponent {
  animations: boolean | undefined;
  animateur: boolean = false;
  userAnimateurImg: string = '';
  user = this.userService.getUserCourant();

  //type de trouble de la vision
  contrasteTroubleEnable: boolean = false;



  constructor(private animationsService: AnimationsService,
              private animateurService: AnimateurService,
              private jeuxCouleursService: JeuxCouleursService,
              private router:  Router,
              private route: ActivatedRoute,
              public userService: UserService) {
    this.userService.currentUser$.subscribe((user) => {
      this.animateur = user?.configuration.animateur || false;
    });
  }

  ngOnInit(): void {
    this.animations = this.animationsService.isAnimated;
    this.user = this.userService.getUserCourant();
    this.loadConfig();
    this.animateur = this.user?.configuration.animateur || false;
    this.contrasteTroubleEnable = this.jeuxCouleursService.getVisionAttentionStatus();
    if (this.jeuxCouleursService.isDefaultActive) {
      this.jeuxCouleursService.collectDefaultStyles();
    }
    else {
      this.jeuxCouleursService.changeFont(document);
    }
  }

  loadConfig(){
    this.animateur = this.user?.configuration.animateur || false;
;
    if(this.animateur){
      this.userAnimateurImg = this.getImageFromImageName(this.user?.imagePath || '');
    }
  }

  ngAfterViewInit(){
    this.jeuxCouleursService.changeFontSize(document);
  }
  toggleAnimations() {
    this.animations = !this.animations;
    this.animationsService.setAnimations(this.animations);
  }


  async toggleAnimateur() {
    this.animateur = !this.animateur;

    if (this.user) {
      let imagePath = this.user.imagePath || '';
      this.userAnimateurImg = this.getImageFromImageName(imagePath);

      // Récupère la configuration actuelle de l'utilisateur
      let userId = (this.user as User).id!;
      let configId = (this.user.configuration as ConfigurationModel).id!;

      let config = await this.userService.getUserConfiguration(userId);

      // Met à jour l'attribut animateur de la configuration
      config.animateur = this.animateur;

      // Enregistre la configuration mise à jour
      await this.userService.updateConfiguration(configId, config);

      // Met à jour l'utilisateur avec la nouvelle configuration
      this.user.configuration = config;
      await this.userService.updateUser(this.user, userId);
    }

    this.animateurService.setAnimateur(this.animateur);
  }





  toggleContrastColor(event: Event | null) {
    this.contrasteTroubleEnable = !this.contrasteTroubleEnable
    this.jeuxCouleursService.setAttentionColor(this.contrasteTroubleEnable);
    this.resetPage();
  }

  //ACTUALISATION DE LA PAGE
  resetPage(){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['./'], {
      relativeTo: this.route
    })
  }

  getImageFromImageName(imageName: string): string {
    return `../../assets/Images/Animateurs/${imageName}`;
  }


}
