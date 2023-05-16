import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnFontComponent } from './btn-font.component';

describe('BtnFontComponent', () => {
  let component: BtnFontComponent;
  let fixture: ComponentFixture<BtnFontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnFontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtnFontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
