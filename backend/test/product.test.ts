import { beforeAll, describe, expect } from "vitest";
import { prisma } from "../src/lib/prisma";
import request from "supertest";
import app from "../src/app.js";

describe("GET /api/products", () => {
  beforeAll(async () => {
    await prisma.products.create({
      data: {
        name: "Test Coffee",
        price: 50000,
        type: "Filter",
        category: "Single Origin",
        is_liked: false,
        is_special: false,
      },
    });
  });

  it("returns 200 with array", async () => {
    const res = await request(app).get("/api/products");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  describe("PATCH /api/products/:id/like", () => {
    it("returns 401 without session", async () => {
      const res = await request(app).patch("/api/products/1/like");
      expect(res.status).toBe(401);
      expect(res.body.code).toBe("UNAUTHORIZED");
    });

    it("returns 400 for invalid id", async () => {
      const res = await request(app).patch("/api/products/abc/like");
      expect(res.status).toBe(400);
      expect(res.body.code).toBe("VALIDATION_ERROR");
    });
  });
});
