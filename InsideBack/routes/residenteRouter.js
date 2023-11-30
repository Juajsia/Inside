import { Router } from 'express'
import { ResidenteController } from '../controllers/residenteController.js'

export function createResidenteRouter ({ ResidenteModel }) {
  const residenteRouter = Router()

  const residenteController = new ResidenteController({ ResidenteModel })

  residenteRouter.get('/', residenteController.getAll)
  residenteRouter.get('/:id', residenteController.getById)
  residenteRouter.post('/', residenteController.create)
  residenteRouter.patch('/:id', residenteController.update)
  residenteRouter.delete('/:id', residenteController.delete)

  return residenteRouter
}
