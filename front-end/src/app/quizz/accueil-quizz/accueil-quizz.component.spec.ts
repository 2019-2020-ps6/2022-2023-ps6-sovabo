import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccueilQuizzComponent } from './accueil-quizz.component';

describe('AccueilQuizzComponent', () => {
  let component: AccueilQuizzComponent;
  let fixture: ComponentFixture<AccueilQuizzComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccueilQuizzComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccueilQuizzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
