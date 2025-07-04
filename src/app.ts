import express from 'express'
import { usersRoutes } from './presentation/routes/usersRoutes'
import { tasksRoutes } from './presentation/routes/tasksRoutes'

export const app = express()

app.use(express.json())

app.use('/api/users', usersRoutes)
app.use('/api/tasks', tasksRoutes)
