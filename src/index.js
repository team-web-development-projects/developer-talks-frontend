import React from "react";
import ReactDOM from "react-dom/client";
// import { HashRouter } from "react-router-dom";
import {
  BrowserRouter
} from "react-router-dom";
import App from "./App";
// import "./index.scss";
// import './assets/style/index.scss';
import { CookiesProvider } from "react-cookie";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Provider } from "react-redux";
import { isDev } from "util/Util";
import reportWebVitals from "./reportWebVitals";
import store from "./store";

const queryClient = new QueryClient({
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
          <BrowserRouter basename={isDev ? "/" : "/developer-talks-frontend/"}>
            <App />
            <ReactQueryDevtools initialIsOpen={false} />
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
