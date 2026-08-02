import { createDeviceTokenStorage } from "@org/shared";

const storage = createDeviceTokenStorage("waiter.deviceToken");

export const getStoredDeviceToken = storage.get;
export const setStoredDeviceToken = storage.set;
export const clearStoredDeviceToken = storage.clear;
