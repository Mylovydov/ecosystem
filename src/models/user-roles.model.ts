import {
	Column,
	DataType,
	ForeignKey,
	Model,
	Table
} from 'sequelize-typescript'
import { User } from './user.model'
import { Role } from './role.model'
import { ApiProperty } from '@nestjs/swagger'

@Table({ tableName: 'user_roles', timestamps: false })
export class UserRoles extends Model<UserRoles> {
	@ApiProperty({ example: 1, description: 'Unique user roles id' })
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true
	})
	id: number

	@ApiProperty({
		example: 5,
		description: 'The id of the user who owns the role'
	})
	@ForeignKey(() => User)
	@Column({ type: DataType.INTEGER, field: 'user_id' })
	userId: number

	@ApiProperty({
		example: 5,
		description: 'The id of the role who owns the user'
	})
	@ForeignKey(() => Role)
	@Column({ type: DataType.INTEGER, field: 'role_id' })
	roleId: number
}
