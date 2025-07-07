import express, { Request, Response, NextFunction } from 'express'
import { usersRoutes } from './presentation/routes/usersRoutes'
import { tasksRoutes } from './presentation/routes/tasksRoutes'
import { authRoute } from './presentation/routes/authRoute'
import { errorHandlerMiddleware } from './presentation/middlewares/errorHandlerMiddleware'

export const app = express()

app.use(express.json())

app.use('/api/users', usersRoutes)
app.use('/api/auth', authRoute)
app.use('/api/tasks', tasksRoutes)

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  errorHandlerMiddleware(error, req, res, next)
})
