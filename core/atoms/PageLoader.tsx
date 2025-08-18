import { MoonLoader } from "react-spinners";
import { LoaderSizeProps } from "react-spinners/helpers/props";
import styled from "styled-components";
import { Colors } from "../foundations";

const PageLoader = ({
  color = Colors.accent.blue1,
  size = 32,
  ...restOfProps
}: LoaderSizeProps) => (
  <BasePageLoader>
    <MoonLoader color={color} size={size} {...restOfProps} />
  </BasePageLoader>
);

export default PageLoader;

const BasePageLoader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
`;
