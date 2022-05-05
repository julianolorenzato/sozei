import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity({ name: 'tools' })
export class ToolEntity {
	@PrimaryColumn('varchar')
	_id: string

	@Column('varchar')
	title: string

	@Column('varchar')
	link: string

	@Column('varchar')
	description: string

	@Column('varchar', { array: true })
	tags?: string[]
}
