import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerQuizzComponent } from './creer-quizz.component';

describe('CreerQuizzComponent', () => {
  let component: CreerQuizzComponent;
  let fixture: ComponentFixture<CreerQuizzComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreerQuizzComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreerQuizzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
