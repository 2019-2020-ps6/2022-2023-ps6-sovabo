import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnOnOffContrastComponent } from './btn-on-off-contrast.component';

describe('BtnOnOffContrastComponent', () => {
  let component: BtnOnOffContrastComponent;
  let fixture: ComponentFixture<BtnOnOffContrastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnOnOffContrastComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtnOnOffContrastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
