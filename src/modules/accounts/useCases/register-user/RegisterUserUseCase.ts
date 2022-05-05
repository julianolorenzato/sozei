import { Either, left, right } from '../../../../shared/logic/Either'

import { User } from '../../entities/user/User'
import { Username, Email, Password } from '../../entities/user/value-objects'

import { IUsersRepository } from '../../repositories/IUsersRepository'

import { AlreadyExistsError } from './errors/AlreadyExistsError'

type UseCaseResponse = Either<Error, User>
type UseCaseRequest = {
	username: string
	email: string
	password: string
}

export class RegisterUserUseCase {
	private readonly usersRepository: IUsersRepository

	constructor(usersRepo: IUsersRepository) {
		this.usersRepository = usersRepo
	}

	async execute({
		username,
		email,
		password
	}: UseCaseRequest): Promise<UseCaseResponse> {
		const usernameOrError = Username.create(username)
		if (usernameOrError.isLeft()) return left(usernameOrError.value)

		const emailOrError = Email.create(email)
		if (emailOrError.isLeft()) return left(emailOrError.value)

		const passwordOrError = Password.create(password)
		if (passwordOrError.isLeft()) return left(passwordOrError.value)

		const user = User.create({
			username: usernameOrError.value,
			email: emailOrError.value,
			password: passwordOrError.value
		})

		const usernameAlreadyExists = await this.usersRepository.findByUsername(
			user.username.value
		)

		if (usernameAlreadyExists) {
			return left(new AlreadyExistsError('username', user.username.value))
		}

		const emailAlreadyExists = await this.usersRepository.findByEmail(
			user.email.value
		)

		if (emailAlreadyExists) {
			return left(new AlreadyExistsError('email', user.email.value))
		}

		await this.usersRepository.save(user)

		return right(user)
	}
}
