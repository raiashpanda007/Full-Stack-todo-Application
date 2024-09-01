import { z } from "zod";
import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
const reqisterUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(100),
  name: z.string().min(2).max(100),
});
// type RegisterParams = z.infer<typeof reqisterUserSchema>;

const prisma = new PrismaClient();
//OPtions for cookie parser
const options = {
  httpOnly:true,
  secure:true
}

interface userLogin {
  email:string,
  name:string,
  id:string

}

const userLoginSchema = z.object({
  email:z.string().email(),
  password: z.string().min(6).max(100),
})
const generateJwt = async (user:userLogin ) => {
    const token = jwt.sign({...user},process.env.JWT_SECRET!,{
        expiresIn: '1h'
    })
    return token;
}

const reqisterUser = async (
  req: Request,
  res: Response,
) => {
  try {
    const response = reqisterUserSchema.safeParse(req.body);
    if (!response.success) {
      return res.status(400).json({ message: "Invalid request" });
    }
    const { email, password, name } = response.data;
    const user = await prisma.user.create({
      data: {
        email,
        password,
        name,
      },
    });
    console.log(user);
    return res.json({ message: "User registered" });
  } catch (error) {
    console.log(error);
  }
  return res.json({ message: "User registered" });
};



const loginuser = async (req:Request,res:Response) =>{
  const userInput = userLoginSchema.safeParse(req.body);

  if(!userInput.success){
    return res.status(400).json({ message: "Invalid request for login" });
  }
  const {email,password} = userInput.data;
  const user = await prisma.user.findFirst({
    where:{
      email:email ,
      password:password
    },
    select:{
      email:true,
      name:true,
      id:true
    }
  })
  
  if(!user){
    return res.status(400).json({message:"Invaild email and password"})
  }
  console.log(user)

  const token = await generateJwt(user);
  console.log("Token in verifyjwt",token)
  return res.status(200)
  .cookie("accessToken",token,options)
  .json({message:"Logged In successfully"})


}
const createTodo = async (req: Request, res: Response) => {
  const { todoDescription } = req.body;

  const userID = req.user?.id;
  console.log("Console of req :: ",req);

  if (!userID) {
    return res.status(400).json({ error: "User not authenticated" });
  }

  try {
    const createdTodo = await prisma.todos.create({
      data: {
        todoDescription,
        userID, // Ensure it matches Prisma schema field
      },
      
    });
    console.log("Todo created 😊")
    res.status(201).json(createdTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create todo" });
  }
};

const toggleTodo = async function(req:Request,res:Response){
  const todoID = req.body.postID;

  try {
    const getPost  = await prisma.todos.findFirst({
      where:{
        id:todoID
      }
    })
    if(!getPost){
      res.status(400).json({message:"No such Posts exist"})
    }
    const value = getPost?.done;
    const updatePost = await prisma.todos.update({
      where:{
        id:todoID
      },data:{
        done:!value
      }
    })
    return res.status(200).json(updatePost)
  } catch (error) {
    res.status(400)
    .json({message:"This can't update the todos"})
  }

}
const getAlltodos = async (req:Request, res:Response) =>{
  const userID = req.user?.id;
  const allPosts = await prisma.user.findFirst({
    where:{
      id:userID
    },select:{
      Todos:true
    }
  })
  if(!allPosts){
    res.status(400).json({
      message:"Can't find posts"
    })
  }
  res.status(200).json({
    ...allPosts
  })

}
const updateTodo = async (req:Request,res:Response) =>{
  const {todoID,newtodoDescription} = req.body;
  try {
    const updateTodo = await prisma.todos.update({
      where:{
        id:todoID
      },data:{
        todoDescription:newtodoDescription
      }
    })
    res.status(200).json(
      updateTodo
    )
  } catch (error) {
    res.status(500).json({
      message:"Can't update the todo"
    })
  }

}


export { reqisterUser,loginuser, createTodo,toggleTodo,getAlltodos,updateTodo };
