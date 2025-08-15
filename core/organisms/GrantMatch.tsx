import { isGrantMatchActive } from "@grantbii/ui-base/match/mappings";
import { GrantMatchQuery } from "@grantbii/ui-base/match/models";
import { ComponentType, MouseEventHandler, useState } from "react";
import styled from "styled-components";
import { Badge, Button, Textarea } from "../atoms";
import { Colors, Icons } from "../foundations";
import { FileDrop, Modal, useFileDrop, useModal } from "../molecules";

type GrantMatchQueryProps = {
  query: GrantMatchQuery;
  updateQueryFiles: (newFiles: File[]) => void;
  removeQueryFile: (fileName: string) => void;
  updateQueryText: (newText: string) => void;
  removeQueryText: () => void;
  resetQuery: () => void;
};

type GrantMatchProps = GrantMatchQueryProps & {
  isModalFullScreen?: boolean;
};

const GrantMatch = ({
  query,
  updateQueryFiles,
  removeQueryFile,
  updateQueryText,
  removeQueryText,
  resetQuery,
  isModalFullScreen,
}: GrantMatchProps) => {
  const { showModal, openModal, closeModal } = useModal();
  const isActive = isGrantMatchActive(query);

  const performGrantMatch = (newFiles: File[], newText: string) => {
    updateQueryFiles(newFiles);
    updateQueryText(newText);
    closeModal();
  };

  return (
    <Container>
      <GrantMatchButtons
        isActive={isActive}
        onClickMatch={() => openModal()}
        onClickReset={() => resetQuery()}
      />

      {isActive ? (
        <QueryItems
          queryFiles={query.files}
          removeQueryFile={removeQueryFile}
          queryText={query.text}
          removeQueryText={removeQueryText}
        />
      ) : (
        <></>
      )}

      {showModal ? (
        <GrantMatchModal
          activeFiles={query.files}
          activeText={query.text}
          performGrantMatch={performGrantMatch}
          onClickCancel={() => closeModal()}
          isFullScreen={isModalFullScreen}
        />
      ) : (
        <></>
      )}
    </Container>
  );
};

export default GrantMatch;

const BLANK_GRANT_MATCH_QUERY: GrantMatchQuery = { files: [], text: "" };

export const useGrantMatchQueryItems = (): GrantMatchQueryProps => {
  const [query, setQuery] = useState<GrantMatchQuery>(() => ({
    ...BLANK_GRANT_MATCH_QUERY,
  }));

  const updateQueryFiles = (files: File[]) =>
    setQuery(({ text }) => ({ files, text }));

  const removeQueryFile = (fileName: string) =>
    setQuery(({ files, text }) => ({
      files: files.filter((file) => file.name !== fileName),
      text,
    }));

  const updateQueryText = (text: string) =>
    setQuery(({ files }) => ({ files, text }));

  const removeQueryText = () => setQuery(({ files }) => ({ files, text: "" }));

  const resetQuery = () => setQuery({ ...BLANK_GRANT_MATCH_QUERY });

  return {
    query,
    updateQueryFiles,
    removeQueryFile,
    updateQueryText,
    removeQueryText,
    resetQuery,
  };
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  padding: 16px 16px 0px 16px;

  width: 100%;
  max-width: 100vw;
`;

type GrantMatchButtonsProps = {
  isActive: boolean;
  onClickMatch: MouseEventHandler<HTMLButtonElement>;
  onClickReset: MouseEventHandler<HTMLButtonElement>;
};

const GrantMatchButtons = ({
  isActive,
  onClickMatch,
  onClickReset,
}: GrantMatchButtonsProps) => (
  <Buttons>
    <GrantMatchButton isActive={isActive} onClick={onClickMatch} />
    {isActive ? (
      <Button
        text="Reset"
        onClick={onClickReset}
        color={Colors.typography.blackMedium}
        underline
      />
    ) : (
      <></>
    )}
  </Buttons>
);

const Buttons = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

type GrantMatchButtonProps = {
  isActive: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

const GrantMatchButton = ({ isActive, onClick }: GrantMatchButtonProps) => (
  <BaseGrantMatchButton type="button" $isActive={isActive} onClick={onClick}>
    <Icons.GrantMatchIcon size={20} />
    <p>Find grants that match your needs</p>
    <Icons.MagnifyingGlassIcon size={20} />
  </BaseGrantMatchButton>
);

const BaseGrantMatchButton = styled.button<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;

  height: 20px;
  padding: 10px 16px;
  border-radius: 200px;

  font-size: 14px;
  font-weight: 500;

  color: ${Colors.typography.blackMedium};
  background-color: ${Colors.base.white};
  border: 1px solid
    ${({ $isActive }) =>
      $isActive ? Colors.accent.yellow1 : Colors.neutral.grey3};
`;

type QueryItemsProps = {
  queryFiles: File[];
  removeQueryFile: (fileName: string) => void;
  queryText: string;
  removeQueryText: () => void;
};

const QueryItems = ({
  queryFiles,
  removeQueryFile,
  queryText,
  removeQueryText,
}: QueryItemsProps) => (
  <BaseQueryItems>
    {queryFiles.map((file) => (
      <Badge
        key={file.name}
        text={file.name}
        Icon={FILE_TYPE_ICON_MAP[file.type] ?? Icons.FileIcon}
        onClickClose={() => removeQueryFile(file.name)}
        textWidthPixels={160}
      />
    ))}

    {queryText === "" ? (
      <></>
    ) : (
      <Badge
        key="additional-information-query-item"
        text="Additional Information"
        Icon={Icons.TextAaIcon}
        onClickClose={() => removeQueryText()}
        textWidthPixels={180}
      />
    )}
  </BaseQueryItems>
);

const BaseQueryItems = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  overflow-x: auto;

  /* hide scrollbar but still allow for scrolling */
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const FILE_TYPE_ICON_MAP: {
  [itemType: string]: ComponentType<Icons.IconProps>;
} = {
  "application/pdf": Icons.FilePdfIcon,
};

type GrantMatchModalProps = {
  activeFiles: File[];
  activeText: string;
  performGrantMatch: (newFiles: File[], newText: string) => void;
  onClickCancel: MouseEventHandler<HTMLButtonElement>;
  isFullScreen?: boolean;
};

const GrantMatchModal = ({
  activeFiles,
  activeText,
  performGrantMatch,
  onClickCancel,
  isFullScreen,
}: GrantMatchModalProps) => {
  const { files, uploadFiles, removeFile } = useFileDrop(activeFiles);
  const [queryText, setQueryText] = useState(activeText);
  const updateQueryText = (newText: string) => setQueryText(newText);

  return (
    <Modal
      header={<Header />}
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
          onClick={() => performGrantMatch(files, queryText)}
          backgroundColor={Colors.accent.yellow1}
        />
      }
      onClickCancel={onClickCancel}
      isFullScreen={isFullScreen}
    />
  );
};

const Header = () => (
  <BaseHeader>
    <Icons.GrantMatchIcon size={24} />
    <div>Grant Match</div>
  </BaseHeader>
);

const BaseHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

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
}: ContentProps) => {
  const additionalInformationId = "grant-match-additional-information";

  return (
    <BaseContent>
      <FileDrop
        uploadedFiles={files}
        uploadFiles={uploadFiles}
        removeFile={removeFile}
      />

      <QueryText>
        <label htmlFor={additionalInformationId}>Additional Information</label>
        <Textarea
          id={additionalInformationId}
          value={queryText}
          onChange={(event) => updateQueryText(event.target.value)}
        />
      </QueryText>
    </BaseContent>
  );
};

const BaseContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const QueryText = styled.div`
  display: flex;
  flex-direction: column;
`;
