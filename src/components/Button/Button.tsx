import React from "react";
import { IButtonProps } from "./Button.type";

const Button = ({ children }: IButtonProps): JSX.Element => {
  return <button>{children ?? "버튼입니다."}</button>;
};

export default Button;
