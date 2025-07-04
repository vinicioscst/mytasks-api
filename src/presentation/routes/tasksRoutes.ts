import { Router } from 'express'

const tasksRoutes: Router = Router()

tasksRoutes.get('')
tasksRoutes.post('')
tasksRoutes.get('/:id')
tasksRoutes.put('/:id')
tasksRoutes.delete('/:id')

export { tasksRoutes }
