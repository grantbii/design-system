import {
  type CSSProperties,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import { Color, Spacing, SystemIcon, Typography } from "../atoms";
import { applyTypography } from "../integrations";
import type { Option } from "../types";

const DROPDOWN_COLORS = {
  border: "#009493",
  defaultBorder: "#8A949C",
  filledBorder: "#313F48",
  defaultText: "#5B6770",
  navy: "#092247",
  hover: "#E6FBFA",
  selected: "#C1F5F4",
  menuBorder: "#EBF0F4",
} as const;

export type DropdownSize = "small" | "medium";

export type DropdownProps = {
  options: Option[];
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  size?: DropdownSize;
  width?: CSSProperties["width"];
  name?: string;
  form?: string;
};

const Dropdown = ({
  options,
  placeholder = "Select an option",
  value,
  defaultValue = "",
  onChange,
  size = "medium",
  disabled,
  width = "100%",
  name,
  form,
}: DropdownProps) => {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const [opensUpward, setOpensUpward] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);
  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const selectedValue = value ?? uncontrolledValue;
  const selectedOptionIndex = options.findIndex(
    (option) => option.value === selectedValue,
  );
  const isFilled = selectedOptionIndex >= 0;
  const triggerButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const close = (event: PointerEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node))
        setIsOpen(false);
    };

    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [isOpen]);

  useEffect(() => {
    const formElement = hiddenInputRef.current?.form;
    if (!formElement || value !== undefined) return;

    const reset = () => {
      setUncontrolledValue(defaultValue);
      setIsOpen(false);
    };
    formElement.addEventListener("reset", reset);
    return () => formElement.removeEventListener("reset", reset);
  }, [defaultValue, value]);

  useLayoutEffect(() => {
    if (!isOpen) return;

    const triggerRect = triggerButtonRef.current?.getBoundingClientRect();
    const optionsHeight = optionsRef.current?.getBoundingClientRect().height;
    if (!triggerRect || optionsHeight === undefined) return;

    const gap = Number.parseFloat(Spacing.px4);
    const spaceAbove = triggerRect.top - gap;
    const spaceBelow = window.innerHeight - triggerRect.bottom - gap;
    setOpensUpward(optionsHeight > spaceBelow && spaceAbove > spaceBelow);
  }, [isOpen, options.length]);

  const openOptions = () => {
    if (!options.length) return;
    setIsOpen(true);
  };

  const selectOption = (index: number) => {
    const option = options[index];
    if (!option) return;
    if (value === undefined) setUncontrolledValue(option.value);
    onChange?.(option.value);
    setIsOpen(false);
    triggerButtonRef.current?.focus();
  };

  return (
    <Container
      ref={dropdownRef}
      $width={width}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setIsOpen(false);
      }}
    >
      <Trigger
        ref={triggerButtonRef}
        $isFilled={isFilled}
        $isOpen={isOpen}
        $size={size}
        type="button"
        disabled={disabled}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        onClick={() => (isOpen ? setIsOpen(false) : openOptions())}
      >
        <span>{options[selectedOptionIndex]?.label ?? placeholder}</span>
        <CaretDownIcon $isOpen={isOpen} />
      </Trigger>

      {name && (
        <input
          ref={hiddenInputRef}
          type="hidden"
          name={name}
          form={form}
          value={selectedValue}
          disabled={disabled}
        />
      )}

      {isOpen && (
        <Options
          ref={optionsRef}
          role="listbox"
          tabIndex={-1}
          autoFocus
          $opensUpward={opensUpward}
        >
          {options.map((option, index) => (
            <OptionItem
              key={option.value}
              role="option"
              aria-selected={option.value === selectedValue}
              $isSelected={option.value === selectedValue}
              onClick={() => selectOption(index)}
            >
              {option.label}
            </OptionItem>
          ))}
        </Options>
      )}
    </Container>
  );
};

export default Dropdown;

const Container = styled.div<{ $width: CSSProperties["width"] }>`
  position: relative;
  width: ${({ $width }) =>
    typeof $width === "number" ? `${$width}px` : $width};
`;

const Trigger = styled.button<{
  $isFilled: boolean;
  $isOpen: boolean;
  $size: DropdownSize;
}>`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${Spacing.px8};
  width: 100%;
  height: ${({ $size }) => ($size === "medium" ? "46px" : "40px")};
  padding: ${({ $size }) =>
    $size === "medium" ? `${Spacing.px12} ${Spacing.px16}` : `10px 14px`};
  border: 1px solid
    ${({ $isFilled, $isOpen }) =>
      $isOpen
        ? DROPDOWN_COLORS.border
        : $isFilled
          ? DROPDOWN_COLORS.filledBorder
          : DROPDOWN_COLORS.defaultBorder};
  border-radius: ${Spacing.px8};

  ${({ $isFilled, $isOpen, $size }) =>
    applyTypography(
      $size === "medium"
        ? $isOpen || $isFilled
          ? Typography.bodyPrimaryMedium
          : Typography.bodyPrimaryRegular
        : $isOpen || $isFilled
          ? Typography.bodySecondaryMedium
          : Typography.bodySecondaryRegular,
    )}
  line-height: ${({ $size }) => ($size === "medium" ? "22px" : "19px")};

  color: ${({ $isFilled, $isOpen }) =>
    $isOpen || $isFilled ? DROPDOWN_COLORS.navy : DROPDOWN_COLORS.defaultText};
  background: ${Color.neutral.white};
  cursor: pointer;

  > span {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &:hover:not(:disabled):not([aria-expanded="true"]) {
    ${({ $size }) =>
      applyTypography(
        $size === "medium"
          ? Typography.bodyPrimaryRegular
          : Typography.bodySecondaryRegular,
      )}
    color: ${DROPDOWN_COLORS.defaultText};
    border-color: ${DROPDOWN_COLORS.filledBorder};

    > svg {
      color: ${DROPDOWN_COLORS.navy};
    }
  }

  &:focus-visible:not([aria-expanded="true"]) {
    ${({ $size }) =>
      applyTypography(
        $size === "medium"
          ? Typography.bodyPrimaryRegular
          : Typography.bodySecondaryRegular,
      )}
    color: ${DROPDOWN_COLORS.navy};
    border-color: ${DROPDOWN_COLORS.border};
    outline: none;
  }

  &:disabled {
    color: ${Color.typography.blackLow};
    background: ${Color.neutral.grey4};
    border-color: ${Color.neutral.grey2};
    cursor: not-allowed;
  }
`;

const CaretDownIcon = styled(SystemIcon.CaretDownIcon).attrs({ size: 20 })<{
  $isOpen: boolean;
}>`
  flex: none;
  transform: rotate(${({ $isOpen }) => ($isOpen ? "180deg" : "0")});
`;

const Options = styled.div<{ $opensUpward: boolean }>`
  position: absolute;
  z-index: 1;
  top: ${({ $opensUpward }) =>
    $opensUpward ? "auto" : `calc(100% + ${Spacing.px4})`};
  bottom: ${({ $opensUpward }) =>
    $opensUpward ? `calc(100% + ${Spacing.px4})` : "auto"};
  left: 0;
  box-sizing: border-box;
  width: 100%;
  max-height: 320px;
  overflow-y: auto;
  padding: ${Spacing.px4} 0;
  border: 1px solid ${DROPDOWN_COLORS.menuBorder};
  border-radius: ${Spacing.px8};
  background: ${Color.neutral.white};
  box-shadow: 0 2px 4px rgba(9, 34, 71, 0.04);
`;

const OptionItem = styled.div<{ $isSelected: boolean }>`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 39px;
  padding: 10px ${Spacing.px16};
  gap: 10px;

  ${({ $isSelected }) =>
    applyTypography(
      $isSelected
        ? Typography.bodySecondaryMedium
        : Typography.bodySecondaryRegular,
    )}
  line-height: 19px;

  color: ${DROPDOWN_COLORS.navy};
  background: ${({ $isSelected }) =>
    $isSelected ? DROPDOWN_COLORS.selected : Color.neutral.white};
  cursor: pointer;

  &:hover:not([aria-selected="true"]) {
    ${applyTypography(Typography.bodySecondaryRegular)}
    background: ${DROPDOWN_COLORS.hover};
  }
`;
