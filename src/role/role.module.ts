import { Module } from '@nestjs/common'
import { RoleService } from './role.service'
import { RoleController } from './role.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { Role } from '../models/role.model'

@Module({
	controllers: [RoleController],
	providers: [RoleService],
	imports: [SequelizeModule.forFeature([Role])],
	exports: [RoleService]
})
export class RoleModule {}
