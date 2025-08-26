"use client";

import { GrantFilters } from "@grantbii/ui-base/grant/models";
import { isGrantMatchActive } from "@grantbii/ui-base/match/mappings";
import { GrantMatchQuery } from "@grantbii/ui-base/match/models";
import { ComponentType, MouseEventHandler, useState } from "react";
import styled from "styled-components";
import { Badge, Button, Textarea } from "../atoms";
import { Colors, Icons, Responsive, Typography } from "../foundations";
import { FileDrop, Modal, useFileDrop, useModal } from "../molecules";

type GrantMatchProps = {
  activeQuery: GrantMatchQuery;
  updateActiveQuery: (newQuery: GrantMatchQuery) => void;
  removeActiveQueryFile: (fileName: string) => void;
  removeActiveQueryText: () => void;
  resetActiveQuery: () => void;
};

const GrantMatch = ({
  activeQuery,
  updateActiveQuery,
  removeActiveQueryFile,
  removeActiveQueryText,
  resetActiveQuery,
}: GrantMatchProps) => {
  const { showModal, openModal, closeModal } = useModal();

  const [queryText, setQueryText] = useState(activeQuery.text);
  const updateQueryText = (newText: string) => setQueryText(newText);

  const onClickSearch = () =>
    updateActiveQuery({ ...activeQuery, text: queryText });

  const onClickReset = () => {
    updateQueryText("");
    resetActiveQuery();
  };

  return (
    <BaseGrantMatch>
      <GrantMatchActions
        queryText={queryText}
        updateQueryText={updateQueryText}
        onClickSearch={onClickSearch}
        onClickFileDrop={() => openModal()}
        onClickReset={onClickReset}
        isActive={activeQuery.text !== ""}
      />

      {activeQuery.files.length > 0 ? (
        <ActiveQueryRow>
          <ActiveQueryFiles
            activeQuery={activeQuery}
            removeQueryFile={removeActiveQueryFile}
            removeQueryText={removeActiveQueryText}
          />
          <SmallScreenResetButton onClick={onClickReset} />
        </ActiveQueryRow>
      ) : (
        <></>
      )}

      {showModal ? (
        <GrantMatchModal
          activeQuery={activeQuery}
          updateActiveQuery={updateActiveQuery}
          queryText={queryText}
          updateQueryText={updateQueryText}
          closeModal={closeModal}
        />
      ) : (
        <></>
      )}
    </BaseGrantMatch>
  );
};

export default GrantMatch;

// TODO: refactor
export const useGrantMatchActiveQuery = (
  filters: GrantFilters,
  performGrantMatch: (newQuery: GrantMatchQuery, filters: GrantFilters) => void,
  resetGrantMatch: () => void,
): GrantMatchProps => {
  const [activeQuery, setActiveQuery] = useState<GrantMatchQuery>(() => ({
    ...BLANK_GRANT_MATCH_QUERY,
  }));

  const updateActiveQuery = (query: GrantMatchQuery) => {
    setActiveQuery({ ...query });

    if (isGrantMatchActive(query)) {
      performGrantMatch(query, filters);
    } else {
      resetGrantMatch();
    }
  };

  const removeActiveQueryFile = (fileName: string) => {
    const newQuery = {
      files: activeQuery.files.filter((file) => file.name !== fileName),
      text: activeQuery.text,
    };

    updateActiveQuery(newQuery);
  };

  const removeActiveQueryText = () => {
    const newQuery = { files: activeQuery.files, text: "" };
    updateActiveQuery(newQuery);
  };

  const resetActiveQuery = () =>
    updateActiveQuery({ ...BLANK_GRANT_MATCH_QUERY });

  return {
    activeQuery,
    updateActiveQuery,
    removeActiveQueryFile,
    removeActiveQueryText,
    resetActiveQuery,
  };
};

const BLANK_GRANT_MATCH_QUERY: GrantMatchQuery = { files: [], text: "" };

const BaseGrantMatch = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  width: 100%;
  max-width: 100vw;
`;

type GrantMatchActionsProps = {
  queryText: string;
  updateQueryText: (newText: string) => void;
  onClickSearch: MouseEventHandler<HTMLButtonElement>;
  onClickFileDrop: MouseEventHandler<HTMLButtonElement>;
  onClickReset: MouseEventHandler<HTMLButtonElement>;
  isActive: boolean;
};

const GrantMatchActions = ({
  queryText,
  updateQueryText,
  onClickSearch,
  onClickFileDrop,
  onClickReset,
  isActive,
}: GrantMatchActionsProps) => (
  <Actions>
    <SearchBar $isActive={isActive}>
      <Input
        value={queryText}
        onChange={(event) => updateQueryText(event.target.value)}
        placeholder="Find grants that match your needs"
      />
      <SearchButton onClick={onClickSearch} />
      <FileDropButton onClick={onClickFileDrop} />
    </SearchBar>

    {isActive ? <BigScreenResetButton onClick={onClickReset} /> : <></>}
  </Actions>
);

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SearchBar = styled.div<{ $isActive: boolean }>`
  display: flex;
  align-items: center;

  padding: 6px 16px;

  background-color: ${Colors.base.white};
  color: ${Colors.typography.blackHigh};

  border: 1px solid
    ${({ $isActive }) =>
      $isActive ? Colors.accent.yellow1 : Colors.neutral.grey3};
  border-radius: 12px;

  @media (width < ${Responsive.WIDTH_BREAKPOINTS.laptop}) {
    gap: 8px;
    width: 100%;
  }

  @media (width >= ${Responsive.WIDTH_BREAKPOINTS.laptop}) {
    gap: 16px;
    width: auto;
  }
`;

const Input = styled.input`
  width: 300px;
  border: none;
  outline: none;
`;

type SearchButtonProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
};

const SearchButton = ({ onClick }: SearchButtonProps) => (
  <BaseSearchButton type="button" onClick={onClick}>
    <Icons.MagnifyingGlassIcon size={16} color={Colors.neutral.grey1} />
  </BaseSearchButton>
);

const BaseSearchButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 32px;
  width: 32px;
  min-width: 32px;

  background-color: ${Colors.neutral.grey3};

  border-radius: 8px;
`;

type FileDropButtonProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
};

const FileDropButton = ({ onClick }: FileDropButtonProps) => (
  <BaseFileDropButton onClick={onClick}>
    <Icons.FileArrowUpIcon size={16} />
    <FileDropButtonText>File Drop</FileDropButtonText>
  </BaseFileDropButton>
);

const BaseFileDropButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;

  height: 31px;
  min-width: 31px;

  background-color: ${Colors.base.white};
  color: ${Colors.accent.blue1};

  border: 1px solid ${Colors.accent.blue1};
  border-radius: 8px;

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
  @media (width < ${Responsive.WIDTH_BREAKPOINTS.laptop}) {
    display: none;
  }

  @media (width >= ${Responsive.WIDTH_BREAKPOINTS.laptop}) {
    display: inline;
  }
`;

type ResetButtonProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
};

const SmallScreenResetButton = ({ onClick }: ResetButtonProps) => (
  <SmallScreenReset>
    <ResetButton onClick={onClick} />
  </SmallScreenReset>
);

const SmallScreenReset = styled.div`
  @media (width < ${Responsive.WIDTH_BREAKPOINTS.laptop}) {
    display: inline;
  }

  @media (width >= ${Responsive.WIDTH_BREAKPOINTS.laptop}) {
    display: none;
  }
`;

const BigScreenResetButton = ({ onClick }: ResetButtonProps) => (
  <BigScreenReset>
    <ResetButton onClick={onClick} />
  </BigScreenReset>
);

const BigScreenReset = styled.div`
  @media (width < ${Responsive.WIDTH_BREAKPOINTS.laptop}) {
    display: none;
  }

  @media (width >= ${Responsive.WIDTH_BREAKPOINTS.laptop}) {
    display: inline;
  }
`;

const ResetButton = ({ onClick }: ResetButtonProps) => (
  <Button
    text="Reset"
    onClick={onClick}
    color={Colors.typography.blackMedium}
    underline
  />
);

const ActiveQueryRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

type QueryItemsProps = {
  activeQuery: GrantMatchQuery;
  removeQueryFile: (fileName: string) => void;
  removeQueryText: () => void;
};

const ActiveQueryFiles = ({
  activeQuery,
  removeQueryFile,
}: QueryItemsProps) => (
  <BaseActiveQueryFiles>
    {activeQuery.files.map((file) => (
      <Badge
        key={file.name}
        text={file.name}
        Icon={FILE_TYPE_ICON_MAP[file.type] ?? Icons.FileIcon}
        onClickClose={() => removeQueryFile(file.name)}
        textWidthPixels={160}
      />
    ))}
  </BaseActiveQueryFiles>
);

const BaseActiveQueryFiles = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  width: 100%;

  overflow-x: auto;

  /* hide scrollbar but still allow for scrolling */
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }

  /* TODO: fade effect on overflow-x */
`;

const FILE_TYPE_ICON_MAP: {
  [itemType: string]: ComponentType<Icons.IconProps>;
} = {
  "application/pdf": Icons.FilePdfIcon,
};

type GrantMatchModalProps = {
  activeQuery: GrantMatchQuery;
  updateActiveQuery: (query: GrantMatchQuery) => void;
  queryText: string;
  updateQueryText: (newText: string) => void;
  closeModal: () => void;
};

const GrantMatchModal = ({
  activeQuery,
  updateActiveQuery,
  queryText,
  updateQueryText,
  closeModal,
}: GrantMatchModalProps) => {
  const { files, uploadFiles, removeFile } = useFileDrop(activeQuery.files);

  const onClickFind = () => {
    updateActiveQuery({ files, text: queryText });
    closeModal();
  };

  return (
    <Modal
      header={<div>Grant Match</div>}
      content={
        <Content
          files={files}
          uploadFiles={uploadFiles}
          removeFile={removeFile}
          queryText={queryText}
          updateQueryText={updateQueryText}
        />
      }
      footer={
        <Button
          text="Find My Grants"
          onClick={onClickFind}
          backgroundColor={Colors.accent.yellow1}
        />
      }
      onClickCancel={() => closeModal()}
      width="480px"
      height="600px"
    />
  );
};

type ContentProps = {
  files: File[];
  uploadFiles: (acceptedFiles: File[]) => void;
  removeFile: (fileName: string) => void;
  queryText: string;
  updateQueryText: (newText: string) => void;
};

const Content = ({
  files,
  uploadFiles,
  removeFile,
  queryText,
  updateQueryText,
}: ContentProps) => (
  <BaseContent>
    <FileDrop
      uploadedFiles={files}
      uploadFiles={uploadFiles}
      removeFile={removeFile}
    />

    <QueryText>
      <label htmlFor={QUERY_TEXTAREA_ID}>Search Grants Opportunities</label>
      <Textarea
        id={QUERY_TEXTAREA_ID}
        value={queryText}
        onChange={(event) => updateQueryText(event.target.value)}
        placeholder="Explore by grant name or share what your project is about..."
      />
    </QueryText>
  </BaseContent>
);

const QUERY_TEXTAREA_ID = "query-textarea";

const BaseContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const QueryText = styled.div`
  display: flex;
  flex-direction: column;
`;
