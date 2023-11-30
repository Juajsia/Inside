import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFloppyDisk, faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpleadoService } from '../../services/empleado.service';
import { ToastrService } from 'ngx-toastr';
import { Empleado } from '../../interfaces/empleado';
import { HttpErrorResponse } from '@angular/common/http';
import { Persona } from '../../interfaces/persona';
import { PersonaService } from '../../services/persona.service';

@Component({
  selector: 'app-formulario-empleado',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, ReactiveFormsModule, FormsModule],
  templateUrl: './formulario-empleado.component.html',
  styleUrl: './formulario-empleado.component.css'
})
export class FormularioEmpleadoComponent {
  guardar = faFloppyDisk
  cancelar = faArrowLeft
  textRegex = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/
  mailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  cedRegex = /^[0-9]\d{7,9}$/
  telRegex = /^\d{10}$/

  form =  new FormGroup({
    cedula: new FormControl('', [Validators.required, Validators.pattern(this.cedRegex)]),
    primerNombre: new FormControl('', [Validators.required, Validators.pattern(this.textRegex)]),
    segundoNombre: new FormControl('', [Validators.required, Validators.pattern(this.textRegex)]),
    primerApellido: new FormControl('', [Validators.required, Validators.pattern(this.textRegex)]),
    segundoApellido: new FormControl('', [Validators.required, Validators.pattern(this.textRegex)]),
    telefono: new FormControl('', [Validators.required, Validators.pattern(this.telRegex)]),
    observaciones: new FormControl('', Validators.required),
    direccion: new FormControl('', Validators.required),  //pendiente de validar
    correo: new FormControl('', [Validators.required, Validators.pattern(this.mailRegex)]),
    contrasenia: new FormControl('', [Validators.required, Validators.pattern(this.passwordRegex)]),
  })
  
  id: number
  operacion: string = 'Agregar '
  rolSeleccionado: string = ''
  isEditable = true
  private router: Router = inject(Router)

  constructor(private _EmpleadoService: EmpleadoService, private _PersonaService: PersonaService, private aRouter: ActivatedRoute, private toastr : ToastrService){
    this.id = Number(aRouter.snapshot.paramMap.get('id')!)
  }

  ngOnInit(): void {
    if (this.id != 0){
      this.operacion = 'Editar '
      //this.getEmpleado(this.id)
    }
  }

  async crearPersona(Persona: Persona){
    
    this._PersonaService.agregar(Persona).subscribe({

      })
  }

  async CUEmpleado(){
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

    console.log(Persona)

    const Empleado: Empleado = {
      cedula: Number(this.form.value.cedula!),
      rol: this.rolSeleccionado,
      observaciones: this.form.value.observaciones!,
      direccion: this.form.value.direccion!,
    }

    if(this.id != 0){ //editar
      Empleado.cedula = this.id
      this._PersonaService.updatePersona(this.id, Persona).subscribe({
        next: () => {
          this._EmpleadoService.updateEmpleado(this.id, Empleado).subscribe({
            next: () => {
            console.log('Empleado agregado')
            this.volver()
            this.toastr.info(`Empleado ${Persona.primerNombre} Actualizada Con Exito!`, 'Empleado Actualizado')
          }, error: (e: HttpErrorResponse) => {
            this.toastr.error(`No se pudo Actualizar la Empleado: Asegurese de ingresar los datos Adecuadamente`, 'Error Actualizando Empleado')
          }
        })
      }, error: (e: HttpErrorResponse) => {
        this.toastr.error(`No se pudo Actualizar la Persona: Asegurese de ingresar los datos Adecuadamente`, 'Error Actualizando Persona')
      }
    })

      


    } else {  //crear
      await this._PersonaService.agregar(Persona).subscribe({
        next: () => {
          this._EmpleadoService.agregar(Empleado).subscribe({
            next: () => {
            console.log('Empleado agregado')
            this.volver()
            this.toastr.success(`Empleado ${Persona.primerNombre} Creado Con Exito!`, 'Empleado Creado')
          }, error: (e: HttpErrorResponse) => {
            this.toastr.error(`No se pudo Crear el Empleado: Asegurese de ingresar los datos Adecuadamente`, 'Error Creando Empleado')
          }
        })
        }, error: (e: HttpErrorResponse) => {
            this.toastr.error(`No se pudo crear la persona: Asegurese de ingresar los datos Adecuadamente`, 'Error creando Persona')
          }
      })
    }
  }

  // getEmpleado(id: number){
  //   this._PersonaService.getById(id).subscribe()


  //   this._EmpleadoService.getById(id).subscribe((res: Empleado[]) => {
  //     const data = res[0]
  //     console.log(data)
  //     const nombre = data.nombre?.split('')
  //     this.form.setValue({
  //       cedula: String(data.cedula),
  //       primerNombre: nombre![0],
  //       segundoNombre: nombre![1],
  //       primerApellido: nombre![2],
  //       segundoApellido: nombre![3],
  //       telefono: data.telefono!,
  //       observaciones: data.observaciones,
  //       direccion: data.direccion,
  //       correo: data.correo,
  //       contrasenia: data.contrasena
  //     })
  //   })
  // }

  volver(){
    this.router.navigate(['empleados'])
  }

  capturarRol(event: Event): void {
    const valorSeleccionado = (event.target as HTMLSelectElement).value;
    this.rolSeleccionado = valorSeleccionado
  }
}
