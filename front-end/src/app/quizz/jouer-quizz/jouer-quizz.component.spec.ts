import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JouerQuizzComponent } from './jouer-quizz.component';

describe('JouerQuizzComponent', () => {
  let component: JouerQuizzComponent;
  let fixture: ComponentFixture<JouerQuizzComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JouerQuizzComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JouerQuizzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
