import { useContext } from "react";
import { v4 as uuidv4 } from "uuid";

import { ActionType } from "../../../context/snackbarContainerReducer";
import { SnackbarContext } from "../../../context/snackbarContext";

type ReturnSnackbar<T> = {
  on: (options: T) => void;
  off: (id: string) => void;
  length: number,
  list: (T & { id: number })[]
}

const useSnackbar = <T>(): ReturnSnackbar<T> | null => {
  const context = useContext(SnackbarContext);
  if (!context) return null

  return {
    on: (options: Omit<T, 'id'>) => {
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
