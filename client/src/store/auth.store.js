/**
 * Simple auth helper (can upgrade to Zustand later)
 */

export const setAuth = (accessToken) => {
  localStorage.setItem("accessToken", accessToken);
};

export const clearAuth = () => {
  localStorage.removeItem("accessToken");
};

export const isAuthenticated = () => {
  return Boolean(localStorage.getItem("accessToken"));
};
