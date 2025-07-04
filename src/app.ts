import express from 'express'
import { usersRoutes } from './presentation/routes/usersRoutes'
import { tasksRoutes } from './presentation/routes/tasksRoutes'
import { sessionRoute } from './presentation/routes/sessionRoute'

export const app = express()

app.use(express.json())

app.use('/api/users', usersRoutes)
app.use('/api/session', sessionRoute)
app.use('/api/tasks', tasksRoutes)
