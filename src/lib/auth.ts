import { jwtDecode } from "jwt-decode";

type DecodedToken = {
  userId: string;
  iat?: number;
  exp?: number;
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const getDecodedToken = (): DecodedToken | null => {
  const token = getToken();
  if (!token) return null;

  try {
    return jwtDecode<DecodedToken>(token);
  } catch (err) {
    return null;
  }
};

export const getCurrentUserId = (): string | null => {
  const decoded = getDecodedToken();
  return decoded?.userId ?? null;
};