import { ConfigurationModel } from './configuration.model';

export class User {
  id: string;
  name: string;
  imagePath: string;
  color: string;
  configuration: ConfigurationModel;
  editing?: boolean;

  constructor(id: string, name: string, imagePath: string, color: string, configuration: ConfigurationModel) {
    this.id = id;
    this.name = name;
    this.imagePath = imagePath;
    this.color = color;
    this.configuration = configuration;
    this.editing = false;
  }
}
