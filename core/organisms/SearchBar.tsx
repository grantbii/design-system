import type {
  ChangeEventHandler,
  KeyboardEvent,
  MouseEventHandler,
} from "react";
import styled from "styled-components";
import { Color, Responsive, Spacing, SystemIcon } from "../atoms";
import { Button } from "../molecules";

type SearchBarProps = {
  queryText: string;
  onChangeQueryText: ChangeEventHandler<HTMLInputElement, HTMLInputElement>;
  onClickReset: MouseEventHandler<HTMLButtonElement>;
  onClickSearch: MouseEventHandler<HTMLButtonElement>;
  handlePressEnter: () => void;
  autoFocus?: boolean;
  disableSearch?: boolean;
  placeholder?: string;
  size?: SearchBarSize;
};

type SearchBarSize = "small" | "medium";

const SearchBar = ({
  queryText,
  onChangeQueryText,
  onClickSearch,
  onClickReset,
  handlePressEnter,
  autoFocus = false,
  disableSearch = false,
  placeholder = "Search grant or describe your project",
  size = "medium",
}: SearchBarProps) => {
  const { height, fontSize } = sizePropsMap[size];

  return (
    <BaseSearchBar>
      <SearchArea $height={height} $hasQueryText={queryText !== ""}>
        <TextInput
          queryText={queryText}
          onChangeQueryText={onChangeQueryText}
          handlePressEnter={handlePressEnter}
          autoFocus={autoFocus}
          disableSearch={disableSearch}
          placeholder={placeholder}
          fontSize={fontSize}
        />

        {queryText === "" ? (
          <ResetButtonPlaceholder />
        ) : (
          <ResetButton onClickReset={onClickReset} />
        )}
      </SearchArea>

      <Button
        disabled={disableSearch}
        Icon={SystemIcon.MagnifyingGlassIcon}
        onClick={onClickSearch}
        size={size}
      />
    </BaseSearchBar>
  );
};

export default SearchBar;

type SizeStyleProps = {
  height: string;
  fontSize: string;
};

const sizePropsMap: { [size in SearchBarSize]: SizeStyleProps } = {
  small: {
    height: Spacing.px40,
    fontSize: "12px",
  },
  medium: {
    height: "44px",
    fontSize: "14px",
  },
};

const BaseSearchBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${Spacing.px8};

  width: 100%;

  @media (width < ${Responsive.widthBreakpoint.laptop}) {
    border-radius: 0px;
  }

  @media (width >= ${Responsive.widthBreakpoint.laptop}) {
    border-radius: ${Spacing.px12};
  }
`;

type SearchAreaProps = {
  $height: string;
  $hasQueryText: boolean;
};

const SearchArea = styled.div<SearchAreaProps>`
  display: flex;
  align-items: center;

  box-sizing: border-box;
  height: ${(props) => props.$height};
  width: 100%;

  background-color: ${(props) =>
    props.$hasQueryText ? Color.neutral.white : Color.neutral.grey4};
  border: 0.5px solid
    ${(props) =>
      props.$hasQueryText ? Color.accent.yellow1 : Color.neutral.grey2};
  border-radius: ${Spacing.px8};

  &:focus-within {
    background-color: ${Color.neutral.white};
    border: 0.5px solid ${Color.accent.yellow1};
  }
`;

type TextInputProps = {
  queryText: string;
  onChangeQueryText?: ChangeEventHandler<HTMLInputElement, HTMLInputElement>;
  handlePressEnter: () => void;
  autoFocus: boolean;
  disableSearch: boolean;
  placeholder: string;
  fontSize: string;
};

const TextInput = ({
  queryText,
  onChangeQueryText,
  handlePressEnter,
  autoFocus,
  disableSearch,
  placeholder,
  fontSize,
}: TextInputProps) => {
  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !event.repeat && !disableSearch) {
      event.preventDefault();
      handlePressEnter();
    }
  };

  return (
    <BaseTextInput
      value={queryText}
      placeholder={placeholder}
      onChange={onChangeQueryText}
      onKeyDown={onKeyDown}
      autoFocus={autoFocus}
      $fontSize={fontSize}
    />
  );
};

const BaseTextInput = styled.input<{ $fontSize: string }>`
  width: 100%;
  margin-left: ${Spacing.px16};

  font-size: ${(props) => props.$fontSize};
  text-overflow: ellipsis;

  background-color: transparent;
  outline: none;
  border: none;
`;

type ResetButtonProps = {
  onClickReset: MouseEventHandler<HTMLButtonElement>;
};

const ResetButton = ({ onClickReset }: ResetButtonProps) => (
  <BaseResetButton onClick={onClickReset} type="button">
    <SystemIcon.XIcon size={14} color={Color.neutral.black} />
  </BaseResetButton>
);

const BaseResetButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 38px;
  min-width: 38px;
  height: 38px;

  border-radius: ${Spacing.px8};
`;

const ResetButtonPlaceholder = styled.div`
  width: 38px;
  height: 38px;

  border-radius: ${Spacing.px8};
`;
