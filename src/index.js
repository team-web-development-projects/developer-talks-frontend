import ReactDOM from "react-dom/client";
// import { HashRouter } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import { unstable_HistoryRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Provider } from "react-redux";
import history from "./hooks/useHistory";
import { CookiesProvider } from "react-cookie";
import { isDev } from "util/Util";
import App from "./App";
import "./assets/style/index.scss";
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

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("firebase-messaging-sw.js")
    .then(function (registration) {
      console.log("Registration successful, scope is:", registration.scope);
    })
    .catch(function (err) {
      console.log("Service worker registration failed, error:", err);
    });
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          {/* <BrowserRouter basename={isDev ? "/" : "/developer-talks-frontend/"}> */}
          <App />
          <ReactQueryDevtools initialIsOpen={false} />
          {/* </BrowserRouter> */}
        </BrowserRouter>
      </QueryClientProvider>
    </CookiesProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
