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
  userStorageKey: "admin.user",
  legacyTokenKey: "admin.accessToken",
  legacyUserKey: "admin.user",
});
