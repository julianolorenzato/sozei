import { TypeORMTasksRepository } from '../../../repositories/typeorm/TypeORMTasksRepository'
import { TypeORMToolsRepository } from '../../../repositories/typeorm/TypeORMToolsRepository'
import { TypeORMUsersRepository } from '../../../../accounts/repositories/typeorm/TypeORMUsersRepository'

import { CreateTaskUseCase } from './CreateTaskUseCase'
import { CreateTaskController } from './CreateTaskController'

export function createTaskController() {
	const tasksRepository = new TypeORMTasksRepository()
	const toolsRepository = new TypeORMToolsRepository()
	const usersRepository = new TypeORMUsersRepository()

	const useCase = new CreateTaskUseCase(
		tasksRepository,
		toolsRepository,
		usersRepository
	)

	const controller = new CreateTaskController(useCase)

	return controller
}
