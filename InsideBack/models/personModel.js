import mysql from 'mysql2/promise'
import bcrypt from 'bcrypt'

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

export class PersonModel {
  static async getAll () {
    try {
      const [persona] = await connection.query('select * from persona;')
      if (persona.length === 0) {
        return { msg: 'No hay Personas Registradas' }
      }
      return persona
    } catch (e) {
      return { err: 'Error obteniendo Personas' }
    }
  }

  static async getById ({ id }) {
    try {
      const [personas] = await connection.query('select * from Persona where cedula = ?;', [id])
      if (personas.length === 0) {
        return {
          typeErr: 1,
          err: 'Cedula no Registrada'
        }
      }
      return personas
    } catch (error) {
      return {
        typeErr: 0,
        err: 'Error Buscando Persona'
      }
    }
  }

  static async create ({ data }) {
    try {
      const { cedula } = data
      const person = await this.getById({ id: cedula })
      if (person.length > 0) {
        return { err: 'usuario ya registrado' }
      } else {
        const { correo, contrasenia, primerNombre, segundoNombre, primerApellido, segundoApellido, telefono, rol } = data
        const password = await bcrypt.hash(contrasenia, 12)
        await connection.query('insert into Persona Values(?, ?, ?, ?, ?, ?, ?, ?, ?)', [cedula, correo, password, primerNombre, segundoNombre, primerApellido, segundoApellido, telefono, rol])
        return { msg: `usuario ${primerNombre} registrado con exito` }
      }
    } catch (error) {
      return { err: 'Error creando Persona' }
    }
  }

  static async delete ({ id }) {
    try {
      const persona = await this.getById({ id })
      if (persona.err) {
        return { err: 'Persona no está Registrada' }
      } else {
        await connection.query('delete from Persona where cedula = ?', [id])
        return { msg: 'Peronsa eliminada con exito' }
      }
    } catch (error) {
      return {
        err: 'error eliminando Peronsa',
        mgs: error.message
      }
    }
  }

  static async update ({ id, data }) {
    try {
      const person = await this.getById({ id })
      if (person.err) {
        return { err: 'usuario no está registrado' }
      } else {
        const usuarioAct = { ...person[0], ...data }
        const { correo, contrasenia, primerNombre, segundoNombre, primerApellido, segundoApellido, telefono, rol } = usuarioAct
        const password = await bcrypt.hash(contrasenia, 12)
        await connection.query('update Persona set correo = ?, contrasenia = ?, primerNombre = ?, segundoNombre = ?, primerApellido = ?, segundoApellido = ?, telefono = ?, rol = ? where cedula = ?;', [correo, password, primerNombre, segundoNombre, primerApellido, segundoApellido, telefono, rol, id])
        return { msg: 'usuario actualizado con exito' }
      }
    } catch (error) {
      return {
        err: 'Error actualizando Persona',
        msg: error.message
      }
    }
  }
}
