import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { MenulateralComponent } from '../../components/menulateral/menulateral.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash, faPenToSquare, faPlus, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { Noticia } from '../../interfaces/noticia';
import { NoticiaService } from '../../services/noticia.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-noticia',
  standalone: true,
  imports: [CommonModule, NavbarComponent, MenulateralComponent, FontAwesomeModule],
  templateUrl: './noticia.component.html',
  styleUrl: './noticia.component.css'
})
export class NoticiaComponent {
  faTrash = faTrash
  faPenToSquare = faPenToSquare
  faPlus = faPlus
  lupa = faMagnifyingGlass
  buscar = false
  listNoticias: Noticia[] = []
  private router: Router = inject(Router)

  constructor (private _NoticiaService: NoticiaService, private toastr: ToastrService) {
    this.getNoticias()
  }


  getNoticias(){
    this._NoticiaService.getAllNoticias().subscribe((data) => {
      if (Array.isArray(data)) {
        this.listNoticias = data
      } else {
          this.listNoticias = []
        }
    })  
  }

  Buscar(){
    this.buscar = true
  }

  mostrarForm(id: number){
    this.router.navigate([`noticias/formulario/${id}`])
  }
  
  eliminarNoticia(id:number, Titulo: string) {
    this._NoticiaService.deleteNoticia(id).subscribe(() => {
      this.getNoticias()
      this.toastr.warning(`Noticia ${Titulo} Eliminada con Exito!`, 'Noticia Eliminada')
    })
  }

  FormatoFecha(fechaISO: string): string {
    const fecha = new Date(fechaISO);
    const formatoDeseado: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'America/New_York',
    };
  
    return fecha.toLocaleString('es-ES', formatoDeseado);
  }
}
