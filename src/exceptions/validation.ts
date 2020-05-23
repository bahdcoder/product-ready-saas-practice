interface ValidationError {
    message: string
    field: string
    validation?: string
}

class ValidationException extends Error {
    public errors: ValidationError[] = []

    public type = 'ValidationException'

    constructor(errors: Array<ValidationError>, message: string = 'Validation failed.') {
        super(message)

        this.errors = errors
    }
}

export default ValidationException
