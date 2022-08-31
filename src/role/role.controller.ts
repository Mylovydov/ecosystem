import { Body, Controller, Post } from '@nestjs/common'
import { RoleService } from './role.service'
import { CreateRoleDto } from './dto/create-role.dto'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Role } from '../models/role.model'

@ApiTags('Role')
@Controller('role')
export class RoleController {
	constructor(private readonly roleService: RoleService) {}

	@ApiOperation({ summary: 'Create role' })
	@ApiResponse({
		status: 201,
		description: 'Role is successfully created',
		type: () => Role
	})
	@Post()
	create(@Body() dto: CreateRoleDto): Promise<Role> {
		return this.roleService.create(dto)
	}
}
