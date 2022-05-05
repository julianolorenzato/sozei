import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'
import { Request, Response } from 'express'

export class AuthenticateUserController {
	constructor(private authenticateUserUseCase: AuthenticateUserUseCase) {}

	async handle(req: Request, res: Response) {
		const { email, password } = req.body

		try {
			const result = await this.authenticateUserUseCase.execute({
				email,
				password
			})

			if (result.isLeft()) {
				const error = result.value.message
				return res.status(400).json({ error })
			}

			const response = result.value

			return res.status(200).json(response)
		} catch (e) {
			if (e instanceof Error)
				return res.status(500).json({ error: e.message })

			return res.status(500).json({ error: 'Unexpected error' })
		}
	}
}
