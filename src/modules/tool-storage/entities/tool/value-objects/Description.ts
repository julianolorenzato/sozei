import { Either, left, right } from '../../../../../shared/logic/Either'
import { InvalidLengthError } from '../../../errors/InvalidLengthError'

export class Description {
	private description

	private constructor(description: string) {
		this.description = description.trim()
	}

	get value() {
		return this.description
	}

	static validate(description: string) {
		if (description.length < 10 || description.length > 250) {
			return false
		}

		return true
	}

	static create(description: string): Either<Error, Description> {
		const valid = this.validate(description)
		if (!valid) {
			return left(new InvalidLengthError('description', description))
		}

		return right(new Description(description))
	}
}
