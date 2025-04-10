import express from "express";
import { PORT } from "./config/env.js";
import userRouter from "./routes/user.routes.js";
import subscriptionRouter from "./routes/subscriiption.route.js";
import authRouter from "./routes/auth.routes.js";
import connectDB from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);

// Error middleware
app.use(errorMiddleware);

app.get('/', (req, res)=> {
    res.send("Welcome to the Subscription API");
})

app.listen(PORT, 'localhost', async () => {
  console.log(`Subscription API is running on: http://localhost:${PORT}`);

  await connectDB();
});

export default app;