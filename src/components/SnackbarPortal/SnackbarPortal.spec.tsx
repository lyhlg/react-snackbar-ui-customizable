import { render, screen } from "@testing-library/react";
import React from "react";

import { SnackbarContextProvider } from "../../context/snackbarContext";

import SnackbarPortal from "./SnackbarPortal";

const id = "snackbar-portal";
describe("SnackbarPortal container", () => {
  test("랜더링을 하고 나면 document에 해당 element가 생성된다.", () => {
    const id = "react-snackbar-portal-id";
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <SnackbarContextProvider id={id}>{children}</SnackbarContextProvider>
    );
    render(<SnackbarPortal id={id} snackbars={[]} />);

    expect(screen.getByRole("log")).toBeInTheDocument();
  });

  test("When z index is injected, the default value is changed from 100 to the injected value.", () => {
    const id = "react-snackbar-portal-id";
    const fixture = 200;
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <SnackbarContextProvider id={id}>{children}</SnackbarContextProvider>
    );
    render(<SnackbarPortal id={id} snackbars={[]} zIndex={fixture} />);

    expect(screen.getByRole("log")).toHaveStyle("zIndex: 200");
  });
  describe("snackbar style according to position", () => {
    const id = "react-snackbar-portal-id";
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <SnackbarContextProvider id={id}>{children}</SnackbarContextProvider>
    );
    test("top-left", () => {
      const fixture = "top-left";
      render(<SnackbarPortal id={id} snackbars={[]} position={fixture} />);

      expect(screen.getByRole("log")).toHaveStyle(
        "top: 10px; bottom: 0; left: 10px"
      );
    });
    test("top-center", () => {
      const fixture = "top-center";
      render(<SnackbarPortal id={id} snackbars={[]} position={fixture} />);

      expect(screen.getByRole("log")).toHaveStyle(
        "top: 10px; bottom: 0; right: 50%; transform: translate(50%, 0)"
      );
    });
    test("top-right", () => {
      const fixture = "top-right";
      render(<SnackbarPortal id={id} snackbars={[]} position={fixture} />);

      expect(screen.getByRole("log")).toHaveStyle(
        "top: 10px; bottom: 0; right: 10px"
      );
    });
    test("bottom-left", () => {
      const fixture = "bottom-left";
      render(<SnackbarPortal id={id} snackbars={[]} position={fixture} />);

      expect(screen.getByRole("log")).toHaveStyle(
        "top: 0; bottom: 10px; left: 10px"
      );
    });
    test("bottom-center", () => {
      const fixture = "bottom-center";
      render(<SnackbarPortal id={id} snackbars={[]} position={fixture} />);

      expect(screen.getByRole("log")).toHaveStyle(
        "top: 0; bottom: 10px; right: 50%; transform: translate(50%, 0)"
      );
    });
    test("bottom-right", () => {
      const fixture = "bottom-right";
      render(<SnackbarPortal id={id} snackbars={[]} position={fixture} />);

      expect(screen.getByRole("log")).toHaveStyle(
        "top: 0; bottom: 10px; right: 10px;"
      );
    });
  });
});
