import type { Request, Response, NextFunction } from "express";
import { ZodError, type ZodTypeAny } from "zod";
import { BadRequestError } from "../lib/errors.js";

type Schemas = {
  body?: ZodTypeAny;
  params?: ZodTypeAny;
  query?: ZodTypeAny;
};

export const validate =
  (schemas: Schemas) =>
  (req: Request, _res: Response, next: NextFunction) => {
    try {
      req.validated = {
        body: schemas.body?.parse(req.body),
        params: schemas.params?.parse(req.params),
        query: schemas.query?.parse(req.query),
      };
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const message = error.issues
          .map((i) => `${i.path.join(".") || "field"}: ${i.message}`)
          .join(", ");
        return next(new BadRequestError(message, "VALIDATION_ERROR"));
      }
      next(error);
    }
  };