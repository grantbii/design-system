import type { KeyboardEvent } from "react";
import styled, { css } from "styled-components";
import { Colors, Icons, Responsive, Typography } from "../../foundations";
import { useGrantMatchContext } from "./context";

type SearchBarProps = {
  textSearchCallback?: () => void;
  openModalCallback?: () => void;
};

const SearchBar = ({
  textSearchCallback,
  openModalCallback,
}: SearchBarProps) => {
  const { activeQuery, queryText } = useGrantMatchContext();

  return (
    <BaseSearchBar $hasActiveQueryText={activeQuery.text !== ""}>
      <QueryTextInput />

      <Buttons>
        {queryText !== "" ? <ResetTextButton /> : <></>}
        <TextSearchButton textSearchCallback={textSearchCallback} />
        <OpenModalButton openModalCallback={openModalCallback} />
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
    gap: 6px;
    padding: 6px;
    width: 100%;
  }

  @media (width >= ${Responsive.WIDTH_BREAKPOINTS.laptop}) {
    gap: 10px;
    padding: 10px;
    width: 480px;
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

  @media (width < ${Responsive.WIDTH_BREAKPOINTS.laptop}) {
    gap: 6px;
  }

  @media (width >= ${Responsive.WIDTH_BREAKPOINTS.laptop}) {
    gap: 10px;
  }
`;

const BaseIconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 31px;
  width: 31px;
  min-width: 31px;

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
  border: 1px solid ${Colors.base.white};
`;

type TextSearchButtonProps = {
  textSearchCallback?: () => void;
};

const TextSearchButton = ({ textSearchCallback }: TextSearchButtonProps) => {
  const { activeQuery, updateActiveQuery, queryText } = useGrantMatchContext();

  const onClickSearch = () => {
    if (textSearchCallback) {
      textSearchCallback();
    }

    updateActiveQuery({ files: activeQuery.files, text: queryText });
  };

  return (
    <BaseSearchButton type="button" onClick={onClickSearch}>
      <Icons.MagnifyingGlassIcon size={16} color={Colors.neutral.grey1} />
    </BaseSearchButton>
  );
};

const BaseSearchButton = styled(BaseIconButton)`
  background-color: ${Colors.neutral.grey4};
  border: 1px solid ${Colors.neutral.grey3};
`;

type OpenModalButtonProps = {
  openModalCallback?: () => void;
};

const OpenModalButton = ({ openModalCallback }: OpenModalButtonProps) => {
  const { activeQuery, openModal } = useGrantMatchContext();

  const onClickOpen = () => {
    if (openModalCallback) {
      openModalCallback();
    }

    openModal();
  };

  return (
    <BaseOpenModalButton
      onClick={onClickOpen}
      $hasActiveQueryFiles={activeQuery.files.length > 0}
    >
      <Icons.FileArrowUpIcon size={16} />
      <OpenModalButtonText>File Drop</OpenModalButtonText>
    </BaseOpenModalButton>
  );
};

const BaseOpenModalButton = styled.button<{ $hasActiveQueryFiles: boolean }>`
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

const OpenModalButtonText = styled.p`
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
