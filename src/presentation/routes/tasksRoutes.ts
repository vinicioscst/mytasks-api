import { Router } from 'express'
import { authMiddleware } from '../middlewares/authMiddleware'
import { permissionMiddleware } from '../middlewares/permissionMiddleware'
import { TaskController } from '../controllers/TaskController'

export const tasksRoutes: Router = Router()
const taskController = new TaskController()

tasksRoutes.use('', authMiddleware, permissionMiddleware)

tasksRoutes.post('', taskController.createTask)
tasksRoutes.get('', taskController.readAllTasks)
tasksRoutes.get('/:id', taskController.readTask)
tasksRoutes.patch('/:id', taskController.updateTask)
tasksRoutes.delete('/:id', taskController.deleteTask)
