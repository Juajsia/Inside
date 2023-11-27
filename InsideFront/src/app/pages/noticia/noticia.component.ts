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
    //this.router.navigate([`Noticia/formulario/${id}`])
  }
  eliminarNoticia(id:number, Titulo: string) {
    this._NoticiaService.deleteNoticia(id).subscribe(() => {
      this.getNoticias()
      this.toastr.warning(`Noticia ${Titulo} Eliminada con Exito!`, 'Noticia Eliminada')
    })
  }

  // filtarNombre: string = ''
  // filtarCed: string = ''
  // filtrarNoticia(): void{
  //   const filteredListNoticia: Noticia[] = []
  //   if(this.filtarCed === '' && this.filtarNombre === ''){
  //     this.getNoticias()
  //   }
  //   if (this.filtarCed !== '' && this.filtarNombre === '') {
  //     this.listNoticias.forEach(item => {
  //       if(String(item.IdDuenio) == this.filtarCed){
  //         filteredListNoticia.push(item)
  //       }
  //     });
  //     this.listNoticias = filteredListNoticia
  //   }
  //   if (this.filtarCed === '' && this.filtarNombre !== '') {
  //     this.listNoticias.forEach(item => {
  //       if(item.Nombre == this.filtarNombre){
  //         filteredListNoticia.push(item)
  //       }
  //     });
  //     this.listNoticias = filteredListNoticia
  //   }
  //   if (this.filtarCed !== '' && this.filtarNombre !== '') {
  //     this.listNoticias.forEach(item => {
  //       if(item.Nombre == this.filtarNombre && String(item.IdDuenio) == this.filtarCed){
  //         filteredListNoticia.push(item)
  //       }
  //     });
  //     this.listNoticias = filteredListNoticia
  //   }
  //   this.filtarNombre = ''
  //   this.filtarCed = ''
  //   return
  // }
}
