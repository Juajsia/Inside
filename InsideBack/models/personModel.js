import mysql from 'mysql2/promise'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

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
      return { err: 'Error creando Persona', msg: error.message }
    }
  }

  static async delete ({ id }) {
    try {
      const persona = await this.getById({ id })
      if (persona.err) {
        return { err: 'Persona no está Registrada' }
      } else {
        await connection.query('delete from Persona where cedula = ?', [id])
        return { msg: 'Persona eliminada con exito' }
      }
    } catch (error) {
      return {
        err: 'error eliminando Persona',
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
        const { correo, primerNombre, segundoNombre, primerApellido, segundoApellido, telefono, rol } = usuarioAct
        await connection.query('update Persona set correo = ?, primerNombre = ?, segundoNombre = ?, primerApellido = ?, segundoApellido = ?, telefono = ?, rol = ? where cedula = ?;', [correo, primerNombre, segundoNombre, primerApellido, segundoApellido, telefono, rol, id])
        return { msg: 'usuario actualizado con exito' }
      }
    } catch (error) {
      return {
        err: 'Error actualizando Persona',
        msg: error.message
      }
    }
  }

  static async login ({ data }) {
    const { correo, contrasenia } = data
    try {
      const [user] = await connection.query('select correo, contrasenia, rol, primerNombre, primerApellido from persona where correo = ?;', [correo])
      if (user.length === 0) {
        return {
          typeErr: 1,
          err: 'Error en correo/contraseña'
        }
      }
      const eq = await bcrypt.compare(contrasenia, user[0].contrasenia)
      if (!eq) {
        return { err: 'Error en usuario/contraseña' }
      }
      const token = createToken({ data: { Usuario: correo, Rol: user[0].rol } })
      return { succes: 'Login Correcto', token, Rol: user[0].rol, Nombre: user[0].primerNombre, Apellido: user[0].primerApellido }
    } catch (error) {
      return {
        err: 'Error Iniciando Sesion',
        msg: error.message
      }
    }
  }

  static async changePassword ({ data }) {
    const { correo, contrasenia, newContrasenia } = data
    try {
      const [user] = await connection.query('select correo, contrasenia, rol, primerNombre, primerApellido from persona where correo = ?;', [correo])
      if (user.length === 0) {
        return {
          typeErr: 1,
          err: 'Correo No registrado'
        }
      }
      const eq = await bcrypt.compare(contrasenia, user[0].contrasenia)
      if (!eq) {
        return { err: 'error, contraseña incorrecta' }
      }
      const password = await bcrypt.hash(newContrasenia, 12)
      await connection.query('update Persona set contrasenia = ? where correo = ?;', [password, correo])
      return { msg: 'Contraseña Actualizada con Exito!!' }
    } catch (error) {
      return {
        err: 'Error Actualizando Sesion',
        msg: error.message
      }
    }
  }
}

function createToken ({ data }) {
  const payLoad = {
    Usuario: data.Usuario,
    Rol: data.Rol
  }
  return jwt.sign(payLoad, process.env.SECRET_KEY)
}
