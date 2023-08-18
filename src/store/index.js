import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./Auth";
import pageRouterReducer from "./PageRouter";
import notificationReducer from './Notification';
import chatStoreReducer from "./ChatStore";

export default configureStore({
  reducer: {
    authToken: tokenReducer,
    pageRouter: pageRouterReducer,
    notification: notificationReducer,
    chatStore: chatStoreReducer,
  },
});
