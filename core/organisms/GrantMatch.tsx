import { isGrantMatchActive } from "@grantbii/ui-base/match/mappings";
import { GrantMatchQuery } from "@grantbii/ui-base/match/models";
import { ComponentType, MouseEventHandler, useState } from "react";
import styled from "styled-components";
import { Badge, Button, Textarea } from "../atoms";
import { Colors, Icons } from "../foundations";
import { FileDrop, Modal, useFileDrop, useModal } from "../molecules";

type GrantMatchProps = GrantMatchQueryProps & {
  isModalFullScreen?: boolean;
};

const GrantMatch = ({
  query,
  updateQuery,
  removeQueryFile,
  removeQueryText,
  resetQuery,
  isModalFullScreen,
}: GrantMatchProps) => {
  const { showModal, openModal, closeModal } = useModal();
  const isActive = isGrantMatchActive(query);

  const updateActiveQuery = (newQuery: GrantMatchQuery) => {
    updateQuery(newQuery);
    closeModal();
  };

  return (
    <BaseGrantMatch>
      <GrantMatchButtons
        isActive={isActive}
        onClickMatch={() => openModal()}
        onClickReset={() => resetQuery()}
      />

      {isActive ? (
        <QueryItems
          activeQuery={query}
          removeQueryFile={removeQueryFile}
          removeQueryText={removeQueryText}
        />
      ) : (
        <></>
      )}

      {showModal ? (
        <GrantMatchModal
          activeQuery={query}
          updateActiveQuery={updateActiveQuery}
          onClickCancel={() => closeModal()}
          isFullScreen={isModalFullScreen}
        />
      ) : (
        <></>
      )}
    </BaseGrantMatch>
  );
};

export default GrantMatch;

type GrantMatchQueryProps = {
  query: GrantMatchQuery;
  updateQuery: (newQuery: GrantMatchQuery) => void;
  removeQueryFile: (fileName: string) => void;
  removeQueryText: () => void;
  resetQuery: () => void;
};

export const useGrantMatchQueryItems = (
  performGrantMatch: (newQuery: GrantMatchQuery) => void,
  resetGrantMatch: () => void,
): GrantMatchQueryProps => {
  const [query, setQuery] = useState<GrantMatchQuery>(() => ({
    ...BLANK_GRANT_MATCH_QUERY,
  }));

  const updateQuery = (newQuery: GrantMatchQuery) => {
    setQuery({ ...newQuery });

    if (isGrantMatchActive(newQuery)) {
      performGrantMatch(newQuery);
    } else {
      resetGrantMatch();
    }
  };

  const removeQueryFile = (fileName: string) => {
    const newQuery = {
      files: query.files.filter((file) => file.name !== fileName),
      text: query.text,
    };

    updateQuery(newQuery);

    if (isGrantMatchActive(newQuery)) {
      performGrantMatch(newQuery);
    } else {
      resetGrantMatch();
    }
  };

  const removeQueryText = () => {
    const newQuery = { files: query.files, text: "" };
    updateQuery(newQuery);

    if (isGrantMatchActive(newQuery)) {
      performGrantMatch(newQuery);
    } else {
      resetGrantMatch();
    }
  };

  const resetQuery = () => {
    setQuery({ ...BLANK_GRANT_MATCH_QUERY });
    resetGrantMatch();
  };

  return {
    query,
    updateQuery,
    removeQueryFile,
    removeQueryText,
    resetQuery,
  };
};

const BLANK_GRANT_MATCH_QUERY: GrantMatchQuery = { files: [], text: "" };

const BaseGrantMatch = styled.div`
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
  activeQuery: GrantMatchQuery;
  removeQueryFile: (fileName: string) => void;
  removeQueryText: () => void;
};

const QueryItems = ({
  activeQuery,
  removeQueryFile,
  removeQueryText,
}: QueryItemsProps) => (
  <BaseQueryItems>
    {activeQuery.files.map((file) => (
      <Badge
        key={file.name}
        text={file.name}
        Icon={FILE_TYPE_ICON_MAP[file.type] ?? Icons.FileIcon}
        onClickClose={() => removeQueryFile(file.name)}
        textWidthPixels={160}
      />
    ))}

    {activeQuery.text === "" ? (
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
  activeQuery: GrantMatchQuery;
  updateActiveQuery: (query: GrantMatchQuery) => void;
  onClickCancel: MouseEventHandler<HTMLButtonElement>;
  isFullScreen?: boolean;
};

const GrantMatchModal = ({
  activeQuery,
  updateActiveQuery,
  onClickCancel,
  isFullScreen,
}: GrantMatchModalProps) => {
  const { files, uploadFiles, removeFile } = useFileDrop(activeQuery.files);
  const [text, setText] = useState(activeQuery.text);

  return (
    <Modal
      header={<Header />}
      content={
        <Content
          files={files}
          uploadFiles={uploadFiles}
          removeFile={removeFile}
          queryText={text}
          updateQueryText={(newText: string) => setText(newText)}
        />
      }
      footer={
        <Button
          text="Find My Grants"
          onClick={() => updateActiveQuery({ files, text })}
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
}: ContentProps) => (
  <BaseContent>
    <FileDrop
      uploadedFiles={files}
      uploadFiles={uploadFiles}
      removeFile={removeFile}
    />

    <QueryText>
      <label htmlFor={ADDITIONAL_INFORMATION_ID}>Additional Information</label>
      <Textarea
        id={ADDITIONAL_INFORMATION_ID}
        value={queryText}
        onChange={(event) => updateQueryText(event.target.value)}
      />
    </QueryText>
  </BaseContent>
);

const ADDITIONAL_INFORMATION_ID = "grant-match-additional-information";

const BaseContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const QueryText = styled.div`
  display: flex;
  flex-direction: column;
`;
