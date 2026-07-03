import { Prisma } from "@prisma/client";
import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public code: string,
    message: string,
    public details?: unknown,
  ) {
    super(message);
    this.name = "AppError";
  }
}

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (err instanceof ZodError) {
    res.status(400).json({
      error: {
        code: "VALIDATION_ERROR",
        message: "Invalid request",
        details: err.flatten(),
      },
    });
    return;
  }

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      error: {
        code: err.code,
        message: err.message,
        details: err.details,
      },
    });
    return;
  }

  // Translate known Prisma errors into actionable HTTP responses instead of
  // opaque 500s (e.g. a duplicate slug should tell the user to pick another).
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      const target = err.meta?.target;
      const fields = Array.isArray(target)
        ? target.join(", ")
        : typeof target === "string"
          ? target
          : "field";
      res.status(409).json({
        error: {
          code: "DUPLICATE",
          message: `A record with this ${fields} already exists. Please use a unique value.`,
          details: { fields: target },
        },
      });
      return;
    }
    if (err.code === "P2025") {
      res.status(404).json({
        error: {
          code: "NOT_FOUND",
          message: "The requested record no longer exists.",
        },
      });
      return;
    }
    if (err.code === "P2003") {
      res.status(409).json({
        error: {
          code: "FK_CONSTRAINT",
          message:
            "This record is still referenced by other data and cannot be changed or removed.",
        },
      });
      return;
    }
  }

  if (err instanceof Prisma.PrismaClientValidationError) {
    res.status(400).json({
      error: {
        code: "VALIDATION_ERROR",
        message: "One or more fields have an invalid value.",
      },
    });
    return;
  }

  console.error(err);
  const message =
    process.env.NODE_ENV === "production" ? "Internal server error" : String(err);
  res.status(500).json({
    error: {
      code: "INTERNAL_ERROR",
      message,
    },
  });
}
