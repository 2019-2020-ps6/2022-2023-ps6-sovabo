import { Component } from '@angular/core';
import { JeuxCouleursService } from 'src/service/jeux-couleurs.service';
import { AnimateurService } from "../../service/animateur.service";
import { AnimationsService } from "../../service/animations.service";

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

  isPopupOpen: boolean = false;
  popupTitle: string = '';
  newPassword: string = '';
  newEmail: string = '';
  newUsername: string = '';
  newCaregiverCode: string = '';

  constructor(private jeuxCouleursService: JeuxCouleursService, private animateurService: AnimateurService, private animationsService: AnimationsService) {}

  ngOnInit(): void {
    this.AttentionColorStatus = this.jeuxCouleursService.IsAttentionColorActivated();
    this.jeuxCouleursService.changeFont(document);
    this.jeuxCouleursService.changeFontSize(document);
  }

  openPopup(title: string) {
    this.popupTitle = title;
    this.isPopupOpen = true;
  }

  submitChanges() {
    // Implémenter la logique pour enregistrer les modifications selon le titre de la pop-up
    switch (this.popupTitle) {
      case 'Changer le mot de passe':
        // Enregistrer le nouveau mot de passe
        console.log('Nouveau mot de passe:', this.newPassword);
        break;
      case 'Changer l\'adresse email':
        // Enregistrer la nouvelle adresse email
        console.log('Nouvelle adresse email:', this.newEmail);
        break;
      case 'Changer le nom d\'utilisateur':
        // Enregistrer le nouveau nom d'utilisateur
        console.log('Nouveau nom d\'utilisateur:', this.newUsername);
        break;
      case 'Créer mon code soignant':
        // Enregistrer le nouveau code soignant
        console.log('Nouveau code soignant:', this.newCaregiverCode);
        break;
    }

    // Réinitialiser les champs et fermer la pop-up
    this.newPassword = '';
    this.newEmail = '';
    this.newUsername = '';
    this.newCaregiverCode = '';
    this.isPopupOpen = false;
  }

  cancelChanges() {
    // Réinitialiser les champs et fermer la pop-up
    this.newPassword = '';
    this.newEmail = '';
    this.newUsername = '';
    this.newCaregiverCode = '';
    this.isPopupOpen = false;
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
}
