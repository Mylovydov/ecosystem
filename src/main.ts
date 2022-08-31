import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ValidationPipe } from './pipes/validation.pipe'

async function start() {
	const PORT = process.env.PORT ?? 5000
	const app = await NestFactory.create(AppModule)
	app.setGlobalPrefix('api')
	app.enableCors()
	app.useGlobalPipes(new ValidationPipe())

	const config = new DocumentBuilder()
		.setTitle('Ecosystem')
		.setDescription('Ecosystem API documentation')
		.setVersion('1.0')
		.addTag('Ecosystem test')
		.build()

	const document = SwaggerModule.createDocument(app, config)
	SwaggerModule.setup('/api/docs', app, document, {})

	await app.listen(PORT, () => console.log(`Server started on port: ${PORT}`))
}

start()
