import { encrypt, decrypt } from "@/lib/crypto";
import api from "@/lib/api";

export interface RegisterPayload {
  name: string;
  email: string;
  password?: string;
}

export interface LoginPayload {
  email: string;
  password?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  expiresInMs?: number;
  idleTimeoutMs?: number;
}

export async function registerUser(payload: RegisterPayload): Promise<AuthResponse> {
  try {
    const encryptedBody = encrypt(payload);
    const res = await api.post("/frontend/auth/register", { data: encryptedBody });
    const decrypted = decrypt(res.data.data);
    return decrypted;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.data) {
      try {
        const decrypted = decrypt(error.response.data.data);
        return decrypted;
      } catch (e) {}
    }
    return {
      success: false,
      message: error.response?.data?.message || error.message || "An error occurred during registration",
    };
  }
}

export async function loginUser(payload: LoginPayload): Promise<AuthResponse> {
  try {
    const encryptedBody = encrypt(payload);
    const res = await api.post("/frontend/auth/login", { data: encryptedBody });
    const decrypted = decrypt(res.data.data);
    return decrypted;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.data) {
      try {
        const decrypted = decrypt(error.response.data.data);
        return decrypted;
      } catch (e) {}
    }
    return {
      success: false,
      message: error.response?.data?.message || error.message || "An error occurred during login",
    };
  }
}

export async function forgotPassword(email: string): Promise<AuthResponse> {
  try {
    const encryptedBody = encrypt({ email });
    const res = await api.post("/frontend/auth/forgot-password", { data: encryptedBody });
    const decrypted = decrypt(res.data.data);
    return decrypted;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.data) {
      try {
        const decrypted = decrypt(error.response.data.data);
        return decrypted;
      } catch (e) {}
    }
    return {
      success: false,
      message: error.response?.data?.message || error.message || "An error occurred during forgot password request",
    };
  }
}

export async function logoutUser(): Promise<AuthResponse> {
  try {
    const res = await api.post("/frontend/auth/logout");
    const decrypted = decrypt(res.data.data);
    return decrypted;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.data) {
      try {
        const decrypted = decrypt(error.response.data.data);
        return decrypted;
      } catch (e) {}
    }
    return {
      success: false,
      message: error.response?.data?.message || error.message || "An error occurred during logout",
    };
  }
}
