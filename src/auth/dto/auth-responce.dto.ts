import { ApiProperty } from '@nestjs/swagger'

export class AuthResponseDto {
	@ApiProperty({
		name: 'Jwt token',
		example:
			'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFsZWtzYW5kcm92c2t5MTk5MUBnbWFpbC5jb20iLCJpZCI6Miwicm9sZXMiOlt7ImlkIjoyLCJ2YWx1ZSI6IkFETUlOIiwiZGVzY3JpcHRpb24iOiJVc2VyIHJvbGUiLCJjcmVhdGVkQXQiOiIyMDIyLTA4LTMxVDE2OjU1OjMyLjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIyLTA4LTMxVDE2OjU1OjMyLjAwMFoifV0sImlhdCI6MTY2MTk2NDk1MywiZXhwIjoxNjYxOTY4NTUzfQ.tM45y_0Z2pbSgtk56vkkx7tFZbvEruGFnmbMBmqqoz0',
		description: 'Jwt token'
	})
	readonly token: string
}
