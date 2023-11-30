export interface Movimiento {
    id?: number,
    nombre?: string,
    cedula?: number,
    fecha: string,
    porteria: string,
    tipo: string,
    placa: string | null
}