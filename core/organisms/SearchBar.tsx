import type { GrantMatchQuery } from "@grantbii/ui-core/match/entities";
import type { KeyboardEvent } from "react";
import styled from "styled-components";
import { Color, Responsive, SystemIcon } from "../atoms";
import { Button } from "../molecules";

type SearchBarProps = {
  activeQuery: GrantMatchQuery;
  updateActiveQuery: (query: GrantMatchQuery) => void;
  queryText: string;
  updateQueryText: (newText: string) => void;
  textSearchCallback?: () => void;
  size?: SearchBarSize;
};

type SearchBarSize = "small" | "medium";

const SearchBar = ({
  activeQuery,
  updateActiveQuery,
  queryText,
  updateQueryText,
  textSearchCallback,
  size = "medium",
}: SearchBarProps) => {
  const { height, fontSize } = SIZE_PROPS_MAP[size];

  const resetSearch = () => {
    updateQueryText("");
    updateActiveQuery({ files: activeQuery.files, text: "" });
  };

  const executeSearch = () => {
    textSearchCallback?.();
    updateActiveQuery({ files: activeQuery.files, text: queryText });
  };

  return (
    <BaseSearchBar>
      <SearchArea $height={height} $hasQueryText={queryText !== ""}>
        <TextInput
          queryText={queryText}
          updateQueryText={updateQueryText}
          executeSearch={executeSearch}
          fontSize={fontSize}
        />

        {queryText === "" ? (
          <ResetButtonPlaceholder />
        ) : (
          <ResetButton resetSearch={resetSearch} />
        )}
      </SearchArea>

      <Button
        Icon={SystemIcon.MagnifyingGlassIcon}
        onClick={executeSearch}
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

const SIZE_PROPS_MAP: { [size in SearchBarSize]: SizeStyleProps } = {
  small: {
    height: "40px",
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
  gap: 8px;

  width: 100%;

  @media (width < ${Responsive.widthBreakpoint.laptop}) {
    border-radius: 0px;
  }

  @media (width >= ${Responsive.widthBreakpoint.laptop}) {
    border-radius: 12px;
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
  border-radius: 8px;

  &:focus-within {
    background-color: ${Color.neutral.white};
    border: 0.5px solid ${Color.accent.yellow1};
  }
`;

type TextInputProps = {
  queryText: string;
  updateQueryText: (newText: string) => void;
  executeSearch: () => void;
  fontSize: string;
};

const TextInput = ({
  queryText,
  updateQueryText,
  executeSearch,
  fontSize,
}: TextInputProps) => {
  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !event.repeat) {
      event.preventDefault();
      executeSearch();
    }
  };

  return (
    <BaseTextInput
      value={queryText}
      placeholder="Search grant or describe your project"
      onChange={(event) => updateQueryText(event.target.value)}
      onKeyDown={onKeyDown}
      $fontSize={fontSize}
    />
  );
};

const BaseTextInput = styled.input<{ $fontSize: string }>`
  width: 100%;
  margin-left: 16px;

  font-size: ${(props) => props.$fontSize};
  text-overflow: ellipsis;

  background-color: transparent;
  outline: none;
  border: none;
`;

type ResetButtonProps = {
  resetSearch: () => void;
};

const ResetButton = ({ resetSearch }: ResetButtonProps) => (
  <BaseResetButton onClick={resetSearch} type="button">
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

  border-radius: 8px;
`;

const ResetButtonPlaceholder = styled.div`
  width: 38px;
  height: 38px;

  border-radius: 8px;
`;
