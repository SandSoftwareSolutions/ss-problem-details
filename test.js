import assert from "node:assert/strict";
import test from "node:test";
import { ProblemDetailsError, createProblem, fromError, problemResponse } from "./src/index.js";
test("creates a standard problem", () => assert.deepEqual(createProblem({ status: 404, detail: "User not found" }), { type: "about:blank", title: "Not Found", status: 404, detail: "User not found" }));
test("creates an RFC problem response", async () => { const response = problemResponse({ status: 422, errors: { email: "Invalid" } }); assert.equal(response.headers.get("content-type"), "application/problem+json"); assert.equal((await response.json()).errors.email, "Invalid"); });
test("does not expose unexpected errors", () => assert.equal(fromError(new Error("database password")).detail, "An unexpected error occurred"));
test("keeps explicit API errors", () => assert.equal(fromError(new ProblemDetailsError({ status: 409 })).status, 409));
