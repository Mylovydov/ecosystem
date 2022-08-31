import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Role } from '../models/role.model'
import { CreateRoleDto } from './dto/create-role.dto'

@Injectable()
export class RoleService {
	constructor(
		@InjectModel(Role)
		private readonly roleRepository: typeof Role
	) {}

	async create(dto: CreateRoleDto): Promise<Role> {
		return await this.roleRepository.create(dto)
	}

	async getRoleByValue(value: string): Promise<Role> {
		const role = await this.roleRepository.findOne({ where: { value } })

		if (!role) {
			throw new NotFoundException(`Role with value ${value} not found`)
		}

		return role
	}
}
