import React, { createContext, Dispatch, useReducer } from "react";

import {
  Action,
  initialState,
  Snackbar,
  snackbarContainerReducer,
} from "./snackbarContainerReducer";

interface State {
  snackbars: Snackbar[];
  dispatch: SnackbarDispatch;
}
interface Props {
  children: React.ReactNode;
}

type SnackbarDispatch = Dispatch<Action>;

export const SnackbarContext = createContext<State | null>(null);

export const SnackbarContextProvider = (props: Props): JSX.Element => {
  const [snackbars, dispatch] = useReducer(
    snackbarContainerReducer,
    initialState
  );

  return (
    <SnackbarContext.Provider value={{ snackbars, dispatch }}>
      {props.children}
    </SnackbarContext.Provider>
  );
};
