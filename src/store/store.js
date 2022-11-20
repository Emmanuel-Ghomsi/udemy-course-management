import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import courseReducer from "./reducers/courseReducer";

export default configureStore({
  reducer: {
    course: courseReducer,
  },
  middleware: [
    ...getDefaultMiddleware({
      serializableCheck: false,
    }),
  ],
});
