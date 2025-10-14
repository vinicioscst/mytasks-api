import { type Request, type Response, Router } from 'express'
import { AuthController } from '../controllers/AuthController'
import { authMiddleware } from '../middlewares/authMiddleware'

export const authRoute: Router = Router()
const authController = new AuthController()

authRoute.post('', (req: Request, res: Response) =>
  authController.login(req, res)
)
authRoute.post('/logout', authMiddleware, (req: Request, res: Response) =>
  authController.logout(req, res)
)
