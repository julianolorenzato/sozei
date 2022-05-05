import { TaskEntity } from '../../../shared/infra/typeorm/entities/TaskEntity'
import { UserMapper } from '../../accounts/mappers/UserMapper'
import { Task } from '../entities/task/Task'
import { Name, Details } from '../entities/task/value-objects'
import { ToolMapper } from './ToolMapper'

export class TaskMapper {
	static toDomain(raw: TaskEntity): Task {
		const nameOrError = Name.create(raw.name)
		if (nameOrError.isLeft()) {
			throw new Error('Name is invalid')
		}

		const detailsOrError = Details.create(raw.details)
		if (detailsOrError.isLeft()) {
			throw new Error('Details is invalid')
		}

		const tools = raw.tools.map(tool => ToolMapper.toDomain(tool))
		const user = UserMapper.toDomain(raw.owner)

		const taskOrError = Task.create(
			{
				name: nameOrError.value,
				details: detailsOrError.value,
				tools: tools,
				owner: user
			},
			raw._id
		)

		return taskOrError
	}

	static async toPersistence(task: Task): Promise<TaskEntity> {
		return {
			_id: task.id,
			name: task.name,
			details: task.details,
			tools: task.tools.map(tool => ToolMapper.toPersistence(tool)),
			owner: await UserMapper.toPersistence(task.owner)
		}
	}
}
