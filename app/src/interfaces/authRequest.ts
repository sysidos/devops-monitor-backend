import { Request } from 'express';

/**
 * User Object defintion
 */
interface UserObject extends Request {
  userId?: String;
}

/**
 * Auth Request interface containing authenticated user
 */
export interface AuthRequest extends Request {
  user?: UserObject;
}
