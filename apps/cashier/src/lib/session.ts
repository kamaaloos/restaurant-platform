import { createStaffSession } from "@org/shared";
import type { AuthUser } from "./types";

export const {
  getAccessToken,
  getStoredUser,
  setSession,
  clearSession,
  refreshAccessToken,
  restoreSession,
  logoutSession,
  subscribeAccessToken,
} = createStaffSession<AuthUser>({
  userStorageKey: "cashier.user",
  legacyTokenKey: "cashier.accessToken",
  legacyUserKey: "cashier.user",
});
