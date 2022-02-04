import { addDecorator } from "@storybook/react";
import { SnackbarContextProvider } from "../src/context/snackbarContext";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

const AppDecorator = (storyFn) => {
  return (
    <SnackbarContextProvider
      id="snackbar-portal"
      option={{ position: "top-right" }}
    >
      {storyFn()}
    </SnackbarContextProvider>
  );
};

addDecorator(AppDecorator);
