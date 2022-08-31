import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'
import { ValidationException } from '../exeptions/validation.exception'

@Injectable()
export class ValidationPipe implements PipeTransform {
	async transform(value: any, { metatype }: ArgumentMetadata): Promise<any> {
		if (!metatype || !this.toValidate(metatype)) {
			return value
		}

		const object = plainToInstance(metatype, value)
		const errors = await validate(object)

		if (errors.length) {
			const message = errors.map(error => {
				return `${error.property} - ${Object.values(error.constraints).join(
					', '
				)}`
			})

			throw new ValidationException(message)
		}

		return value
	}

	private toValidate(metatype: Function): boolean {
		const types: Function[] = [String, Boolean, Number, Array, Object]
		return !types.includes(metatype)
	}
}
