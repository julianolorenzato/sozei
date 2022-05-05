import { IToolDTO } from './IToolDTO'
import { IUserDTO } from '../../accounts/dtos/IUserDTO'

export interface ITaskDTO {
	id: string
	name: string
	details: string
	tools: IToolDTO[]
	owner: IUserDTO
}
