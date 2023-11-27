import { validateEmpleado, validateParcialEmpleado } from '../schemas/empeladoSchema.js'

export class EmpeladoController {
  constructor ({ EmpleadoModel }) {
    this.EmpleadoModel = EmpleadoModel
  }

  getAll = async (req, res) => {
    const empleados = await this.EmpleadoModel.getAll()
    res.json(empleados)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const empelado = await this.EmpleadoModel.getById({ id })
    if (empelado.err) {
      res.status(404).json(empelado)
    } else {
      res.json(empelado)
    }
  }

  create = async (req, res) => {
    const result = validateEmpleado(req.body)

    if (result.error) {
      res.status(400).json({ err: JSON.parse(result.error.message) })
    } else {
      // console.log(result.data)
      const empelado = await this.EmpleadoModel.create({ data: result.data })
      if (empelado.err) {
        res.status(400).json(empelado)
      } else {
        res.json(empelado)
      }
    }
  }

  delete = async (req, res) => {
    const { id } = req.params
    const empelado = await this.EmpleadoModel.delete({ id })
    if (empelado.err) {
      res.status(400).json(empelado)
    } else {
      res.json(empelado)
    }
  }

  update = async (req, res) => {
    const result = validateParcialEmpleado(req.body)

    if (result.error) {
      res.status(400).json({ err: JSON.parse(result.error.message) })
    } else {
      const { id } = req.params
      const updatedEmpleado = await this.EmpleadoModel.update({ id, data: result.data })

      if (updatedEmpleado.err) {
        res.status(400).json(updatedEmpleado)
      } else {
        res.json(updatedEmpleado)
      }
    }
  }
}
