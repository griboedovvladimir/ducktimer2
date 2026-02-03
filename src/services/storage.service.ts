import { STORAGE_CONSTANTS } from '../CONSTANTS';

function setTokenToLocalStorage(token: string) {
  localStorage.setItem(STORAGE_CONSTANTS.AUTH_TOKEN, token);
}

function setTokenToSessionStorage(token: string) {
  sessionStorage.setItem(STORAGE_CONSTANTS.AUTH_TOKEN, token);
}

function getTokenFromLocalStorage(): string | null {
  return localStorage.getItem(STORAGE_CONSTANTS.AUTH_TOKEN);
}

function getTokenFromSessionStorage(): string | null {
  return sessionStorage.getItem(STORAGE_CONSTANTS.AUTH_TOKEN);
}

function removeTokenFromLocalStorage() {
  localStorage.removeItem(STORAGE_CONSTANTS.AUTH_TOKEN);
}

function removeTokenFromSessionStorage() {
  sessionStorage.removeItem(STORAGE_CONSTANTS.AUTH_TOKEN);
}

function setThemeToSessionStorage(theme: string) {
  sessionStorage.setItem(STORAGE_CONSTANTS.THEME, theme);
}

function getThemeFromLocalStorage(): string | null {
  return sessionStorage.getItem(STORAGE_CONSTANTS.THEME);
}

function setCompactViewToSessionStorage(compactView: boolean) {
  sessionStorage.setItem(STORAGE_CONSTANTS.COMPACT_VIEW, compactView.toString());
}

function getCompactViewFromSessionStorage(): boolean {
  const value = sessionStorage.getItem(STORAGE_CONSTANTS.COMPACT_VIEW);
  return value === 'true';
}

export const storageService = {
  setTokenToLocalStorage,
  setTokenToSessionStorage,
  getTokenFromLocalStorage,
  getTokenFromSessionStorage,
  removeTokenFromLocalStorage,
  removeTokenFromSessionStorage,
  setThemeToSessionStorage,
  getThemeFromLocalStorage,
  setCompactViewToSessionStorage,
  getCompactViewFromSessionStorage,
};
