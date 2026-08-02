import { ApiError } from "@org/shared";

/** Pull a user-facing message from ApiError / Error / unknown. */
export function extractApiMessage(error: unknown, fallback = "Something went wrong") {
  if (error instanceof ApiError) {
    return error.message || fallback;
  }
  if (error instanceof Error && error.message) {
    return error.message;
  }
  if (typeof error === "string" && error.trim()) {
    return error;
  }
  return fallback;
}
