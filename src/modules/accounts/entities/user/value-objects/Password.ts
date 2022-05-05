import { Either, right, left } from '../../../../../shared/logic/Either'
import bcrypt from 'bcryptjs'

import { InvalidLengthError } from '../../../errors/InvalidLengthError'

export class Password {
	private readonly password: string
	private readonly hashed: boolean

	private constructor(password: string, hashed?: boolean) {
		this.password = password.trim()
		this.hashed = hashed
	}

	static validate(password: string): boolean {
		if (password.length > 40 || password.length < 7) {
			return false
		}

		return true
	}

	public async getHashedPassword(): Promise<string> {
		if (this.hashed) {
			return this.password
		}

		return await bcrypt.hash(this.password, 8)
	}

	public async comparePassword(plainTextPassword: string): Promise<boolean> {
		if (this.hashed) {
			return await bcrypt.compare(plainTextPassword, this.password)
		}

		return plainTextPassword === this.password
	}

	static create(password: string, hashed = false): Either<Error, Password> {
		if (!hashed && !this.validate(password)) {
			return left(new InvalidLengthError('password'))
		}

		return right(new Password(password, hashed))
	}
}
