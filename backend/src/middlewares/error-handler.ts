import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { Prisma } from "../generated/prisma/index.js";
import { AppError } from "../lib/errors.js";

type ErrorResponse = {
  success: false;
  message: string;
  code?: string;
};

const mapPrismaError = (error: Prisma.PrismaClientKnownRequestError) => {
  switch (error.code) {
    case "P2025":
      return { status: 404, message: "Data tidak ditemukan", code: "NOT_FOUND" };
    case "P2002":
      return { status: 409, message: "Data sudah ada (duplikat)", code: "CONFLICT" };
    case "P2003":
      return { status: 400, message: "Relasi data tidak valid", code: "FOREIGN_KEY" };
    default:
      return { status: 500, message: "Database error", code: error.code };
  }
};

export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (error instanceof AppError) {
    const body: ErrorResponse = {
      success: false,
      message: error.message,
      code: error.code,
    };
    return res.status(error.statusCode).json(body);
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const mapped = mapPrismaError(error);
    return res.status(mapped.status).json({
      success: false,
      message: mapped.message,
      code: mapped.code,
    });
  }

  if (error instanceof ZodError) {
    const message = error.issues
      .map((i) => `${i.path.join(".") || "field"}: ${i.message}`)
      .join(", ");
    return res.status(400).json({
      success: false,
      message,
      code: "VALIDATION_ERROR",
    });
  }

  console.error("🔥 Unhandled error:", error);
  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};