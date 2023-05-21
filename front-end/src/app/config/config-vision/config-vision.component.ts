import { Component, Input, OnInit } from '@angular/core';
import { JeuxCouleursService } from '../../../service/jeux-couleurs.service';
import {ActivatedRoute, Router} from "@angular/router";

import { CommonService } from '../../../service/updateMessenger.service';
import {Location} from "@angular/common";



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
              private Service: CommonService,
              private location: Location) {}

  ngOnInit(): void {
    this.jeuxCouleursEnable = this.jeuxCouleursService.IsVisionColorActivated();
    this.contrasteTroubleEnable = this.jeuxCouleursService.IsAttentionColorActivated();
    this.fontSelected = this.jeuxCouleursService.getFontSelectedString();

    // console.log(this.fontSelected);

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

    //ATTRIBUTION DE LA POLICE APPLIQUEE AU SAMPLE
    count=0;
    let pSample = document.querySelectorAll("#exampleTxt");
    // console.log(pSample);
    pSample.forEach(sample=>{
      sample.innerHTML = this.jeuxCouleursService.getFontSelectedString();
    });

    if (this.jeuxCouleursService.isDefaultActive) {
      this.jeuxCouleursService.collectDefaultStyles();
    }
    else {
      this.jeuxCouleursService.changeFont(document);
      this.jeuxCouleursService.changeFontSize(document);
    }

    // Appel de la fonction pour ajuster la hauteur de generalContainer
    this.adjustGeneralContainerHeight();
    this.adjustLabelFontSize();
    window.addEventListener('resize', () => this.adjustGeneralContainerHeight());
    window.addEventListener('resize', () => this.adjustLabelFontSize());
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', () => this.adjustGeneralContainerHeight());
    window.removeEventListener('resize', () => this.adjustLabelFontSize());
  }

  lastPage(){
    this.location.back();
  }

  //appel lors du click sur le bouton de choix de vision
  toggleJeuxCouleurs(event: Event | null) {
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
  resetParameters(event: Event | null){
    this.jeuxCouleursService.resetStylesToDefault();
    this.jeuxCouleursService.isDefaultActive = true;
    if (event){
      this.jeuxCouleursService.changeSampleFont(document);
    }
  }

  fontChanger($event: Event) {
    this.jeuxCouleursService.changeSampleFont(document);
  }

  fontChangerConfirmation(){
    this.jeuxCouleursService.isDefaultActive = false;
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

  adjustGeneralContainerHeight() {
    const header = document.querySelector('header');
    const generalContainer = document.querySelector('.generalContainer');
    const headerHeight = header?.offsetHeight || 0;
    const windowHeight = window.innerHeight || 0;
    // @ts-ignore
    generalContainer.style.height = `${windowHeight - headerHeight}px`;
  }


  adjustLabelFontSize() {
    const labels = document.querySelectorAll('.labelContainer p, #taillePolice');
    const setupContainer = document.querySelector('.setupContainer');
    const setupContainerWidth = setupContainer?.clientWidth || 0;
    const fontSize = setupContainerWidth / 10;
    // @ts-ignore
    labels.forEach((label: HTMLElement) => {
      label.style.fontSize = `${fontSize}px`;
    });
  }
}
