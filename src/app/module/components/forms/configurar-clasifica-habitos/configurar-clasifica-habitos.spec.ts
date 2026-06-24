import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurarClasificaHabitos } from './configurar-clasifica-habitos';

describe('ConfigurarClasificaHabitos', () => {
  let component: ConfigurarClasificaHabitos;
  let fixture: ComponentFixture<ConfigurarClasificaHabitos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigurarClasificaHabitos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigurarClasificaHabitos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
