import { Either, left, right } from '../../../../../shared/logic/Either'

import { ITasksRepository } from '../../../repositories/ITasksRepository'
import { IToolsRepository } from '../../../repositories/IToolsRepository'
import { IUsersRepository } from '../../../../accounts/repositories/IUsersRepository'

import { Task } from '../../../entities/task/Task'
import * as VO from '../../../entities/task/value-objects'
import { Tool } from '../../../entities/tool/Tool'

type UseCaseResponse = Either<Error, Task>
type UseCaseRequest = {
	name: string
	details: string
	toolsId: string[]
	userId: string
}

export class CreateTaskUseCase {
	private readonly tasksRepository: ITasksRepository
	private readonly toolsRepository: IToolsRepository
	private readonly usersRepository: IUsersRepository

	constructor(
		tasksRepo: ITasksRepository,
		toolsRepo: IToolsRepository,
		usersRepo: IUsersRepository
	) {
		this.tasksRepository = tasksRepo
		this.toolsRepository = toolsRepo
		this.usersRepository = usersRepo
	}

	async execute({
		name,
		details,
		toolsId,
		userId
	}: UseCaseRequest): Promise<UseCaseResponse> {
		const nameOrError = VO.Name.create(name)
		if (nameOrError.isLeft()) return left(nameOrError.value)

		const detailsOrError = VO.Details.create(details)
		if (detailsOrError.isLeft()) return left(detailsOrError.value)

		const promises = toolsId.map(async id => {
			return await this.toolsRepository.findById(id)
		})

		let tools: Tool[]

		Promise.all(promises).then(promiseTools => {
			tools = promiseTools
		})

		const user = await this.usersRepository.findById(userId)

		const task = Task.create({
			name: nameOrError.value,
			details: detailsOrError.value,
			tools: tools,
			owner: user
		})

		await this.tasksRepository.save(task)

		return right(task)
	}
}
