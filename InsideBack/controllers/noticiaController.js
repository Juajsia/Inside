import { validateParcialNoticia, validateNoticia } from '../schemas/noticiaSchema.js'

export class NoticiaController {
  constructor ({ NoticiaModel }) {
    this.NoticiaModel = NoticiaModel
  }

  getAll = async (req, res) => {
    const noticia = await this.NoticiaModel.getAll()
    res.json(noticia)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const noticia = await this.NoticiaModel.getById({ id })
    if (noticia.err) {
      res.status(404).json(noticia)
    } else {
      res.json(noticia)
    }
  }

  create = async (req, res) => {
    const result = validateNoticia(req.body)

    if (result.error) {
      res.status(400).json({ err: JSON.parse(result.error.message) })
    } else {
      const noticia = await this.NoticiaModel.create({ data: result.data })
      if (noticia.err) {
        res.status(400).json(noticia)
      } else {
        res.json(noticia)
      }
    }
  }

  delete = async (req, res) => {
    const { id } = req.params
    const noticia = await this.NoticiaModel.delete({ id })
    if (noticia.err) {
      res.status(400).json(noticia)
    } else {
      res.json(noticia)
    }
  }

  update = async (req, res) => {
    const result = validateParcialNoticia(req.body)

    if (result.error) {
      res.status(400).json({ err: JSON.parse(result.error.message) })
    } else {
      const { id } = req.params
      const updatedNoticia = await this.NoticiaModel.update({ id, data: result.data })

      if (updatedNoticia.err) {
        res.status(400).json(updatedNoticia)
      } else {
        res.json(updatedNoticia)
      }
    }
  }
}
