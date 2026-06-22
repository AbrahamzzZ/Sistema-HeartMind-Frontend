import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegoClasificarHabitos } from './juego-clasificar-habitos';

describe('JuegoClasificarHabitos', () => {
  let component: JuegoClasificarHabitos;
  let fixture: ComponentFixture<JuegoClasificarHabitos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JuegoClasificarHabitos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JuegoClasificarHabitos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
