import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import adminRouter from './src/routes/admin.router.js'
import cookieParser from "cookie-parser"; 
import employeeRouter from './src/routes/employee.router.js';
import employeeProfileRouter from './src/routes/employeeProfile.router.js';
import notificationRouter from './src/routes/notifications.router.js';
import bodyParser from 'body-parser'
dotenv.config()
const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));


app.get('/', (req, res) => {
  res.send('Backend is running')
})


app.use('/api', adminRouter)
app.use('/api', employeeRouter)
app.use('/api', employeeProfileRouter)
app.use('/api', notificationRouter)

export default app