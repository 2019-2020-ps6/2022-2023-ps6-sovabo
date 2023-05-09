import { Component, Input } from '@angular/core';
import { JeuxCouleursService } from '../../../service/jeux-couleurs.service';
import {ActivatedRoute, Router} from "@angular/router";

import { CommonService } from '../../../service/updateMessenger.service';



@Component({
  selector: 'app-config-vision',
  templateUrl: './config-vision.component.html',
  styleUrls: ['./config-vision.component.scss']

})


export class ConfigVisionComponent {
   listTrouble = this.jeuxCouleursService.getListTrouble();
  listFont = this.jeuxCouleursService.getListFont();

  jeuxCouleursEnable: boolean = false;
  contrasteTroubleEnable: boolean = false;

  fontSelected : string = this.jeuxCouleursService.getFontSelectedString();

  constructor(private jeuxCouleursService: JeuxCouleursService,
              private router: Router,
              private route: ActivatedRoute,
              private Service: CommonService) {}

  ngOnInit(): void {
    console.log('INIT ConfigVisionComponent');
    this.jeuxCouleursEnable = this.jeuxCouleursService.IsVisionColorActivated();
    this.contrasteTroubleEnable = this.jeuxCouleursService.IsAttentionColorActivated();
    this.fontSelected = this.jeuxCouleursService.getFontSelectedString();

    console.log(this.fontSelected);

    //ATTRIBUTION DU NOM DES BOUTONS JEUX DE COULEUR
    let tabJeuDeCouleur = document.querySelectorAll("app-btn-on-off-colors");
    let count: number = 0;

    tabJeuDeCouleur.forEach(btn => {
      btn.classList.add(this.listTrouble[count]);
      let pSelector = btn.querySelectorAll("p");
      pSelector.forEach(elm =>{
        elm.innerHTML = this.listTrouble[count];
      });
      count++;
    });


    //ATTRIBUTION DU NOM DES BOUTONS FONT
    let tabFont = document.querySelectorAll("app-btn-font");
    count = 0;
    tabFont.forEach(btn => {
      let pSelector = btn.querySelectorAll("p");
      pSelector.forEach(elm =>{
        elm.innerHTML = this.listFont[count] ;
      });
      count++;
    });


  }

  //appel lors du click sur le bouton de choix de vision
  toggleJeuxCouleurs(event: Event | null) {

    console.log("config-vision : toggleJeuxCouleurs");

    //si un event est passé en paramètre
    if (event != null) {
      //on récupère l'élément html ciblé par l'event
        const target = event?.currentTarget as HTMLElement;
      //on recup l'id du boutton (l'id dépends du trouble)
        const value = target.id;

        if(this.jeuxCouleursService.getVisionColorSelectedString()==value){this.jeuxCouleursService.setVisionColor(-1);}
        else {
          switch (value) {
            case this.jeuxCouleursService.listTrouble[0]:
              this.jeuxCouleursService.setVisionColor(0);
              break;
            case this.jeuxCouleursService.listTrouble[1]:
              this.jeuxCouleursService.setVisionColor(1);
              break;
          }
        }
      }
  }


  //NOTIFCATION D'UN OBJET
  sendMessage(str: string): void {
    // send message to subscribers via observable subject
    this.Service.sendUpdate(str);
  }
  //ACTUALISATION DE LA PAGE
  resetPage(){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['./'], {
      relativeTo: this.route
    })
  }

  fontChanger($event: Event) {
    this.jeuxCouleursService.changeSampleFont(document);
  }

  fontChangerConfirmation(){
    this.jeuxCouleursService.setFontCheck(true);
    this.jeuxCouleursService.changeFont(document);
  }

  fontSizeUpdate(nb: number | undefined) {
    if(nb!=undefined){
      this.jeuxCouleursService.setCurrentFontSize(nb);
      this.jeuxCouleursService.changeFontSize(document);
    }
    else{}

  }


  getFontSize(){
    switch (this.jeuxCouleursService.getCurrentFontSize()){
      case 1:
        return "petite";
        break;
      case 2:
        return "moyenne";
        break;
      case 3:
        return "grande";
        break;
      default:
        return "";
        break;
    }
  }

}
