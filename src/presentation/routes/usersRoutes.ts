import { Router, Request, Response } from 'express'
import { UserController } from '../controllers/UserController'
import { authMiddleware } from '../middlewares/authMiddleware'

export const usersRoutes: Router = Router()
const userController = new UserController()

usersRoutes.post('', (req: Request, res: Response) =>
  userController.createUser(req, res)
)

usersRoutes.use('', authMiddleware)

usersRoutes.get('/profile', (req: Request, res: Response) =>
  userController.readUser(req, res)
)
usersRoutes.post('/logout', (req: Request, res: Response) =>
  userController.logoutUser(req, res)
)
usersRoutes.patch('/:id', (req: Request, res: Response) =>
  userController.updateUser(req, res)
)
usersRoutes.delete('/:id', (req: Request, res: Response) =>
  userController.deleteUser(req, res)
)
