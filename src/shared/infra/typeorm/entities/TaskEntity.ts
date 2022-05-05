import {
	Column,
	Entity,
	PrimaryColumn,
	ManyToMany,
	JoinTable,
	ManyToOne
} from 'typeorm'
import { ToolEntity } from './ToolEntity'
import { UserEntity } from './UserEntity'

@Entity({ name: 'tasks' })
export class TaskEntity {
	@PrimaryColumn('varchar')
	_id: string

	@Column('varchar')
	name: string

	@Column('varchar')
	details: string

	@ManyToMany(() => ToolEntity)
	@JoinTable()
	tools: ToolEntity[]

	@ManyToOne(() => UserEntity)
	@JoinTable()
	owner: UserEntity
}
