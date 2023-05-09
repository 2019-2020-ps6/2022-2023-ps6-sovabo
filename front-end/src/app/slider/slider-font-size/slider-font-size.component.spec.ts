import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderFontSizeComponent } from './slider-font-size.component';

describe('SliderFontSizeComponent', () => {
  let component: SliderFontSizeComponent;
  let fixture: ComponentFixture<SliderFontSizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SliderFontSizeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SliderFontSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
