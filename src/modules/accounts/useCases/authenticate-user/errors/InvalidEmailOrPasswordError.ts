export class InvalidEmailOrPasswordError extends Error {
	constructor() {
		super(`The email or password is invalid`)
		this.name = 'InvalidEmailOrPasswordError'
	}
}
