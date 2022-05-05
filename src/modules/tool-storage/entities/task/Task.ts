import { Entity } from '../../../../shared/domain/Entity'
import { Tool } from '../tool/Tool'
import { Name, Details } from './value-objects'
import { User } from '../../../accounts/entities/user/User'

type TaskProps = {
	name: Name
	details: Details
	tools: Tool[]
	owner: User
}

export class Task extends Entity<TaskProps> {
	private constructor(props: TaskProps, id?: string) {
		super(props, id)
	}

	get name() {
		return this.props.name.value
	}

	get details() {
		return this.props.details.value
	}

	get tools() {
		return this.props.tools
	}

	get owner(): User {
		return this.props.owner
	}

	static create(props: TaskProps, id?: string) {
		return new Task(props, id)
	}
}
