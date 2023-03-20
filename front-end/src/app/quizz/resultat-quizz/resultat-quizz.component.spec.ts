import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultatQuizzComponent } from './resultat-quizz.component';

describe('ResultatQuizzComponent', () => {
  let component: ResultatQuizzComponent;
  let fixture: ComponentFixture<ResultatQuizzComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultatQuizzComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultatQuizzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
