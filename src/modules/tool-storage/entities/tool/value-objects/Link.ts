import { Either, left, right } from '../../../../../shared/logic/Either'
import { InvalidLengthError } from '../../../errors/InvalidLengthError'

export class Link {
	private link

	private constructor(link: string) {
		this.link = link.trim()
	}

	get value() {
		return this.link
	}

	static validate(link: string) {
		if (link.length < 4 || link.length > 250) {
			return false
		}

		return true
	}

	static create(link: string): Either<Error, Link> {
		const valid = this.validate(link)
		if (!valid) {
			return left(new InvalidLengthError('link', link))
		}

		return right(new Link(link))
	}
}
