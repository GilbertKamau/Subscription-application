import express from 'express';
import cookieParser from 'cookie-parser';

import { PORT } from './config/env.js';
import connectDB from './db/db.js';

import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';
import subscriptionRouter from './routes/subscriptionRoutes.js';
import errorMiddleware from './middleware/errorMiddleware.js';
import arcjetMiddleware from './middleware/arcjetMiddleware.js';


const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(arcjetMiddleware)


app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/subscription', subscriptionRouter);

app.use(errorMiddleware);

app.get('/', (req, res) => {
  res.send('welcome to subcription tracker');
});



app.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`);

    await connectDB();
    console.log('Database connected successfully');
    });