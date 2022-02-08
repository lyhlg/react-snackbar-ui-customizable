import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import Snackbar from ".";
import { SnackbarContextProvider } from "../../context/snackbarContext";
import useSnackbar from "../../hooks/snackbar/useSnackbar";

export default {
  title: "Snackbar",
  component: Snackbar,
} as ComponentMeta<typeof Snackbar>;

const ChildTemplate = (args) => {
  const snackbar = useSnackbar();
  return (
    <button onClick={() => snackbar.on({ ...args })}>show snackbar</button>
  );
};

const Template: ComponentStory<typeof Snackbar> = (args) => {
  return (
    <SnackbarContextProvider
      id="snackbar-portal"
      option={{ position: "bottom-center" }}
    >
      <ChildTemplate {...args} />
    </SnackbarContextProvider>
  );
};

export const WithProgressbar = Template.bind({});
WithProgressbar.args = {
  type: "SUCCESS",
  title: "What is Lorem Ipsum?",
  message:
    "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  buttonText: "Action Button",
  duration: 5,
};
export const Warning = Template.bind({});
Warning.args = {
  type: "WARN",
  title: "What is Lorem Ipsum?",
  message:
    "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  buttonText: "Action Button",
};

export const Error = Template.bind({});
Error.args = {
  type: "ERROR",
  title: "What is Lorem Ipsum?",
  message:
    "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  buttonText: "Action Button",
};

export const Info = Template.bind({});
Info.args = {
  type: "INFO",
  title: "What is Lorem Ipsum?",
  message:
    "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  buttonText: "Action Button",
};
