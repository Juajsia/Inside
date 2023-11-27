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

export class VehiculoModel {
  static async getAll () {
    try {
      const [vehiculo] = await connection.query('select * from vehiculo;')
      if (vehiculo.length === 0) {
        return { msg: 'No hay Vehiculos Registrados' }
      }
      return vehiculo
    } catch (e) {
      return { err: 'Error buscando Vehiculos' }
    }
  }

  static async getById ({ id }) {
    try {
      const [vehiculo] = await connection.query('select * from vehiculo where placa = ?;', [id])
      if (vehiculo.length === 0) {
        return {
          typeErr: 1,
          err: 'Placa no Registrada'
        }
      }
      return vehiculo
    } catch (error) {
      return {
        typeErr: 0,
        err: 'Error Buscando Vehiculos'
      }
    }
  }

  static async create ({ data }) {
    try {
      const { placa } = data
      const vehiculo = await this.getById({ id: placa })
      if (vehiculo.length > 0) {
        return { err: 'Vehiculo ya registrado' }
      } else {
        const { cedulaDuenio } = data
        await connection.query('insert into vehiculo Values(?, ?)', [placa, cedulaDuenio])
        return { msg: `Vehiculo ${placa} registrado con exito` }
      }
    } catch (error) {
      return { err: 'Error creando vehiculo' }
    }
  }

  static async delete ({ id }) {
    try {
      const vehiculo = await this.getById({ id })
      if (vehiculo.err) {
        return { err: 'vehiculo no está Registrado' }
      } else {
        await connection.query('delete from vehiculo where placa = ?', [id])
        return { msg: 'vehiculo eliminado con exito' }
      }
    } catch (error) {
      return {
        err: 'error eliminando vehiculo',
        mgs: error.message
      }
    }
  }

  static async update ({ id, data }) {
    try {
      const vehiculo = await this.getById({ id })
      if (vehiculo.err) {
        return { err: 'vehiculo no está registrado' }
      } else {
        const usuarioAct = { ...vehiculo[0], ...data }
        const { cedulaDuenio } = usuarioAct
        await connection.query('update vehiculo cedulaDuenio = ? where placa = ?;', [cedulaDuenio, id])
        return { msg: 'vehiculo actualizado con exito' }
      }
    } catch (error) {
      return {
        err: 'Error actualizando vehiculo',
        msg: error.message
      }
    }
  }
}
