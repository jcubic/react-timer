import { StrictMode } from "react";
import ReactDOMClient from "react-dom/client";

import App from "./components/App";

const rootElement = document.getElementById("root") as HTMLElement;
const root = ReactDOMClient.createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
