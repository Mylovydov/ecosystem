import {
	CanActivate,
	ExecutionContext,
	HttpException,
	HttpStatus,
	Injectable,
	UnauthorizedException
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { Observable } from 'rxjs'
import { RolesEnum } from '../enums/roles.enum'
import { ROLES_KEY } from '../decorators/roles.decorator'

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private reflector: Reflector, private jwtService: JwtService) {}

	canActivate(
		context: ExecutionContext
	): boolean | Promise<boolean> | Observable<boolean> {
		try {
			const requiredRoles = this.reflector.getAllAndOverride<RolesEnum[]>(
				ROLES_KEY,
				[context.getHandler(), context.getClass()]
			)

			if (!requiredRoles) {
				return true
			}

			const req = context.switchToHttp().getRequest()
			const authHeader = req.headers.authorization

			if (!authHeader) {
				throw new UnauthorizedException('User is not authorized')
			}

			const [bearer, token] = authHeader.split(' ')

			if (bearer !== 'Bearer' || !token) {
				throw new UnauthorizedException('User is not authorized')
			}

			const user = this.jwtService.verify(token)
			req.user = user
			console.log('user_________________', user)
			return user.roles.some(role => requiredRoles.includes(role.value))
		} catch (e) {
			throw new HttpException('Access denied', HttpStatus.FORBIDDEN)
		}
	}
}
