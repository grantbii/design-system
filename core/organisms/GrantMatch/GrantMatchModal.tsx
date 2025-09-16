import styled from "styled-components";
import { Button, Textarea } from "../../atoms";
import { Colors } from "../../foundations";
import { FileDrop, Modal, useFileDrop } from "../../molecules";
import { useGrantMatchContext } from "./context";

const GrantMatchModal = () => {
  const { activeQuery, closeModal } = useGrantMatchContext();
  const { files, uploadFiles, removeFile, errorMessage } = useFileDrop(
    activeQuery.files,
  );

  return (
    <Modal
      header={<div>Grant Match</div>}
      content={
        <ModalContent
          files={files}
          uploadFiles={uploadFiles}
          removeFile={removeFile}
          errorMessage={errorMessage}
        />
      }
      footer={<FindGrantsButton files={files} />}
      onClickCancel={() => closeModal()}
      width="480px"
      height="600px"
    />
  );
};

export default GrantMatchModal;

type ModalContentProps = {
  files: File[];
  uploadFiles: (acceptedFiles: File[]) => void;
  removeFile: (fileName: string) => void;
  errorMessage?: string;
};

const ModalContent = ({
  files,
  uploadFiles,
  removeFile,
  errorMessage,
}: ModalContentProps) => {
  const { queryText, updateQueryText } = useGrantMatchContext();

  return (
    <BaseContent>
      <FileDrop
        uploadedFiles={files}
        uploadFiles={uploadFiles}
        removeFile={removeFile}
        errorMessage={errorMessage}
      />

      <ModalQueryText>
        <label htmlFor={QUERY_TEXTAREA_ID}>Search Grants Opportunities</label>
        <Textarea
          id={QUERY_TEXTAREA_ID}
          value={queryText}
          onChange={(event) => updateQueryText(event.target.value)}
          placeholder="Explore by grant name or share what your project is about..."
        />
      </ModalQueryText>
    </BaseContent>
  );
};

const QUERY_TEXTAREA_ID = "query-textarea";

const BaseContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ModalQueryText = styled.div`
  display: flex;
  flex-direction: column;
`;

type FindGrantsButtonProps = {
  files: File[];
};

const FindGrantsButton = ({ files }: FindGrantsButtonProps) => {
  const { updateActiveQuery, queryText, closeModal } = useGrantMatchContext();

  const onClick = () => {
    updateActiveQuery({ files, text: queryText });
    closeModal();
  };

  return (
    <Button
      text="Find My Grants"
      onClick={onClick}
      backgroundColor={Colors.accent.yellow1}
    />
  );
};
