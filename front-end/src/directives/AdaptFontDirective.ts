import { Directive, ElementRef } from '@angular/core';
import {JeuxCouleursService} from "../service/jeux-couleurs.service";
@Directive({
  selector: '[appAdaptFontSize]',
})
export class AdaptFontDirective {
  constructor(private el: ElementRef,private jeuCouleurService: JeuxCouleursService) {
    el.nativeElement.style.fontSize = this.jeuCouleurService.computeSize(el);
  }
}
