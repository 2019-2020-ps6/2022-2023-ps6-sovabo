import {Component} from '@angular/core';
import {JeuxCouleursService} from 'src/service/jeux-couleurs.service';
import {DomSanitizer} from '@angular/platform-browser';
import {UserService} from "../../service/user.service";
import {User} from "../../models/user.model";
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-mon-profil',
  templateUrl: './mon-profil.component.html',
  styleUrls: ['./mon-profil.component.scss']
})
export class MonProfilComponent {
  public userName: string = '';
  public isCreatingUser: boolean = false;
  public isModifyUser: boolean = true;
  showAlert: boolean = false;
  selectedUser: User | undefined;
  public showPopUp: boolean = false;
  alertMessage: string | null = null;
  deleteMode: boolean = false;
  showModal = false;



  avatarImages = [
    "../../assets/Images/settings.png",
    "../../assets/Images/Animateur_image.png",
    // Plus d'images...
  ];

  selectedAvatar = "../../assets/Images/Animateur_image.png";


  contrasteTroubleEnable: boolean = this.jeuxCouleursService.getVisionAttentionStatus();
  public users: User[] = [];
  public image: HTMLImageElement | undefined;





  constructor(private jeuxCouleursService: JeuxCouleursService,
              public userService: UserService, private sanitizer: DomSanitizer) {
  }

  async ngOnInit(): Promise<void> {
    this.showModal = false;
    try {
      const usersFromServer = await this.userService.loadUsersFromServer();
      this.users = usersFromServer.map(user => ({...user, selected: false}));
    }
    catch (e) {
      // console.log(e);
    }

    this.userService.currentUser$.subscribe(user => {
      // Faites quelque chose avec l'utilisateur courant
    });
  }



  get randomColor(): string {
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += '0123456789ABCDEF'[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  toggleEditUserName(user: User): void {
    user.editing = !user.editing;
    if (!user.editing) {
      this.showAlertNotif("Votre nom a bien été modifié");
      this.saveUserName(user);

    }
  }

  saveUserName(user: User): void {
    this.users.map(u => {
      if (u.id === user.id) {
        user.name = u.name;
        // console.log(user.name);
      }
      return user;
    });

    const updatedUser: Partial<User> = {
      name: user.name,
      imagePath: user.imagePath,
      color: user.color,
      configuration: { ...user.configuration },
    };
    const userId = user.id || ''
    this.userService.updateUser(updatedUser,userId );
  }

  getImageNameFromImagePath(imagePath: string): string {
    if (!imagePath) {
      return '';
    }
    return imagePath.split('/').pop()?.split('.')[0] || '';
  }


  getImageFromImageName(imageName: string): string {
    return `../../assets/Images/${imageName}.png`;
  }


  async createUser(): Promise<void> {
    this.isCreatingUser = true;

    let imageName = this.getImageNameFromImagePath(this.selectedAvatar);

    try {
      const newUser: Partial<User> = {
        name: this.userName,
        imagePath: imageName,
        color: this.randomColor,
        configuration: {
          animateur: false,
          animateurImagePath: imageName,
          animation: false,
          animationSpeed: "normal",
          sliderPosition: 0,
          duration: "00:00:00",
          contraste: false,
        },
      };

      const user = await this.userService.createUser(newUser);
      this.users.push(user);
      // console.log("Il est créé");

    } catch (e) {
      // console.log(e);
    }

    this.isCreatingUser = false;
    this.isModifyUser = true;

    this.showAlertNotif("L'utilisateur a bien été créé !");
  }

  showAlertNotif(message: string) { // Ajoutez le paramètre `message` ici
    this.alertMessage = message; // Stocker le message dans la propriété `alertMessage`
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
      this.alertMessage = null; // Effacez le message une fois l'alerte fermée
    }, 4000);
  }



  async deleteUser(): Promise<void> {
    try {

    } catch (e) {
      // console.log(e);
    }
  }

  goToCreateUser(): void {
    this.isCreatingUser = true;
    this.isModifyUser = false;
  }

  cancelCreateUser(): void {

    // Masquer le formulaire de création et afficher la liste d'utilisateurs
    this.isCreatingUser = false;
  }

  closeAlert() {
    this.showAlert = false;
  }

  selectAvatar(img: string) {
    // console.log("selectAvatar");
    this.selectedAvatar = img;
    this.showModal = false;
  }

  modifyAvatar(img: string) {
    if (this.selectedUser) {
      // Prenez seulement le nom du fichier à partir de `img`, sans l'extension .png
      const filename = img.split('/').pop()?.split('.png')[0];

      const updatedUser: Partial<User> = {
        name: this.selectedUser.name,
        imagePath: filename,  // Mettez à jour l'image du profil ici avec le nom du fichier sans l'extension .png
        color: this.selectedUser.color,
        configuration: { ...this.selectedUser.configuration },
      };

      const userId = this.selectedUser.id || '';
      this.userService.updateUser(updatedUser, userId);

      // Mettez à jour le chemin de l'image pour l'utilisateur sélectionné

      // Mettez à jour le chemin de l'image pour l'utilisateur dans la liste d'utilisateurs
      this.users = this.users.map(user => user.id === this.selectedUser?.id ? { ...user, imagePath: filename } : user);
      this.showModal = false;

    this.showAlertNotif("L'avatar a bien été modifié !");


    }
  }

  selectUser(user: User): void {
    this.users.forEach(u => u.selected = false); // Désélectionner tous les autres utilisateurs.
    user.selected = !user.selected; // Sélectionner l'utilisateur actuel.
    this.selectedUser = user; // Garder une référence à l'utilisateur sélectionné pour la suppression.
  }

  setUserCourant(user: User): void {
    this.userService.setUserCourant(user);
    // console.log("setUserCourant");
    // console.log(this.userService.getUserCourant());
    this.showAlertNotif("Le profil de " + user.name + " a été sélectionné !");
  }

  async deleteUserFromServer(user: User): Promise<void> {
    try {
      await this.userService.deleteUser(user.id || '');
      this.users = this.users.filter(u => u.id !== user.id);
      this.deleteMode = false;
      this.showAlertNotif("L'utilisateur a bien été supprimé !");
    } catch (e) {
      console.log(e);
    }
  }

  openModal(user: User | null) {
    if(user != null){
      this.selectedUser = user;
    }
    this.showModal = true;
  }
  confirmDelete() {
    //this.showModal = false;
  }

// Méthode pour fermer la modal
  closeModal() {
    this.showModal = false;
  }

  toggleDeleteMode() {
    console.log("toggleDeleteMode");
    this.deleteMode = !this.deleteMode;
  }
}
