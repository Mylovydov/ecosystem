import {
	BelongsToMany,
	Column,
	DataType,
	Model,
	Table
} from 'sequelize-typescript'
import { User } from './user.model'
import { UserRoles } from './user-roles.model'
import { ApiProperty } from '@nestjs/swagger'

export interface IRoleCreationAttr {
	value: string
	description: string
}

@Table({ tableName: 'roles' })
export class Role extends Model<Role, IRoleCreationAttr> {
	@ApiProperty({ example: 1, description: 'Unique role id' })
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true
	})
	id: number

	@ApiProperty({ example: 'USER', description: 'User role value' })
	@Column({ type: DataType.STRING, unique: true, allowNull: false })
	value: string

	@ApiProperty({
		example: 'This is the role of a normal user',
		description: 'Description of the user role'
	})
	@Column({ type: DataType.STRING, allowNull: false })
	description: string

	@BelongsToMany(() => User, () => UserRoles)
	users: [User]
}
