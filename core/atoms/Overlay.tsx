import styled from "styled-components";
import { Colors } from "../foundations";

const Overlay = styled.div<{ $centerContent?: boolean }>`
  display: flex;
  flex-direction: column;

  justify-content: ${({ $centerContent = false }) =>
    $centerContent ? "center" : "normal"};
  align-items: ${({ $centerContent = false }) =>
    $centerContent ? "center" : "normal"};

  z-index: 9999;
  position: fixed;
  top: 0px;
  left: 0px;

  width: 100vw;
  height: 100vh;

  background-color: ${Colors.semantic.overlay};
`;

export default Overlay;
