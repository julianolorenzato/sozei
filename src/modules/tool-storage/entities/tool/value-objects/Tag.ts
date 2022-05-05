import { Either, left, right } from '../../../../../shared/logic/Either'
import { InvalidLengthError } from '../../../errors/InvalidLengthError'

export class Tag {
	private tag

	private constructor(tag: string) {
		this.tag = tag.trim()
	}

	get value() {
		return this.tag
	}

	static validate(tag: string) {
		if (tag.length < 1 || tag.length > 40) {
			return false
		}

		return true
	}

	static create(tag: string): Either<Error, Tag> {
		const valid = this.validate(tag)
		if (!valid) {
			return left(new InvalidLengthError('tag', tag))
		}

		return right(new Tag(tag))
	}
}
