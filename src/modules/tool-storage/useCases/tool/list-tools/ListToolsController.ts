import { ListToolsUseCase } from './ListToolsUseCase'
import { Request, Response } from 'express'
import { IToolDTO } from '../../../dtos/IToolDTO'
import { Tool } from '../../../entities/tool/Tool'

export class ListToolsController {
	constructor(private listToolsUseCase: ListToolsUseCase) {}

	async handle(req: Request, res: Response) {
		const { tag } = req.query

		try {
			let result: Tool[]

			if (typeof tag === 'string') {
				result = await this.listToolsUseCase.execute(tag)
			} else {
				result = await this.listToolsUseCase.execute()
			}

			if (!result) {
				return res.status(204).json([])
			}

			const response: IToolDTO[] = result.map(tool => ({
				id: tool.id,
				title: tool.title,
				link: tool.link,
				description: tool.description,
				tags: tool.tags
			}))

			return res.status(200).json(response)
		} catch (e) {
			if (e instanceof Error)
				return res.status(500).json({ error: e.message })

			return res.status(500).json({ error: 'Unexpected error' })
		}
	}
}
