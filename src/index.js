import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import reportWebVitals from "./reportWebVitals";

const queryClient = new QueryClient({
  onError: (error, query) => {
    console.log("onError", error);
  },
  onSuccess: (data) => {
    console.log("전역이 업데이트됨?", data);
  },
  // defaultOptions: {
  //   queries: {
  //     retry: 0,
  //     suspense: true,
  //     refetchOnMount: false,
  //     refetchOnReconnect: false,
  //     refetchOnWindowFocus: false,
  //   },
  // },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HashRouter basename={"/"}>
      <QueryClientProvider client={queryClient}>
        <App />
        {/* NOTE: 추후에 react-query 작업하실때 아래의 컴포넌트로 query 테스트 할수 있습니다. 
        <ReactQueryDevtools initialIsOpen={true} />
      */}
      </QueryClientProvider>
    </HashRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
