type FieldTypes = 'title' | 'description' | 'tag' | 'link' | 'name' | 'details'

export class InvalidLengthError extends Error {
	constructor(field: FieldTypes, value: string) {
		super(`The ${field} ${value} have an invalid length`)
		this.name = 'InvalidLengthError'
	}
}
