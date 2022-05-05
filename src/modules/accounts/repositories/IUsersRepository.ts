import { User } from '../entities/user/User'

export interface IUsersRepository {
	findById(id: string): Promise<User>
	findByEmail(email: string): Promise<User>
	findByUsername(username: string): Promise<User>
	save(user: User): Promise<void>
}
