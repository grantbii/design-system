import type { KeyboardEvent } from "react";
import styled, { css } from "styled-components";
import { Colors, Icons, Responsive, Typography } from "../../foundations";
import { useGrantMatchContext } from "./context";
import grantMatchLogo from "../../assets/logos/grant_match_logo.webp";
import Image from "next/image";

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

        {queryText !== "" ? (
          <ResetTextButton />
        ) : (
          <ResetTextButtonPlaceholder />
        )}
      </TextSearchArea>

      <TextSearchButton textSearchCallback={textSearchCallback} />
      <VerticalDivider />
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
  padding: 12px 16px;

  color: ${Colors.typography.blackHigh};
  background-color: ${Colors.base.white};

  @media (width < ${Responsive.WIDTH_BREAKPOINTS.laptop}) {
    gap: 8px;
    box-shadow: none;
    border-radius: 0 px;
  }

  @media (width >= ${Responsive.WIDTH_BREAKPOINTS.laptop}) {
    gap: 16px;
    box-shadow: 0px 0px 40px 0px #00000008;
    border-radius: 12px;
  }
`;

const TextSearchArea = styled.div<{ $showBorder: boolean }>`
  display: flex;
  align-items: center;

  width: 100%;

  background-color: ${Colors.neutral.grey4};
  border-radius: 8px;

  border: 1px solid
    ${({ $showBorder }) =>
      $showBorder ? Colors.main.grantbiiOrange : Colors.neutral.grey4};
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

  background-color: ${Colors.neutral.grey4};
  text-overflow: ellipsis;
`;

const BaseIconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 38px;
  min-width: 38px;
  height: 38px;

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
      <Icons.XIcon size={20} color={Colors.neutral.grey1} />
    </BaseResetTextButton>
  );
};

const BaseResetTextButton = styled(BaseIconButton)`
  background-color: ${Colors.neutral.grey4};
  border: 1px solid ${Colors.neutral.grey4};
`;

const ResetTextButtonPlaceholder = styled.div`
  width: 40px;
  height: 40px;

  background-color: ${Colors.neutral.grey4};
  border-radius: 8px;
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
      <Icons.MagnifyingGlassIcon size={20} color={Colors.base.white} />
    </BaseSearchButton>
  );
};

const BaseSearchButton = styled(BaseIconButton)`
  background-color: ${Colors.main.grantbiiBlue};
  border: 1px solid ${Colors.main.grantbiiBlue};
`;

const VerticalDivider = styled.div`
  height: 40px;
  border-left: 1px solid ${Colors.neutral.grey2};
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
      <GrantMatchLogo
        src={grantMatchLogo}
        alt="Grant Match"
        width={64}
        height={64}
      />
      <OpenModalButtonText>Get Personalized Grant Matches</OpenModalButtonText>
    </BaseOpenModalButton>
  );
};

const BaseOpenModalButton = styled.button<{ $hasActiveQueryFiles: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  height: 38px;
  min-width: 38px;

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
    width: 38px;
    padding: 0px;
    font-size: ${Typography.HELPER_FONT_SIZES.small};
  }

  @media (width >= ${Responsive.WIDTH_BREAKPOINTS.laptop}) {
    width: 318px;
    padding: 2px 12px;
    font-size: ${Typography.HELPER_FONT_SIZES.big};
  }
`;

const GrantMatchLogo = styled(Image)`
  width: 18px;
  height: 18px;

  box-shadow: 0px 0px 3px 3px #ffe2b680;
  border-radius: 120px;
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
