import styled, { css } from "styled-components";
import { Badge, type BadgeProps } from "../atoms";

type BadgesProps = {
  allBadgeProps: BadgeProps[];
  isScrollable?: boolean;
};

const Badges = ({ allBadgeProps, isScrollable }: BadgesProps) => (
  <BaseBadges $isScrollable={isScrollable}>
    {allBadgeProps.map((badgeProps, index) => (
      <Badge {...badgeProps} key={`badge-${index}`} />
    ))}
  </BaseBadges>
);

export default Badges;

const BaseBadges = styled.div<{ $isScrollable?: boolean }>`
  display: flex;
  gap: 8px;

  ${({ $isScrollable = false }) =>
    $isScrollable
      ? css`
          flex-wrap: nowrap;
          overflow-x: auto;

          /* hide scrollbar but still allow for scrolling */
          -ms-overflow-style: none;
          scrollbar-width: none;
          ::-webkit-scrollbar {
            display: none;
          }
        `
      : css`
          flex-wrap: wrap;
          overflow-x: visible;
        `}
`;
