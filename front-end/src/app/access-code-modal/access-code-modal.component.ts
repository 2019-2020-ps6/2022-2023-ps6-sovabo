import {Component, Output, EventEmitter, Input} from '@angular/core';
import {JeuxCouleursService} from "../../service/jeux-couleurs.service";

@Component({
  selector: 'app-access-code-modal',
  templateUrl: './access-code-modal.component.html',
  styleUrls: ['./access-code-modal.component.scss']
})
export class AccessCodeModalComponent {
  accessCode = "";
  @Input() isAccessing: boolean | undefined;
  @Input() isAppearing: boolean | undefined;
  @Output() enteredAccessCode = new EventEmitter<string>();

  contrasteTroubleEnable :boolean = this.jeuxCouleursService.getVisionAttentionStatus();

  constructor(private jeuxCouleursService: JeuxCouleursService) {
  }

  get buttonClass() {
    return this.jeuxCouleursService.getVisionColorSelectedString();
  }

  onSubmit(): void {
    this.enteredAccessCode.emit(this.accessCode);
  }
}
