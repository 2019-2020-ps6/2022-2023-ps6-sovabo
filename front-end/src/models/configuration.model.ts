export class ConfigurationModel {
  animateur: boolean;
  animateurImagePath: string;
  animation: boolean;
  animationSpeed: string;
  sliderPosition: number;
  duration: string;
  contraste: boolean;
  id?: string;
  jeuCouleur: number;

  constructor(animateur: boolean, animateurImagePath: string, animation: boolean, animationSpeed: string, sliderPosition: number, duration: string, contraste: boolean, id: string, jeuCouleur: number) {
    this.animateur = animateur;
    this.animateurImagePath = animateurImagePath;
    this.animation = animation;
    this.animationSpeed = animationSpeed;
    this.sliderPosition = sliderPosition;
    this.duration = duration;
    this.contraste = contraste;
    this.id = id;
    this.jeuCouleur = jeuCouleur;
  }
}
