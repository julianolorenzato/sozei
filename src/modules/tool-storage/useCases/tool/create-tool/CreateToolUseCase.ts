import { Either, left, right } from '../../../../../shared/logic/Either'

import { IToolsRepository } from '../../../repositories/IToolsRepository'

import { Tool } from '../../../entities/tool/Tool'
import * as VO from '../../../entities/tool/value-objects'

import { InvalidLengthError } from '../../../errors/InvalidLengthError'
import { TitleAlreadyExistsError } from './errors/TitleAlreadyExistsError'

type Errors = InvalidLengthError | TitleAlreadyExistsError

type UseCaseResponse = Either<Errors, Tool>
type UseCaseRequest = {
	title: string
	link: string
	description: string
	tags: string[]
}

export class CreateToolUseCase {
	private readonly toolsRepository: IToolsRepository

	constructor(toolsRepo: IToolsRepository) {
		this.toolsRepository = toolsRepo
	}

	async execute({
		title,
		link,
		description,
		tags
	}: UseCaseRequest): Promise<UseCaseResponse> {
		const titleOrError = VO.Title.create(title)
		if (titleOrError.isLeft()) return left(titleOrError.value)

		const linkOrError = VO.Link.create(link)
		if (linkOrError.isLeft()) return left(linkOrError.value)

		const descriptionOrError = VO.Description.create(description)
		if (descriptionOrError.isLeft()) return left(descriptionOrError.value)

		const validTags: VO.Tag[] = []
		tags.forEach(tag => {
			const tagOrError = VO.Tag.create(tag)
			if (tagOrError.isLeft()) {
				return left(tagOrError.value)
			}
			validTags.push(tagOrError.value)
		})

		const tool = Tool.create({
			title: titleOrError.value,
			link: linkOrError.value,
			description: descriptionOrError.value,
			tags: validTags
		})

		const titleAlreadyExists = await this.toolsRepository.findByTitle(
			tool.title
		)

		if (titleAlreadyExists) {
			return left(new TitleAlreadyExistsError(tool.title))
		}

		await this.toolsRepository.save(tool)

		return right(tool)
	}
}
