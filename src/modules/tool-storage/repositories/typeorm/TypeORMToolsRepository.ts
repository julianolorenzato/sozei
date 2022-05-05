import { getRepository, Repository } from 'typeorm'
import { ToolEntity } from '../../../../shared/infra/typeorm/entities/ToolEntity'
import { Tool } from '../../entities/tool/Tool'
import { ToolMapper } from '../../mappers/ToolMapper'
import { IToolsRepository } from '../IToolsRepository'

export class TypeORMToolsRepository implements IToolsRepository {
	private repository: Repository<ToolEntity>

	constructor() {
		this.repository = getRepository(ToolEntity)
	}

	async findAll(): Promise<Tool[]> {
		const persistenceTools = await this.repository.find()
		if (!persistenceTools) {
			return null
		}

		const domainTools = persistenceTools.map(tool =>
			ToolMapper.toDomain(tool)
		)
		return domainTools
	}

	async findById(id: string): Promise<Tool> {
		const persistenceTool = await this.repository.findOne({ _id: id })
		if (!persistenceTool) {
			return null
		}

		const domainTool = ToolMapper.toDomain(persistenceTool)
		return domainTool
	}

	async findByTitle(title: string): Promise<Tool> {
		const persistenceTool = await this.repository.findOne({ title: title })
		if (!persistenceTool) {
			return null
		}

		const domainTool = ToolMapper.toDomain(persistenceTool)
		return domainTool
	}

	async findByTag(tag: string): Promise<Tool[]> {
		const persistenceTools: ToolEntity[] | null =
			await this.repository.query(
				`SELECT * FROM tools WHERE '${tag}' = ANY(tags)`
			)
		if (!persistenceTools) {
			return null
		}

		const domainTools = persistenceTools.map(tool =>
			ToolMapper.toDomain(tool)
		)
		return domainTools
	}

	async save(tool: Tool): Promise<void> {
		const persistenceTool = ToolMapper.toPersistence(tool)
		await this.repository.save(persistenceTool)
	}

	async remove(tool: Tool): Promise<void> {
		const persistenceTool = ToolMapper.toPersistence(tool)
		await this.repository.remove(persistenceTool)
	}
}
