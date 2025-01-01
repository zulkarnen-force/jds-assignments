// Define a standard response interface
interface ApiResponse<T> {
    success: boolean;
    message?: string;
    data?: T;
  }
  
  // Middleware to wrap responses in the standard structure
  export const wrapResponse = <T>(req: any, res: any, next: any) => {
    res.apiSuccess = (data: T, message: string = "Success") => {
      const response: ApiResponse<T> = {
        success: true,
        message,
        data,
      };
      res.json(response);
    };
  
    res.apiError = (message: string = "An error occurred") => {
      const response: ApiResponse<null> = {
        success: false,
        message,
      };
      res.status(500).json(response);
    };
  
    next();
  };