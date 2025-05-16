import  { Router } from "express";
import { getUser, getUsers } from "../controllers/userController.js";

import authorize from "../middleware/authMiddleware.js";

const userRouter = Router();

userRouter.get("/", getUser);


userRouter.get("/:id", authorize,getUsers);

userRouter.post("/", (req, res) => {   
        res.send("create user");
        }); 

userRouter.post("/id", (req, res) => {   
            res.send("update user");
            }); 

userRouter.delete("/profile", (req, res) => {   
    res.send("delete user ");
    }); 

    
    
export default userRouter;