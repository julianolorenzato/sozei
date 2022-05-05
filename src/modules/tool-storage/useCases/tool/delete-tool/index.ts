import { TypeORMToolsRepository } from '../../../repositories/typeorm/TypeORMToolsRepository'
import { DeleteToolUseCase } from './DeleteToolUseCase'
import { DeleteToolController } from './DeleteToolController'

export function deleteToolController() {
	const repository = new TypeORMToolsRepository()
	const useCase = new DeleteToolUseCase(repository)
	const controller = new DeleteToolController(useCase)

	return controller
}
