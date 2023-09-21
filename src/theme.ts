import { createTheme } from "@mantine/core";

export const theme = createTheme({
  fontFamily: "Roboto, sans-serif",
  primaryColor: "green",
  headings: {
    fontFamily: "Roboto, sans-serif",
    fontWeight: "bold",
    sizes: {
      h1: {
        fontSize: "4rem",
        lineHeight: "1.1",
      },
    },
  },
});
