import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CredencialesService } from '../../services/credenciales.service';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cambiar-contrasena',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './cambiar-contrasena.component.html',
  styleUrl: './cambiar-contrasena.component.css'
})
export class CambiarContrasenaComponent {
  private _userService = inject(CredencialesService)
  private router: Router = inject(Router)
  private toastr = inject(ToastrService)
  correo: string = ''
  contrasenia: string = ''
  nuevaContrasenia: string = ''
  confirmarContrasenia: string = ''
  Error: string = ''

  Enviar() {
    if (this.validateForm()) {
      const user:any = {correo: this.correo, contrasenia: this.contrasenia, newContrasenia: this.nuevaContrasenia}
    this._userService.updateContrasenia(user).subscribe({
      next: (data) => {
        this.toastr.info(`Contraseña actualizada Con Exito!`, 'Contraseña Actualizada')
        this.router.navigate([''])
      },
      error: (e: HttpErrorResponse) => {
        this.Error = 'No fue posible actualizar la contraseña, revise los datos'
      }
    })
    }
    
  }

  validateForm (){
    if (!this.correo || !this.contrasenia || !this.nuevaContrasenia || !this.confirmarContrasenia) {
      this.Error = 'Ingresar Tcodos los Campos'
      return false 
    }
    const regrex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    if (!regrex.test(this.contrasenia)) {
      this.Error = 'Ingresar una contraseña Válida'
      return false
    }
    if (!regrex.test(this.nuevaContrasenia)) {
      this.Error = 'Ingresar una nueva contraseña Válida'
      return false
    }
    if (this.nuevaContrasenia !== this.confirmarContrasenia) {
      this.Error = 'La confirmación no es igual a la nueva contraseña'
      return false
    }
    return true
  }
}
