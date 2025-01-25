import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducers/auth";
import api from "./api/api";
import miscSlice from "./reducers/misc";
import chatSlice from "./reducers/chat";

const store = configureStore({
  // isme hme reducers pas krne hote hai ye combine reducers ki trh kaam krta hai
  //isme hum multiple reducres de skte hai ye combine ho kr ek reducre ki trh behave krega ye toolkit ka behaviour hai
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [miscSlice.name]: miscSlice.reducer,
    [chatSlice.name]: chatSlice.reducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (mid) => [...mid(), api.middleware],
});

export default store;