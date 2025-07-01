import express from 'express'
import { usersRoutes } from './interfaces/http/routes/users.routes'
import { tasksRoutes } from './interfaces/http/routes/tasks.routes'

export const app = express()

app.use(express.json())

app.use('/api/users', usersRoutes)
app.use('/api/tasks', tasksRoutes)
