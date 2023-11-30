import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { MenulateralComponent } from '../../components/menulateral/menulateral.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { faTrash, faPenToSquare, faPlus, faMagnifyingGlass, faXmark} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Residente } from '../../interfaces/residente';
import { ResidenteService } from '../../services/residente.service';

@Component({
  selector: 'app-residente',
  standalone: true,
  imports: [CommonModule, NavbarComponent, MenulateralComponent, FontAwesomeModule, FormsModule],
  templateUrl: './residente.component.html',
  styleUrl: './residente.component.css'
})
export class ResidenteComponent {
  faTrash = faTrash
  faPenToSquare = faPenToSquare
  faPlus = faPlus
  lupa = faMagnifyingGlass
  cerrar = faXmark
  buscar = false
  listResidentes: Residente[] = []
  copilist: Residente[] = []
  private router: Router = inject(Router)
  rol = localStorage.getItem('rol')

  constructor(private _ResidenteService: ResidenteService, private toastr: ToastrService){
    this.getResidentes()
  }

  getResidentes(){
    this._ResidenteService.getAllResidente().subscribe((data) => {
      if (Array.isArray(data)) {
        this.listResidentes = data
        this.copilist = data
      } else {
          this.listResidentes = []
          this.copilist = []
        }
    })  
  }

  Buscar(){
    this.buscar = true
  }

  mostrarForm(id: number){
    this.router.navigate([`residentes/formulario/${id}`])
  }

  eliminarResidente(id:number, nombre: string) {
    this._ResidenteService.deleteResidente(id).subscribe(() => {
      this.getResidentes()
      this.toastr.warning(`Residente ${nombre} Eliminado/a con Exito!`, 'Empleado Eliminado/a')
    })
  }

  filtarCed: string = ''
  filtrarResidente(): void{
    this.listResidentes = this.copilist
    const filteredList: Residente[] = []
    if(this.filtarCed === ''){
      this.getResidentes()
    }
    if (this.filtarCed !== '') {
      const Personafiltrada = this.listResidentes.find(d => d.cedula === Number(this.filtarCed))
      if (Personafiltrada) {
        filteredList.push(Personafiltrada)
        this.listResidentes = filteredList
      } else {
        this.listResidentes = []
      }
    }
    this.filtarCed = ''
    return
  }
}
