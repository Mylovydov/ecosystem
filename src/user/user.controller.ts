import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { User } from '../models/user.model'
import { Roles } from '../decorators/roles.decorator'
import { RolesEnum } from '../enums/roles.enum'
import { RolesGuard } from '../guards/roles.guard'

@ApiTags('User')
@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@ApiOperation({ summary: 'Create user' })
	@ApiResponse({
		status: 201,
		description: 'User is successfully created',
		type: () => User
	})
	@Post()
	@Roles(RolesEnum.ADMIN)
	@UseGuards(RolesGuard)
	create(@Body() dto: CreateUserDto): Promise<User> {
		return this.userService.create(dto)
	}

	@Get()
	getAll(): Promise<User[]> {
		return this.userService.getAll()
	}
}
