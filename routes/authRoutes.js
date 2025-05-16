import { Router } from "express";
import { signUp, signIn, signOut, forgotPassword } from "../controllers/authController.js";

const authRouter = Router();

authRouter.post("/signup",signUp);

authRouter.post("/login", signIn);
authRouter.post("/logout", signOut);
authRouter.post("/forgot-password", forgotPassword);


export default authRouter;