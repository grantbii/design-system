import { MoonLoader } from "react-spinners";
import { LoaderSizeProps } from "react-spinners/helpers/props";
import styled from "styled-components";
import { Colors } from "../foundations";

/**
 * The animation to show when loading the whole page
 */
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
  margin: auto;
`;
