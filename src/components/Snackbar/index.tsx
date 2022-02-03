import styled, { css, keyframes } from "styled-components";
import React, { useEffect, useMemo, useState } from "react";

import useInterval from "../../hooks/useInterval";
// import theme from "@/styles/theme";
import { ISnackbarProps, SnackbarType } from "./Snackbar.types";

const StyleMapper = {
  SUCCESS: {
    color: "white",
    backgroundColor: "green",
    icon: <></>, //<Icon name={IconPack.CHECK_IN_CIRCLE} />,
    closeIcon: <></>, // <Icon name={IconPack.DELETE_WHITE} />,
  },
  ERROR: {
    color: "white",
    backgroundColor: "red",
    icon: <></>, // <Icon name={IconPack.EXCLAMATION_MARK_IN_CIRCLE_TRANSPARENT} />,
    closeIcon: <></>, // <Icon name={IconPack.DELETE_WHITE} />,
  },
  WARN: {
    color: "gray",
    backgroundColor: "yellow",
    icon: <></>, // <Icon name={IconPack.INFO_IN_CIRCLE_BLACK} />,
    closeIcon: <></>, // <Icon name={IconPack.DELETE_GRAY} />,
  },
  INFO: {
    color: "white",
    backgroundColor: "gray",
    icon: <></>, // <Icon name={IconPack.INFO_IN_CIRCLE_TRANSPARENT} />,
    closeIcon: <></>, // <Icon name={IconPack.DELETE_WHITE} />,
  },
};

const Snackbar: React.FC<ISnackbarProps> = ({
  id,
  type = "SUCCESS",
  title,
  message,
  onClose,
  onClickButton,
  buttonText,
  duration = 2,
}): JSX.Element => {
  const isInfinite = !duration;
  const [remainSeconds, setRemainSeconds] = useState<number>(duration * 1000);
  const [show, setShow] = useState(false);
  const [pause, setPause] = useState<boolean>(false);

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

  useEffect(() => {
    setShow(true);
  }, [show]);

  return (
    <StyledContainer
      onMouseEnter={() => setPause(true)}
      onMouseLeave={() => setPause(false)}
    >
      <StyledSnackbarBox isInfinite={isInfinite} type={type} show={show}>
        <StyledProgressbar
          style={{ width: `${progressWidth()}%` }}
          show={show}
        />
        <StyledIcon hasTitle={!!title}>{StyleMapper[type].icon}</StyledIcon>
        <StyledClose onClick={onCloseSnackbar}>
          {StyleMapper[type].closeIcon}
        </StyledClose>
        <StyledContents>
          {title && <StyledTitle>{title}</StyledTitle>}
          <StyledDescription>{message}</StyledDescription>
        </StyledContents>
        <StyledButton type={type}>
          {buttonText && <button onClick={onClickButton}>{buttonText}</button>}
        </StyledButton>
      </StyledSnackbarBox>
    </StyledContainer>
  );
};

const fadein = keyframes`
  from { transform: translateY(20px); opacity: 0 }
  to { transform: translateY(0); opacity: 1 }
`;
const StyledContainer = styled.div`
  position: relative;
  right: 0;
  top: 100px;
  margin-bottom: 20px;
  overflow: hidden;
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
  isInfinite: boolean;
}>`
  position: relative;
  overflow: hidden;

  width: 330px;
  padding: ${({ isInfinite }) => (isInfinite ? "16px" : "20px")} 48px 16px 56px;
  background-color: ${({ type }) => StyleMapper[type].backgroundColor};
  color: ${({ type }) => StyleMapper[type].color};
  box-shadow: 0px 4px 12px rgba(33, 37, 41, 0.15),
    0px 0px 1px rgba(33, 37, 41, 0.3);
  border-radius: 8px;

  ${({ show }) =>
    show
      ? css`
          visibility: visible;
          animation: ${fadein} 0.5s;
        `
      : css`
          visibility: hidden;
        `}
`;

const StyledIcon = styled.span<{ hasTitle: boolean }>`
  position: absolute;
  top: ${({ hasTitle }) => (hasTitle ? 20 : 18)}px;
  /* top: 20px; */
  left: 20px;
`;

const StyledClose = styled.span`
  position: absolute;
  width: 24px;
  height: 24px;
  top: 8px;
  right: 8px;
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
`;
const StyledContents = styled.div``;

const StyledButton = styled.div<{ type: SnackbarType }>`
  text-align: right;
  button {
    margin-right: -30px;
    padding: 12px 28px;
    color: ${({ type }) => StyleMapper[type].color};
    border: 0;
    background: transparent;
    font-size: 16px;
    font-weight: bold;
  }
`;

export default Snackbar;
