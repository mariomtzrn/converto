import { createRoot } from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter } from "react-router";

import App from "@/App.tsx";
import { Provider as UIProvider } from "@/components/ui/provider.tsx";
import { store } from "@/store";
import "@/index.css";

createRoot(document.getElementById("root")!).render(
  <ReduxProvider store={store}>
    <BrowserRouter>
      <UIProvider>
        <App />
      </UIProvider>
    </BrowserRouter>
  </ReduxProvider>,
);
