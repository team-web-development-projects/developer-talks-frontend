import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./Auth";
import pageRouterReducer from "./PageRouter";

export default configureStore({
  reducer: {
    authToken: tokenReducer,
    pageRouter: pageRouterReducer,
  },
});
