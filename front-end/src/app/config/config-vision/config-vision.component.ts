import { Component, Input, OnInit } from '@angular/core';
import { JeuxCouleursService } from '../../../service/jeux-couleurs.service';
import {ActivatedRoute, Router} from "@angular/router";

import { CommonService } from '../../../service/updateMessenger.service';
import {Location} from "@angular/common";
import {compareNumbers} from "@angular/compiler-cli/src/version_helpers";
import {User} from "../../../models/user.model";
import {ConfigurationModel} from "../../../models/configuration.model";
import {debounceTime} from "rxjs";
import {UserService} from "../../../service/user.service";



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
  user = this.userService.getUserCourant();

  constructor(private jeuxCouleursService: JeuxCouleursService,
              private router: Router,
              private route: ActivatedRoute,
              private Service: CommonService, private userService: UserService) {}

  ngOnInit(): void {
    console.log(this.user?.configuration.jeuCouleur);
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
    let pSample = document.querySelectorAll<HTMLElement>("#exampleTxt");
    pSample.forEach(sample=>{
      sample.innerHTML = this.jeuxCouleursService.getFontSelectedString();
    });

    // Appel de la fonction pour ajuster la hauteur de generalContainer
    this.adjustGeneralContainerHeight();
    this.adjustLabelFontSize();
    window.addEventListener('resize', () => this.adjustGeneralContainerHeight());
    window.addEventListener('resize', () => this.adjustLabelFontSize());
  }

  ngAfterViewInit(){
    if (this.jeuxCouleursService.isDefaultActive) {this.jeuxCouleursService.collectDefaultStyles();}
    else {this.jeuxCouleursService.changeFont(document);}
    this.jeuxCouleursService.changeFontSize(document);
    this.jeuxCouleursService.changeColor(document);
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', () => this.adjustGeneralContainerHeight());
    window.removeEventListener('resize', () => this.adjustLabelFontSize());
  }

  getVisionColorSelected(){
    return this.jeuxCouleursService.getVisionColorSelectedString();
  }


  //appel lors du click sur le bouton de choix de vision
  async toggleJeuxCouleurs(event: Event | null) {
    //si un event est passé en paramètre
    if (event != null) {
      //on récupère l'élément html ciblé par l'event
      const target = event?.currentTarget as HTMLElement;
      //on recup l'id du boutton (l'id dépends du trouble)
      const value = target.id;

      if (this.jeuxCouleursService.getVisionColorSelectedString() == value) {
        this.jeuxCouleursService.setVisionColor(-1);
        this.jeuxCouleursService.changeColor(document);
      } else {
        switch (value) {
          case this.jeuxCouleursService.listTrouble[0]:
            this.jeuxCouleursService.setVisionColor(0);
            this.jeuxCouleursService.changeColor(document);
            break;
          case this.jeuxCouleursService.listTrouble[1]:
            this.jeuxCouleursService.setVisionColor(1);
            this.jeuxCouleursService.changeColor(document);
            break;
        }
      }

      if (this.user) {
        console.log("USER OK");
        let userId = (this.user as User).id!;
        let configId = (this.user.configuration as ConfigurationModel).id!;

        const config = await this.userService.getUserConfiguration(userId);
        config.jeuCouleur = this.jeuxCouleursService.getVisionColorSelected();

        await this.userService.updateConfiguration(configId, config);
        this.user.configuration = config;
        await this.userService.updateUser(this.user, userId);
      }

      console.log(this.user?.configuration.id);
      console.log(this.user?.configuration.jeuCouleur);
    }
  }


  //NOTIFCATION D'UN OBJET
  sendMessage(str: string): void {
    // send message to subscribers via observable subject
    this.Service.sendUpdate(str);
  }

  resetParameters(event: Event | null){
    this.jeuxCouleursService.resetStylesToDefault();
    this.jeuxCouleursService.isDefaultActive = true;
    if (event){
      this.jeuxCouleursService.changeSampleFont(event,document);
    }
  }

  fontChanger(event: Event | null) {
    if(event){
      this.jeuxCouleursService.changeSampleFont(event,document);
    }

  }

  fontChangerConfirmation(){
    this.jeuxCouleursService.isDefaultActive = false;
    this.jeuxCouleursService.changeFont(document);
  }

  fontSizeUpdate(nb: number | undefined) {
    if(nb!=undefined){
      this.jeuxCouleursService.setCurrentFontSize(nb);
      this.jeuxCouleursService.changeFontSize(document);
    }
  }


  getStringFontSize(){
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

  protected readonly document = document;
}
