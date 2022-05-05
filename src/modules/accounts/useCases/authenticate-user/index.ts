import { TypeORMUsersRepository } from '../../repositories/typeorm/TypeORMUsersRepository'
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'
import { AuthenticateUserController } from './AuthenticateUserController'

export function authenticateUserController() {
	const repository = new TypeORMUsersRepository()
	const useCase = new AuthenticateUserUseCase(repository)
	const controller = new AuthenticateUserController(useCase)

	return controller
}
