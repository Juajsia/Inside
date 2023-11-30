export interface Persona{
    cedula: number,
    correo:string,
    contrasenia?:string,
    primerNombre:string,
    segundoNombre:string,
    primerApellido:string,
    segundoApellido:string,
    telefono:string,
    rol:string
}

export interface Persona2{
    cedula: number | null | string,
    correo:string | null,
    contrasenia?:string | null,
    primerNombre:string | null,
    segundoNombre:string | null,
    primerApellido:string | null,
    segundoApellido:string | null,
    telefono:string | null,
    rol:string | null
}