import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { User } from '../models/user.model'
import { Role } from '../models/role.model'
import { RoleModule } from '../role/role.module'
import { JwtModule } from '@nestjs/jwt'

@Module({
	controllers: [UserController],
	providers: [UserService],
	exports: [UserService],
	imports: [SequelizeModule.forFeature([User, Role]), RoleModule, JwtModule]
})
export class UserModule {}
