import { Router, Request, Response } from 'express'
import { UserController } from '../controllers/UserController'

export const usersRoutes: Router = Router()
const userController = new UserController()

usersRoutes.post('', (req: Request, res: Response) =>
  userController.createUser(req, res)
)
// usersRoutes.get('/:id')
// usersRoutes.patch('/:id')
// usersRoutes.delete('/:id')
