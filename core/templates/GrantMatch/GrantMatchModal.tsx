import Image from "next/image";
import type { MouseEventHandler } from "react";
import styled from "styled-components";
import grantMatchLogo from "../../assets/logos/grant_match_logo.webp";
import { Color, Spacing, Typography } from "../../atoms";
import { applyTypography } from "../../integrations";
import { Button, Textarea } from "../../molecules";
import { Modal } from "../../organisms";
import FileDrop, { useFileDrop } from "../../organisms/FileDrop";
import { useGrantMatchContext } from "./context";

type GrantMatchModalProps = {
  findGrantsCallback?: () => void;
  closeModalCallback?: () => void;
};

const GrantMatchModal = ({
  findGrantsCallback,
  closeModalCallback,
}: GrantMatchModalProps) => {
  const { closeModal, updateActiveQuery, queryText, activeQuery } =
    useGrantMatchContext();
  const { files, uploadFiles, removeFile, errorMessage } = useFileDrop(
    activeQuery.files,
  );

  const onClickFind = () => {
    findGrantsCallback?.();
    updateActiveQuery({ files, text: queryText });
    closeModal();
  };

  const onClickClose = () => {
    closeModalCallback?.();
    closeModal();
  };

  return (
    <Modal width="600px" height="560px">
      <ModalHeader />

      <ModalBody>
        <ModalContent
          files={files}
          uploadFiles={uploadFiles}
          removeFile={removeFile}
          errorMessage={errorMessage}
        />
      </ModalBody>

      <ModalFooter
        files={files}
        onClickFind={onClickFind}
        onClickClose={onClickClose}
      />
    </Modal>
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
  gap: ${Spacing.px16};

  margin-bottom: ${Spacing.px12};
  padding: ${Spacing.px12} ${Spacing.px20};

  border-bottom: 1px solid ${Color.neutral.grey3};

  ${applyTypography(Typography.subheading2Medium)}
`;

const GrantMatchLogo = styled(Image)`
  width: ${Spacing.px24};
  height: ${Spacing.px24};

  box-shadow: 0px 0px 5px 5px #ffe2b680;
  border-radius: 120px;
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;

  height: 100%;
  overflow-y: auto;
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
        <label htmlFor={textareaId}>Tell us what you intend to do</label>
        <Textarea
          id={textareaId}
          value={queryText}
          onChange={(event) => updateQueryText(event.target.value)}
          placeholder={textareaPlaceholder}
        />
      </ModalQueryText>
    </BaseContent>
  );
};

const textareaId = "query-textarea";
const textareaPlaceholder =
  "Give a summary of your project, specifying the key activities you will do & what you intend to achieve";

const BaseContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${Spacing.px12};

  width: 100%;
  height: 100%;
  min-height: ${Spacing.px100};

  padding: ${Spacing.px4} ${Spacing.px20};
  border: none;
`;

const ModalFileDrop = styled.div`
  display: flex;
  flex-direction: column;
`;

const ModalQueryText = styled.div`
  display: flex;
  flex-direction: column;
`;

type ModalFooterProps = {
  files: File[];
  onClickFind: MouseEventHandler<HTMLElement>;
  onClickClose: MouseEventHandler<HTMLElement>;
};

const ModalFooter = ({
  files,
  onClickFind,
  onClickClose,
}: ModalFooterProps) => {
  const { queryText } = useGrantMatchContext();
  const hasQuery = queryText.trim() !== "" || files.length > 0;

  return (
    <BaseModalFooter>
      <Button
        label="Close"
        onClick={onClickClose}
        variant="tertiary"
        size="small"
      />

      <Button
        label="Find My Grants"
        disabled={!hasQuery}
        onClick={onClickFind}
        variant="secondary"
        size="small"
      />
    </BaseModalFooter>
  );
};

const BaseModalFooter = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${Spacing.px12};

  padding: ${Spacing.px16} ${Spacing.px20};
`;
