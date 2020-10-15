import { ErrorRequestHandler } from 'express'
import { ValidationError } from 'yup';

interface ValidationErrors {
  [key: string]: string[]
}

const errorHandler: ErrorRequestHandler = (error, req, response, next) => {
  if(error instanceof ValidationError) {
    let errors: ValidationErrors = {};

    error.inner.forEach(err => {
      errors[err.path] = err.errors;
    });

    return response.status(422).json({message: 'Validation fails', errors})
  }
  console.error(error);

  return response.status(500).json({ message: 'Ta tudo errado'});
}

export default errorHandler;