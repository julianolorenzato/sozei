export class ToolNotFoundError extends Error {
	constructor(id: string) {
		super(`Tool ${id} not found`)
		this.name = 'ToolNotFoundError'
	}
}
