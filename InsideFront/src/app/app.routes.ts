import { Routes } from '@angular/router';
import { NoticiaComponent } from './pages/noticia/noticia.component';
import { LoginComponent } from './pages/login/login.component';
import { loginGuard, rolAdmin, rolVigilante } from './guards/login.guard';
import { FormularioNoticiaComponent } from './components/formulario-noticia/formulario-noticia.component';
import { EmpleadoComponent } from './pages/empleado/empleado.component';
import { FormularioEmpleadoComponent } from './components/formulario-empleado/formulario-empleado.component';
import { ResidenteComponent } from './pages/residente/residente.component';
import { HistorialComponent } from './pages/historial/historial.component';
import { FormularioResidenteComponent } from './components/formulario-residente/formulario-residente.component';
import { CambiarContrasenaComponent } from './pages/cambiar-contrasena/cambiar-contrasena.component';

export const routes: Routes = [{
    title: 'Login',
    path: '',
    component: LoginComponent
},{
    title: 'Noticia',
    path: 'noticias',
    component: NoticiaComponent,
    canActivate: [loginGuard, rolAdmin]
},{
    title: 'FomularioNoticia',
    path: 'noticias/formulario/:id',
    component: FormularioNoticiaComponent,
    canActivate: [loginGuard, rolAdmin]
},{
    title: 'Empleado',
    path: 'empleados',
    component: EmpleadoComponent,
    canActivate: [loginGuard, rolAdmin]
},{
    title: 'FomularioEmpleado',
    path: 'empleados/formulario/:id',
    component: FormularioEmpleadoComponent,
    canActivate: [loginGuard, rolAdmin]
},{
    title: 'Residente',
    path: 'residentes',
    component: ResidenteComponent,
    canActivate: [loginGuard, rolVigilante]
},{
    title: 'FomularioResidente',
    path: 'residentes/formulario/:id',
    component: FormularioResidenteComponent,
    canActivate: [loginGuard, rolAdmin]
}
,{
    title: 'Historial',
    path: 'historial',
    component: HistorialComponent,
    canActivate: [loginGuard, rolVigilante]
},{
    title: 'CambiarContraseña',
    path: 'cambiarContrasenia',
    component: CambiarContrasenaComponent
}
];
