import { TypeORMToolsRepository } from '../../../repositories/typeorm/TypeORMToolsRepository'
import { ListToolsUseCase } from './ListToolsUseCase'
import { ListToolsController } from './ListToolsController'

export function listToolsController() {
	const respository = new TypeORMToolsRepository()
	const useCase = new ListToolsUseCase(respository)
	const controller = new ListToolsController(useCase)

	return controller
}
