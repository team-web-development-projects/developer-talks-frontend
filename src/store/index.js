import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./Auth";
import pageRouterReducer from "./PageRouter";
import notificationReducer from './Notification';

export default configureStore({
  reducer: {
    authToken: tokenReducer,
    pageRouter: pageRouterReducer,
    notification: notificationReducer,
  },
});
