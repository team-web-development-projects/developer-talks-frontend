import React from "react";
import ReactDOM from "react-dom/client";
// import { HashRouter } from "react-router-dom";
import {
  unstable_HistoryRouter as Router,
  BrowserRouter,
} from "react-router-dom";
import App from "./App";
import history from "./hooks/useHistory";
// import "./index.scss";
// import './assets/style/index.scss';
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import reportWebVitals from "./reportWebVitals";

import store from "./store";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import { GOOGLE_ID } from "constants/api";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { isDev } from "util/Util";

const queryClient = new QueryClient({
  onError: (error, query) => {
    console.log("onError", error);
  },
  onSuccess: (data) => {
    console.log("전역이 업데이트됨?", data);
  },
  defaultOptions: {
    queries: {
      retry: 0,
      suspense: false,
      refetchOnMount: true,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CookiesProvider>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter
            basename={
              isDev
                ? "/"
                : "https://team-web-development-projects.github.io/developer-talks-frontend"
            }
          >
            <App />
            {/* NOTE: 추후에 react-query 작업하실때 아래의 컴포넌트로 query 테스트 할수 있습니다. 
        <ReactQueryDevtools initialIsOpen={true} />
      */}
          </BrowserRouter>
        </QueryClientProvider>
      </Provider>
    </CookiesProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
