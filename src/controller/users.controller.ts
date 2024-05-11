import { Request,Response } from "express";
// import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { IotModel } from "../models/user.model";
dotenv.config();


   export async function getUsers(req:Request, res:Response) {
     try{ 
      const users = await IotModel.find({},{password: 0});
      return res.status(200).json(users);
    }
     catch (error) {
      console.log(error);
      return res.status(400).json({message:"can not get users"});
    }
    }
    
     export async function createUser(req:Request, res:Response) {
        try {
            const { email, password } = req.body;
        
            const existingUser = await IotModel.findOne(email);
        
            if (existingUser) {
              return res.status(400).json({ message: "Email address already in use" });
            }
        
            // const hashedPassword = await bcrypt.hash(password, 10);
        
            const newUser = new IotModel({
              email,
              password
            }).save();
        
            return res.status(201).json(newUser);
          } catch (err: any) {
            res.status(500).json({ message: err.message });
          }
      }
    

export const login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const user = await IotModel.findOne({email});
  
      if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
  
    //   const passwordMatch = await bcrypt.compare(password, user.password);
  
    //   if (!passwordMatch) {
    //     return res.status(400).json({ message: "Invalid email or password" });
    //   }
  
      const token = jwt.sign({ id: user.id,email:user.email }, process.env.JWT_SECRET!);
  
      req.headers.authorization = token;
  
      res.status(200).json({
        user: { _id: user._id, email: user.email},
        token,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  export const logout = (req: Request, res: Response) => {
    req.headers.authorization = "";
    res.send("Logged out successfully");
  };