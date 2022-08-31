import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { CreateUserDto } from '../user/dto/create-user.dto'
import { AuthResponseDto } from './dto/auth-responce.dto'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@ApiOperation({ summary: 'User registration' })
	@ApiResponse({
		status: 201,
		description: 'User is successfully registered',
		type: () => AuthResponseDto
	})
	@Post('/registration')
	registration(@Body() dto: CreateUserDto): Promise<AuthResponseDto> {
		return this.authService.registration(dto)
	}

	@ApiOperation({ summary: 'User authentication' })
	@ApiResponse({
		status: 200,
		description: 'The user is successfully logged in',
		type: () => AuthResponseDto
	})
	@Post('/login')
	login(@Body() dto: CreateUserDto): Promise<AuthResponseDto> {
		return this.authService.login(dto)
	}
}
