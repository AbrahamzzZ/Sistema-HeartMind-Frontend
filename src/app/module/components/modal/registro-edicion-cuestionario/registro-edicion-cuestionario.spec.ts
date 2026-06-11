import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroEdicionCuestionario } from './registro-edicion-cuestionario';

describe('RegistroEdicionCuestionario', () => {
  let component: RegistroEdicionCuestionario;
  let fixture: ComponentFixture<RegistroEdicionCuestionario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroEdicionCuestionario]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroEdicionCuestionario);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
