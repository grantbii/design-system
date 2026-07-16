"use client";

import {
  cloneElement,
  createContext,
  type HTMLAttributes,
  type PropsWithChildren,
  type ReactElement,
  type RefObject,
  useContext,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import styled, { keyframes } from "styled-components";
import { Color, Spacing, Typography } from "../atoms";
import { applyTypography } from "../integrations";

export type TooltipSide = "top" | "right" | "bottom" | "left";

type TooltipContextValue = {
  tooltipContentId: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  tooltipTriggerContainerRef: RefObject<HTMLSpanElement | null>;
};

const TooltipContext = createContext<TooltipContextValue | null>(null);

const useTooltip = () => {
  const tooltipContext = useContext(TooltipContext);
  if (!tooltipContext)
    throw new Error("Tooltip components must be used within Tooltip");
  return tooltipContext;
};

export type TooltipProps = PropsWithChildren<{
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}>;

const Tooltip = ({
  children,
  open: isControlledOpen,
  defaultOpen = false,
  onOpenChange,
}: TooltipProps) => {
  const [isUncontrolledOpen, setIsUncontrolledOpen] = useState(defaultOpen);
  const tooltipTriggerContainerRef = useRef<HTMLSpanElement>(null);
  const tooltipContentId = useId();
  const isOpen = isControlledOpen ?? isUncontrolledOpen;

  const setIsOpen = (nextIsOpen: boolean) => {
    if (isControlledOpen === undefined) setIsUncontrolledOpen(nextIsOpen);
    onOpenChange?.(nextIsOpen);
  };

  return (
    <TooltipContext.Provider
      value={{
        tooltipContentId,
        isOpen,
        setIsOpen,
        tooltipTriggerContainerRef,
      }}
    >
      {children}
    </TooltipContext.Provider>
  );
};

export default Tooltip;

export type TooltipTriggerProps = {
  children: ReactElement<{ "aria-describedby"?: string }>;
};

export const TooltipTrigger = ({ children }: TooltipTriggerProps) => {
  const { tooltipContentId, isOpen, setIsOpen, tooltipTriggerContainerRef } =
    useTooltip();

  return (
    <TooltipTriggerContainer
      ref={tooltipTriggerContainerRef}
      data-slot="tooltip-trigger"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => {
        if (
          !tooltipTriggerContainerRef.current?.contains(document.activeElement)
        )
          setIsOpen(false);
      }}
      onFocus={() => setIsOpen(true)}
      onBlur={() => {
        if (!tooltipTriggerContainerRef.current?.matches(":hover"))
          setIsOpen(false);
      }}
      onKeyDown={(event) => event.key === "Escape" && setIsOpen(false)}
    >
      {cloneElement(children, {
        "aria-describedby": isOpen
          ? [children.props["aria-describedby"], tooltipContentId]
              .filter(Boolean)
              .join(" ")
          : children.props["aria-describedby"],
      })}
    </TooltipTriggerContainer>
  );
};

export type TooltipContentProps = PropsWithChildren<
  Omit<HTMLAttributes<HTMLDivElement>, "content"> & {
    side?: TooltipSide;
    sideOffset?: number;
  }
>;

type TooltipPosition = {
  top: number;
  left: number;
  arrowOffset: number;
  side: TooltipSide;
};

const tooltipSides: TooltipSide[] = ["top", "right", "bottom", "left"];
const oppositeTooltipSide: Record<TooltipSide, TooltipSide> = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right",
};
const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(value, max));

export const TooltipContent = ({
  children,
  side = "top",
  sideOffset = 0,
  ...props
}: TooltipContentProps) => {
  const { tooltipContentId, isOpen, tooltipTriggerContainerRef } = useTooltip();
  const tooltipContentContainerRef = useRef<HTMLDivElement>(null);
  const [tooltipPosition, setTooltipPosition] = useState<TooltipPosition>();

  useLayoutEffect(() => {
    if (!isOpen) return;

    const updateTooltipPosition = () => {
      const triggerContainerRect =
        tooltipTriggerContainerRef.current?.getBoundingClientRect();
      const tooltipContentRect =
        tooltipContentContainerRef.current?.getBoundingClientRect();
      if (!triggerContainerRect || !tooltipContentRect) return;

      const viewportPadding = 8;
      const availableSpaceBySide: Record<TooltipSide, number> = {
        top: triggerContainerRect.top - viewportPadding,
        right: window.innerWidth - triggerContainerRect.right - viewportPadding,
        bottom:
          window.innerHeight - triggerContainerRect.bottom - viewportPadding,
        left: triggerContainerRect.left - viewportPadding,
      };
      const oppositeSide = oppositeTooltipSide[side];
      const resolvedSide =
        [
          side,
          oppositeSide,
          ...tooltipSides.filter(
            (candidateSide) => ![side, oppositeSide].includes(candidateSide),
          ),
        ].find(
          (candidateSide) =>
            availableSpaceBySide[candidateSide] >=
            (candidateSide === "top" || candidateSide === "bottom"
              ? tooltipContentRect.height
              : tooltipContentRect.width) +
              sideOffset,
        ) ?? side;

      let tooltipTop =
        triggerContainerRect.top +
        (triggerContainerRect.height - tooltipContentRect.height) / 2;
      let tooltipLeft =
        triggerContainerRect.left +
        (triggerContainerRect.width - tooltipContentRect.width) / 2;
      if (resolvedSide === "top")
        tooltipTop =
          triggerContainerRect.top - tooltipContentRect.height - sideOffset;
      if (resolvedSide === "right")
        tooltipLeft = triggerContainerRect.right + sideOffset;
      if (resolvedSide === "bottom")
        tooltipTop = triggerContainerRect.bottom + sideOffset;
      if (resolvedSide === "left")
        tooltipLeft =
          triggerContainerRect.left - tooltipContentRect.width - sideOffset;

      tooltipTop = clamp(
        tooltipTop,
        viewportPadding,
        window.innerHeight - tooltipContentRect.height - viewportPadding,
      );
      tooltipLeft = clamp(
        tooltipLeft,
        viewportPadding,
        window.innerWidth - tooltipContentRect.width - viewportPadding,
      );

      setTooltipPosition({
        top: tooltipTop,
        left: tooltipLeft,
        side: resolvedSide,
        arrowOffset:
          resolvedSide === "top" || resolvedSide === "bottom"
            ? clamp(
                triggerContainerRect.left +
                  triggerContainerRect.width / 2 -
                  tooltipLeft,
                8,
                tooltipContentRect.width - 8,
              )
            : clamp(
                triggerContainerRect.top +
                  triggerContainerRect.height / 2 -
                  tooltipTop,
                8,
                tooltipContentRect.height - 8,
              ),
      });
    };

    updateTooltipPosition();
    window.addEventListener("resize", updateTooltipPosition);
    window.addEventListener("scroll", updateTooltipPosition, true);
    return () => {
      window.removeEventListener("resize", updateTooltipPosition);
      window.removeEventListener("scroll", updateTooltipPosition, true);
    };
  }, [children, isOpen, side, sideOffset, tooltipTriggerContainerRef]);

  if (!isOpen || typeof document === "undefined") return null;

  return createPortal(
    <TooltipContentContainer
      {...props}
      ref={tooltipContentContainerRef}
      id={tooltipContentId}
      role="tooltip"
      data-slot="tooltip-content"
      data-side={tooltipPosition?.side ?? side}
      $visible={!!tooltipPosition}
      style={{
        ...props.style,
        top: tooltipPosition?.top ?? 0,
        left: tooltipPosition?.left ?? 0,
      }}
    >
      {children}
      {tooltipPosition && (
        <TooltipArrow
          aria-hidden
          data-slot="tooltip-arrow"
          $side={tooltipPosition.side}
          $offset={tooltipPosition.arrowOffset}
        />
      )}
    </TooltipContentContainer>,
    document.body,
  );
};

const tooltipFadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const TooltipTriggerContainer = styled.span`
  display: inline-flex;
`;

const TooltipContentContainer = styled.div<{ $visible: boolean }>`
  position: fixed;
  z-index: 100;

  display: flex;
  flex-direction: column;
  align-items: stretch;
  box-sizing: border-box;
  width: max-content;
  max-width: min(320px, calc(100vw - ${Spacing.px16}));
  padding: ${Spacing.px12};

  color: ${Color.typography.whiteHigh};
  background: ${Color.neutral.black};
  border-radius: ${Spacing.px8};

  text-align: center;
  visibility: ${({ $visible }) => ($visible ? "visible" : "hidden")};
  pointer-events: none;
  animation: ${tooltipFadeIn} 120ms ease-out;

  ${applyTypography(Typography.captionRegular)}

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const TooltipArrow = styled.span<{ $side: TooltipSide; $offset: number }>`
  position: absolute;
  ${({ $side, $offset }) => {
    if ($side === "top")
      return `bottom: -${Spacing.px4}; left: ${$offset}px; transform: translateX(-50%) rotate(45deg);`;
    if ($side === "right")
      return `left: -${Spacing.px4}; top: ${$offset}px; transform: translateY(-50%) rotate(45deg);`;
    if ($side === "bottom")
      return `top: -${Spacing.px4}; left: ${$offset}px; transform: translateX(-50%) rotate(45deg);`;
    return `right: -${Spacing.px4}; top: ${$offset}px; transform: translateY(-50%) rotate(45deg);`;
  }}

  width: ${Spacing.px8};
  height: ${Spacing.px8};

  background: ${Color.neutral.black};
`;
