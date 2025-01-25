import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { Alert } from "./context/UseAlert.tsx";
import { Modal } from "./context/UseModal.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Alert>
        <Modal>
          <App />
        </Modal>
      </Alert>
    </BrowserRouter>
  </StrictMode>
);
