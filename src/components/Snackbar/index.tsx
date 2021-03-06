import styled, { keyframes, css } from "styled-components";
import React, { useEffect, useMemo, useState } from "react";
import {
  CheckCircleOutlined,
  CloseOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import useInterval from "../../hooks/useInterval";
import { ISnackbarPortal } from "../SnackbarPortal/SnackbarPortal";

export type SnackbarType = "SUCCESS" | "ERROR" | "WARN" | "INFO";

type ID = {
  /**
   * id
   */
  id: string;
};

export interface SnackbarPublicProps {
  /**
   * 0: infinity
   * 1 ~ : for the given time, snackbar appears and disappears
   * */
  duration?: number;
  /**
   * Success Icon
   */
  successIcon?: React.ReactNode | JSX.Element;
  /**
   * Error Icon
   */
  errorIcon?: React.ReactNode | JSX.Element;
  /**
   * Warning Icon
   */
  warnIcon?: React.ReactNode | JSX.Element;
  /**
   * Information Icon
   */
  infoIcon?: React.ReactNode | JSX.Element;
  /**
   * Close Icon
   */
  closeIcon?: React.ReactNode | JSX.Element;
}

export interface SnackbarProps extends SnackbarPublicProps {
  /**
   * snackbar message
   */
  message: string;
  /**
   * snackbar type ('SUCCESS' | 'ERROR' | 'WARN' | 'INFO')
   */
  type?: SnackbarType;
  /**
   * snack bar title
   */
  title?: string;
  /**
   * event for close snackbar
   */
  onClose?: (id: string) => void;
  /**
   * action button text located on the bottom
   */
  buttonText?: string;
  /**
   * action function when clicking action button
   * (caution) this property is always used with buttonText property
   */
  onClickButton?: () => void;
}

const StyleMapper = {
  SUCCESS: {
    color: "#ffffff",
    backgroundColor: "#37933c",
  },
  ERROR: {
    color: "#ffffff",
    backgroundColor: "#c92323",
  },
  WARN: {
    color: "#ffffff",
    backgroundColor: "#e78012",
  },
  INFO: {
    color: "#ffffff",
    backgroundColor: "#1495db",
  },
};

const Snackbar: React.FC<
  SnackbarProps & ID & { position: ISnackbarPortal["position"] }
> = ({
  id,
  type = "SUCCESS",
  title,
  message,
  onClose,
  onClickButton,
  buttonText,
  duration = 3,
  position = "top-right",
  successIcon = <CheckCircleOutlined style={{ fontSize: "24px" }} />,
  errorIcon = <ExclamationCircleOutlined style={{ fontSize: "24px" }} />,
  warnIcon = <WarningOutlined style={{ fontSize: "24px" }} />,
  infoIcon = <InfoCircleOutlined style={{ fontSize: "24px" }} />,
  closeIcon = <CloseOutlined style={{ fontSize: "18px" }} />,
}): JSX.Element => {
  const isInfinite = !duration;
  const [remainSeconds, setRemainSeconds] = useState<number>(duration * 1000);
  const [show, setShow] = useState(false);
  const [pause, setPause] = useState<boolean>(false);
  const [verticalDirection, horizontalDirection] = position?.split("-");

  const onCloseSnackbar = () => onClose?.(id);

  const interval = useMemo(
    () => (!isInfinite && remainSeconds >= 0 ? 100 : null),
    [isInfinite, remainSeconds]
  );

  useInterval(() => {
    setRemainSeconds(pause ? remainSeconds : remainSeconds - 100);
    if (remainSeconds === 0) {
      onCloseSnackbar();
    }
  }, interval);

  const progressWidth = () => {
    if (isInfinite) return 0;

    return (remainSeconds / (duration * 1000)) * 100;
  };

  const customIconMapper = {
    SUCCESS: successIcon,
    ERROR: errorIcon,
    WARN: warnIcon,
    INFO: infoIcon,
  };

  useEffect(() => {
    setShow(true);
  }, [show]);

  console.log("position", horizontalDirection);
  return (
    <StyledContainer
      className={`snackbar-container snackbar-container--${type}`}
      onMouseEnter={() => setPause(true)}
      onMouseLeave={() => setPause(false)}
    >
      <StyledSnackbarBox
        className={`snackbar-box snackbar-box--${type}`}
        verticalDirection={verticalDirection as "top" | "bottom"}
        horizontalDirection={horizontalDirection as "left" | "center" | "right"}
        type={type}
        show={show}
      >
        <StyledProgressbar
          className={`snackbar-progressbar snackbar-progressbar--${type}`}
          style={{ width: `${progressWidth()}%` }}
          show={show}
        />
        <StyledIcon>{customIconMapper[type ?? "SUCCESS"]}</StyledIcon>
        <StyledClose onClick={onCloseSnackbar}>{closeIcon}</StyledClose>
        <StyledContents>
          {title && (
            <StyledTitle className={`snackbar-title snackbar-title--${type}`}>
              {title}
            </StyledTitle>
          )}
          <StyledDescription
            className={`snackbar-description snackbar-description--${type}`}
          >
            {message}
          </StyledDescription>
        </StyledContents>
        <StyledButton
          type={type}
          className={`snackbar-action snackbar-action--${type}`}
        >
          {buttonText && <button onClick={onClickButton}>{buttonText}</button>}
        </StyledButton>
      </StyledSnackbarBox>
    </StyledContainer>
  );
};

const fadeinRightToLeft = keyframes`
  from { transform: translateX(100%); opacity: 0 }
  to { transform: translateX(0); opacity: 1 }
`;

const fadeinLeftToRight = keyframes`
  from { transform: translateX(-100%); opacity: 0 }
  to { transform: translateX(0); opacity: 1 }
`;

const fadeinTopToBottom = keyframes`
  from { transform: translateY(-100%); opacity: 0 }
  to { transform: translateY(0); opacity: 1 }
`;

const fadeinBottomToTop = keyframes`
  from { transform: translateY(100%); opacity: 0 }
  to { transform: translateY(0); opacity: 1 }
`;

const StyledContainer = styled.div`
  position: relative;
  right: 0;
  margin-bottom: 20px;
  overflow: hidden;
  border-radius: 8px;
`;

const StyledProgressbar = styled.span<{ show: boolean }>`
  width: 100%;
  height: 8px;
  position: absolute;
  display: block;
  opacity: 0.16;
  background-color: #000000;
  z-index: 1;
  top: 0;
  left: 0;
  transition: width 0.1s linear;
`;

const StyledSnackbarBox = styled.div<{
  type: SnackbarType;
  show: boolean;
  verticalDirection: "top" | "bottom";
  horizontalDirection: "right" | "center" | "left";
}>`
  position: relative;
  overflow: hidden;

  width: 330px;
  padding: 20px 48px 16px 56px;
  background-color: ${({ type }) => StyleMapper[type].backgroundColor};
  color: ${({ type }) => StyleMapper[type].color};
  border-radius: 8px;


  ${({ show, verticalDirection, horizontalDirection }) => {
    if (show) {
      return css`
        visibility: visible;
        animation: ${getAnimation(verticalDirection, horizontalDirection)} 0.3s;
      `;
    }
    return css`
      visibility: hidden;
    `;
  }}}
`;

const StyledIcon = styled.span`
  position: absolute;
  left: 20px;
  top: 16px;
`;

const StyledClose = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const StyledTitle = styled.div`
  font-weight: bold;
  margin-bottom: 8px;
  font-size: 16px;
`;
const StyledDescription = styled.div`
  line-height: 20px;
  margin-bottom: 4px;
  font-size: 14px;
  word-wrap: break-word;
`;
const StyledContents = styled.div``;

const StyledButton = styled.div<{ type: SnackbarType }>`
  text-align: right;
  button {
    cursor: pointer;
    margin-right: -30px;
    margin-bottom: -10px;
    padding: 12px 18px;
    color: ${({ type }) => StyleMapper[type].color};
    border: 0;
    background: transparent;
    font-size: 16px;
    font-weight: bold;
  }
`;

export default Snackbar;

const getAnimation = (
  verticalDirecation: "top" | "bottom",
  horizontalDirection: "right" | "center" | "left"
) => {
  if (horizontalDirection === "center") {
    return verticalDirecation === "top" ? fadeinTopToBottom : fadeinBottomToTop;
  }
  return horizontalDirection === "right"
    ? fadeinRightToLeft
    : fadeinLeftToRight;
};
