import { Tool } from '../../entities/tool/Tool'
import { IToolsRepository } from '../IToolsRepository'

class InMemoryToolsRepository implements IToolsRepository {
	public items: Tool[] = []

	async findAll(): Promise<Tool[]> {
		const tools = this.items

		return tools
	}

	async findById(id: string): Promise<Tool | null> {
		const tool = this.items.find(tool => tool.id === id)
		if (!tool) {
			return null
		}

		return tool
	}

	async findByTitle(title: string): Promise<Tool | null> {
		const tool = this.items.find(tool => tool.title === title)
		if (!tool) {
			return null
		}

		return tool
	}

	async findByTag(targetTag: string): Promise<Tool[] | null> {
		const tools = this.items.filter(tool =>
			tool.tags.some(tag => tag === targetTag)
		)

		if (!tools) {
			return null
		}

		return tools
	}

	async save(tool: Tool): Promise<Tool> {
		this.items.push(tool)
		return tool
	}

	async remove(id: string): Promise<Tool | null> {
		const tool = await this.findById(id)

		if (!tool) {
			return null
		}

		const index = this.items.indexOf(tool)
		this.items.splice(index, 1)
		return tool
	}
}

export const inMemoryToolsRepositoryInstace = new InMemoryToolsRepository()
