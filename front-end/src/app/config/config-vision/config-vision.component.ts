import { Component, Input } from '@angular/core';
import { JeuxCouleursService } from '../../../service/jeux-couleurs.service';

@Component({
  selector: 'app-config-vision',
  templateUrl: './config-vision.component.html',
  styleUrls: ['./config-vision.component.scss']
})

export class ConfigVisionComponent {
  jeuxCouleurs: boolean = false;
  AttentionColorStatus: boolean = false;

  ngInit() {
  }

  constructor(private jeuxCouleursService: JeuxCouleursService) {}

  ngOnInit(): void {
    console.log('ConfigVisionComponent');
    this.jeuxCouleurs = this.jeuxCouleursService.IsVisionColorActivated();
    this.AttentionColorStatus = this.jeuxCouleursService.IsAttentionColorActivated();
    this.changeContrast();
  }

  //appel lors du click sur le bouton de choix de vision
  toggleJeuxCouleurs(event: Event | null) {
    //si un event est passé en paramètre
    if(event != null){
      //on récupère l'élément html ciblé par l'event
      const target = event?.currentTarget as HTMLElement;
      //on recup l'id du boutton (l'id dépends du trouble)
      const value = target.id;

      //on set le jeux de couleurs en fonction de l'id du bouton 
      //DANS le service pour que toutes les pages puisses être mises au courant 

      //console.log('toggleJeuxCouleurs: ' + value);
      switch(value){
        case 'NONE':
          this.jeuxCouleursService.setVisionColor(0);
          break;
        case 'TRICHROMATIE':
          this.jeuxCouleursService.setVisionColor(1);
          break;
        case 'DICHROMATISME':
          this.jeuxCouleursService.setVisionColor(2);
          break;    
      }
    }
  }

  changeContrast(){
    console.log('changeContrast Vision');
    let tabContainer = document.querySelectorAll('[id=contrastUpContainer]');
    let tabText = document.querySelectorAll('[id=contrastUpText]');

    if(this.AttentionColorStatus){
      if(tabContainer != null){
        tabContainer.forEach(element => {
          element.classList.add('contrastUpContainer');
        });
      }
      if(tabText != null){
        tabText.forEach(element => {
          element.classList.add('contrastUpText');
        });
      }
    }
    else{
      if(tabContainer != null){
        tabContainer.forEach(element => {
          element.classList.remove('contrastUpContainer');
        });
      }
      if(tabText != null){
        tabText.forEach(element => {
          element.classList.remove('contrastUpText');
        });
      }
    }
  }  

}
