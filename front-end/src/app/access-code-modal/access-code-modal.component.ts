import {Component, Output, EventEmitter, Input} from '@angular/core';

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

  onSubmit(): void {
    this.enteredAccessCode.emit(this.accessCode);
    console.log(this.isAccessing, this.isAppearing);
  }
}
