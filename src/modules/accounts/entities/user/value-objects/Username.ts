import { Either, right, left } from '../../../../../shared/logic/Either'
import { InvalidLengthError } from '../../../errors/InvalidLengthError'

export class Username {
	private readonly username

	private constructor(username: string) {
		this.username = username.trim().toLocaleLowerCase()
	}

	get value(): string {
		return this.username
	}

	static validate(username: string): boolean {
		if (username.length > 20 || username.length < 3) {
			return false
		}
		return true
	}

	static create(username: string): Either<Error, Username> {
		if (!this.validate(username)) {
			return left(new InvalidLengthError('username', username))
		}

		return right(new Username(username))
	}
}
