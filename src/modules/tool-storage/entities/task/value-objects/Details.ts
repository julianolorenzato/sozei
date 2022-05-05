import { Either, left, right } from '../../../../../shared/logic/Either'
import { InvalidLengthError } from '../../../errors/InvalidLengthError'

export class Details {
	private details: string

	private constructor(details: string) {
		this.details = details.trim()
	}

	get value() {
		return this.details
	}

	static validate(details: string) {
		if (details.length < 10 || details.length > 250) {
			return false
		}

		return true
	}

	static create(details: string): Either<Error, Details> {
		const valid = this.validate(details)
		if (!valid) {
			return left(new InvalidLengthError('details', details))
		}

		return right(new Details(details))
	}
}
