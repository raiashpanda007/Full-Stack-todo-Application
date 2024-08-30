import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
import verifyuser from './middleware/verify.middleware';


import userRoute from './Routes/user.route';
app.use('/user', userRoute);

export default app;
