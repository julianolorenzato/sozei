import { Either, left, right } from '../../../../../shared/logic/Either'
import { InvalidLengthError } from '../../../errors/InvalidLengthError'

export class Name {
	private name: string

	private constructor(name: string) {
		this.name = name.trim()
	}

	get value() {
		return this.name
	}

	static validate(name: string) {
		if (name.length < 3 || name.length > 40) {
			return false
		}

		return true
	}

	static create(name: string): Either<Error, Name> {
		const valid = this.validate(name)
		if (!valid) {
			return left(new InvalidLengthError('name', name))
		}

		return right(new Name(name))
	}
}
