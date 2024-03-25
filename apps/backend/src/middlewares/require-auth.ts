import { Request, Response, NextFunction } from 'express';

const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
  // Assuming the user information is stored in req.session.user
  // Check if the user is not present or the user is an empty string
  if (!req.session || !req.session.user || req.session.user === '') {
    // If the user is not authenticated, pass an error to the next function
    const err = new Error('Unauthorized: No active session');
    res.status(401);
    next(err);
  } else {
    // If the user is authenticated, proceed with the next middleware/route handler
    next();
  }
};

export default requireAuth;