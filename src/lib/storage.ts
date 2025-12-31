import { GuestAccount } from "@/types/account";

const STORAGE_KEY = "r1_guest_accounts";

export const loadAccounts = (): GuestAccount[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const saveAccounts = (accounts: GuestAccount[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(accounts));
};

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
