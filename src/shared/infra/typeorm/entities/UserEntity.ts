import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity({ name: 'users' })
export class UserEntity {
	@PrimaryColumn('varchar')
	_id: string

	@Column('varchar')
	username: string

	@Column('varchar')
	email: string

	@Column('varchar')
	password: string
}
