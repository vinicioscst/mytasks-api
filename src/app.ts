import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, {
  type NextFunction,
  type Request,
  type Response
} from 'express'
import { serve, setup } from 'swagger-ui-express'
import { errorHandlerMiddleware } from './presentation/middlewares/errorHandlerMiddleware'
import { responseInterceptorMiddleware } from './presentation/middlewares/responseInterceptor.middleware'
import { authRoute } from './presentation/routes/authRoute'
import { tasksRoutes } from './presentation/routes/tasksRoutes'
import { usersRoutes } from './presentation/routes/usersRoutes'
import { env } from './shared/config/env'
import swaggerConfig from './shared/config/swagger.json'

export const app = express()

app.use(
  cors({
    origin: env.APP_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    preflightContinue: false,
    optionsSuccessStatus: 204
  })
)
app.use(express.json())
app.use(cookieParser())

app.use(responseInterceptorMiddleware)

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
