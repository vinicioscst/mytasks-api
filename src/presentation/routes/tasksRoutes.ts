import { Router, Request, Response } from 'express'
import { authMiddleware } from '../middlewares/authMiddleware'
import { permissionMiddleware } from '../middlewares/permissionMiddleware'
import { TaskController } from '../controllers/TaskController'

export const tasksRoutes: Router = Router()
const taskController = new TaskController()

tasksRoutes.use('', authMiddleware)
tasksRoutes.post('', (req: Request, res: Response) =>
  taskController.createTask(req, res)
)
tasksRoutes.delete('/completed', (req: Request, res: Response) =>
  taskController.deleteCompletedTasks(req, res)
)

tasksRoutes.use('/:id', permissionMiddleware)
tasksRoutes.patch('/:id', (req: Request, res: Response) =>
  taskController.updateTask(req, res)
)
tasksRoutes.delete('/:id', (req: Request, res: Response) =>
  taskController.deleteTask(req, res)
)
