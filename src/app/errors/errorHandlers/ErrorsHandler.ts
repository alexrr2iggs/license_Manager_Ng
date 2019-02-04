import { ErrorHandler } from '@angular/core';

export class ErrorsHandler implements ErrorHandler {
  handleError(error: Error) {
    console.dir(error);
  }
}
