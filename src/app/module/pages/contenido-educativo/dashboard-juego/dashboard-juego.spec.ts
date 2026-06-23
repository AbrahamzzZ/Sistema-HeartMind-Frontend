import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardJuego } from './dashboard-juego';

describe('DashboardJuego', () => {
  let component: DashboardJuego;
  let fixture: ComponentFixture<DashboardJuego>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardJuego]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardJuego);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
