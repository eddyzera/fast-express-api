import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from '@/env'

export const app = fastify()

app.setErrorHandler((error, _, response) => {
  if (error instanceof ZodError) {
    return response
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: here we should log to an external tool like DataDog
  }

  return response.status(500).send({ message: 'Internal Server Error' })
})
