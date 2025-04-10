import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { createUser, deleteUser, getUser, getUsers, updateUser } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get('/', authorize, getUsers);
userRouter.get('/:id', authorize, getUser);
userRouter.post('/', createUser);
userRouter.put('/:id', updateUser);
userRouter.delete('/:id', deleteUser);

export default userRouter;