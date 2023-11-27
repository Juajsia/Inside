/* eslint-disable camelcase */
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

export class NoticiaModel {
  static async getAll () {
    try {
      const [noticias] = await connection.query('select * from noticia;')

      if (noticias.length === 0) {
        return { msg: 'No hay noticias Registradas' }
      }
      return noticias
    } catch (e) {
      return { err: 'Error obteniendo las noticias' }
    }
  }

  static async getById ({ id }) {
    try {
      const [noticias] = await connection.query('select * from noticia where id = ?;', [id])
      if (noticias.length === 0) {
        return {
          typeErr: 1,
          err: 'noticia no Registrada'
        }
      }
      return noticias
    } catch (error) {
      return {
        typeErr: 0,
        err: 'Error Buscando noticia'
      }
    }
  }

  static async create ({ data }) {
    try {
      const { titulo, linkImg, descripcion } = data
      await connection.query('insert into noticia (titulo, linkImg, descripcion, fechaPublicacion) values(?, ?, ?, (select NOW()));', [titulo, linkImg, descripcion])
      return { msg: `noticia ${titulo} registrada con exito` }
    } catch (error) {
      return { err: 'Error creando noticia' }
    }
  }

  static async delete ({ id }) {
    try {
      const noticia = await this.getById({ id })
      if (noticia.err) {
        return { err: 'Noticia no está Registrada' }
      } else {
        await connection.query('delete from noticia where id = ?', [id])
        return { msg: 'Noticia eliminada con exito' }
      }
    } catch (error) {
      return {
        err: 'error eliminando Noticia'
      }
    }
  }

  static async update ({ id, data }) {
    try {
      const noticia = await this.getById({ id })
      if (noticia.err) {
        return { err: 'noticia no está registrada' }
      } else {
        const noticiaAct = { ...noticia[0], ...data }
        const { titulo, linkImg, descripcion } = noticiaAct
        await connection.query('update noticia set titulo = ?, linkImg = ?, descripcion = ?;', [titulo, linkImg, descripcion])
        return { msg: 'noticia actualizado con exito' }
      }
    } catch (error) {
      return {
        err: 'Error actualizando noticia'
      }
    }
  }
}
