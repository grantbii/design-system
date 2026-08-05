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

export type DropdownProps = {
  options: Option[];
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
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
  const initialActiveOptionIndex = Math.max(0, selectedOptionIndex);
  const [activeOptionIndex, setActiveOptionIndex] = useState(
    initialActiveOptionIndex,
  );
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

    const gap = Number.parseFloat(Spacing.px8);
    const spaceAbove = triggerRect.top - gap;
    const spaceBelow = window.innerHeight - triggerRect.bottom - gap;
    setOpensUpward(optionsHeight > spaceBelow && spaceAbove > spaceBelow);
  }, [isOpen, options.length]);

  const openOptions = (index = initialActiveOptionIndex) => {
    if (!options.length) return;
    setActiveOptionIndex(index);
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
        $isOpen={isOpen}
        type="button"
        disabled={disabled}
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
              $isActive={index === activeOptionIndex}
              onClick={() => selectOption(index)}
              onMouseEnter={() => setActiveOptionIndex(index)}
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

const Trigger = styled.button<{ $isOpen: boolean }>`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${Spacing.px12};
  width: 100%;
  padding: ${Spacing.px12} ${Spacing.px16};
  border: 1px solid ${Color.neutral.grey2};
  border-radius: ${Spacing.px8};

  ${applyTypography(Typography.bodyPrimaryMedium)}

  color: ${Color.neutral.black};
  background: ${({ $isOpen }) =>
    $isOpen ? Color.accent.blue3 : Color.neutral.white};
  cursor: pointer;

  > span {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &:disabled {
    color: ${Color.typography.blackLow};
    background: ${Color.neutral.grey4};
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
    $opensUpward ? "auto" : `calc(100% + ${Spacing.px8})`};
  bottom: ${({ $opensUpward }) =>
    $opensUpward ? `calc(100% + ${Spacing.px8})` : "auto"};
  left: 0;
  box-sizing: border-box;
  width: 100%;
  max-height: 320px;
  overflow-y: auto;
  padding: ${Spacing.px4} 0;
  border: 1px solid ${Color.neutral.grey3};
  border-radius: ${Spacing.px8};
  background: ${Color.neutral.white};
`;

const OptionItem = styled.div<{ $isActive: boolean }>`
  padding: 10px ${Spacing.px16};

  ${applyTypography(Typography.bodyPrimaryRegular)}

  color: ${Color.neutral.black};
  background: ${({ $isActive }) =>
    $isActive ? Color.accent.yellow3 : Color.neutral.white};
  cursor: pointer;
`;
