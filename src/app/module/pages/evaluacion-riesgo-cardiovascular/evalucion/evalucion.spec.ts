import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Evalucion } from './evalucion';

describe('Evalucion', () => {
  let component: Evalucion;
  let fixture: ComponentFixture<Evalucion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Evalucion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Evalucion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
