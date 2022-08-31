import {
	HttpException,
	HttpStatus,
	Injectable,
	UnauthorizedException
} from '@nestjs/common'
import { UserService } from '../user/user.service'
import { JwtService } from '@nestjs/jwt'
import { CreateUserDto } from '../user/dto/create-user.dto'
import * as bcrypt from 'bcrypt'
import { User } from '../models/user.model'
import { AuthResponseDto } from './dto/auth-responce.dto'

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService
	) {}

	async registration(dto: CreateUserDto): Promise<AuthResponseDto> {
		const candidate = await this.userService.getUserByEmail(dto.email)

		if (candidate) {
			throw new HttpException('User already exists', HttpStatus.BAD_REQUEST)
		}

		const hashPassword = await bcrypt.hash(dto.password, 5)
		const user = await this.userService.create({
			...dto,
			password: hashPassword
		})
		return this.generateToken(user)
	}

	async login(dto: CreateUserDto): Promise<AuthResponseDto> {
		const user = await this.validateUser(dto)
		return this.generateToken(user)
	}

	private async validateUser(dto: CreateUserDto): Promise<User> {
		const user = await this.userService.getUserByEmail(dto.email)

		if (!user) {
			throw new UnauthorizedException('Incorrect email or password')
		}

		const isPassEquals = await bcrypt.compare(dto.password, user.password)

		if (!isPassEquals) {
			throw new UnauthorizedException('Incorrect email or password')
		}

		return user
	}

	private generateToken(user: User): AuthResponseDto {
		const payload = { email: user.email, id: user.id, roles: user.roles }
		return {
			token: this.jwtService.sign(payload)
		}
	}
}
