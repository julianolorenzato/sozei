import { Task } from '../entities/task/Task'

export interface ITasksRepository {
	findAll(): Promise<Task[]>
	findById(id: string): Promise<Task>
	save(task: Task): Promise<void>
	remove(task: Task): Promise<void>
}
