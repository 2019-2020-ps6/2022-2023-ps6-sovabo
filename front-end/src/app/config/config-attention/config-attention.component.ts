import { Component } from '@angular/core';
import {AnimationsService} from "../../../service/animations.service";
import {AnimateurService} from "../../../service/animateur.service";
import {JeuxCouleursService} from "../../../service/jeux-couleurs.service";
import {UserService} from "../../../service/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Action} from "rxjs/internal/scheduler/Action";

@Component({
  selector: 'app-config-attention',
  templateUrl: './config-attention.component.html',
  styleUrls: ['./config-attention.component.scss']
})
export class ConfigAttentionComponent {
  animations: boolean = false;
  animateur: boolean = false;
  userAnimateurImg: string = '';

  //type de trouble de la vision
  contrasteTroubleEnable: boolean = false;



  constructor(private animationsService: AnimationsService,
              private animateurService: AnimateurService,
              private jeuxCouleursService: JeuxCouleursService,
              private router:  Router,
              private route: ActivatedRoute,
              public userService: UserService) {
  }

  ngOnInit(): void {
    this.animations = this.animationsService.isAnimated;
    this.animateur = this.animateurService.getAnimateur();
    this.contrasteTroubleEnable = this.jeuxCouleursService.getVisionAttentionStatus();
    if (this.jeuxCouleursService.isDefaultActive) {
      this.jeuxCouleursService.collectDefaultStyles();
    }
    else {
      this.jeuxCouleursService.changeFont(document);
    }
  }

  ngAfterViewInit(){
    this.jeuxCouleursService.changeFontSize(document);
  }
  toggleAnimations() {
    this.animations = !this.animations;
    this.animationsService.setAnimations(this.animations);
  }


  toggleAnimateur() {
    this.animateur = !this.animateur;
    
    const user = this.userService.getUserCourant();
    console.log("User:", user);
    if (user) {
      let imagePath = user.imagePath || '';
      this.userAnimateurImg = this.getImageFromImageName(imagePath); ;
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
