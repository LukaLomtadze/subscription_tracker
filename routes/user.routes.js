import { Router } from "express";
import { getUser, getUsers } from "../controllers/user.controller.js";
import authorize from "../Middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.get("/", getUsers)

userRouter.get("/:id", authorize, getUser)

userRouter.post("/", (req, res) => {
    res.send({title: "create new users",})
})

userRouter.put("/:id", (req, res) => {
    res.send({title: "update user details",})
})

userRouter.delete("/:id", (req, res) => {
    res.send({title: "delete user",})
})

export default userRouter;