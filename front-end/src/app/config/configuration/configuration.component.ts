import {Component, HostListener} from '@angular/core';
import {JeuxCouleursService} from "../../../service/jeux-couleurs.service";
import {Location} from '@angular/common';
import {AuthService} from "../../../service/authentification";

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent {
  AttentionColorStatus: boolean = false;
  contrasteTroubleEnable: boolean = this.jeuxCouleursService.getVisionAttentionStatus();
  showModal: boolean = true;
  correctAccessCode: string = '1'; // replace this with your actual access code
  isAccessing: boolean | undefined;

  constructor(private jeuxCouleursService: JeuxCouleursService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.showModal = !this.authService.getAuthenticationStatus();
    this.AttentionColorStatus = this.jeuxCouleursService.IsAttentionColorActivated();
    this.jeuxCouleursService.changeFont(document);
  }

  ngAfterViewInit() {
    if (this.jeuxCouleursService.isDefaultActive) {
      this.jeuxCouleursService.collectDefaultStyles();
    } else {
      console.log("MODIFICATION DE LA FONT !!");
      this.jeuxCouleursService.changeFont(document);
    }
    this.jeuxCouleursService.changeFontSize(document);
  }

  handleAccessCode(accessCode: string): void {
    if (accessCode === this.correctAccessCode) {
      this.toggleAuthenticate();
      this.isAccessing = true;
      setTimeout(() => {
        this.showModal = false;
      }, 600); // The same duration as your animation
    } else {
      alert('Incorrect access code. Please try again.');
    }
  }

  toggleAuthenticate() {
    this.authService.toggleAuthenticate();
  }
}
