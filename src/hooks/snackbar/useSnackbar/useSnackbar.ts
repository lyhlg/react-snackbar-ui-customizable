import { useContext } from "react";
import { SnackbarProps } from "../../../components/Snackbar";
import { v4 as uuidv4 } from "uuid";

import { ActionType } from "../../../context/snackbarContainerReducer";
import { SnackbarContext } from "../../../context/snackbarContext";

type ReturnSnackbar = {
  on: (options: SnackbarProps) => void;
  off: (id: string) => void;
  length: number,
  list: (SnackbarProps & { id: number })[]
}

const useSnackbar = (): ReturnSnackbar | null => {
  const context = useContext(SnackbarContext);
  if (!context) return null

  return {
    on: (options: Omit<SnackbarProps, 'id' | 'position'>) => {
      context.dispatch({
        type: ActionType.ADD,
        payload: { options: { ...options, id: uuidv4() } },
      });
    },
    off: (id: string) => {
      context.dispatch({
        type: ActionType.REMOVE,
        payload: { id },
      });
    },
    length: context.snackbars.length,
    list: context.snackbars,
  }
};

export default useSnackbar;
