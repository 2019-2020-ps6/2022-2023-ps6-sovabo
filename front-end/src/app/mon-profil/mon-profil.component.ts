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
  public isModifyAvatar: boolean = true;
  showAlert: boolean = false;
  selectedUser: User | undefined;
  public showPopUp: boolean = false;
  alertMessage: string | null = null;
  deleteMode: boolean = false;
  showModal = false;
  public alertState: boolean = true;
  deletingUsers: string[] = [];



  avatarImages = [
    "../../assets/Images/Animateurs/bear/bear-emoji-normal.png.png",
    "../../assets/Images/Animateurs/cat/cat-emoji-normal.png",
    "../../assets/Images/Animateurs/black male/male-character-normal.png",
    "../../assets/Images/Animateurs/white girl/girl-character-normal.png",
    // Plus d'images...
  ];

  selectedAvatar = "../../assets/Images/Animateurs/pngegg.png";


  contrasteTroubleEnable: boolean = this.jeuxCouleursService.getVisionAttentionStatus();
  public users: User[] = [];
  public image: HTMLImageElement | undefined;
  private isModifyingName: Boolean = false;





  constructor(private jeuxCouleursService: JeuxCouleursService,
              public userService: UserService) {
  }

  async ngOnInit(): Promise<void> {
    this.showModal = false;
    try {
      const usersFromServer = await this.userService.loadUsersFromServer();
      this.users = usersFromServer.map(user => ({...user}));
      for (let user of this.users) {
        if (user.selected){
          await this.setUserCourant(user, "onInit");
        }
      }
    }
    catch (e) {
    }

    this.userService.currentUser$.subscribe(user => {
      // Faites quelque chose avec l'utilisateur courant
    });
  }


  ngAfterContentChecked(){
    if (this.jeuxCouleursService.isDefaultActive) {this.jeuxCouleursService.collectDefaultStyles();}
    else {this.jeuxCouleursService.changeFont(document);}
    this.jeuxCouleursService.changeFontSize(document);
  }



  get randomColor(): string {
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += '0123456789ABCDEF'[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  async toggleEditUserName(user: User): Promise<void> {
    if (user.name === "") {
      this.alertState = false;
      this.showAlertNotif("Vous devez rentrer un nom");
      return;
    }
    user.editing = !user.editing;
    this.isModifyingName = user.editing;
    if (!user.editing) {
      if (await this.userNameAlreadyExists(user.name, user)) {
        this.alertState = false;
        this.showAlertNotif("Ce nom est déjà utilisé !");
        await this.toggleEditUserName(user);
        return
      }
      this.alertState = true;
      this.showAlertNotif("Votre nom a bien été modifié");
      this.saveUserName(user);
    }
  }

  saveUserName(user: User): void {
    this.users.map(u => {
      if (u.id === user.id) {
        user.name = u.name;
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
    if (imagePath.includes('pngegg')) {
      return 'pngegg.png';
    }
    //keep the last 2 parts of the path
    const parts = imagePath.split('/');
    return parts[parts.length - 2] + '/' + parts[parts.length - 1];

  }


  getImageFromImageName(imageName: string): string {
    return `../../assets/Images/Animateurs/${imageName}`;
  }


  async createUser(): Promise<void> {
    this.isCreatingUser = true;
    let imageName = this.getImageNameFromImagePath(this.selectedAvatar);
    if (this.userName == ""){
      this.alertState = false;
      this.showAlertNotif("Vous devez rentrer un nom !");
      return;
    }

    if (!await this.userNameAlreadyExists(this.userName)) {
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

      } catch (e) {
      }
      this.isCreatingUser = false;
      this.isModifyAvatar = true;
      this.alertState = true;
      this.showAlertNotif("L'utilisateur a bien été créé !");
    }
    else {
      this.alertState = false;
      this.showAlertNotif("Ce nom est déjà utilisé !");
    }


  }

  showAlertNotif(message: string) { // Ajoutez le paramètre `message` ici
    this.alertMessage = message; // Stocker le message dans la propriété `alertMessage`
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
      this.alertMessage = null; // Effacez le message une fois l'alerte fermée
    }, 4000);
  }


  goToCreateUser(): void {
    this.isCreatingUser = true;
    this.isModifyAvatar = false;
    this.deleteMode = false;
    this.userName = "";
    this.selectedAvatar = "../../assets/Images/Animateurs/pngegg.png";
    //find user with editing = true
    const user = this.users.find(user => user.editing);
    if (user) {
      user.editing = false;
    }
  }

  cancelCreateUser(): void {
    this.isCreatingUser = false;
    this.isModifyAvatar = true;
  }

  closeAlert() {
    this.showAlert = false;
  }

  selectAvatar(img: string) {
    this.selectedAvatar = img;
    this.showModal = false;
  }

  // @ts-ignore
  modifyAvatar(img: string) {
    if (this.selectedUser) {
      let filename: string = "";
      // Prenez seulement le nom du fichier à partir de `img`, sans l'extension .png
      if (img.includes('pngegg')) {
        filename = 'pngegg.png';
      }
      filename = img.split('/').toString();
      const parts = img.split('/');
      filename = parts[parts.length - 2] + '/' + parts[parts.length - 1];


      const updatedUser: Partial<User> = {
        name: this.selectedUser.name,
        imagePath: filename,  // Mettez à jour l'image du profil ici avec le nom du fichier sans l'extension .png
        color: this.selectedUser.color,
        configuration: { ...this.selectedUser.configuration },
      };

      const userId = this.selectedUser.id || '';


      // Mettez à jour le chemin de l'image pour l'utilisateur dans la liste d'utilisateurs
      this.users = this.users.map(user => user.id === this.selectedUser?.id ? { ...user, imagePath: filename } : user);
      this.userService.updateUser(updatedUser, userId).then(r => {
        this.showModal = false;
        this.alertState = true;
        this.showAlertNotif("L'avatar a bien été modifié !");
      });
    }
  }

  async setUserCourant(user: User, verif?: String): Promise<void> {
    if (this.getUserCourant()?.id === user.id && verif !== "onInit") {
      this.userService.setUserCourant(null);
      await this.updateUserSelectionStatus(user, false);
      this.alertState = true;
      this.showAlertNotif("Le profil de " + user.name + " a été désélectionné !");
    } else if (verif !== "onInit"){
      for (let u of this.users) {

        if (u.id !== user.id) {
          await this.updateUserSelectionStatus(u, false);
        }
      }
      this.userService.setUserCourant(user);
      await this.updateUserSelectionStatus(user, true);
      this.alertState = true;
      this.showAlertNotif("Le profil de " + user.name + " a été sélectionné !");
    }
  }

  async updateUserSelectionStatus(user: User, selected: boolean): Promise<void> {
    const updatedUser: Partial<User> = {
      ...user,
      selected: selected, // Mettez à jour l'attribut 'selected'
    };
    const userId = user.id || '';
    try {
      await this.userService.updateUser(updatedUser, userId);
    } catch (error) {
    }
  }

  async deleteUserFromServer(user: User): Promise<void> {
    if (user.id != null) {
      this.deletingUsers.push(user.id);
    }

    setTimeout(async () => {
      try {
        await this.userService.deleteUser(user.id || '');
        this.users = this.users.filter(u => u.id !== user.id);
        this.alertState = true;
        this.showAlertNotif("L'utilisateur a bien été supprimé !");
        this.deletingUsers = this.deletingUsers.filter(id => id !== user.id); // remove the user from deletingUsers
      } catch (e) {
      }
    }, 300); // Wait for the animation to finish before actually deleting the user
    this.userService.updateAll();
  }


  openModal(user: User | null) {
    if(user != null){
      this.selectedUser = user;
    }
    this.showModal = true;
  }

// Méthode pour fermer la modal
  closeModal() {
    this.showModal = false;
  }

  toggleDeleteMode() {
    if (!this.isCreatingUser && !this.isModifyingName) {
      this.deleteMode = !this.deleteMode;
    }
    else{
      let modeAcitvated = "";
      if(this.isCreatingUser){
        modeAcitvated = "de création !";
      }
      if (this.isModifyingName){
        modeAcitvated = "de modification !";
      }
      this.alertState = false;
      this.showAlertNotif("Vous ne pouvez pas supprimer un utilisateur en cours " + modeAcitvated);
    }
  }

  // @ts-ignore
  private async userNameAlreadyExists(name: string, user?: User) {
    // If an optional user parameter is provided, exclude it from the search
    const users = await this.userService.loadUsersFromServer();
    for (const u of users) {
      if (u.name === name && u.id !== user?.id) {
        return true;
      }
    }
    return false;
  }

  cancelEditUserName(user: User) {
    this.isModifyingName = false;
    user.editing = false;
  }

  getUserCourant() {
    return this.userService.getUserCourant();
  }
}
