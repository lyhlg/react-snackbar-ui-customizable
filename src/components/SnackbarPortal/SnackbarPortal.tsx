import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Snackbar as ISnackbar } from "../../context/snackbarContainerReducer";
import Snackbar, { SnackbarPublicProps } from "../../components/Snackbar";
import GlobalStyle from "../../styles/globalStyle";
import { PortalID } from "../../context/snackbarContext";

export interface ISnackbarPortal extends SnackbarPublicProps {
  id?: PortalID;
  off?: (id: string) => void;
  zIndex?: string | number;
  snackbars?: ISnackbar[];
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
  snackbars = [],
  ...snackbarGlobalOptions
}: ISnackbarPortal): React.ReactPortal | null => {
  const _position = position ?? "top-right";
  const [loaded, setLoaded] = useState(false);
  const portalId = id ? id.toString() : "snackbar-portal";
  const [verticalPosition, horizontalPosition] = _position.split("-");

  useEffect(() => {
    if (typeof window === "undefined") return;

    // const wrapper = document.createElement("div");

    const div = document.createElement("div");
    div.setAttribute("role", "log");
    div.style.zIndex = zIndex ? zIndex.toString() : "100";
    div.id = portalId;
    div.style.position = "fixed";
    div.style[verticalPosition as any] = "10px";
    // div.style.overflowY = "scroll";
    div.style.overflowX = "hidden";

    if ((verticalPosition as any) === "top") {
      div.style.top = "10px";
    }
    if ((verticalPosition as any) === "bottom") {
      div.style.bottom = "10px";
      div.style.display = "flex";
      div.style.justifyContent = "flex-end";
      div.style.flexDirection = "column";
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
    // wrapper.appendChild(div);
    document.getElementsByTagName("body")[0].prepend(div);

    setLoaded(true);

    return () => {
      document.getElementsByTagName("body")[0].removeChild(div);
    };
  }, [horizontalPosition, zIndex, portalId, verticalPosition]);

  if (!(loaded && snackbars && snackbars?.length > 0)) {
    return null;
  }

  const orderByCreatedAt = snackbars.slice().reverse();

  return ReactDOM.createPortal(
    <div>
      <GlobalStyle />
      {orderByCreatedAt.map((snackbarLocalOption) => (
        <Snackbar
          position={_position}
          key={snackbarLocalOption.id}
          onClose={off}
          {...snackbarGlobalOptions}
          {...snackbarLocalOption}
        />
      ))}
    </div>,
    document.getElementById(portalId) as HTMLElement
  );
};

export default SnackbarPortal;
