import {
	BelongsToMany,
	Column,
	DataType,
	Model,
	Table
} from 'sequelize-typescript'
import { UserRoles } from './user-roles.model'
import { Role } from './role.model'
import { ApiProperty } from '@nestjs/swagger'

export interface IUserCreationAttr {
	email: string
	password: string
}

@Table({ tableName: 'users' })
export class User extends Model<User, IUserCreationAttr> {
	@ApiProperty({ example: 1, description: 'Unique user id' })
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true
	})
	id: number

	@ApiProperty({ example: 'example@email.com', description: 'User email' })
	@Column({ type: DataType.STRING, unique: true, allowNull: false })
	email: string

	@ApiProperty({ example: 'Kigk43jsff', description: 'User password' })
	@Column({ type: DataType.STRING, allowNull: false })
	password: string

	@BelongsToMany(() => Role, () => UserRoles)
	roles: Role[]
}
