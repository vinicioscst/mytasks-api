import { Router, Request, Response } from 'express'
import { UserController } from '../controllers/UserController'
import { authMiddleware } from '../middlewares/authMiddleware'
import { permissionMiddleware } from '../middlewares/permissionMiddleware'

export const usersRoutes: Router = Router()
const userController = new UserController()

usersRoutes.use('/:id', authMiddleware, permissionMiddleware)

usersRoutes.post('', userController.createUser)
usersRoutes.get('/:id', userController.readUser)
// usersRoutes.patch('/:id')
// usersRoutes.delete('/:id')
