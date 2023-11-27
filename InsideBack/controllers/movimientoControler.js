import { ValidateMovimiento, ValidateParcialMovimiento } from '../schemas/movimientoSchema.js'

export class MovimientoController {
  constructor ({ MovimientoModel }) {
    this.MovimientoModel = MovimientoModel
  }

  getAll = async (req, res) => {
    const Movimiento = await this.MovimientoModel.getAll()
    res.json(Movimiento)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const Movimiento = await this.MovimientoModel.getById({ id })
    if (Movimiento.err) {
      res.status(404).json(Movimiento)
    } else {
      res.json(Movimiento)
    }
  }

  create = async (req, res) => {
    const result = ValidateMovimiento(req.body)

    if (result.error) {
      res.status(400).json({ err: JSON.parse(result.error.message) })
    } else {
      // console.log(result.data)
      const Movimiento = await this.MovimientoModel.create({ data: result.data })
      if (Movimiento.err) {
        res.status(400).json(Movimiento)
      } else {
        res.json(Movimiento)
      }
    }
  }

  delete = async (req, res) => {
    const { id } = req.params
    const Movimiento = await this.MovimientoModel.delete({ id })
    if (Movimiento.err) {
      res.status(400).json(Movimiento)
    } else {
      res.json(Movimiento)
    }
  }

  update = async (req, res) => {
    const result = ValidateParcialMovimiento(req.body)

    if (result.error) {
      res.status(400).json({ err: JSON.parse(result.error.message) })
    } else {
      const { id } = req.params
      const updatedMovimiento = await this.MovimientoModel.update({ id, data: result.data })

      if (updatedMovimiento.err) {
        res.status(400).json(updatedMovimiento)
      } else {
        res.json(updatedMovimiento)
      }
    }
  }
}
