import { Routes } from '@angular/router';
import { NoticiaComponent } from './pages/noticia/noticia.component';
import { LoginComponent } from './pages/login/login.component';
import { loginGuard, rolAdmin } from './guards/login.guard';
import { FormularioNoticiaComponent } from './components/formulario-noticia/formulario-noticia.component';
import { EmpleadoComponent } from './pages/empleado/empleado.component';
import { FormularioEmpleadoComponent } from './components/formulario-empleado/formulario-empleado.component';

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
}
];
