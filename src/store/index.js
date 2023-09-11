import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "./Auth";
import pageRouterReducer from "./PageRouter";
import notificationReducer from "./Notification";
import chatStoreReducer from "./ChatStore";
import paginationStoreReducer from "./PagiNation";

const store = configureStore({
  reducer: {
    authToken: tokenReducer,
    pageRouter: pageRouterReducer,
    notification: notificationReducer,
    chatStore: chatStoreReducer,
    paginationStore: paginationStoreReducer,
  },
});
export default store;
