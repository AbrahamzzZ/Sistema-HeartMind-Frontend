import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sidnebar } from './sidnebar';

describe('Sidnebar', () => {
  let component: Sidnebar;
  let fixture: ComponentFixture<Sidnebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sidnebar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sidnebar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
