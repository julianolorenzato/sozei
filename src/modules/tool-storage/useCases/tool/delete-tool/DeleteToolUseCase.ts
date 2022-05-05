import { Either, left, right } from '../../../../../shared/logic/Either'

import { IToolsRepository } from '../../../repositories/IToolsRepository'

import { Tool } from '../../../entities/tool/Tool'

import { ToolNotFoundError } from './errors/ToolNotFoundError'

type UseCaseResponse = Promise<Either<ToolNotFoundError, Tool>>

export class DeleteToolUseCase {
	private readonly toolsRepository: IToolsRepository

	constructor(toolsRepo: IToolsRepository) {
		this.toolsRepository = toolsRepo
	}

	async execute(id: string): UseCaseResponse {
		const tool = await this.toolsRepository.findById(id)
		const found = !!tool === true

		if (!found) {
			return left(new ToolNotFoundError(id))
		}

		await this.toolsRepository.remove(tool)

		return right(tool)
	}
}
