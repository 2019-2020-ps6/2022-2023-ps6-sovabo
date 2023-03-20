import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigAttentionComponent } from './config-attention.component';

describe('ConfigAttentionComponent', () => {
  let component: ConfigAttentionComponent;
  let fixture: ComponentFixture<ConfigAttentionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigAttentionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigAttentionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
