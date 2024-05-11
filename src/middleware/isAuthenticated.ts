
import { Request, Response, NextFunction } from 'express';
import {IotModel} from '../models/user.model'
import jwt from "jsonwebtoken";

export interface CustomRequest extends Request {
    user?: any; 
}

declare global {
  namespace Express {
    interface Request {
      userInfo?: object|string;
    }
  } 
}

export const extractToken: any = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      
   let token = req.headers.authorization;
   
  if (!token) {
    return res.status(401).json({
      message: "no access token found",
    });
  }
   jwt.verify(token, "MARTINE_API", (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }  
    req.userInfo = decoded;
        next();
    })
  } catch (e) {
        res.status(401).send({
            message: 'unauthenticated'
        });
        return;
    }

}



