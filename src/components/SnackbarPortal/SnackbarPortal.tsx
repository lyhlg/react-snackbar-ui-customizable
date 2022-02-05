import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Snackbar as ISnackbar } from "../../context/snackbarContainerReducer";
import Snackbar, { SnackbarPublicProps } from "../../components/Snackbar";
import useSnackbar from "../../hooks/snackbar/useSnackbar";
import GlobalStyle from "../../styles/globalStyle";

export interface ISnackbarPortal extends SnackbarPublicProps {
  zIndex?: string | number;
  snackbars: ISnackbar[];
  position?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";
}

const SnackbarPortal = ({
  zIndex,
  position,
  snackbars,
  ...snackbarOptions
}: ISnackbarPortal): React.ReactPortal | null => {
  const snackbar = useSnackbar();

  const _position = position ?? "top-right";
  const [loaded, setLoaded] = useState(false);
  const portalId = "snackbar-portal";
  const [verticalPosition, horizontalPosition] = _position.split("-");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const div = document.createElement("div");
    div.setAttribute("role", "log");
    div.id = portalId;
    div.style.position = "fixed";
    div.style[verticalPosition as any] = "10px";
    div.style.overflowY = "scroll";
    div.style.overflowX = "hidden";
    div.style.zIndex = zIndex ? zIndex.toString() : "100";

    if ((verticalPosition as any) === "top") {
      div.style.top = "10px";
      div.style.bottom = "0";
    }
    if ((verticalPosition as any) === "bottom") {
      div.style.top = "0";
      div.style.bottom = "10px";
    }
    if (horizontalPosition === "right") {
      div.style.right = "10px";
    }
    if (horizontalPosition === "left") {
      div.style.left = "10px";
    }
    if (horizontalPosition === "center") {
      div.style.right = "50%";
      div.style.transform = "translate(50%, 0)";
    }
    document.getElementsByTagName("body")[0].prepend(div);

    setLoaded(true);

    return () => {
      document.getElementsByTagName("body")[0].removeChild(div);
    };
  }, [horizontalPosition, zIndex, portalId, verticalPosition]);

  if (!(loaded && snackbar && snackbar?.length > 0)) {
    return null;
  }

  const orderByCreatedAt = snackbars.slice().reverse();

  return ReactDOM.createPortal(
    <div>
      <GlobalStyle />
      {orderByCreatedAt.map((sb) => (
        <Snackbar
          {...snackbarOptions}
          {...sb}
          key={sb.id}
          onClose={snackbar.off}
          duration={0}
        />
      ))}
    </div>,
    document.getElementById(portalId) as HTMLElement
  );
};

export default SnackbarPortal;
