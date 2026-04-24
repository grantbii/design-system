import type { KeyboardEvent } from "react";
import styled from "styled-components";
import { applyTypography } from "../../integrations";
import { Color, Responsive, SystemIcon, Typography } from "../../atoms";
import { Button } from "../../molecules";
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
    <BaseSearchBar>
      <TextSearchArea $showBorder={activeQuery.text !== ""}>
        <QueryTextInput />

        {queryText === "" ? (
          <ResetTextButtonPlaceholder />
        ) : (
          <ResetTextButton />
        )}
      </TextSearchArea>

      <TextSearchButton textSearchCallback={textSearchCallback} />
      <OpenModalButton openModalCallback={openModalCallback} />
    </BaseSearchBar>
  );
};

export default SearchBar;

const BaseSearchBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;

  color: ${Color.typography.blackHigh};
  background-color: ${Color.neutral.white};

  @media (width < ${Responsive.WIDTH_BREAKPOINTS.laptop}) {
    gap: 8px;
    padding: 0px;

    box-shadow: none;
    border-radius: 0px;
  }

  @media (width >= ${Responsive.WIDTH_BREAKPOINTS.laptop}) {
    gap: 16px;
    padding: 12px 16px;

    box-shadow: 0px 0px 40px 0px #00000008;
    border-radius: 12px;
  }
`;

const TextSearchArea = styled.div<{ $showBorder: boolean }>`
  display: flex;
  align-items: center;

  height: 40px;
  width: 100%;

  background-color: ${Color.neutral.grey4};
  border-radius: 8px;

  border: 1px solid
    ${({ $showBorder }) =>
      $showBorder ? Color.accent.yellow1 : Color.neutral.grey2};

  &:focus-within {
    border: 1px solid ${Color.accent.yellow1};
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
      placeholder="Search grant or describe your project"
    />
  );
};

const BaseQueryTextInput = styled.input`
  width: 100%;
  margin-left: 16px;
  outline: none;
  border: none;

  background-color: ${Color.neutral.grey4};
  text-overflow: ellipsis;
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
      <SystemIcon.XIcon size={14} color={Color.neutral.black} />
    </BaseResetTextButton>
  );
};

const BaseResetTextButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 38px;
  min-width: 38px;
  height: 38px;

  background-color: ${Color.neutral.grey4};
  border-radius: 8px;
`;

const ResetTextButtonPlaceholder = styled.div`
  width: 38px;
  height: 38px;

  border-radius: 8px;
`;

type TextSearchButtonProps = {
  textSearchCallback?: () => void;
};

const TextSearchButton = ({ textSearchCallback }: TextSearchButtonProps) => {
  const { activeQuery, updateActiveQuery, queryText } = useGrantMatchContext();

  const onClick = () => {
    if (textSearchCallback) {
      textSearchCallback();
    }

    updateActiveQuery({ files: activeQuery.files, text: queryText });
  };

  return (
    <Button
      Icon={SystemIcon.MagnifyingGlassIcon}
      onClick={onClick}
      size="small"
    />
  );
};

type OpenModalButtonProps = {
  openModalCallback?: () => void;
};

const OpenModalButton = ({ openModalCallback }: OpenModalButtonProps) => {
  const { openModal } = useGrantMatchContext();

  const onClickOpen = () => {
    if (openModalCallback) {
      openModalCallback();
    }

    openModal();
  };

  return (
    <BaseOpenModalButton onClick={onClickOpen}>
      <SystemIcon.FileArrowUpIcon size={20} />
      <OpenModalButtonText>File Drop</OpenModalButtonText>
    </BaseOpenModalButton>
  );
};

const BaseOpenModalButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  height: 40px;

  border-radius: 8px;

  background-color: ${Color.neutral.grey3};
  color: ${Color.typography.blackHigh};

  ${applyTypography(Typography.bodySecondaryRegular)}

  &:hover {
    background-color: ${Color.accent.blue3};
  }

  @media (width < ${Responsive.WIDTH_BREAKPOINTS.laptop}) {
    width: 40px;
    min-width: 40px;
    padding: 0px;
  }

  @media (width >= ${Responsive.WIDTH_BREAKPOINTS.laptop}) {
    width: auto;
    min-width: 90px;
    padding: 2px 16px;
  }
`;

const OpenModalButtonText = styled.p`
  font-weight: 500;
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
