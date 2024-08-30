// This is done so that globally Response type should alter
// types.d.ts
import { Request, Response } from "express";


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

  