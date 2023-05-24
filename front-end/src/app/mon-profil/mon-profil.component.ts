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
  }

  getImageFromImageName(imageName: string): string {
    return `../../assets/Images/${imageName}.png`;
  }


  async createUser(): Promise<void> {
    this.isCreatingUser = true;
    try {
      const newUser: Partial<User> = {
        name: "wola ca marche",
        imagePath: "Animateur_image",
        color: "#633719",
        configuration: {
          animateur: false,
          animateurImagePath: "/images/animateur.jpg",
          animation: false,
          animationSpeed: "normal",
          sliderPosition: 0,
          duration: "00:00:00",
          contraste: false,
          id: ""
        },
        id: ""
      };
      console.log(newUser.id);
      const user = await this.userService.createUser(newUser);
      this.users.push(user);
    } catch (e) {
      console.log(e);
    }
  }

  async deleteUser(): Promise<void> {
    try {
      const userIdToDelete = "" ;
      this.users.forEach(user => {
        if (user.name === "wola ca marche") {
          userIdToDelete.concat(user.id);
        }
      })
      console.log(userIdToDelete);
      await this.userService.deleteUser(userIdToDelete);
      this.users = this.users.filter(user => user.id !== userIdToDelete);
    } catch (e) {
      console.log(e);
    }
  }

  cancelCreateUser(): void {
    // Masquer le formulaire de création et afficher la liste d'utilisateurs
    this.isCreatingUser = false;
  }

  submitForm(): void {
    console.log("submitForm");
    if(this.isCreatingUser) {
      console.log(this.userName);
      this.isCreatingUser = false;
    }

    this.showAlert = true;
    setTimeout(() => this.showAlert = false, 4000); 
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
