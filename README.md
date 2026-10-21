# @sandsoftwaresolutions/problem-details

Small, dependency-free helpers for [RFC 9457 Problem Details](https://www.rfc-editor.org/rfc/rfc9457) JSON errors.

```bash
npm install @sandsoftwaresolutions/problem-details
```

Works with `import` and `require()`, and ships TypeScript types for both.

```js
import { problemResponse } from "@sandsoftwaresolutions/problem-details";

return problemResponse({ status: 422, detail: "Validation failed", errors: { email: "Invalid address" } });
```

`createProblem` creates a consistent error payload; `problemResponse` returns a fetch-compatible response with `application/problem+json`; `ProblemDetailsError` lets application code intentionally throw a public API error; `fromError` converts unknown failures to a safe generic 500 without leaking internals.
