import { Tool } from '../entities/tool/Tool'

export interface IToolsRepository {
	findAll(): Promise<Tool[]>
	findById(id: string): Promise<Tool>
	findByTitle(title: string): Promise<Tool>
	findByTag(tag: string): Promise<Tool[]>
	save(tool: Tool): Promise<void>
	remove(tool: Tool): Promise<void>
}
