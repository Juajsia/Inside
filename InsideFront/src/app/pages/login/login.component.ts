import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CredencialesService } from '../../services/credenciales.service';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private _userService = inject(CredencialesService)
  private router: Router = inject(Router)
  correo: string = ''
  Contrasenia: string = ''
  Error: string = ''

  login() {
    if (this.validateForm()) {
      const user:any = {correo: this.correo, contrasenia: this.Contrasenia}
    this._userService.login(user).subscribe({
      next: (data) => {
        localStorage.setItem('token', data.token)
        localStorage.setItem('rol', data.Rol)
        localStorage.setItem('nombre', data.Nombre + ' ' + data.Apellido)
        this.router.navigate(['noticias'])
      },
      error: (e: HttpErrorResponse) => {
        this.Error = 'Contraseña o correo Erroneos'
      }
    })
    }
    
  }

  validateForm (){
    if (!this.correo || !this.Contrasenia) {
      this.Error = 'Ingresar Todos los Campos'
      return false 
    }
    const regrex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    if (!regrex.test(this.Contrasenia)) {
      this.Error = 'Ingresar una contraseña Válida'
      return false
    }
    return true
  }
}
