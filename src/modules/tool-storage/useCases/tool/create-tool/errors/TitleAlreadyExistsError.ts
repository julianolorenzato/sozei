export class TitleAlreadyExistsError extends Error {
	constructor(value: string) {
		super(`The title "${value}" already exists`)
		this.name = 'TitleAlreadyExistsError'
	}
}
