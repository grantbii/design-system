"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
} from "react";
import styled from "styled-components";
import { Color, Typography } from "../atoms";
import { applyTypography } from "../integrations";

export type ToggleButtonSize = "small" | "medium" | "large";

const toggleButtonSizeStyles: Record<
  ToggleButtonSize,
  {
    iconButtonSize: string;
    textButtonHeight: string;
    iconSize: string;
    padding: string;
  }
> = {
  small: {
    iconButtonSize: "26px",
    textButtonHeight: "26px",
    iconSize: "14px",
    padding: "6px",
  },
  medium: {
    iconButtonSize: "46px",
    textButtonHeight: "48px",
    iconSize: "20px",
    padding: "13px",
  },
  large: {
    iconButtonSize: "52px",
    textButtonHeight: "56px",
    iconSize: "20px",
    padding: "16px",
  },
};

const toggleButtonTypography: Record<ToggleButtonSize, Typography.TextStyle> = {
  small: {
    ...Typography.captionMedium,
    fontSize: { small: "10px", large: "10px" },
  },
  medium: Typography.bodyPrimaryMedium,
  large: Typography.subheading2Medium,
};

export type ToggleButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onChange"
> & {
  pressed?: boolean;
  onPressedChange?: (isPressed: boolean) => void;
  size?: ToggleButtonSize;
};

const ToggleButton = ({
  pressed,
  onPressedChange,
  onClick,
  size = "medium",
  type = "button",
  ...props
}: ToggleButtonProps) => {
  const [isUncontrolledPressed, setIsUncontrolledPressed] = useState(false);
  const isPressed = pressed ?? isUncontrolledPressed;

  return (
    <ToggleButtonContainer
      {...props}
      type={type}
      data-state={isPressed ? "on" : "off"}
      $size={size}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;

        const shouldPress = !isPressed;
        if (pressed === undefined) setIsUncontrolledPressed(shouldPress);
        onPressedChange?.(shouldPress);
      }}
    />
  );
};

export default ToggleButton;

export type ToggleButtonGroupProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  "defaultValue" | "onChange"
> & {
  disabled?: boolean;
  size?: ToggleButtonSize;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
};

type ToggleButtonGroupContextValue = {
  isGroupDisabled: boolean;
  selectedValue: string;
  groupSize: ToggleButtonSize;
  toggleItem: (itemValue: string) => void;
};

const ToggleButtonGroupContext =
  createContext<ToggleButtonGroupContextValue | null>(null);

export const ToggleButtonGroup = ({
  children,
  value,
  defaultValue,
  onValueChange,
  disabled = false,
  size = "medium",
  ...props
}: ToggleButtonGroupProps) => {
  const [uncontrolledValue, setUncontrolledValue] = useState(
    defaultValue ?? "",
  );
  const selectedValue = value ?? uncontrolledValue;
  const contextValue = useMemo<ToggleButtonGroupContextValue>(
    () => ({
      isGroupDisabled: disabled,
      selectedValue,
      groupSize: size,
      toggleItem: (itemValue) => {
        const nextSelectedValue = selectedValue === itemValue ? "" : itemValue;
        if (value === undefined) setUncontrolledValue(nextSelectedValue);
        onValueChange?.(nextSelectedValue);
      },
    }),
    [disabled, onValueChange, selectedValue, size, value],
  );

  return (
    <ToggleButtonGroupContext.Provider value={contextValue}>
      <ToggleButtonGroupContainer {...props} role="group">
        {children}
      </ToggleButtonGroupContainer>
    </ToggleButtonGroupContext.Provider>
  );
};

export type ToggleButtonGroupItemProps = Omit<
  ToggleButtonProps,
  "onPressedChange" | "pressed" | "size"
> & {
  value: string;
};

export const ToggleButtonGroupItem = ({
  value,
  disabled,
  ...props
}: ToggleButtonGroupItemProps) => {
  const groupContext = useContext(ToggleButtonGroupContext);
  if (!groupContext)
    throw new Error(
      "ToggleButtonGroupItem must be used within ToggleButtonGroup",
    );

  return (
    <ToggleButton
      {...props}
      pressed={groupContext.selectedValue === value}
      disabled={groupContext.isGroupDisabled || disabled}
      size={groupContext.groupSize}
      onPressedChange={() => groupContext.toggleItem(value)}
    />
  );
};

const ToggleButtonContainer = styled.button<{ $size: ToggleButtonSize }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  min-width: ${({ $size }) => toggleButtonSizeStyles[$size].iconButtonSize};
  height: ${({ $size }) => toggleButtonSizeStyles[$size].iconButtonSize};
  padding: ${({ $size }) => toggleButtonSizeStyles[$size].padding};

  ${({ $size }) => applyTypography(toggleButtonTypography[$size])}
  white-space: nowrap;

  color: ${Color.typography.blackHigh};
  background: ${Color.neutral.white};
  border: 1px solid ${Color.neutral.grey2};
  border-radius: 6px;

  cursor: pointer;

  &:hover:not(:disabled):not([data-state="on"]) {
    background: ${Color.accent.blue3};
  }

  &[data-state="on"] {
    position: relative;
    z-index: 1;

    color: ${Color.typography.whiteHigh};
    background: ${Color.brand.grantbiiBlue};
    border-color: ${Color.brand.grantbiiBlue};

    &:hover:not(:disabled) {
      background: ${Color.accent.blue2};
      border-color: ${Color.accent.blue2};
    }
  }

  &:focus-visible {
    position: relative;
    z-index: 2;
    outline: 2px solid ${Color.accent.blue2};
    outline-offset: 2px;
  }

  &:disabled {
    color: ${Color.typography.blackMedium};
    background: ${Color.neutral.grey2};
    cursor: not-allowed;
  }

  svg {
    flex: none;
    width: ${({ $size }) => toggleButtonSizeStyles[$size].iconSize};
    height: ${({ $size }) => toggleButtonSizeStyles[$size].iconSize};
  }

  &:not(:has(svg)) {
    height: ${({ $size }) => toggleButtonSizeStyles[$size].textButtonHeight};
  }
`;

const ToggleButtonGroupContainer = styled.div`
  display: inline-flex;
  box-sizing: border-box;

  border-radius: 6px;
  outline: 1px solid ${Color.neutral.grey2};
  outline-offset: -1px;

  > button {
    border: 0;
    border-radius: 0;
  }

  > button:not(:last-child) {
    border-right: 1px solid ${Color.neutral.grey2};
  }

  > button:first-child {
    border-radius: 6px 0 0 6px;
  }

  > button:last-child {
    border-radius: 0 6px 6px 0;
  }

  > button:only-child {
    border-radius: 6px;
  }
`;
