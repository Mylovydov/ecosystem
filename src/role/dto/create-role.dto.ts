import { IRoleCreationAttr } from '../../models/role.model'
import { IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateRoleDto implements IRoleCreationAttr {
	@ApiProperty({
		name: 'Role value',
		example: 'USER',
		description: 'User role value',
		type: String
	})
	@IsString({ message: 'Role value must be a string' })
	@IsNotEmpty({ message: 'The field cannot be empty' })
	readonly value: string

	@ApiProperty({
		name: 'Role description',
		example: 'This is an example of a detailed user role description',
		description: 'This is an example of a user role description',
		type: String
	})
	@IsString({ message: 'Role description must be a string' })
	@IsNotEmpty({ message: 'The field cannot be empty' })
	readonly description: string
}
