import { Entity } from '../../../../shared/domain/Entity'
import { Title, Description, Link, Tag } from './value-objects'

type ToolProps = {
	title: Title
	link: Link
	description: Description
	tags: Tag[]
}

export class Tool extends Entity<ToolProps> {
	private constructor(props: ToolProps, id?: string) {
		super(props, id)
	}

	get title() {
		return this.props.title.value
	}

	get link() {
		return this.props.link.value
	}

	get description() {
		return this.props.description.value
	}

	get tags() {
		const values = this.props.tags.map(tag => tag.value)
		return values
	}

	static create(props: ToolProps, id?: string) {
		return new Tool(props, id)
	}
}
