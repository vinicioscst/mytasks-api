import { Router, Request, Response } from 'express'
import { UserController } from '../controllers/UserController'
import { authMiddleware } from '../middlewares/authMiddleware'
import { permissionMiddleware } from '../middlewares/permissionMiddleware'

export const usersRoutes: Router = Router()
const userController = new UserController()

usersRoutes.use('/:id', authMiddleware, permissionMiddleware)

usersRoutes.post('', (req: Request, res: Response) =>
  userController.createUser(req, res)
)
usersRoutes.get('/:id', (req: Request, res: Response) =>
  userController.readUser(req, res)
)
usersRoutes.patch('/:id', (req: Request, res: Response) =>
  userController.updateUser(req, res)
)
usersRoutes.delete('/:id', (req: Request, res: Response) =>
  userController.deleteUser(req, res)
)
