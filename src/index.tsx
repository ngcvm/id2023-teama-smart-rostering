/**
 * The application index file
 */

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";

function EntryPoint() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      <App />
    </MantineProvider>
  );
}

ReactDOM.render(<EntryPoint />, document.getElementById("container"));
