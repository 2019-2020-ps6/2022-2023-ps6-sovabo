import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnOnOffColorsComponent } from './btn-on-off-colors.component';

describe('BtnOnOffColorsComponent', () => {
  let component: BtnOnOffColorsComponent;
  let fixture: ComponentFixture<BtnOnOffColorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnOnOffColorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtnOnOffColorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
