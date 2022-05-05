import { RegisterUserUseCase } from './RegisterUserUseCase'
import { Request, Response } from 'express'
import { IUserDTO } from '../../dtos/IUserDTO'

export class RegisterUserController {
	constructor(private registerUserUseCase: RegisterUserUseCase) {}

	async handle(req: Request, res: Response) {
		const { username, email, password } = req.body

		try {
			const result = await this.registerUserUseCase.execute({
				username,
				email,
				password
			})

			if (result.isLeft()) {
				const error = result.value.message
				return res.status(400).json({ error })
			}

			const response: IUserDTO = {
				id: result.value.id,
				username: result.value.username.value,
				email: result.value.email.value
			}

			return res.status(201).json(response)
		} catch (e) {
			if (e instanceof Error)
				return res.status(500).json({ error: e.message })

			return res.status(500).json({ error: 'Unexpected error' })
		}
	}
}
