import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroEdicionContenido } from './registro-edicion-contenido';

describe('RegistroEdicionContenido', () => {
  let component: RegistroEdicionContenido;
  let fixture: ComponentFixture<RegistroEdicionContenido>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroEdicionContenido]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroEdicionContenido);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
