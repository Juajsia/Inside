import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioResidenteComponent } from './formulario-residente.component';

describe('FormularioResidenteComponent', () => {
  let component: FormularioResidenteComponent;
  let fixture: ComponentFixture<FormularioResidenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioResidenteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormularioResidenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
