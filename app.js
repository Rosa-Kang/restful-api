import express from "express";
import { PORT } from "./config/env.js";
import userRouter from "./routes/user.routes.js";
import subscriptionRouter from "./routes/subscriiption.route.js";
import authRouter from "./routes/auth.routes.js";
import connectDB from "./database/mongodb.js";

const app = express();

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);

app.get('/', (req, res)=> {
    res.send("Welcome to the Subscription API");
})

app.listen(PORT, 'localhost', async () => {
  console.log(`Subscription API is running on: http://localhost:${PORT}`);

  await connectDB();
});

export default app;