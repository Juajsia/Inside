import { Router } from 'express'
import { MovimientoController } from '../controllers/movimientoControler.js'

export function createMovimientoRouter ({ MovimientoModel }) {
  const movimientorouter = Router()

  const movimientoController = new MovimientoController({ MovimientoModel })

  movimientorouter.get('/', movimientoController.getAll)
  movimientorouter.get('/:id', movimientoController.getById)
  movimientorouter.post('/', movimientoController.create)
  movimientorouter.patch('/:id', movimientoController.update)
  movimientorouter.delete('/:id', movimientoController.delete)

  return movimientorouter
}
