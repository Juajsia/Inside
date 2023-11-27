import { Router } from 'express'
import { EmpeladoController } from '../controllers/empleadoController.js'

export function createEmpleadoRouter ({ EmpleadoModel }) {
  const empeladoRouter = Router()

  const empleadoController = new EmpeladoController({ EmpleadoModel })

  empeladoRouter.get('/', empleadoController.getAll)
  empeladoRouter.get('/:id', empleadoController.getById)
  empeladoRouter.post('/', empleadoController.create)
  empeladoRouter.patch('/:id', empleadoController.update)
  empeladoRouter.delete('/:id', empleadoController.delete)

  return empeladoRouter
}
