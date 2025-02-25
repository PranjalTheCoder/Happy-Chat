

class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        //smonsjgnrsnjgvoj
        this.statusCode = statusCode;
    }
}

export { ErrorHandler };
