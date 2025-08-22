import { createAsyncThunk } from "@reduxjs/toolkit";

import AuthAPIError from "@/classes/AuthAPIError";
import handleRequestError from "@/lib/error";

const { VITE_API_URL } = import.meta.env;

interface CallbackParams {
  email: string;
  password: string;
}

interface SignInResponse {
  user: {
    email: string;
    id: string;
    username: string;
  };
}

interface SignupParams extends CallbackParams {
  passwordConfirm: string;
  username: string;
}

export const signinUser = createAsyncThunk<
  SignInResponse,
  CallbackParams,
  { rejectValue: string }
>("auth/signin", async ({ email, password }, { rejectWithValue }) => {
  try {
    const res = await fetch(`${VITE_API_URL}/auth/signin`, {
      body: JSON.stringify({ email, password }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const data = (await res.json()) as SignInResponse;

    if (!res.ok) {
      const errorMessage = handleRequestError(res.status);
      throw new AuthAPIError(errorMessage ?? "Sign in failed");
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

export const signoutUser = async (): Promise<null | SignInResponse> => {
  try {
    const res = await fetch(`${VITE_API_URL}/auth/signout`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const data = (await res.json()) as SignInResponse;

    if (!res.ok) {
      const errorMessage = handleRequestError(res.status);
      throw new AuthAPIError(errorMessage ?? "Sign out failed");
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
  SignInResponse,
  SignupParams,
  { rejectValue: string }
>(
  "auth/signup",
  async (
    { email, password, passwordConfirm, username },
    { rejectWithValue },
  ) => {
    try {
      const res = await fetch(`${VITE_API_URL}/auth/signup`, {
        body: JSON.stringify({ email, password, passwordConfirm, username }),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      const data = (await res.json()) as SignInResponse;

      if (!res.ok) {
        const errorMessage = handleRequestError(res.status);
        throw new AuthAPIError(errorMessage ?? "Sign up failed");
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
  },
);

export const verifySession = async () => {
  try {
    const res = await fetch(`${VITE_API_URL}/auth/session`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    });

    const data = (await res.json()) as SignInResponse;

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
