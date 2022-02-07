import React, { createContext, Dispatch, useContext, useReducer } from "react";
import useSnackbar from "src/hooks/snackbar/useSnackbar";
import SnackbarPortal, {
  ISnackbarPortal,
} from "../components/SnackbarPortal/SnackbarPortal";

import {
  Action,
  ActionType,
  initialState,
  Snackbar,
  snackbarContainerReducer,
} from "./snackbarContainerReducer";

export type PortalID = string | number;
interface State {
  /** snackbar portal unique id */
  id?: PortalID;
  /** list including snackbar items */
  snackbars: Snackbar[];
  /** dispatcher function to able on or off snackbar */
  dispatch: SnackbarDispatch;
}
interface Props {
  /** portal id */
  id?: PortalID;
  /** portal option */
  option?: Omit<ISnackbarPortal, "snackbar">;
  /** React Child Components */
  children: React.ReactNode;
}

type SnackbarDispatch = Dispatch<Action>;

export const SnackbarContext = createContext<State | null>(null);

export const SnackbarContextProvider = ({
  id,
  option,
  children,
}: Props): JSX.Element => {
  const [snackbars, dispatch] = useReducer(
    snackbarContainerReducer,
    initialState
  );
  const off = (id: string) =>
    dispatch({
      type: ActionType.REMOVE,
      payload: { id },
    });

  return (
    <SnackbarContext.Provider value={{ id, snackbars, dispatch }}>
      {children}

      <SnackbarPortal {...option} id={id} snackbars={snackbars} off={off} />
    </SnackbarContext.Provider>
  );
};
