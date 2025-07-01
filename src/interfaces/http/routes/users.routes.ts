import { Router } from 'express'

const usersRoutes: Router = Router()

usersRoutes.post('')
usersRoutes.post('/login')
usersRoutes.get('/:id')
usersRoutes.patch('/:id')
usersRoutes.delete('/:id')

export { usersRoutes }
