import { CreateToolUseCase } from './CreateToolUseCase'
import { Request, Response } from 'express'
import { IToolDTO } from '../../../dtos/IToolDTO'

export class CreateToolController {
	constructor(private createToolUseCase: CreateToolUseCase) {}

	async handle(req: Request, res: Response) {
		const { title, link, description, tags } = req.body

		try {
			const result = await this.createToolUseCase.execute({
				title,
				link,
				description,
				tags
			})

			if (result.isLeft()) {
				const error = result.value.message
				return res.status(400).json({ error })
			}

			const response: IToolDTO = {
				id: result.value.id,
				title: result.value.title,
				link: result.value.link,
				description: result.value.description,
				tags: result.value.tags
			}

			return res.status(201).json(response)
		} catch (e) {
			if (e instanceof Error)
				return res.status(500).json({ error: e.message })

			return res.status(500).json({ error: 'Unexpected error' })
		}
	}
}
