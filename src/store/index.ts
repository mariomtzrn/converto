import { configureStore, Middleware } from "@reduxjs/toolkit";
import logger from "redux-logger";

import authReducer from "@/slices/authSlice";
import currencyReducer from "@/slices/currencySlice";
import lengthReducer from "@/slices/lengthSlice";
import massReducer from "@/slices/massSlice";
import temperatureReducer from "@/slices/temperatureSlice";
import timeReducer from "@/slices/timeSlice";
import volumeReducer from "@/slices/volumeSlice";
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
    length: lengthReducer,
    mass: massReducer,
    temperature: temperatureReducer,
    time: timeReducer,
    volume: volumeReducer,
    weather: weatherReducer,
  },
});

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
