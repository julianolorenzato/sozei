type Type = 'username' | 'email'

export class AlreadyExistsError extends Error {
	constructor(type: Type, value: string) {
		super(`The ${type} "${value}" already exists`)
		this.name = 'AlreadyExistsError'
	}
}
