import type { User, Session } from "better-auth";

declare global {
  namespace Express {
    interface Request {
      user?: User;
      session?: Session["session"];
      validated?: {
        body?: unknown;
        params?: unknown;
        query?: unknown;
      };
    }
  }
}

export {};