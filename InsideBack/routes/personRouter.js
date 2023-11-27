import { Router } from 'express'
import { PersonController } from '../controllers/personController.js'
import { validateToken } from '../middlewares/validateToken.js'
import { validateRolToken } from '../middlewares/validateRolToken.js'

export function createPersonRouter ({ PersonModel }) {
  const personRouter = Router()

  const personController = new PersonController({ PersonModel })

  personRouter.get('/', validateToken, validateRolToken(['Administrador', 'Vigilante']), personController.getAll)
  personRouter.get('/:id', validateToken, validateRolToken(['Administrador', 'Vigilante']), personController.getById)
  personRouter.post('/', validateToken, validateRolToken(['Administrador', 'Vigilante']), personController.create)
  personRouter.patch('/:id', validateToken, validateRolToken(['Administrador', 'Vigilante']), personController.update)
  personRouter.delete('/:id', validateToken, validateRolToken(['Administrador', 'Vigilante']), personController.delete)

  personRouter.post('/login', personController.login)
  return personRouter
}
