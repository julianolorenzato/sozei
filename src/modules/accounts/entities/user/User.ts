import { Entity } from '../../../../shared/domain/Entity'
import { Username, Email, Password } from './value-objects'

type UserProps = {
	username: Username
	email: Email
	password: Password
}

export class User extends Entity<UserProps> {
	private constructor(props: UserProps, id?: string) {
		super(props, id)
	}

	get username(): Username {
		return this.props.username
	}

	get email(): Email {
		return this.props.email
	}

	get password(): Password {
		return this.props.password
	}

	static create(props: UserProps, id?: string) {
		return new User(props, id)
	}
}
