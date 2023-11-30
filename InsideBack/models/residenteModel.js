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

export class ResidenteModel {
  static async getAll () {
    try {
      const [residentes] = await connection.query('select concat(p.primerNombre, \' \',p.segundoNombre, \' \', p.primerApellido, \' \', p.segundoApellido) nombre, p.cedula, r.apartamento, r.torre, p.telefono from residente r inner join persona p on r.cedula = p.cedula;')
      if (residentes.length === 0) {
        return { msg: 'No hay Residentes Registrados' }
      }
      return residentes
    } catch (e) {
      return { err: 'Error obteniendo Residentes' }
    }
  }

  static async getById ({ id }) {
    try {
      const [Residentes] = await connection.query('select concat(p.primerNombre, \' \',p.segundoNombre, \' \', p.primerApellido, \' \', p.segundoApellido) nombre, p.cedula, r.apartamento, r.torre, p.telefono from residente r inner join persona p on r.cedula = p.cedula where r.cedula = ?;', [id])
      if (Residentes.length === 0) {
        return {
          typeErr: 1,
          err: 'Cedula no Registrada'
        }
      }
      return Residentes
    } catch (error) {
      return {
        typeErr: 0,
        err: 'Error Buscando Residente'
      }
    }
  }

  static async create ({ data }) {
    try {
      const { cedula } = data
      const residente = await this.getById({ id: cedula })
      if (residente.length > 0) {
        return { err: 'Residente ya registrado' }
      } else {
        const { apartamento, torre } = data
        await connection.query('insert into residente Values(?, ?, ?)', [cedula, apartamento, torre])
        return { msg: `Residente ${cedula} registrado con exito` }
      }
    } catch (error) {
      return { err: 'Error creando Residente' }
    }
  }

  static async delete ({ id }) {
    try {
      const residente = await this.getById({ id })
      if (residente.err) {
        return { err: 'residente no está Registrado' }
      } else {
        await connection.query('delete from residente where cedula = ?', [id])
        return { msg: 'residente eliminado con exito' }
      }
    } catch (error) {
      return {
        err: 'error eliminando residente',
        mgs: error.message
      }
    }
  }

  static async update ({ id, data }) {
    try {
      const residente = await this.getById({ id })
      if (residente.err) {
        return { err: 'residente no está registrado' }
      } else {
        const usuarioAct = { ...residente[0], ...data }
        const { apartamento, torre } = usuarioAct
        await connection.query('update residente set apartamento = ?, torre = ? where cedula = ?;', [apartamento, torre, id])
        return { msg: 'residente actualizado con exito' }
      }
    } catch (error) {
      return {
        err: 'Error actualizando residente',
        msg: error.message
      }
    }
  }
}
