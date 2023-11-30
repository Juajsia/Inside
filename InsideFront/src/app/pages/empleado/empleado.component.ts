import { Component , inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { MenulateralComponent } from '../../components/menulateral/menulateral.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash, faPenToSquare, faPlus, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Empleado } from '../../interfaces/empleado';
import { EmpleadoService } from '../../services/empleado.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-empleado',
  standalone: true,
  imports: [CommonModule, NavbarComponent, MenulateralComponent, FontAwesomeModule, FormsModule],
  templateUrl: './empleado.component.html',
  styleUrl: './empleado.component.css'
})
export class EmpleadoComponent {
  faTrash = faTrash
  faPenToSquare = faPenToSquare
  faPlus = faPlus
  lupa = faMagnifyingGlass
  buscar = false
  listEmpleado: Empleado[] = []
  copilist: Empleado[] = []
  private router: Router = inject(Router)

  constructor(private _EmpleadoService: EmpleadoService, private toastr: ToastrService){
    this.getEmpleados()
  }

  getEmpleados(){
    this._EmpleadoService.getAllEmpleado().subscribe((data) => {
      if (Array.isArray(data)) {
        this.listEmpleado = data
        this.copilist = data
      } else {
          this.listEmpleado = []
          this.copilist = []
        }
    })  
  }

  Buscar(){
    this.buscar = true
  }

  mostrarForm(id: number){
    //this.router.navigate([`Empleado/formulario/${id}`])
  }

  eliminarEmpleado(id:number, nombre: string) {
    this._EmpleadoService.deleteEmpleado(id).subscribe(() => {
      this.getEmpleados()
      this.toastr.warning(`Empleado ${nombre} Eliminada con Exito!`, 'Empleado Eliminado/a')
    })
  }

  filtarCed: string = ''
  filtrarEmpleado(): void{
    this.listEmpleado = this.copilist
    const filteredList: Empleado[] = []
    if(this.filtarCed === ''){
      this.getEmpleados()
    }
    if (this.filtarCed !== '') {
      const Personafiltrada = this.listEmpleado.find(d => d.cedula === Number(this.filtarCed))
      if (Personafiltrada) {
        filteredList.push(Personafiltrada)
        this.listEmpleado = filteredList
      } else {
        this.listEmpleado = []
      }
    }
    this.filtarCed = ''
    return
  }
}
