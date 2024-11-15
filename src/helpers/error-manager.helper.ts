import { HttpErrorResponse, HttpStatusType } from '@/types';

export class ErrorManager extends Error {
  public error: HttpStatusType;
  public details: string;
  public statusCode?: number;

  constructor({ error, message, statusCode }: HttpErrorResponse) {
    super(`${statusCode} :: ${error} :: ${typeof message === 'string' ? message : message.join(', ')}`);
    this.error = error;
    this.details = typeof message === 'string' ? message : message.join(', ');
    this.statusCode = statusCode;

    // Asignar el nombre de la clase al error
    this.name = 'ErrorManager';
  }

  static handleError(errorResponse: HttpErrorResponse): ErrorManager {
    return new this(errorResponse);
  }

  static createSignature(content: string): HttpErrorResponse {
    const [statusCode, error, message] = content.split(' :: ');

    return {
      error: (error as HttpStatusType) || 'INTERNAL_SERVER_ERROR',
      message: message || content,
      statusCode: Number(statusCode) || 500,
    };
  }
}
