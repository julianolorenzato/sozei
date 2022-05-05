import { UserEntity } from '../../../shared/infra/typeorm/entities/UserEntity'
import { User } from '../entities/user/User'
import { Username, Email, Password } from '../entities/user/value-objects'

export class UserMapper {
	static toDomain(raw: UserEntity): User {
		const usernameOrError = Username.create(raw.username)
		if (usernameOrError.isLeft()) {
			throw new Error('Username is invalid')
		}

		const emailOrError = Email.create(raw.email)
		if (emailOrError.isLeft()) {
			throw new Error('Email is invalid')
		}

		const passwordOrError = Password.create(raw.password, true)
		if (passwordOrError.isLeft()) {
			throw new Error('Password is invalid')
		}

		const userOrError = User.create(
			{
				username: usernameOrError.value,
				email: emailOrError.value,
				password: passwordOrError.value
			},
			raw._id
		)

		return userOrError
	}

	static async toPersistence(user: User): Promise<UserEntity> {
		return {
			_id: user.id,
			username: user.username.value,
			email: user.email.value,
			password: await user.password.getHashedPassword()
		}
	}
}
