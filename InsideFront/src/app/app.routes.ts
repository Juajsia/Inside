import { Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { NoticiaComponent } from './pages/noticia/noticia.component';
import { LoginComponent } from './pages/login/login.component';
import { loginGuard, rolAdmin } from './guards/login.guard';

export const routes: Routes = [{
    title: 'Login',
    path: '',
    component: LoginComponent
},{
    title: 'Noticia',
    path: 'noticias',
    component: NoticiaComponent,
    canActivate: [loginGuard, rolAdmin]
}];
