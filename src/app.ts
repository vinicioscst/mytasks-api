import express, { Request, Response, NextFunction } from 'express'
import { usersRoutes } from './presentation/routes/usersRoutes'
import { tasksRoutes } from './presentation/routes/tasksRoutes'
import { authRoute } from './presentation/routes/authRoute'
import { errorHandlerMiddleware } from './presentation/middlewares/errorHandlerMiddleware'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { serve, setup } from 'swagger-ui-express'
import swaggerConfig from './shared/config/swagger.json'

export const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
  })
)

app.use(
  '/api/docs',
  serve,
  setup(swaggerConfig, {
    customSiteTitle: 'My Tasks - Documentação da API',
    swaggerOptions: {
      supportedSubmitMethods: []
    }
  })
)
app.use('/api/users', usersRoutes)
app.use('/api/auth', authRoute)
app.use('/api/tasks', tasksRoutes)

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  errorHandlerMiddleware(error, req, res, next)
})
