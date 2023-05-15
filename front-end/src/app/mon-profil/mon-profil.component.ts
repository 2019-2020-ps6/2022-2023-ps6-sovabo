import { Component } from '@angular/core';
import { JeuxCouleursService } from 'src/service/jeux-couleurs.service';
import {AnimateurService} from "../../service/animateur.service";
import {AnimationsService} from "../../service/animations.service";


@Component({
  selector: 'app-mon-profil',
  templateUrl: './mon-profil.component.html',
  styleUrls: ['./mon-profil.component.scss']
})
export class MonProfilComponent {
  AttentionColorStatus: boolean = false;
  contrasteTroubleEnable: boolean = this.jeuxCouleursService.getVisionAttentionStatus();
  // Ces valeurs doivent être récupérées depuis le backend
  email = 'exemple@exemple.com';
  username = 'nom_utilisateur';

  ngInit() {
  }

  constructor(private jeuxCouleursService: JeuxCouleursService,private animateurService: AnimateurService, private animationsService : AnimationsService) {}

  ngOnInit(): void {
    this.AttentionColorStatus = this.jeuxCouleursService.IsAttentionColorActivated();
    this.jeuxCouleursService.changeFont(document);
    this.jeuxCouleursService.changeFontSize(document);
  }


  getAnimateur() {
    return this.animateurService.getAnimateur();
  }

  getAnimations() {
    return this.animationsService.isAnimated;
  }

  triggerImageUpload() {
    const imageUpload = document.getElementById('image-upload');
    if (imageUpload) {
      imageUpload.click();
    }
  }

  getDuration() {
    return this.animationsService.duration;
  }

  getDelay() {
    return this.animationsService.delay != undefined ? this.animationsService.delay : 0;
  }
  changeProfileImage(event: Event) {
    // Implémenter la logique pour changer l'image de profil
    console.log(event);
  }

  changePassword() {
    // Implémenter la logique pour changer le mot de passe
  }

  createCaregiverCode() {
    // Implémenter la logique pour créer le code soignant
  }

  logout() {
    // Implémenter la logique pour la déconnexion
  }
}