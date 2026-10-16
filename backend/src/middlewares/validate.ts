import type { Request, Response, NextFunction } from "express";
import { ZodError, type ZodType } from "zod";
import { BadRequestError } from "../lib/errors.js";

type ValidationSchemas = {
  body?: ZodType;
  params?: ZodType;
  query?: ZodType;
};

export const validate =
  (schemas: ValidationSchemas) =>
  (req: Request, _res: Response, next: NextFunction) => {
    try {
      const validated: {
        body?: unknown;
        params?: unknown;
        query?: unknown;
      } = {};

      if (schemas.body) validated.body = schemas.body.parse(req.body);
      if (schemas.params) validated.params = schemas.params.parse(req.params);
      if (schemas.query) validated.query = schemas.query.parse(req.query);

      req.validated = validated;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const message = error.issues
          .map((issue) => {
            const path = issue.path.length > 0 ? issue.path.join(".") : "field";
            return `${path}: ${issue.message}`;
          })
          .join(", ");

        return next(new BadRequestError(message, "VALIDATION_ERROR"));
      }

      next(error);
    }
  };