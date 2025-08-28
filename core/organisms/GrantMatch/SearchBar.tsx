import { KeyboardEvent } from "react";
import styled, { css } from "styled-components";
import { Colors, Icons, Responsive, Typography } from "../../foundations";
import { useGrantMatchContext } from "./context";

const SearchBar = () => {
  const { activeQuery } = useGrantMatchContext();

  return (
    <BaseSearchBar $hasActiveQueryText={activeQuery.text !== ""}>
      <QueryTextInput />

      <Buttons>
        <ResetTextButton />
        <SearchButton />
        <FileDropButton />
      </Buttons>
    </BaseSearchBar>
  );
};

export default SearchBar;

const BaseSearchBar = styled.div<{ $hasActiveQueryText: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;

  background-color: ${Colors.base.white};
  color: ${Colors.typography.blackHigh};

  border: 1px solid
    ${({ $hasActiveQueryText }) =>
      $hasActiveQueryText ? Colors.main.grantbiiOrange : Colors.neutral.grey3};
  border-radius: 12px;

  @media (width < ${Responsive.WIDTH_BREAKPOINTS.laptop}) {
    gap: 8px;
    width: 100%;
    padding: 6px 16px;
  }

  @media (width >= ${Responsive.WIDTH_BREAKPOINTS.laptop}) {
    gap: 10px;
    width: 480px;
    padding: 10px;
  }
`;

const QueryTextInput = () => {
  const { activeQuery, updateActiveQuery, queryText, updateQueryText } =
    useGrantMatchContext();

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !event.repeat) {
      event.preventDefault();
      updateActiveQuery({ files: activeQuery.files, text: queryText });
    }
  };

  return (
    <BaseQueryTextInput
      value={queryText}
      onChange={(event) => updateQueryText(event.target.value)}
      onKeyDown={onKeyDown}
      placeholder="Find grants that match your needs"
    />
  );
};

const BaseQueryTextInput = styled.input`
  border: none;
  outline: none;

  width: 100%;
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const BaseIconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 32px;
  width: 32px;
  min-width: 32px;

  border-radius: 8px;
`;

const ResetTextButton = () => {
  const { activeQuery, updateActiveQuery, updateQueryText } =
    useGrantMatchContext();

  const onClick = () => {
    updateQueryText("");
    updateActiveQuery({ files: activeQuery.files, text: "" });
  };

  return (
    <BaseResetTextButton type="button" onClick={onClick}>
      <Icons.XIcon size={16} color={Colors.neutral.grey1} />
    </BaseResetTextButton>
  );
};

const BaseResetTextButton = styled(BaseIconButton)`
  background-color: ${Colors.base.white};
`;

const SearchButton = () => {
  const { activeQuery, updateActiveQuery, queryText } = useGrantMatchContext();
  const onClick = () =>
    updateActiveQuery({ files: activeQuery.files, text: queryText });

  return (
    <BaseSearchButton type="button" onClick={onClick}>
      <Icons.MagnifyingGlassIcon size={16} color={Colors.neutral.grey1} />
    </BaseSearchButton>
  );
};

const BaseSearchButton = styled(BaseIconButton)`
  background-color: ${Colors.neutral.grey3};
`;

const FileDropButton = () => {
  const { activeQuery, openModal } = useGrantMatchContext();

  return (
    <BaseFileDropButton
      onClick={() => openModal()}
      $hasActiveQueryFiles={activeQuery.files.length > 0}
    >
      <Icons.FileArrowUpIcon size={16} />
      <FileDropButtonText>File Drop</FileDropButtonText>
    </BaseFileDropButton>
  );
};

const BaseFileDropButton = styled.button<{ $hasActiveQueryFiles: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;

  height: 31px;
  min-width: 31px;

  border: 1px solid ${Colors.main.grantbiiOrange};
  border-radius: 8px;

  ${({ $hasActiveQueryFiles }) =>
    $hasActiveQueryFiles
      ? css`
          background-color: ${Colors.main.grantbiiOrange};
          color: ${Colors.typography.whiteHigh};
        `
      : css`
          background-color: ${Colors.base.white};
          color: ${Colors.main.grantbiiOrange};
        `}

  @media (width < ${Responsive.WIDTH_BREAKPOINTS.laptop}) {
    padding: 0px;
    font-size: ${Typography.HELPER_FONT_SIZES.small};
  }

  @media (width >= ${Responsive.WIDTH_BREAKPOINTS.laptop}) {
    padding: 0px 8px;
    font-size: ${Typography.HELPER_FONT_SIZES.big};
  }
`;

const FileDropButtonText = styled.p`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  @media (width < ${Responsive.WIDTH_BREAKPOINTS.laptop}) {
    display: none;
  }

  @media (width >= ${Responsive.WIDTH_BREAKPOINTS.laptop}) {
    display: inline;
  }
`;
