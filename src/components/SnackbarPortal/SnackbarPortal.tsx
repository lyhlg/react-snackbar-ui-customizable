import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Snackbar as ISnackbar } from "../../context/snackbarContainerReducer";
import Snackbar, { SnackbarPublicProps } from "../../components/Snackbar";
import useSnackbar from "../../hooks/snackbar/useSnackbar";
import GlobalStyle from "../../styles/globalStyle";
import { PortalID } from "../../context/snackbarContext";

export interface ISnackbarPortal extends SnackbarPublicProps {
  id?: PortalID;
  off?: (id: string) => void;
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
  id,
  off,
  zIndex,
  position,
  snackbars,
  ...snackbarOptions
}: ISnackbarPortal): React.ReactPortal | null => {
  // const snackbar = useSnackbar();

  const _position = position ?? "top-right";
  const [loaded, setLoaded] = useState(false);
  const portalId = id ? id.toString() : "snackbar-portal";
  const [verticalPosition, horizontalPosition] = _position.split("-");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const wrapper = document.createElement("div");
    wrapper.setAttribute("role", "log");
    wrapper.style.zIndex = zIndex ? zIndex.toString() : "100";

    const div = document.createElement("div");
    div.id = portalId;
    div.style.position = "absolute";
    div.style[verticalPosition as any] = "10px";
    div.style.overflowY = "scroll";
    div.style.overflowX = "hidden";

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
    wrapper.appendChild(div);
    document.getElementsByTagName("body")[0].prepend(wrapper);

    setLoaded(true);

    return () => {
      document.getElementsByTagName("body")[0].removeChild(wrapper);
    };
  }, [horizontalPosition, zIndex, portalId, verticalPosition]);

  if (!(loaded && snackbars && snackbars?.length > 0)) {
    return null;
  }

  const orderByCreatedAt = snackbars.slice().reverse();

  return ReactDOM.createPortal(
    <div>
      <GlobalStyle />
      {orderByCreatedAt.map((sb) => (
        <Snackbar key={sb.id} {...snackbarOptions} {...sb} onClose={off} />
      ))}
    </div>,
    document.getElementById(portalId) as HTMLElement
  );
};

export default SnackbarPortal;
