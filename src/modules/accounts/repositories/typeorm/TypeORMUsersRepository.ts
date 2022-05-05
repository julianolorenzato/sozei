import { getRepository, Repository } from 'typeorm'
import { UserEntity } from '../../../../shared/infra/typeorm/entities/UserEntity'
import { User } from '../../entities/user/User'
import { UserMapper } from '../../mappers/UserMapper'
import { IUsersRepository } from '../IUsersRepository'

export class TypeORMUsersRepository implements IUsersRepository {
	private repository: Repository<UserEntity>

	constructor() {
		this.repository = getRepository(UserEntity)
	}

	async findById(id: string): Promise<User> {
		const persistenceUser = await this.repository.findOne({ _id: id })
		if (!persistenceUser) {
			return null
		}

		const domainUser = UserMapper.toDomain(persistenceUser)
		return domainUser
	}

	async findByEmail(email: string): Promise<User> {
		const persistenceUser = await this.repository.findOne({ email })
		if (!persistenceUser) {
			return null
		}

		const domainUser = UserMapper.toDomain(persistenceUser)
		return domainUser
	}

	async findByUsername(username: string): Promise<User> {
		const persistenceUser = await this.repository.findOne({ username })
		if (!persistenceUser) {
			return null
		}

		const domainUser = UserMapper.toDomain(persistenceUser)
		return domainUser
	}

	async save(user: User): Promise<void> {
		const persistenceUser = await UserMapper.toPersistence(user)
		await this.repository.save(persistenceUser)
	}
}
