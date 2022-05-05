import { TypeORMUsersRepository } from '../../repositories/typeorm/TypeORMUsersRepository'
import { RegisterUserUseCase } from './RegisterUserUseCase'
import { RegisterUserController } from './RegisterUserController'

export function registerUserController() {
	const repository = new TypeORMUsersRepository()
	const useCase = new RegisterUserUseCase(repository)
	const controller = new RegisterUserController(useCase)

	return controller
}
