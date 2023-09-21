/**
 * The application index file
 */

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import "@mantine/core/styles.css";
import "@mantine/dropzone/styles.css";
import { store } from "./store";
import { Provider as StoreProvider } from "react-redux";

const queryClient = new QueryClient();

function EntryPoint() {
  return (
    <StoreProvider store={store}>
      <MantineProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </QueryClientProvider>
      </MantineProvider>
    </StoreProvider>
  );
}

ReactDOM.render(<EntryPoint />, document.getElementById("container"));
