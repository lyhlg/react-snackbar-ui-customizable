import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Snackbar as ISnackbar } from "../../context/snackbarContainerReducer";
import Snackbar from "../../components/Snackbar";
import { SnackbarContext } from "../../context/snackbarContext";
import useSnackbar from "../../hooks/snackbar/useSnackbar";
import "./SnackbarPortal.css";

export interface ISnackbarPortal {
  option?: {
    position?:
      | "top-left"
      | "top-center"
      | "top-right"
      | "bottom-left"
      | "bottom-center"
      | "bottom-right";
    zIndex?: string | number;
  };
  snackbars: ISnackbar[];
}

const SnackbarPortal = ({
  option,
}: ISnackbarPortal): React.ReactPortal | null => {
  const snackbarContext = useContext(SnackbarContext);
  const snackbar = useSnackbar();

  const _position = option?.position ? option.position : "top-right";
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
    div.style.zIndex = option?.zIndex ? option.zIndex.toString() : "100";

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
  }, [horizontalPosition, option?.zIndex, portalId, verticalPosition]);

  if (!(loaded && snackbar && snackbar?.length > 0)) {
    return null;
  }

  const orderByCreatedAt = snackbarContext
    ? snackbarContext?.snackbars.slice().reverse()
    : [];

  return ReactDOM.createPortal(
    <div>
      {orderByCreatedAt.map((sb) => (
        <Snackbar {...sb} key={sb.id} onClose={snackbar.off} duration={0} />
      ))}
    </div>,
    document.getElementById(portalId) as HTMLElement
  );
};

export default SnackbarPortal;
