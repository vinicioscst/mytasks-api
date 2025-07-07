import { Router, Request, Response } from 'express'
import { AuthController } from '../controllers/AuthController'

export const authRoute: Router = Router()
const authController = new AuthController()

authRoute.post('', (req: Request, res: Response) =>
  authController.login(req, res)
)
