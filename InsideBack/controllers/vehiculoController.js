import { validateParcialVehiculo, validateVehiculo } from '../schemas/vehiculoSchema.js'

export class VehiculoController {
  constructor ({ VehiculoModel }) {
    this.VehiculoModel = VehiculoModel
  }

  getAll = async (req, res) => {
    const vehiculo = await this.VehiculoModel.getAll()
    res.json(vehiculo)
  }

  getById = async (req, res) => {
    const { id } = req.params
    const vehiculo = await this.VehiculoModel.getById({ id })
    if (vehiculo.err) {
      res.status(404).json(vehiculo)
    } else {
      res.json(vehiculo)
    }
  }

  create = async (req, res) => {
    const result = validateVehiculo(req.body)

    if (result.error) {
      res.status(400).json({ err: JSON.parse(result.error.message) })
    } else {
      // console.log(result.data)
      const vehiculo = await this.VehiculoModel.create({ data: result.data })
      if (vehiculo.err) {
        res.status(400).json(vehiculo)
      } else {
        res.json(vehiculo)
      }
    }
  }

  delete = async (req, res) => {
    const { id } = req.params
    const vehiculo = await this.VehiculoModel.delete({ id })
    if (vehiculo.err) {
      res.status(400).json(vehiculo)
    } else {
      res.json(vehiculo)
    }
  }

  update = async (req, res) => {
    const result = validateParcialVehiculo(req.body)

    if (result.error) {
      res.status(400).json({ err: JSON.parse(result.error.message) })
    } else {
      const { id } = req.params
      const updatedVehiculo = await this.VehiculoModel.update({ id, data: result.data })

      if (updatedVehiculo.err) {
        res.status(400).json(updatedVehiculo)
      } else {
        res.json(updatedVehiculo)
      }
    }
  }
}
