type FieldTypes = 'email' | 'username' | 'password'

export class InvalidLengthError extends Error {
	constructor(field: FieldTypes, value?: string) {
		super(`The ${field} ${value} have an invalid length`)
		this.name = 'InvalidLengthError'
	}
}
