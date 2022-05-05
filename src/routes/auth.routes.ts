import { Router } from 'express'
import { authenticateUserController } from '../modules/accounts/useCases/authenticate-user'

import { registerUserController } from '../modules/accounts/useCases/register-user'

const authRouter = Router()

authRouter.post('/register', (req, res) =>
	registerUserController().handle(req, res)
)
authRouter.post('/login', (req, res) => {
	authenticateUserController().handle(req, res)
})

export { authRouter }
