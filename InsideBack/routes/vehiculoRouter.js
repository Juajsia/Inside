import { Router } from 'express'
import { VehiculoController } from '../controllers/vehiculoController.js'

export function createVehiculoRouter ({ VehiculoModel }) {
  const vehiculoRouter = Router()

  const vehiculoControler = new VehiculoController({ VehiculoModel })

  vehiculoRouter.get('/', vehiculoControler.getAll)
  vehiculoRouter.get('/:id', vehiculoControler.getById)
  vehiculoRouter.post('/', vehiculoControler.create)
  vehiculoRouter.patch('/:id', vehiculoControler.update)
  vehiculoRouter.delete('/:id', vehiculoControler.delete)

  return vehiculoRouter
}
