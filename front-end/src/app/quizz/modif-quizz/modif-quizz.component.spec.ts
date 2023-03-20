import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifQuizzComponent } from './modif-quizz.component';

describe('ModifQuizzComponent', () => {
  let component: ModifQuizzComponent;
  let fixture: ComponentFixture<ModifQuizzComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifQuizzComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifQuizzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
