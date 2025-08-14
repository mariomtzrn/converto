import { createAsyncThunk } from "@reduxjs/toolkit";

import handleRequestError from "@/lib/error";

import AuthAPIError from "../../classes/AuthAPIError";

const { VITE_API_URL } = import.meta.env;

interface CallbackParams {
  email: string;
  password: string;
}

interface LoginResponse {
  user: {
    email: string;
    id: string;
    username: string;
  };
}

interface SignupParams extends CallbackParams {
  username: string;
}

export const loginUser = createAsyncThunk<
  LoginResponse,
  CallbackParams,
  { rejectValue: string }
>("auth/login", async ({ email, password }, { rejectWithValue }) => {
  try {
    const res = await fetch(`${VITE_API_URL}/auth/login`, {
      body: JSON.stringify({ email, password }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const data = (await res.json()) as LoginResponse;

    if (!res.ok) {
      const errorMessage = handleRequestError(res.status);
      throw new AuthAPIError(errorMessage ?? "Login failed");
    }

    return data;
  } catch (error: unknown) {
    if (error instanceof AuthAPIError && error.message) {
      return rejectWithValue(error.message);
    } else if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue("Unknown error");
  }
});

export const logoutUser = async () => {
  try {
    const res = await fetch(`${VITE_API_URL}/auth/logout`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const data = (await res.json()) as LoginResponse;

    if (!res.ok) {
      const errorMessage = handleRequestError(res.status);
      throw new AuthAPIError(errorMessage ?? "Logout failed");
    }

    return data;
  } catch (error: unknown) {
    if (error instanceof AuthAPIError && error.message) {
      console.log("API: " + error.message);
    } else if (error instanceof Error) {
      console.log(error.message);
    }
    return null;
  }
};

export const signupUser = createAsyncThunk<
  LoginResponse,
  SignupParams,
  { rejectValue: string }
>("auth/signup", async ({ email, password, username }, { rejectWithValue }) => {
  try {
    const res = await fetch(`${VITE_API_URL}/auth/signup`, {
      body: JSON.stringify({ email, password, username }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const data = (await res.json()) as LoginResponse;

    if (!res.ok) {
      const errorMessage = handleRequestError(res.status);
      throw new AuthAPIError(errorMessage ?? "Signup failed");
    }

    return data;
  } catch (error: unknown) {
    if (error instanceof AuthAPIError && error.message) {
      return rejectWithValue(error.message);
    } else if (error instanceof Error) {
      return rejectWithValue(error.message);
    }
    return rejectWithValue("Unknown error");
  }
});

export const verifySession = async () => {
  try {
    const res = await fetch(`${VITE_API_URL}/auth/session`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    });

    const data = (await res.json()) as LoginResponse;

    if (!res.ok) {
      const errorMessage = handleRequestError(res.status);
      throw new AuthAPIError(errorMessage ?? "verifySession failed");
    }

    return data;
  } catch (error: unknown) {
    if (error instanceof AuthAPIError && error.message) {
      console.log("API: " + error.message);
    } else if (error instanceof Error) {
      console.log(error.message);
    }
    return null;
  }
};
