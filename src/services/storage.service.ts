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

/**
 * Persists the compact view preference to session storage.
 * Compact view reduces spacing and sizes to fit more timers on screen.
 * @param compactView - Boolean indicating if compact view is enabled
 */
function setCompactViewToSessionStorage(compactView: boolean) {
  sessionStorage.setItem(STORAGE_CONSTANTS.COMPACT_VIEW, compactView.toString());
}

/**
 * Retrieves the compact view preference from session storage.
 * @returns Boolean indicating if compact view is enabled (defaults to false)
 */
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
