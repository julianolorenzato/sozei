import { DeleteToolUseCase } from './DeleteToolUseCase'
import { Request, Response } from 'express'
import { IToolDTO } from '../../../dtos/IToolDTO'

export class DeleteToolController {
	constructor(private deleteToolUseCase: DeleteToolUseCase) {}

	async handle(req: Request, res: Response) {
		const { id } = req.params

		try {
			const result = await this.deleteToolUseCase.execute(id)

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

			return res.status(200).json(response)
		} catch (e) {
			if (e instanceof Error)
				return res.status(500).json({ error: e.message })

			return res.status(500).json({ error: 'Unexpected error' })
		}
	}
}
