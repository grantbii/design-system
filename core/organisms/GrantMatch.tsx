import { isGrantMatchActive } from "@grantbii/ui-base/match/mappings";
import { GrantMatchQuery } from "@grantbii/ui-base/match/models";
import { ComponentType, MouseEventHandler, useState } from "react";
import styled from "styled-components";
import { Badge, Button, Textarea } from "../atoms";
import { Colors, Icons } from "../foundations";
import { FileDrop, Modal, useFileDrop, useModal } from "../molecules";

type GrantMatchProps = {
  query: GrantMatchQuery;
  updateQueryFiles: (newFiles: File[]) => void;
  updateQueryText: (newText: string) => void;
  onPerformGrantMatch: (query: GrantMatchQuery) => void;
  onResetGrantMatch: () => void;
};

const GrantMatch = ({
  query,
  updateQueryFiles,
  updateQueryText,
  onPerformGrantMatch,
  onResetGrantMatch,
}: GrantMatchProps) => {
  const { showModal, openModal, closeModal } = useModal();

  const {
    performGrantMatch,
    resetGrantMatch,
    removeUploadedFile,
    removeQueryText,
  } = useGrantMatch(
    query,
    updateQueryFiles,
    updateQueryText,
    onPerformGrantMatch,
    onResetGrantMatch,
    closeModal,
  );

  const isActive = isGrantMatchActive(query);

  return (
    <Container>
      <GrantMatchButtons
        isActive={isActive}
        onClickMatch={() => openModal()}
        onClickReset={() => resetGrantMatch()}
      />

      {isActive ? (
        <QueryItems
          uploadedFiles={query.files}
          removeUploadedFile={removeUploadedFile}
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
        />
      ) : (
        <></>
      )}
    </Container>
  );
};

export default GrantMatch;

export const useMatchQuery = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [text, setText] = useState("");

  return {
    query: { files, text },
    updateQueryFiles: (newFiles: File[]) => setFiles(newFiles),
    updateQueryText: (newText: string) => setText(newText),
  };
};

const useGrantMatch = (
  query: GrantMatchQuery,
  updateQueryFiles: (newFiles: File[]) => void,
  updateQueryText: (newText: string) => void,
  onPerformGrantMatch: (query: GrantMatchQuery) => void,
  onResetGrantMatch: () => void,
  closeModal: () => void,
) => {
  const performGrantMatch = (newFiles: File[], newText: string) => {
    updateQueryFiles(newFiles);
    updateQueryText(newText);
    onPerformGrantMatch({ files: newFiles, text: newText });
    closeModal();
  };

  const resetGrantMatch = () => {
    updateQueryFiles([]);
    updateQueryText("");
    onResetGrantMatch();
  };

  const removeUploadedFile = (fileName: string) => {
    const newFiles = query.files.filter((file) => file.name !== fileName);
    updateQueryFiles(newFiles);
    const newQuery: GrantMatchQuery = { files: newFiles, text: query.text };

    if (isGrantMatchActive(newQuery)) {
      onPerformGrantMatch(newQuery);
    } else {
      onResetGrantMatch();
    }
  };

  const removeQueryText = () => {
    updateQueryText("");
    const newQuery: GrantMatchQuery = { files: query.files, text: "" };

    if (isGrantMatchActive(newQuery)) {
      onPerformGrantMatch(newQuery);
    } else {
      onResetGrantMatch();
    }
  };

  return {
    performGrantMatch,
    resetGrantMatch,
    removeUploadedFile,
    removeQueryText,
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
  uploadedFiles: File[];
  removeUploadedFile: (fileName: string) => void;
  queryText: string;
  removeQueryText: () => void;
};

const QueryItems = ({
  uploadedFiles,
  removeUploadedFile,
  queryText,
  removeQueryText,
}: QueryItemsProps) => (
  <BaseQueryItems>
    {uploadedFiles.map((file) => (
      <Badge
        key={file.name}
        text={file.name}
        Icon={FILE_TYPE_ICON_MAP[file.type] ?? Icons.FileIcon}
        onClickClose={() => removeUploadedFile(file.name)}
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
        textWidthPixels={160}
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
};

const GrantMatchModal = ({
  activeFiles,
  activeText,
  performGrantMatch,
  onClickCancel,
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
