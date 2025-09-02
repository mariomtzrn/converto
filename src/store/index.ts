import { configureStore, Middleware } from "@reduxjs/toolkit";
import logger from "redux-logger";

import authReducer from "@/slices/authSlice";
import currencyReducer from "@/slices/currencySlice";
import unitReducer from "@/slices/unitSlice";
import weatherReducer from "@/slices/weatherSlice";

// Logger middleware in dev environment
const middlewares: Middleware[] = [
  import.meta.env.VITE_NODE_ENV === "development" && logger,
].filter(Boolean) as Middleware[];

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(middlewares),
  reducer: {
    auth: authReducer,
    currency: currencyReducer,
    unit: unitReducer,
    weather: weatherReducer,
  },
});

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
