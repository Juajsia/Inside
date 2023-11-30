import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faArrowLeft, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { NoticiaService } from '../../services/noticia.service';
import { ToastrService } from 'ngx-toastr';
import { Noticia } from '../../interfaces/noticia';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-formulario-noticia',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, ReactiveFormsModule],
  templateUrl: './formulario-noticia.component.html',
  styleUrl: './formulario-noticia.component.css'
})
export class FormularioNoticiaComponent {
  //iconos
  guardar = faFloppyDisk
  cancelar = faArrowLeft
  //formulario
  form =  new FormGroup({
    titulo: new FormControl('', Validators.required),
    linkImg: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
  })
  
  id: number
  operacion: string = 'Publicar '
  private router: Router = inject(Router)

  constructor(private _NoticiaService: NoticiaService, private aRouter: ActivatedRoute, private toastr : ToastrService){
    this.id = Number(aRouter.snapshot.paramMap.get('id')!)
    // console.log(this.id)
  }

  ngOnInit(): void {
    if (this.id != 0){
      this.operacion = 'Editar '
      this.getNoticia(this.id)
    }
  }

  CUNoticia(){
    // console.log(this.form)

    const noticia: Noticia = {
      titulo: this.form.value.titulo!,
      linkImg: this.form.value.linkImg!,
      descripcion: this.form.value.descripcion!,
    }

    if(this.id != 0){ //editar
      noticia.id = this.id
      this._NoticiaService.updateNoticia(this.id, noticia).subscribe({
        next: () => {
        console.log('noticia agregada')
        this.volver()
        this.toastr.info(`noticia ${noticia.titulo} Actualizada Con Exito!`, 'noticia Actualizada')
      }, error: (e: HttpErrorResponse) => {
        this.toastr.error(`No se pudo Actualizar la noticia: Asegurese de ingresar los datos Adecuadamente`, 'Error Actualizando noticia')
      }
    })
    } else {  //crear
      this._NoticiaService.agregar(noticia).subscribe( {
        next: () => {
        console.log('noticia agregada')
        this.volver()
        this.toastr.success(`noticia ${noticia.titulo} Creada Con Exito!`, 'noticia Creada')
      }, error: (e: HttpErrorResponse) => {
        this.toastr.error(`No se pudo Crear la noticia: Asegurese de ingresar los datos Adecuadamente`, 'Error Cerando noticia')
      }
    })
    }
  }

  getNoticia(id: number){
    this._NoticiaService.getById(id).subscribe((res: Noticia[]) => {
      const data = res[0]
      console.log(data)
      this.form.setValue({
        titulo: data.titulo,
        linkImg: data.linkImg,
        descripcion: data.descripcion
      })
    })
  }

  volver(){
    this.router.navigate(['noticias'])
  }
}
