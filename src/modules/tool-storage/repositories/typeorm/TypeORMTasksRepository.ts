import { getRepository, Repository } from 'typeorm'
import { TaskEntity } from '../../../../shared/infra/typeorm/entities/TaskEntity'
import { Task } from '../../entities/task/Task'
import { TaskMapper } from '../../mappers/TaskMapper'
import { ITasksRepository } from '../ITasksRepository'

export class TypeORMTasksRepository implements ITasksRepository {
	private repository: Repository<TaskEntity>

	constructor() {
		this.repository = getRepository(TaskEntity)
	}

	async findAll(): Promise<Task[]> {
		const persistenceTasks = await this.repository.find()
		if (!persistenceTasks) {
			return null
		}

		const domainTasks = persistenceTasks.map(task =>
			TaskMapper.toDomain(task)
		)
		return domainTasks
	}

	async findById(id: string): Promise<Task> {
		const persistenceTask = await this.repository.findOne({ _id: id })
		if (!persistenceTask) {
			return null
		}

		const domainTask = TaskMapper.toDomain(persistenceTask)
		return domainTask
	}

	async save(task: Task): Promise<void> {
		const persistenceTask = await TaskMapper.toPersistence(task)
		await this.repository.save(persistenceTask)
	}

	async remove(task: Task): Promise<void> {
		const persistenceTask = await TaskMapper.toPersistence(task)
		await this.repository.remove(persistenceTask)
	}
}
