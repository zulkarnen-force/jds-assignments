import { logger } from '@application/logging';
import { Response, Request } from 'express';

class UResponse {
  static success(res: Response, data?: any, message: string = 'Data succesfully found.'): void {
    res.status(200).json({
      success: true,
      message,
      data,
    });
  }

  static saved(res: Response, data?: any, message: string = 'Data successfully saved.'): void {
    res.status(201).json({
      success: true,
      message,
      data,
    });
  }

  static saveFailed( req: Request, res: Response, errors?: any, message: string = 'Data failed to save.'): void {
    const logProperties = { 
        method: req.method,
        originalUrl: req.originalUrl,
        headers: req.headers,
        body: req.body
    }
    logger.error({
      error: {
        message,
        stack : errors
      },
      logProperties
    });
    res.status(500).json({
      success: false,
      message,
      errors,
    });
  }

  static notFound(res: Response, message: string = 'Data or Source not found.'): void {
    res.status(404).json({
      success: false,
      message,
    });
  }

  static validationError( req : Request, res: Response, errors: any, message: string = 'Validation error.'): void {
    const logProperties = { 
        method: req.method,
        originalUrl: req.url,
        headers: req.headers,
        body: req.body
    }
    logger.error({
      error: {
        message,
        stack : errors
      },
      logProperties
    });
    res.status(400).json({
      success: false,
      message,
      errors,
    });
  }

  static serverError(req : Request, res: Response, message: string = 'Internal Server Error.'): void {
    res.status(500).json({
      success: false,
      message,
    });
  }
}

export default UResponse;
