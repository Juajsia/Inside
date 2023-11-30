import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFloppyDisk, faArrowLeft} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-formulario-residente',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './formulario-residente.component.html',
  styleUrl: './formulario-residente.component.css'
})
export class FormularioResidenteComponent {
  guardar = faFloppyDisk
  cancelar = faArrowLeft
}
