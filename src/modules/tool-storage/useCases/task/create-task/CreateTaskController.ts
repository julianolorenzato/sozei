import { CreateTaskUseCase } from './CreateTaskUseCase'
import { Request, Response } from 'express'
import { ITaskDTO } from '../../../dtos/ITaskDTO'

export class CreateTaskController {
	constructor(private createTaskUseCase: CreateTaskUseCase) {}

	async handle(req: Request, res: Response) {
		const { name, details, toolsId, userId } = req.body
		console.log(req.body)
		try {
			const result = await this.createTaskUseCase.execute({
				name,
				details,
				toolsId,
				userId
			})

			if (result.isLeft()) {
				const error = result.value.message
				return res.status(400).json({ error })
			}

			const response: ITaskDTO = {
				id: result.value.id,
				name: result.value.name,
				details: result.value.details,
				tools: result.value.tools.map(tool => ({
					id: tool.id,
					title: tool.title,
					link: tool.link,
					description: tool.description,
					tags: tool.tags
				})),
				owner: {
					id: result.value.owner.id,
					email: result.value.owner.email.value,
					username: result.value.owner.username.value
				}
			}

			return res.status(201).json(response)
		} catch (e) {
			console.log(e)
			if (e instanceof Error)
				return res.status(500).json({ error: e.message })

			return res.status(500).json({ error: 'Unexpected error' })
		}
	}
}
