import {Component} from '@angular/core';
import {JeuxCouleursService} from 'src/service/jeux-couleurs.service';
import {DomSanitizer} from '@angular/platform-browser';
import {UserService} from "../../service/user.service";
import {User} from "../../models/user.model";

@Component({
  selector: 'app-mon-profil',
  templateUrl: './mon-profil.component.html',
  styleUrls: ['./mon-profil.component.scss']
})
export class MonProfilComponent {
  public userName: string = '';
  public isCreatingUser: boolean = false;
  showAlert: boolean = false;
  public showPopUp: boolean = false;

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
              private userService: UserService, private sanitizer: DomSanitizer) {
  }

  async ngOnInit(): Promise<void> {
    this.showModal = false;
    try {
      this.users = await this.userService.loadUsersFromServer();
    }
    catch (e) {
      console.log(e);
    }
  }

  ngAfterViewInit(): void {
    this.adjustCardBodyHeight();
    window.addEventListener('resize', () => this.adjustCardBodyHeight());
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', () => this.adjustCardBodyHeight());
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
      this.saveUserName(user);
    }
  }

  saveUserName(user: User): void {
    this.users.map(u => {
      if (u.id === user.id) {
        user.name = u.name;
        console.log(user.name);
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
    return imagePath.split('/').pop()?.split('.')[0] || '';
  }
  

  getImageFromImageName(imageName: string): string {
    return `../../assets/Images/${imageName}.png`;
  }


  async createUser(): Promise<void> {
    this.isCreatingUser = true;

    let imageName = this.getImageNameFromImagePath(this.selectedAvatar);

    console.log("createUser on va le créer la");
    try {
      const newUser: Partial<User> = {
        name: this.userName,
        imagePath: imageName,
        color: "#633719",
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
      console.log("Il est créé");

    } catch (e) {
      console.log(e);
    }

    this.isCreatingUser = false;

    this.showAlert = true;
    setTimeout(() => this.showAlert = false, 4000); 
  }

  
  

  async deleteUser(): Promise<void> {
    try {
     
    } catch (e) {
      console.log(e);
    }
  }

  goToCreateUser(): void {
    this.isCreatingUser = true;
  }

  cancelCreateUser(): void {
    // Masquer le formulaire de création et afficher la liste d'utilisateurs
    this.isCreatingUser = false;
  }

    


  closeAlert() {
    this.showAlert = false;
  }

  selectAvatar(img: string) {
    console.log("selectAvatar");
    this.selectedAvatar = img;
    this.showModal = false;
  }
  

  openModal() {
    console.log("openModal");
    this.showModal = true;
  }
  confirmDelete() {
    //this.showModal = false;
  }

// Méthode pour fermer la modal
  closeModal() {
    this.showModal = false;
  }

  adjustCardBodyHeight(): void {
    const content_wrapper = document.querySelector('.content-wrapper');
    const header = document.querySelector('.monProfil');
    if (content_wrapper && header) {
      content_wrapper.setAttribute('style', `height: ${window.innerHeight - header.clientHeight}px`);
    }
  }
}
