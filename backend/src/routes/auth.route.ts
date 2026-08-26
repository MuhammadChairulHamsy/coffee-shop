import { toNodeHandler } from "better-auth/node";
import { Router } from "express";
import { auth } from "../lib/auth";

const authRouter = Router();
authRouter.all("/*", toNodeHandler(auth));

export { authRouter };
