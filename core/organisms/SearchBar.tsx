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
};

const SearchBar = ({
  activeQuery,
  updateActiveQuery,
  queryText,
  updateQueryText,
  textSearchCallback,
}: SearchBarProps) => {
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
      <TextSearchArea $hasQueryText={queryText !== ""}>
        <TextInput
          queryText={queryText}
          updateQueryText={updateQueryText}
          executeSearch={executeSearch}
        />

        {queryText === "" ? (
          <ResetButtonPlaceholder />
        ) : (
          <ResetButton resetSearch={resetSearch} />
        )}
      </TextSearchArea>

      <Button
        Icon={SystemIcon.MagnifyingGlassIcon}
        onClick={executeSearch}
        size="small"
      />
    </BaseSearchBar>
  );
};

export default SearchBar;

const BaseSearchBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;

  width: 100%;

  @media (width < ${Responsive.WIDTH_BREAKPOINTS.laptop}) {
    border-radius: 0px;
  }

  @media (width >= ${Responsive.WIDTH_BREAKPOINTS.laptop}) {
    border-radius: 12px;
  }
`;

const TextSearchArea = styled.div<{ $hasQueryText: boolean }>`
  display: flex;
  align-items: center;

  height: 40px;
  width: 100%;

  background-color: ${(props) =>
    props.$hasQueryText ? Color.neutral.white : Color.neutral.grey4};
  border: 1px solid
    ${(props) =>
      props.$hasQueryText ? Color.accent.yellow1 : Color.neutral.grey2};
  border-radius: 8px;

  &:focus-within {
    background-color: ${Color.neutral.white};
    border: 1px solid ${Color.accent.yellow1};
  }
`;

type TextInputProps = {
  queryText: string;
  updateQueryText: (newText: string) => void;
  executeSearch: () => void;
};

const TextInput = ({
  queryText,
  updateQueryText,
  executeSearch,
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
      onChange={(event) => updateQueryText(event.target.value)}
      onKeyDown={onKeyDown}
      placeholder="Search grant or describe your project"
    />
  );
};

const BaseTextInput = styled.input`
  width: 100%;
  margin-left: 16px;

  text-overflow: ellipsis;

  background-color: transparent;
  outline: none;
  border: none;
`;

type ResetButtonProps = {
  resetSearch: () => void;
};

const ResetButton = ({ resetSearch }: ResetButtonProps) => (
  <BaseResetButton type="button" onClick={resetSearch}>
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
