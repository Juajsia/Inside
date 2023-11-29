import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faNewspaper } from '@fortawesome/free-regular-svg-icons';
import { faUsers , faUserTie , faClockRotateLeft , faGear , faUser , faArrowRightToBracket} from '@fortawesome/free-solid-svg-icons';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-menulateral',
  standalone: true,
  imports: [CommonModule , FontAwesomeModule, RouterLink ],
  templateUrl: './menulateral.component.html',
  styleUrl: './menulateral.component.css'
})
export class MenulateralComponent {
  router: Router = inject(Router)
  noticia = faNewspaper
  residentes = faUsers
  empleados = faUserTie
  historial = faClockRotateLeft
  configuracion = faGear
  close = faArrowRightToBracket

  constructor(){
    console.log(this.router.url)
  }

  cerrarSesion(){
    localStorage.removeItem('token')
    localStorage.removeItem('rol')
    this.router.navigate([''])
  }
}
