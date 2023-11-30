import { Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFloppyDisk, faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ResidenteService } from '../../services/residente.service';
import { PersonaService } from '../../services/persona.service';
import { Router, ActivatedRoute} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Persona } from '../../interfaces/persona';
import { Residente } from '../../interfaces/residente';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-formulario-residente',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, ReactiveFormsModule, FormsModule],
  templateUrl: './formulario-residente.component.html',
  styleUrl: './formulario-residente.component.css'
})
export class FormularioResidenteComponent {
  guardar = faFloppyDisk
  cancelar = faArrowLeft

  textRegex = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/
  mailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  cedRegex = /^[0-9]\d{7,9}$/
  telRegex = /^\d{10}$/

  form =  new FormGroup({
    cedula: new FormControl('', [Validators.required, Validators.pattern(this.cedRegex)]),
    correo: new FormControl('', [Validators.required, Validators.pattern(this.mailRegex)]),
    contrasenia: new FormControl('', [Validators.required, Validators.pattern(this.passwordRegex)]),
    primerNombre: new FormControl('', [Validators.required, Validators.pattern(this.textRegex)]),
    segundoNombre: new FormControl('', [Validators.pattern(this.textRegex)]),
    primerApellido: new FormControl('', [Validators.required, Validators.pattern(this.textRegex)]),
    segundoApellido: new FormControl('', [Validators.required, Validators.pattern(this.textRegex)]),
    telefono: new FormControl('', [Validators.required, Validators.pattern(this.telRegex)]),
    torre: new FormControl('', Validators.required),
    apartamento: new FormControl('', Validators.required),
  })

  id: number
  operacion: string = 'Agregar '
  rolSeleccionado: string = ''
  isEditable = true
  private router: Router = inject(Router)

  constructor(private _ResidenteService: ResidenteService, private _PersonaService: PersonaService, private aRouter: ActivatedRoute, private toastr : ToastrService){
    this.id = Number(aRouter.snapshot.paramMap.get('id')!)
  }

  ngOnInit(): void {
    if (this.id != 0){
      this.operacion = 'Editar '
      //this.getEmpleado(this.id)
    }
  }


  async CUResidente(){
    const Persona: Persona = {
      primerNombre: this.form.value.primerNombre!,
      segundoNombre: this.form.value.segundoNombre!,
      primerApellido: this.form.value.primerApellido!,
      segundoApellido: this.form.value.segundoApellido!,
      cedula: Number(this.form.value.cedula!),
      telefono: this.form.value.telefono!,
      rol: 'Empleado',
      correo: this.form.value.correo!,
      contrasenia: this.form.value.contrasenia!
    }

    // console.log(Persona)

    const Residente: Residente = {
      cedula: Number(this.form.value.cedula!),
      apartamento: this.form.value.apartamento!,
      torre: this.form.value.torre!
    }

    if(this.id != 0){ //editar
      Residente.cedula = this.id
      this._PersonaService.updatePersona(this.id, Persona).subscribe({
        next: () => {
          this._ResidenteService.updateResidente(this.id, Residente).subscribe({
            next: () => {
            this.volver()
            this.toastr.info(`Residente ${Persona.primerNombre} Actualizado Con Exito!`, 'Residente Actualizado')
          }, error: (e: HttpErrorResponse) => {
            this.toastr.error(`No se pudo Actualizar El Residente: Asegurese de ingresar los datos Adecuadamente`, 'Error Actualizando Empleado')
          }
        })
      }, error: (e: HttpErrorResponse) => {
        this.toastr.error(`No se pudo Actualizar la Persona: Asegurese de ingresar los datos Adecuadamente`, 'Error Actualizando Persona')
      }
    })
    } else {  //crear
      await this._PersonaService.agregar(Persona).subscribe({
        next: () => {
          this._ResidenteService.agregar(Residente).subscribe({
            next: () => {
            this.volver()
            this.toastr.success(`Residente ${Persona.primerNombre} Creado Con Exito!`, 'Residente Creado')
          }, error: (e: HttpErrorResponse) => {
            this.toastr.error(`No se pudo Crear el Residente: Asegurese de ingresar los datos Adecuadamente`, 'Error Creando Residente')
          }
        })
        }, error: (e: HttpErrorResponse) => {
            this.toastr.error(`No se pudo crear la persona: Asegurese de ingresar los datos Adecuadamente`, 'Error creando Persona')
          }
      })
    }
  }

  volver(){
    this.router.navigate(['residentes'])
  }


}
