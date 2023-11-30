import mysql from 'mysql2/promise'

const DEFAULT_CONFIG = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: '1234',
  database: 'bd_Inside'
}
const connectionString = process.env.DATABASE_URL ?? DEFAULT_CONFIG
let connection

try {
  connection = await mysql.createConnection(connectionString)
} catch (error) {
  throw new Error('error connecting')
}

export class MovimientoModel {
  static async getAll () {
    try {
      const [movimientos] = await connection.query('select m.id, concat(p.primerNombre, \' \',p.segundoNombre, \' \', p.primerApellido, \' \', p.segundoApellido) nombre, p.cedula, m.fecha, m.porteria, m.tipo, m.placa from movimiento m inner join persona_movimiento pm on m.id = pm.idMovimiento inner join persona p on pm.cedulaPersona = p.cedula;')
      if (movimientos.length === 0) {
        return { msg: 'No hay movimientos Registrados' }
      }
      return movimientos
    } catch (e) {
      return { err: 'Error obteniendo Empleados' }
    }
  }

  static async getById ({ id }) {
    try {
      const [Movimiento] = await connection.query('select m.id, concat(p.primerNombre, \' \',p.segundoNombre, \' \', p.primerApellido, \' \', p.segundoApellido) nombre, p.cedula, m.fecha, m.porteria, m.tipo, m.placa from movimiento m inner join persona_movimiento pm on m.id = pm.idMovimiento inner join persona p on pm.cedulaPersona = p.cedula where m.id = ?;', [id])
      if (Movimiento.length === 0) {
        return {
          typeErr: 1,
          err: 'Movimiento no Registrada'
        }
      }
      return Movimiento
    } catch (error) {
      return {
        typeErr: 0,
        err: 'Error Buscando Movimiento'
      }
    }
  }

  static async create ({ data }) {
    try {
      const { cedulaPersona, porteria, tipo, placa } = data
      const fecha = nuevaHora()
      await connection.query('insert into movimiento (fecha, porteria, tipo, placa) values(?, ?, ?, ?);', [fecha, porteria, tipo, placa])
      const [movimiento] = await connection.query('select * from movimiento where fecha = ?;', [fecha])
      await connection.query('insert into persona_movimiento (cedulaPersona, idMovimiento) values(?, ?)', [cedulaPersona, movimiento[0].id])
      return { msg: 'Movimiento registrado con exito' }
    } catch (error) {
      return { err: 'Error creando Movimiento' }
    }
  }

  static async delete ({ id }) {
    try {
      const movimiento = await this.getById({ id })
      if (movimiento.err) {
        return { err: 'Movimiento no está Registrado' }
      } else {
        await connection.query('delete from persona_movimiento where idMovimiento = ?', [id])
        await connection.query('delete from movimiento where id = ?', [id])
        return { msg: 'Movimiento eliminado con exito' }
      }
    } catch (error) {
      return {
        err: 'error eliminando Movimiento',
        mgs: error.message
      }
    }
  }

  static async update ({ id, data }) {
    try {
      const movimiento = await this.getById({ id })
      if (movimiento.err) {
        return { err: 'movimiento no está registrado' }
      } else {
        const usuarioAct = { ...movimiento[0], ...data }
        const { fecha, porteria, tipo, placa } = usuarioAct
        await connection.query('update movimiento set fecha = ?, porteria = ?, tipo = ?, placa = ? where id = ?;', [fecha, porteria, tipo, placa, id])
        return { msg: 'movimiento actualizado con exito' }
      }
    } catch (error) {
      return {
        err: 'Error actualizando movimiento',
        msg: error.message
      }
    }
  }
}

function nuevaHora () {
  const fechaYHoraActual = new Date()

  const año = fechaYHoraActual.getFullYear()
  const mes = agregarCeroDelante(fechaYHoraActual.getMonth() + 1)
  const dia = agregarCeroDelante(fechaYHoraActual.getDate())

  const horas = agregarCeroDelante(fechaYHoraActual.getHours())
  const minutos = agregarCeroDelante(fechaYHoraActual.getMinutes())
  const segundos = agregarCeroDelante(fechaYHoraActual.getSeconds())

  return año + '-' + mes + '-' + dia + ' ' + horas + ':' + minutos + ':' + segundos
}

// Función para agregar un cero delante si el número es menor que 10
function agregarCeroDelante (numero) {
  return numero < 10 ? '0' + numero : numero
}
