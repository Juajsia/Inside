import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFloppyDisk, faArrowLeft} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-formulario-empleado',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './formulario-empleado.component.html',
  styleUrl: './formulario-empleado.component.css'
})
export class FormularioEmpleadoComponent {
  guardar = faFloppyDisk
  cancelar = faArrowLeft
}
