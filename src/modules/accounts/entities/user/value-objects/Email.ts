import { Either, right, left } from '../../../../../shared/logic/Either'
import { InvalidLengthError } from '../../../errors/InvalidLengthError'
import { InvalidEmailFormatError } from '../../../errors/InvalidEmailFormatError'

export class Email {
	private readonly email

	private constructor(email: string) {
		this.email = email.trim().toLowerCase()
	}

	get value(): string {
		return this.email
	}

	private static validateFormat(email: string) {
		const re =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		return re.test(email)
	}

	private static validate(email: string) {
		if (email.length > 255) {
			return false
		}

		return true
	}

	static create(email: string): Either<Error, Email> {
		if (!this.validateFormat(email)) {
			return left(new InvalidEmailFormatError(email))
		} else if (!this.validate(email)) {
			return left(new InvalidLengthError('email', email))
		}

		return right(new Email(email))
	}
}
