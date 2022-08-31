import { ConfigService } from '@nestjs/config'
import { SequelizeModuleOptions } from '@nestjs/sequelize'
import { User } from '../models/user.model'
import { Role } from '../models/role.model'
import { UserRoles } from '../models/user-roles.model'

export const getSequelizeConfig = async (
	configService: ConfigService
): Promise<SequelizeModuleOptions> => ({
	dialect: 'mariadb',
	host: configService.get('MARIADB_HOST'),
	port: +configService.get('MARIADB_PORT'),
	username: configService.get('MARIADB_USER'),
	password: configService.get('MARIADB_PASSWORD'),
	database: configService.get('MARIADB_DATABASE'),
	autoLoadModels: true,
	synchronize: true,
	models: [User, Role, UserRoles]
})