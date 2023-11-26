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

export class EmpleadoModel {
  static async getAll () {
    try {
      const [empleados] = await connection.query('select * from empleado;')
      if (empleados.length === 0) {
        return { msg: 'No hay Empelados Registrados' }
      }
      return empleados
    } catch (e) {
      return { err: 'Error obteniendo Empleados' }
    }
  }

  static async getById ({ id }) {
    try {
      const [empleado] = await connection.query('select * from empleado where cedula = ?;', [id])
      if (empleado.length === 0) {
        return {
          typeErr: 1,
          err: 'Cedula no Registrada'
        }
      }
      return empleado
    } catch (error) {
      return {
        typeErr: 0,
        err: 'Error Buscando Empleado'
      }
    }
  }

  static async create ({ data }) {
    try {
      const { cedula } = data
      const empelado = await this.getById({ id: cedula })
      if (empelado.length > 0) {
        return { err: 'Empleado ya registrado' }
      } else {
        const { rol, observaciones, direccion } = data
        await connection.query('insert into empleado Values(?, ?, ?, ?)', [cedula, rol, observaciones, direccion])
        return { msg: `Empleado ${cedula} registrado con exito` }
      }
    } catch (error) {
      return { err: 'Error creando Empleado' }
    }
  }

  static async delete ({ id }) {
    try {
      const empleado = await this.getById({ id })
      if (empleado.err) {
        return { err: 'Empleado no está Registrado' }
      } else {
        await connection.query('delete from empleado where cedula = ?', [id])
        return { msg: 'Empleado eliminado con exito' }
      }
    } catch (error) {
      return {
        err: 'error eliminando empleado',
        mgs: error.message
      }
    }
  }

  static async update ({ id, data }) {
    try {
      const empelado = await this.getById({ id })
      if (empelado.err) {
        return { err: 'Empleado no está registrado' }
      } else {
        const usuarioAct = { ...empelado[0], ...data }
        const { rol, observaciones, direccion } = usuarioAct
        await connection.query('update empleado set rol = ?, observaciones = ?, direccion = ? where cedula = ?;', [rol, observaciones, direccion, id])
        return { msg: 'Empleado actualizado con exito' }
      }
    } catch (error) {
      return {
        err: 'Error actualizando Empleado',
        msg: error.message
      }
    }
  }
}
