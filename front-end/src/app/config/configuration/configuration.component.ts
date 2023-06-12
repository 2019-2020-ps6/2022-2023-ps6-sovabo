import {Component} from '@angular/core';
import {JeuxCouleursService} from "../../../service/jeux-couleurs.service";
import {AuthService} from "../../../service/authentification.service";
import {CodeAcces} from "../../../models/codeAcces.model";

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent {
  AttentionColorStatus: boolean = false;
  contrasteTroubleEnable: boolean = this.jeuxCouleursService.getVisionAttentionStatus();
  showModalAuth: boolean | undefined;
  correctAccessCode: string | undefined;
  isAccessing: boolean | undefined;
  isAppearing: boolean | undefined;

  constructor(private jeuxCouleursService: JeuxCouleursService,
              private authService: AuthService) {
  }

  async ngOnInit(): Promise<void> {
    this.AttentionColorStatus = this.jeuxCouleursService.IsAttentionColorActivated();
    this.jeuxCouleursService.changeFont(document);
    this.showModalAuth = !this.authService.getAuthenticationStatus();
    this.isAppearing = true;
    this.authService.getCorrectAccessCode().subscribe(code => {
      this.correctAccessCode = code;
    });

    if (this.showModalAuth) {
      setTimeout(() => {
        this.isAppearing = false;
      }, 600);
    }

    this.jeuxCouleursService.setUpdateDocument(true);
  }

  ngAfterViewInit() {
   this.jeuxCouleursService.updateDoc(document);
  }


  handleAccessCode(accessCode: string): void {
    if (accessCode === this.correctAccessCode) {
      this.authService.toggleAuthenticate();
      this.isAccessing = true;
      setTimeout(() => {
        this.showModalAuth = false;
      }, 600); // The same duration as your animation
    } else {
      alert('Incorrect access code. Please try again.');
    }
  }

  toggleAuthenticate() {
    this.authService.toggleAuthenticate();
  }
}
