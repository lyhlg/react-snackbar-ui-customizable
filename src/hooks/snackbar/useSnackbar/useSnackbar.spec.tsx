import { act, renderHook } from "@testing-library/react-hooks";
import React from "react";

import {
  ActionType,
  Snackbar,
} from "../../../context/snackbarContainerReducer";
import { SnackbarContextProvider } from "../../../context/snackbarContext";

import useSnackbar from ".";

describe("useSnackbar", () => {
  const id = "react-snackbar-portal";
  let wrapper: any;
  let snackbars: Snackbar[];
  let mockDispatch: any;
  let mockUseContext: any;
  beforeEach(() => {
    wrapper = ({ children }: { children: React.ReactNode }) => (
      <SnackbarContextProvider id={id}>{children}</SnackbarContextProvider>
    );
    snackbars = [];

    mockDispatch = jest.fn().mockImplementation(({ type, payload }) => {
      let _snackbars: Snackbar[] = snackbars;
      switch (type) {
        case ActionType.ADD:
          _snackbars.push(payload.options);
          snackbars = _snackbars;
          break;
        case ActionType.REMOVE:
          _snackbars = snackbars.filter((s) => s.id !== payload.id);
          snackbars = _snackbars;
          break;
        default:
          break;
      }
    });
    mockUseContext = jest.fn().mockImplementation(() => ({
      snackbars: [],
      dispatch: mockDispatch,
    }));

    React.useContext = mockUseContext;
  });
  describe("After rendering snackbar container", () => {
    test("When adding snackbar, it added to snackbar list", () => {
      const { result } = renderHook(() => useSnackbar(), { wrapper });

      act(() => {
        result.current?.on({ message: "message" });
      });

      expect(mockUseContext).toHaveBeenCalled();
      expect(snackbars).toHaveLength(1);
    });

    test("When deleting snackbar, it deleted from snackbar list", () => {
      const { result } = renderHook(() => useSnackbar(), { wrapper });

      act(() => {
        result.current?.on({ message: "message1" });
        result.current?.on({ message: "message2" });
        result.current?.on({ message: "message3" });
      });

      expect(snackbars).toHaveLength(3);

      act(() => {
        const id = snackbars[0].id;
        result.current?.off(id);
      });

      expect(snackbars).toHaveLength(2);
    });
  });
});
