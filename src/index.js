import Recat from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./Redux/store";

ReactDOM.render(
  <Recat.StrictMode>

    <Provider store={store}>
      < BrowserRouter >
        <App />
      </BrowserRouter>
    </Provider>

  </Recat.StrictMode>,
  document.getElementById("root")
);