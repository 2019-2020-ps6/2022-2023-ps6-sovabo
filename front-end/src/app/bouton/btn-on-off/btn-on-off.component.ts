import {Component} from '@angular/core';

@Component({
  selector: 'app-btn-on-off',
  templateUrl: './btn-on-off.component.html',
  styleUrls: ['./btn-on-off.component.scss']
})
export class BtnONOFFComponent {
  isOn: boolean = false;

  toggleState() {
    this.isOn = !this.isOn;
  }
}
