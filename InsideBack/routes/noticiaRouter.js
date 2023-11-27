import { Router } from 'express'
import { NoticiaController } from '../controllers/noticiaController.js'

export function createNoticiaRouter ({ NoticiaModel }) {
  const noticiaRouter = Router()

  const noticiaController = new NoticiaController({ NoticiaModel })

  noticiaRouter.get('/', noticiaController.getAll)
  noticiaRouter.get('/:id', noticiaController.getById)
  noticiaRouter.post('/', noticiaController.create)
  noticiaRouter.patch('/:id', noticiaController.update)
  noticiaRouter.delete('/:id', noticiaController.delete)
  return noticiaRouter
}
