import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizElementComponent } from './quiz-element.component';

describe('QuizElementComponent', () => {
  let component: QuizElementComponent;
  let fixture: ComponentFixture<QuizElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizElementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuizElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
