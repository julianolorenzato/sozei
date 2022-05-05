import { Either, left, right } from '../../../../../shared/logic/Either'
import { InvalidLengthError } from '../../../errors/InvalidLengthError'

export class Title {
	private title

	private constructor(title: string) {
		this.title = title.trim()
	}

	get value() {
		return this.title
	}

	static validate(title: string) {
		if (title.length < 3 || title.length > 20) {
			return false
		}

		return true
	}

	static create(title: string): Either<Error, Title> {
		const valid = this.validate(title)
		if (!valid) {
			return left(new InvalidLengthError('title', title))
		}

		return right(new Title(title))
	}
}
