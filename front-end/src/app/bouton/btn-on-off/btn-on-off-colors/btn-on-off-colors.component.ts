import { Component } from '@angular/core';

@Component({
  selector: 'app-btn-on-off-colors',
  templateUrl: './btn-on-off-colors.component.html',
  styleUrls: ['./btn-on-off-colors.component.scss']
})
export class BtnOnOffColorsComponent {
  isOn: boolean = false;

  constructor() {
  }

  ngOnInit() {
  }

  toggleState() {
    this.isOn = !this.isOn;
  }

}
