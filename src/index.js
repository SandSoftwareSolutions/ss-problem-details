const titles = { 400: "Bad Request", 401: "Unauthorized", 403: "Forbidden", 404: "Not Found", 409: "Conflict", 422: "Unprocessable Content", 429: "Too Many Requests", 500: "Internal Server Error" };

export class ProblemDetailsError extends Error {
  constructor(problem) { super(problem.detail ?? problem.title ?? "API error"); this.name = "ProblemDetailsError"; this.problem = createProblem(problem); }
}

export function createProblem({ type = "about:blank", status = 500, title = titles[status] ?? "Error", detail, instance, ...extensions } = {}) {
  if (!Number.isSafeInteger(status) || status < 400 || status > 599) throw new RangeError("status must be an HTTP error status");
  return { type, title, status, ...(detail === undefined ? {} : { detail }), ...(instance === undefined ? {} : { instance }), ...extensions };
}

export function problemResponse(problem, init = {}) {
  const value = createProblem(problem);
  return new Response(JSON.stringify(value), { ...init, status: value.status, headers: { "content-type": "application/problem+json", ...init.headers } });
}

export function fromError(error, { instance } = {}) {
  if (error instanceof ProblemDetailsError) return error.problem;
  return createProblem({ status: 500, detail: "An unexpected error occurred", instance });
}
