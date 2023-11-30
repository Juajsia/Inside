import {inject} from '@angular/core'
import { Router } from '@angular/router'

export const loginGuard = ():boolean => {
    const router = inject(Router)
    if (localStorage.getItem('token')) {
        return true
    } else {
        router.navigate([''])
        return false
    }
}

export const rolVigilante = () => {
    const rol = localStorage.getItem('rol')
    const router = inject(Router)
    if(rol === 'Vigilante' || rol === 'Administrador') {
        return true
    } else {
        router.navigate([''])
        return false
    }
}

export const rolAdmin = () => {
    const rol = localStorage.getItem('rol')
    const router = inject(Router)
    if(rol === 'Administrador') {
        return true
    } else {
        router.navigate([''])
        return false
    }
}

export const login = ():boolean => {
    const router = inject(Router)
    if (!localStorage.getItem('token')) {
        return true
    } else {
        const rol = localStorage.getItem('rol')
        if (rol === 'Administrador') {
            router.navigate(['noticias'])
        } else {
            router.navigate(['residentes'])
        }
        return false
    }
}