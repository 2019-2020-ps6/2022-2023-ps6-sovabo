import { ConfigurationModel } from './configuration.model';
import { StatQuizz } from './quizz.stat.model';

export class User {
  id?: string;
  name: string;
  imagePath?: string;
  color: string;
  configuration: ConfigurationModel;
  editing?: boolean;
  selected?: boolean;
  listeStatQuizz?: StatQuizz[]; // ajouté ici

  constructor(id: string, name: string, imagePath: string, color: string, configuration: ConfigurationModel, listeStatQuizz?: StatQuizz[]) {
    this.id = id;
    this.name = name;
    this.imagePath = imagePath;
    this.color = color;
    this.configuration = configuration;
    this.listeStatQuizz = listeStatQuizz; // ajouté ici
    this.editing = false;
  }
}