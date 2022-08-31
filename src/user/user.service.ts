import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { User } from '../models/user.model'
import { CreateUserDto } from './dto/create-user.dto'
import { RoleService } from '../role/role.service'

@Injectable()
export class UserService {
	constructor(
		@InjectModel(User)
		private readonly userRepository: typeof User,
		private readonly roleService: RoleService
	) {}

	async create(dto: CreateUserDto): Promise<User> {
		const user = await this.userRepository.create(dto)
		const role = await this.roleService.getRoleByValue('ADMIN')
		await user.$set('roles', [role.id])
		user.roles = [role]
		return user
	}

	async getUserByEmail(email: string): Promise<User | null> {
		return await this.userRepository.findOne({
			where: { email },
			include: { all: true }
		})
	}

	async getAll(): Promise<User[]> {
		return this.userRepository.findAll({
			attributes: ['id', 'email'],
			include: { all: true }
		})
	}
}
