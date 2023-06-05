import {ElementRef, Injectable} from '@angular/core';
import {duotone} from "@fortawesome/fontawesome-svg-core/import.macro";
import {BehaviorSubject} from "rxjs";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class JeuxCouleursService {

  //option trouble de l'attention
  private _attentionColorActivated = new BehaviorSubject<boolean>(false);

  //option trouble de la vision
  listTrouble = ["DEUTERANOMALIE","TRITANOPIE","AUCUN"];
  //La font par défaut est Nunito
  listFont = ["Arial","Andale Mono","Comic Sans MS", "Nunito"];

  //BOOLEAN SUR LES JEUX DE COULEURS
  private visionColorActivated = false;
  private colorSelected :number = -1;
  private fontSelected: string = this.listFont[3];

  private currentFontSize: number  = 2;
  private oldFontSize: number = 2;

  private level = this.currentFontSize - this.oldFontSize;
  private coeff = 0.05;

  private defaultStyles: Map<string, Map<string, string>> = new Map();
  public isDefaultActive: boolean = true;




  setFontSelectedByDefault(){
    this.fontSelected=this.listFont[3];
  }

  getCurrentFontSize(){
    return this.currentFontSize;
  }

  setCurrentFontSize(nb: number){
    this.oldFontSize=this.currentFontSize;
    this.currentFontSize=nb;
  }

  constructor(private userService: UserService) {
    this.userService.currentUser$.subscribe(user => {
      if(user) {
        this._attentionColorActivated.next(user.configuration.contraste);
      }
      else {
        this._attentionColorActivated.next(false);
      }
    });

    this.userService.currentUser$.subscribe(user => {
      if (user) {
        this.colorSelected = user.configuration.jeuCouleur;
        this.fontSelected = user.configuration.police;
      }
    });
  }

  getListTrouble(){
    return this.listTrouble;
  }

  getListFont(){
    return this.listFont;
  }

  IsVisionColorActivated(): boolean {return this.visionColorActivated;}
  IsAttentionColorActivated(): boolean {return this._attentionColorActivated.value;}

  getAttentionColorStatusSubject(): BehaviorSubject<boolean> {return this._attentionColorActivated;}

  setAttentionColor(value: boolean){
    this._attentionColorActivated.next(value);
  }

  setVisionColor(value: number) {
    //console.log('setJeuxCouleurs: ' + value);
    if(value<0){
      this.colorSelected=-1;
      this.visionColorActivated=false;
    } // Do nothing
    else{
      this.colorSelected=value;
      this.visionColorActivated=true;
    }
    //console.log("FIN SETVISION :"+this.visionColorActivated);
  }


  setFont(value: number){
    this.fontSelected=this.listFont[value];
  }

  setFontWithString(value: string){
    if(value==this.listFont[3]){this.isDefaultActive=true;}
    else{this.isDefaultActive=false;}

    this.listTrouble.forEach(fontInList =>{
      if(fontInList==value){
        this.fontSelected=fontInList;
      }
    })
  }

  getVisionColorSelected(): number {return this.colorSelected;}
  getVisionColorSelectedString(): string {
    switch (this.colorSelected){
      case 0:
        return this.listTrouble[0];
        break;
      case 1:
        return this.listTrouble[1];
        break;
      default:
        return "none";
    }
  }

  getFontSelectedString(){
      return this.fontSelected;
    }

  getVisionAttentionStatus(): boolean{return this._attentionColorActivated.value;}

  //UTILS METHODS
  private changeElementFontStyleAndContent(element: HTMLElement, fontIndex: number): void {
    element.style.fontFamily = this.listFont[fontIndex];
    element.innerHTML = this.listFont[fontIndex];
    this.setFont(fontIndex);
    this.fontSelected = this.getFontSelectedString();
  }

  private getButtonId(target: HTMLElement): string {
    return target.id;
  }

  public changeSampleFont(event: Event | null,document: Document): void {

    if(event){
      //on récupère l'élément html ciblé par l'event
      const target = event?.currentTarget as HTMLElement;
      //on recup l'id du boutton (l'id dépends du trouble)
      const value = target.id;
      const exTxt = document.getElementById("exampleTxt");

      if(exTxt){
        switch (value) {
          case "btn_fontChanger1":
            this.changeElementFontStyleAndContent(exTxt, 0);
            break;
          case "btn_fontChanger2":
            this.changeElementFontStyleAndContent(exTxt, 1);
            break;
          case "btn_fontChanger3":
            this.changeElementFontStyleAndContent(exTxt, 2);
            break;
          case "btn_fontChanger4":
            this.changeElementFontStyleAndContent(exTxt,3);
            break;
          case "btn_fontReset":
            this.changeElementFontStyleAndContent(exTxt, 4);
            break;
        }
      }
    }
  }

  public computeSize(elem : ElementRef){
    const originFontSize = window.getComputedStyle(elem.nativeElement, null).getPropertyValue('font-size');
    let size = parseFloat(originFontSize);
    return this.computeFontSizeChange(size);
  }

  private computeFontSizeChange(originFontSize: number): string {
    return (originFontSize + (this.level * this.coeff * originFontSize)) + "px";
  }

  public changeFontSize(document: Document): void {
    console.log("CALL FONTSIZE");
    this.applyFontSize(document);
  }

  applyFontSize(document: Document){
     this.level = this.currentFontSize - this.oldFontSize;

    //VIA LE DOM
    let elements = document.querySelectorAll<HTMLElement>(".fontSizeCanChange, .titreStyle");

    for (let i = 0; i < elements.length; i++) {
      const originFontSize = window.getComputedStyle(elements[i], null).getPropertyValue('font-size');
      let size = parseFloat(originFontSize);
      elements[i].style.fontSize = this.computeFontSizeChange(size);
    }
  }


  changeFont(document: Document) {
    if(!this.isDefaultActive){
      this.applyFontToClass(document);
    }
  }

  applyFontToClass(document: Document) {
    let elements = document.querySelectorAll<HTMLElement>(".fontStyleCanChange");
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.fontFamily = this.getFontSelectedString();
    }
  }

  changeColor(document: Document){
    let elements = document.querySelectorAll<HTMLElement>(".fontColorToChange");

    for (let i = 0; i < elements.length; i++) {
      for (let j = 0; j < this.listTrouble.length; j++) {elements[i].classList.remove(this.listTrouble[i]);}
      elements[i].classList.remove("DEUTERANOMALIE_FONT");
      elements[i].classList.remove("TRITANOPIE_FONT");
      elements[i].classList.remove("DEUTERANOMALIE");
      elements[i].classList.remove("TRITANOPIE");
      if(elements[i].nodeName=="BODY"){elements[i].style.background= ""}
    }

    //CAS OU IL N'Y A PAS de JEU DE COULEUR
    if(this.getVisionColorSelected()==-1){}

    else {
      //CAS OU LA IL Y A UN JEU DE COULEUR
      for (let i = 0; i < elements.length; i++) {
        switch (this.getVisionColorSelectedString()) {
          case this.listTrouble[0]:
            if (elements[i].classList.contains("fontColorToChange")) {
              if(elements[i].classList.contains("answer")){
                elements[i].classList.remove("answer");
                elements[i].classList.add("DEUTERANOMALIE_ANSWER");
              }
              if(elements[i].classList.contains("wrong-answer")){
                elements[i].style.color=""
              }
              if(elements[i].nodeName=="BODY"){elements[i].style.background= "rgb(75,114,126)"}
              else{
                elements[i].classList.add(this.getVisionColorSelectedString());
                elements[i].classList.add("DEUTERANOMALIE_FONT");
              }
            }
            break;
          case this.listTrouble[1]:
            if (elements[i].classList.contains("fontColorToChange")) {
              if(elements[i].classList.contains("answer")){
                elements[i].classList.remove("answer");
                elements[i].classList.add("TRITANOPIE_ANSWER");
              }
              if(elements[i].nodeName=="BODY"){elements[i].style.background= "#484848"}
              else{
                elements[i].classList.add(this.getVisionColorSelectedString());
                elements[i].classList.add("TRITANOPIE_FONT");
              }
            }
            break;
        }
      }
    }
  }

  private createStyleMap(style: CSSStyleDeclaration): Map<string, string> {
    const styleKeys = ['font-family', 'font-weight'];
    let stylesMap = new Map<string, string>();
    styleKeys.forEach((key) => {
      const value = style.getPropertyValue(key);
      if (value) {
        stylesMap.set(key, value);
      }
    });
    return stylesMap;
  }

  private addDefaultStyles(id: string,className: string | undefined, stylesMap: Map<string, string>): void {
    if (id) {
      this.defaultStyles.set(`id-${id}`, stylesMap);
      return;
    }
    if (className) {
      this.defaultStyles.set(`class-${className}`, stylesMap);
    }
  }

  // appelez cette fonction lors du chargement de la page
  public collectDefaultStyles(): void {
    const allElements = document.getElementsByClassName("fontStyleCanChange");
    for (let i = 0; i < allElements.length; i++) {
      const element = allElements[i];
      const style = window.getComputedStyle(element);
      const stylesMap = this.createStyleMap(style);
      const classNameWithoutfontStyleCanChange = element.className.toString().replace("fontStyleCanChange", "");
      this.addDefaultStyles(element.id, classNameWithoutfontStyleCanChange, stylesMap);
    }
  }

  private resetElementStyle(element: HTMLElement, stylesMap: Map<string, string>): void {
    stylesMap.forEach((value, key) => {
      element.style.setProperty(key, value);
    });
  }

  public resetStylesToDefault(): void {
    for (const [element, stylesMap] of this.defaultStyles.entries()) {
      let prefix = element.split('-')[0];
      let name = element.substring(element.indexOf('-') + 1);
      if (prefix === 'id') {
        let element = document.getElementById(name);
        if (element) {
          this.resetElementStyle(element, stylesMap);
        }
      }
      if (prefix === 'class') {
        let elements = document.getElementsByClassName(name);
        for (let i = 0; i < elements.length; i++) {
          if (elements[i] instanceof HTMLElement) {
            // @ts-ignore
            this.resetElementStyle(elements[i], stylesMap);
          }
        }
      }
    }
  }

  toggleVisionAttentionStatus() {
    let currentStatus = this._attentionColorActivated;
    this.setAttentionColor(!currentStatus);
  }


  updateDoc(document: Document){
    this.userService.currentUser$.subscribe(user => {
      if (user) {
        this.colorSelected = user.configuration.jeuCouleur;
        this.setFontWithString(user.configuration.police);
        this._attentionColorActivated.next(user.configuration.contraste);
      }
    });

    if (this.isDefaultActive) {this.collectDefaultStyles();}
    else {this.changeFont(document);}
    this.changeFontSize(document);
    this.changeColor(document);
  }
}
