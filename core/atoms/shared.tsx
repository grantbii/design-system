import { css } from "styled-components";
import { Colors } from "../foundations";

export const ButtonStyle = css<{
  $backgroundColor?: string;
  $color?: string;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  padding: 10px 16px;
  border-radius: 4px;

  font-weight: 500;
  font-size: 14px;

  color: ${({ $color = Colors.typography.whiteHigh }) => $color};
  background-color: ${({ $backgroundColor = Colors.main.grantbiiBlue }) =>
    $backgroundColor};
`;
