export class NotFoundException extends Error {
    constructor(message) {
        super();
        this.name = 'NotFoundException';
        this.statusCode = 404;
        this.message = message || 'Recurso no encontrado';
    }
}