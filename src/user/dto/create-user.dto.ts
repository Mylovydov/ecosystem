import { IUserCreationAttr } from '../../models/user.model'
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto implements IUserCreationAttr {
	@ApiProperty({
		name: 'email',
		example: 'example.com',
		description: 'User Email',
		type: String
	})
	@IsString({ message: 'Email must be a string' })
	@IsEmail({}, { message: 'Incorrect email' })
	@IsNotEmpty({ message: 'The field email cannot be empty' })
	readonly email: string

	@ApiProperty({
		name: 'password',
		example: 'Kigk43jsff',
		description: 'User password',
		type: String
	})
	@IsString({ message: 'Password must be a string' })
	@Length(6, 16, {
		message: 'Password must be not less 4 and not more 16 characters'
	})
	readonly password: string
}
