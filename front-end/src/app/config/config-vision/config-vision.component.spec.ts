import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigVisionComponent } from './config-vision.component';

describe('ConfigVisionComponent', () => {
  let component: ConfigVisionComponent;
  let fixture: ComponentFixture<ConfigVisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigVisionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigVisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
