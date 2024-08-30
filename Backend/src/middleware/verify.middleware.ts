import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface UserData {
  email: string;
  name: string;
  id: string;
}
declare module "express-serve-static-core" {
  interface Request {
    user?: {
      email: string;
      name: string;
      id: string;
    };
  }

  interface Response {
    user?: {
      email: string;
      name: string;
      id: string;
    };
  }
}

const verifyuser = async (req: Request, res: Response, next: NextFunction) => {
  console.log("Middleware triggered");

  const accessTokenCompleteString = req.cookies.authorization;
  console.log(accessTokenCompleteString);

  // Type the response as UserData
  const response = jwt.verify(
    accessTokenCompleteString,
    process.env.JWT_SECRET!
  ) as UserData;

  if (!response) {
    return res.status(400).json({
      message: "Invalid user",
    });
  }
  console.log(response.id);
  req.user = {
    email: response.email,
    name: response.name,
    id: response.id,
  };

  next();
};

export default verifyuser;
