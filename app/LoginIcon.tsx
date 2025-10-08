import React from "react";
import LoginIconSvg from "../assets/images/login-icon.svg";

type IconProps = {
  width?: number;
  height?: number;
  color?: string;
};

export function LoginIcon({
  width = 28,
  height = 28,
  color = "#fff",
}: IconProps) {
  return <LoginIconSvg width={width} height={height} fill={color} />;
}
