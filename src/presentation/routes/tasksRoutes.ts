import { Router } from 'express'
import { authMiddleware } from '../middlewares/authMiddleware'
import { permissionMiddleware } from '../middlewares/permissionMiddleware'
import { TaskController } from '../controllers/TaskController'

export const tasksRoutes: Router = Router()
const taskController = new TaskController()

tasksRoutes.use('', authMiddleware, permissionMiddleware)

tasksRoutes.post('', taskController.createTask)
// tasksRoutes.get('')
// tasksRoutes.get('/:id')
// tasksRoutes.put('/:id')
// tasksRoutes.delete('/:id')
