import { toNodeHandler } from "better-auth/node";
import { Router } from "express";
import { auth } from "../lib/auth";

const authRouter = Router();
authRouter.use(toNodeHandler(auth));

export { authRouter };
