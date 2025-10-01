import styled, { css, type RuleSet } from "styled-components";
import { Badge, type BadgeProps } from "../atoms";
import { Responsive } from "../foundations";

type BadgesProps = {
  allBadgeProps: BadgeProps[];
  scrollable?: boolean;
  vertical?: boolean;
};

const Badges = ({ allBadgeProps, scrollable, vertical }: BadgesProps) => (
  <BaseBadges $scrollable={scrollable} $vertical={vertical}>
    {allBadgeProps.map((badgeProps, index) => (
      <Badge {...badgeProps} key={`badge-${index}`} />
    ))}
  </BaseBadges>
);

export default Badges;

const BaseBadges = styled.div<{ $scrollable?: boolean; $vertical?: boolean }>`
  display: flex;
  flex-direction: ${({ $vertical = false }) => ($vertical ? "column" : "row")};
  gap: ${({ $vertical = false }) => ($vertical ? "4px" : "8px")};

  ${({ $scrollable = false, $vertical = false }) =>
    deriveCSS($scrollable, $vertical)}
`;

const deriveCSS = (scrollable: boolean, vertical: boolean): RuleSet => {
  if (vertical && scrollable) {
    return ScrollableVerticalCSS;
  } else if (vertical) {
    // vertical && unscrollable
    return UnscrollableVerticalCSS;
  } else if (scrollable) {
    // horizontal && scrollable
    return ScrollableHorizontalCSS;
  } else {
    // horizontal && unscrollable
    return UnscrollableHorizontalCSS;
  }
};

const ScrollableVerticalCSS = css`
  overflow-y: auto;

  @media (width < ${Responsive.WIDTH_BREAKPOINTS.laptop}) {
    height: 90px;
  }

  @media (width >= ${Responsive.WIDTH_BREAKPOINTS.laptop}) {
    height: 100px;
  }
`;

const UnscrollableVerticalCSS = css``;

const ScrollableHorizontalCSS = css`
  flex-wrap: nowrap;
  overflow-x: auto;

  /* hide scrollbar but still allow for scrolling */
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const UnscrollableHorizontalCSS = css`
  flex-wrap: wrap;
  overflow-x: visible;
`;
