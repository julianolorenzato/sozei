import { Either, left, right } from '../../../../shared/logic/Either'
import { JWT } from '../../entities/user/JWT'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { InvalidEmailOrPasswordError } from './errors/InvalidEmailOrPasswordError'

type TokenResponse = {
	token: string
}

type UseCaseResponse = Either<Error, TokenResponse>
type UseCaseRequest = {
	email: string
	password: string
}

export class AuthenticateUserUseCase {
	private readonly usersRepository: IUsersRepository

	constructor(usersRepo: IUsersRepository) {
		this.usersRepository = usersRepo
	}

	async execute({
		email,
		password
	}: UseCaseRequest): Promise<UseCaseResponse> {
		const user = await this.usersRepository.findByEmail(email)

		if (!user) {
			return left(new InvalidEmailOrPasswordError())
		}

		const isPasswordValid = await user.password.comparePassword(password)

		if (!isPasswordValid) {
			return left(new InvalidEmailOrPasswordError())
		}

		const { token } = JWT.signUser(user)

		return right({ token })
	}
}
