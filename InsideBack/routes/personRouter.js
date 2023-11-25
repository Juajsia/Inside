import { Router } from 'express'
import { PersonController } from '../controllers/personController.js'

export function createPersonRouter ({ PersonModel }) {
  const personRouter = Router()

  const personController = new PersonController({ PersonModel })

  personRouter.get('/', personController.getAll)
  personRouter.get('/:id', personController.getById)
  personRouter.post('/', personController.create)
  personRouter.patch('/:id', personController.update)
  personRouter.delete('/:id', personController.delete)
  return personRouter
}
