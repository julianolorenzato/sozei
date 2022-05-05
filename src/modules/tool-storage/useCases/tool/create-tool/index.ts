import { TypeORMToolsRepository } from '../../../repositories/typeorm/TypeORMToolsRepository'
import { CreateToolUseCase } from './CreateToolUseCase'
import { CreateToolController } from './CreateToolController'

export function createToolController() {
	const repository = new TypeORMToolsRepository()
	const useCase = new CreateToolUseCase(repository)
	const controller = new CreateToolController(useCase)

	return controller
}
