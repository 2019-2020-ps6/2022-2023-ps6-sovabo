import { Injectable } from '@angular/core';
import {duotone} from "@fortawesome/fontawesome-svg-core/import.macro";

@Injectable({
  providedIn: 'root'
})
export class JeuxCouleursService {

  //option trouble de l'attention
  private attentionColorActivated = false;

  //option trouble de la vision
  listTrouble = ["TRICHROMATIE","DICHROMATISME"];
  //La font par défaut est Nunito
  listFont = ["Arial","Andale Mono","Comic Sans MS", "Nunito"];

  private visionColorActivated = false;
  private colorSelected :number = -1;
  private fontSelected: string = this.listFont[3];

  private currentFontSize: number  = 2;
  private oldFontSize: number = 2;

  private fontCheck: boolean = false;
  private defaultStyles: Map<string, Map<string, string>> = new Map();
  public isDefaultActive: boolean = true;


  getFontCheck(){
    return this.fontCheck;
  }

  setFontSelectedByDefault(){
    this.fontSelected=this.listFont[3];
  }
  setFontCheck(state: boolean){
    this.fontCheck=state;
  }
  getCurrentFontSize(){
    return this.currentFontSize;
  }

  setCurrentFontSize(nb: number){
    this.oldFontSize=this.currentFontSize;
    this.currentFontSize=nb;
  }

  constructor() {}

  getListTrouble(){
    return this.listTrouble;
  }

  getListFont(){
    return this.listFont;
  }

  IsVisionColorActivated(): boolean {return this.visionColorActivated;}
  IsAttentionColorActivated(): boolean {return this.attentionColorActivated;}

  setAttentionColor(value: boolean){this.attentionColorActivated=value;}

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
        return "";
    }
  }

  getFontSelectedString(){
      return this.fontSelected;
    }

  getVisionAttentionStatus(): boolean{return this.attentionColorActivated;}

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

  public changeSampleFont(document: Document): void {
    if (event !== null) {
      const target = event?.currentTarget as HTMLElement;
      const value = this.getButtonId(target);
      const exTxt = document.getElementById("exampleTxt");

      if (exTxt) {
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
          case "btn_fontReset":
            this.changeElementFontStyleAndContent(exTxt, 3);
            break;
        }
      }
    }
  }

  private computeFontSizeChange(level: number, coeff: number, originFontSize: string): string {
    const fontSize = parseFloat(originFontSize);
    return (fontSize + (level * coeff)) + "px";
  }

  public changeFontSize(document: Document): void {
    const level = this.currentFontSize - this.oldFontSize;
    const coeff = 5;

    this.applyFontSize(document);
  }

  applyFontSize(document: Document){
    console.log("applyFontSize");

    const level = this.currentFontSize - this.oldFontSize;
    const coeff = 5;

    //VIA LE DOM
    let elements = document.getElementsByClassName("fontSizeCanChange");

    for (let i = 0; i < elements.length; i++) {
      const originFontSize = window.getComputedStyle(elements[i], null).getPropertyValue('font-size');

      const unit = originFontSize.match(/[a-z]+/);
      if(unit!=null){
        console.log("unit :"+unit[0]);
      }


      window.getComputedStyle(elements[i],null).getPropertyValue('font-size');

      elements[i].setAttribute("style", "font-size: " + this.computeFontSizeChange(level, coeff, originFontSize));
    }





    //VIA L'HTML

    //console.log(elements);

  }


  changeFont(document: Document) {
    console.log("changeFont");
    if(this.fontCheck){
      this.applyFontToClass(document.getElementsByClassName("fontStyleCanChange"));
    }
  }

  applyFontToClass(elements: HTMLCollectionOf<Element>) {
    for (let i = 0; i < elements.length; i++) {
      elements[i].setAttribute("style", "font-family: " + this.getFontSelectedString() + " !important");
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
    console.log("collectDefaultStyles");
    const allElements = document.getElementsByClassName("fontStyleCanChange");
    for (let i = 0; i < allElements.length; i++) {
      const element = allElements[i];
      const style = window.getComputedStyle(element);
      const stylesMap = this.createStyleMap(style);
      const classNameWithoutfontStyleCanChange = element.className.replace("fontStyleCanChange", "");
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



}
