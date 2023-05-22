import { Component } from '@angular/core';
import { JeuxCouleursService } from 'src/service/jeux-couleurs.service';
import { AnimateurService } from "../../service/animateur.service";
import { AnimationsService } from "../../service/animations.service";
import {UserService} from "../../service/user.service";
import {User} from "../../models/user.model";

@Component({
  selector: 'app-mon-profil',
  templateUrl: './mon-profil.component.html',
  styleUrls: ['./mon-profil.component.scss']
})
export class MonProfilComponent {
  contrasteTroubleEnable: boolean = this.jeuxCouleursService.getVisionAttentionStatus();
  public users: User[] = [];


  constructor(private jeuxCouleursService: JeuxCouleursService,
              private userService: UserService) {
  }

  async ngOnInit(): Promise<void> {
    try {
      this.users = await this.userService.loadUsersFromServer();
      console.log(this.users);
    }
    catch (e) {
      console.log(e);
    }
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
  //   this.users.map(u => {
  //     if (u.id === user.id) {
  //       u.name = user.name;
  //       console.log(u.name);
  //     }
  //     return u;
  //   });
  }
}
