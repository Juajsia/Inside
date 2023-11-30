import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MenulateralComponent } from '../../components/menulateral/menulateral.component';
import { FormsModule } from '@angular/forms';
import { faTrash, faPenToSquare, faPlus, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Movimiento } from '../../interfaces/movimiento';
import { MovimientoService } from '../../services/movimiento.service';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [CommonModule, NavbarComponent, MenulateralComponent, FontAwesomeModule, FormsModule],
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.css'
})
export class HistorialComponent {
  faTrash = faTrash
  faPenToSquare = faPenToSquare
  faPlus = faPlus
  lupa = faMagnifyingGlass
  buscar = false
  listMovimientos: Movimiento[] = []
  copilist: Movimiento[] = []
  private router: Router = inject(Router)

  constructor(private _MovimientoService: MovimientoService, private toastr: ToastrService){
    this.getMovimientos()
  }

  getMovimientos(){
    this._MovimientoService.getAllMovimiento().subscribe((data) => {
      if (Array.isArray(data)) {
        this.listMovimientos = data
        this.copilist = data
      } else {
          this.listMovimientos = []
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

  eliminarMovimiento(id:number) {
    this._MovimientoService.deleteMovimiento(id).subscribe(() => {
      this.getMovimientos()
      this.toastr.warning(`Movimiento Eliminado con Exito!`, 'Movimiento Eliminado')
    })
  }

  filtarCed: string = ''
  filtrarMovimiento(): void{
    this.listMovimientos = this.copilist
    const filteredList: Movimiento[] = []
    if(this.filtarCed === ''){
      this.getMovimientos()
    }
    if (this.filtarCed !== '') {
      this.listMovimientos.forEach(element => {
        if (element.cedula === Number(this.filtarCed)) {
          filteredList.push(element)
        }
      });
      this.listMovimientos = filteredList
    }
    this.filtarCed = ''
    return
  }

   FormatoFecha(fechaISO: string): string {
    const fecha = new Date(fechaISO);
  
    // Formatear la fecha en el nuevo formato
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
