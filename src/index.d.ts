export interface ProblemDetails { type?: string; title?: string; status?: number; detail?: string; instance?: string; [extension: string]: unknown; }
export declare class ProblemDetailsError extends Error { readonly problem: ProblemDetails; constructor(problem: ProblemDetails); }
export declare function createProblem(problem?: ProblemDetails): ProblemDetails;
export declare function problemResponse(problem: ProblemDetails, init?: ResponseInit): Response;
export declare function fromError(error: unknown, options?: { instance?: string }): ProblemDetails;
