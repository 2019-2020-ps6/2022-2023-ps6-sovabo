import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListesQuizzComponent } from './listes-quizz.component';

describe('ListesQuizzComponent', () => {
  let component: ListesQuizzComponent;
  let fixture: ComponentFixture<ListesQuizzComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListesQuizzComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListesQuizzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
