import { Component } from '@angular/core';
import {AnimationsService} from "../../../service/animations.service";
import {AnimateurService} from "../../../service/animateur.service";
import {JeuxCouleursService} from "../../../service/jeux-couleurs.service";
import {UserService} from "../../../service/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../../models/user.model";
import {Action} from "rxjs/internal/scheduler/Action";
import {ConfigurationModel} from "../../../models/configuration.model";
import {debounceTime, mergeMap, of, Subscription, tap} from "rxjs";


@Component({
  selector: 'app-config-attention',
  templateUrl: './config-attention.component.html',
  styleUrls: ['./config-attention.component.scss']
})
export class ConfigAttentionComponent {
  animations: boolean | undefined;
  animateur: boolean | undefined;
  userAnimateurImg: string = '';
  user = this.userService.getUserCourant();

  //type de trouble de la vision
  contrasteTroubleEnable: boolean = false;

  private animateurSubscription: Subscription | undefined;

  constructor(private animationsService: AnimationsService,
              private animateurService: AnimateurService,
              private jeuxCouleursService: JeuxCouleursService,
              private router:  Router,
              private route: ActivatedRoute,
              public userService: UserService) {
  }

  async ngOnInit(): Promise<void> {

    await this.userService.updateAll();
    this.animations = this.animationsService.isAnimated;
    this.user = this.getUserCourant();
    await this.loadConfig();
    this.contrasteTroubleEnable = this.jeuxCouleursService.getVisionAttentionStatus();
  }

  ngOnDestroy() {
    if (this.animateurSubscription) {
      this.animateurSubscription.unsubscribe();
    }
  }

  loadConfig(){
    this.animateur = this.getUserCourant()?.configuration.animateur || false;
    if(this.animateur){
      this.userAnimateurImg = this.getImageFromImageName(this.user?.imagePath || '');
    }
  }

  ngAfterViewInit(){
    if (this.jeuxCouleursService.isDefaultActive) {this.jeuxCouleursService.collectDefaultStyles();}
    else {this.jeuxCouleursService.changeFont(document);}
    this.jeuxCouleursService.changeFontSize(document);
    this.jeuxCouleursService.changeColor(document);
  }

  ngOnChanges(){
    this.jeuxCouleursService.changeColor(document);
  }
  toggleAnimations() {
    this.animations = !this.animations;
    this.animationsService.setAnimations(this.animations);
  }


  async toggleAnimateur() {
    if (this.user) {
      let imagePath = this.user.imagePath || '';
      this.userAnimateurImg = this.getImageFromImageName(imagePath);

      // Récupère la configuration actuelle de l'utilisateur
      let userId = (this.user as User).id!;
      let configId = (this.user.configuration as ConfigurationModel).id!;

      const config = await this.userService.getUserConfiguration(userId);
      config.animateur = !config.animateur;

      await this.userService.updateConfiguration(configId, config);
      this.user.configuration = config;
      await this.userService.updateUser(this.user, userId);

      this.animateurService.setAnimateur(config.animateur);
      this.animateur = config.animateur;

      if (this.animateurSubscription) {
        this.animateurSubscription.unsubscribe();
      }

      this.animateurSubscription = this.animateurService.getAnimateur()
        .pipe(debounceTime(10))
        .subscribe(animateur => {
          this.animateur = animateur;
        });
    }
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


  private getUserCourant() {
    return this.userService.getUserCourant();
  }
}
