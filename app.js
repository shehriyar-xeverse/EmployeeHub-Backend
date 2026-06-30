import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import userRouter from './src/routes/user.router.js'
import cookieParser from "cookie-parser"; 
import employeeRouter from './src/routes/employee.router.js';
dotenv.config()
const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: process.env.NEXT_PUBLIC_FRONTEND_URL,
  credentials: true,
}));


app.get('/', (req, res) => {
  res.send('Backend is running')
})


app.use('/api', userRouter)
app.use('/api', employeeRouter)

export default app