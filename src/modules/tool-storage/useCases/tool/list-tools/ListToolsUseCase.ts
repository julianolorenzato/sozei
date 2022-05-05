import { IToolsRepository } from '../../../repositories/IToolsRepository'

import { Tool } from '../../../entities/tool/Tool'

type UseCaseResponse = Promise<Tool[]>

export class ListToolsUseCase {
	private readonly toolsRepository: IToolsRepository

	constructor(toolsRepo: IToolsRepository) {
		this.toolsRepository = toolsRepo
	}

	async execute(tag?: string): Promise<UseCaseResponse> {
		let tools: Tool[]

		if (tag) {
			tools = await this.toolsRepository.findByTag(tag)
		} else {
			tools = await this.toolsRepository.findAll()
		}

		return tools
	}
}
