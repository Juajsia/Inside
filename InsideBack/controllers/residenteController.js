import { validateParcialResidente, validateResidente } from '../schemas/residenteShema.js'

export class ResidenteController {
  constructor ({ ResidenteModel }) {
    this.ResidenteModel = ResidenteModel
  }

  getAll = async (req, res) => {
    const residente = await this.ResidenteModel.getAll()
    res.json(residente)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const residente = await this.ResidenteModel.getById({ id })
    if (residente.err) {
      res.status(404).json(residente)
    } else {
      res.json(residente)
    }
  }

  create = async (req, res) => {
    const result = validateResidente(req.body)

    if (result.error) {
      res.status(400).json({ err: JSON.parse(result.error.message) })
    } else {
      // console.log(result.data)
      const Residente = await this.ResidenteModel.create({ data: result.data })
      if (Residente.err) {
        res.status(400).json(Residente)
      } else {
        res.json(Residente)
      }
    }
  }

  delete = async (req, res) => {
    const { id } = req.params
    const Residente = await this.ResidenteModel.delete({ id })
    if (Residente.err) {
      res.status(400).json(Residente)
    } else {
      res.json(Residente)
    }
  }

  update = async (req, res) => {
    const result = validateParcialResidente(req.body)

    if (result.error) {
      res.status(400).json({ err: JSON.parse(result.error.message) })
    } else {
      const { id } = req.params
      const updatedResidente = await this.ResidenteModel.update({ id, data: result.data })

      if (updatedResidente.err) {
        res.status(400).json(updatedResidente)
      } else {
        res.json(updatedResidente)
      }
    }
  }
}
