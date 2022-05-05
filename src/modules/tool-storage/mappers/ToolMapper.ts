import { ToolEntity } from '../../../shared/infra/typeorm/entities/ToolEntity'
import { Tool } from '../entities/tool/Tool'
import { Description, Link, Tag, Title } from '../entities/tool/value-objects'

export class ToolMapper {
	static toDomain(raw: ToolEntity): Tool {
		const titleOrError = Title.create(raw.title)
		if (titleOrError.isLeft()) {
			throw new Error('Title is invalid')
		}

		const linkOrError = Link.create(raw.link)
		if (linkOrError.isLeft()) {
			throw new Error('Link is invalid')
		}

		const descriptionOrError = Description.create(raw.description)
		if (descriptionOrError.isLeft()) {
			throw new Error('Description is invalid')
		}

		const validTags = raw.tags.map(tag => {
			const tagOrError = Tag.create(tag)
			if (tagOrError.isLeft()) {
				throw new Error('Tag is invalid')
			}

			return tagOrError.value
		})

		const toolOrError = Tool.create(
			{
				title: titleOrError.value,
				link: linkOrError.value,
				description: descriptionOrError.value,
				tags: validTags
			},
			raw._id
		)

		return toolOrError
	}

	static toPersistence(tool: Tool): ToolEntity {
		return {
			_id: tool.id,
			title: tool.title,
			link: tool.link,
			description: tool.description,
			tags: tool.tags
		}
	}
}
