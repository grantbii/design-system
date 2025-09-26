import Image from "next/image";
import styled from "styled-components";
import grantMatchLogo from "../../assets/logos/grant_match_logo.webp";
import { Button, Textarea } from "../../atoms";
import { Colors } from "../../foundations";
import { FileDrop, Modal, useFileDrop } from "../../molecules";
import { useGrantMatchContext } from "./context";

type GrantMatchModalProps = {
  findGrantsCallback?: () => void;
  closeModalCallback?: () => void;
};

const GrantMatchModal = ({
  findGrantsCallback,
  closeModalCallback,
}: GrantMatchModalProps) => {
  const { activeQuery, closeModal } = useGrantMatchContext();
  const { files, uploadFiles, removeFile, errorMessage } = useFileDrop(
    activeQuery.files,
  );

  const onClickClose = () => {
    if (closeModalCallback) {
      closeModalCallback();
    }

    closeModal();
  };

  return (
    <Modal
      header={<ModalHeader />}
      content={
        <ModalContent
          files={files}
          uploadFiles={uploadFiles}
          removeFile={removeFile}
          errorMessage={errorMessage}
        />
      }
      footer={
        <FindGrantsButton
          files={files}
          findGrantsCallback={findGrantsCallback}
        />
      }
      onClickClose={onClickClose}
      width="600px"
      height="560px"
    />
  );
};

export default GrantMatchModal;

const ModalHeader = () => (
  <BaseModalHeader>
    <GrantMatchLogo
      src={grantMatchLogo}
      alt="Grant Match"
      width={64}
      height={64}
    />
    <p>Let us get you matched to the most suitable grant</p>
  </BaseModalHeader>
);

const BaseModalHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const GrantMatchLogo = styled(Image)`
  width: 24px;
  height: 24px;

  box-shadow: 0px 0px 5px 5px #ffe2b680;
  border-radius: 120px;
`;

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
      <ModalFileDrop>
        <p>Upload Files (e.g. Project Plan, Proposal, Company Docs)</p>
        <FileDrop
          uploadedFiles={files}
          uploadFiles={uploadFiles}
          removeFile={removeFile}
          errorMessage={errorMessage}
        />
      </ModalFileDrop>

      <ModalQueryText>
        <label htmlFor={QUERY_TEXTAREA_ID}>Tell us what you intend to do</label>
        <Textarea
          id={QUERY_TEXTAREA_ID}
          value={queryText}
          onChange={(event) => updateQueryText(event.target.value)}
          placeholder="Give a summary of your project, specifying the key activities you will do & what you intend to achieve"
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

const ModalFileDrop = styled.div`
  display: flex;
  flex-direction: column;
`;

const ModalQueryText = styled.div`
  display: flex;
  flex-direction: column;
`;

type FindGrantsButtonProps = {
  files: File[];
  findGrantsCallback?: () => void;
};

const FindGrantsButton = ({
  files,
  findGrantsCallback,
}: FindGrantsButtonProps) => {
  const { updateActiveQuery, queryText, closeModal } = useGrantMatchContext();
  const hasQuery = queryText.trim() !== "" || files.length > 0;

  const onClick = () => {
    if (findGrantsCallback) {
      findGrantsCallback();
    }

    updateActiveQuery({ files, text: queryText });
    closeModal();
  };

  return (
    <Button
      text="Find My Grants"
      onClick={onClick}
      backgroundColor={hasQuery ? Colors.accent.yellow1 : Colors.neutral.grey3}
      disabled={!hasQuery}
    />
  );
};
