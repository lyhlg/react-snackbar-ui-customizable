import { addDecorator } from "@storybook/react";
import { SnackbarContextProvider } from "../src/context/snackbarContext";
import GlobalStyle from "../src/styles/globalStyle";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

const ChildApp = ({ storyFn }) => {
  return <>{storyFn()}</>;
};

const AppDecorator = (storyFn) => {
  return (
    <SnackbarContextProvider
      id="snackbar-portal"
      option={{ position: "top-right" }}
    >
      <GlobalStyle />
      <ChildApp storyFn={storyFn} />
    </SnackbarContextProvider>
  );
};

addDecorator(AppDecorator);
