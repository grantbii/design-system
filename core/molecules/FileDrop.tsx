import { useState } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import { FILE_TYPE_ICON_MAP } from "../atoms/shared";
import { Colors, Icons } from "../foundations";
import { BodyFontSize, HelperFontSize } from "../integrations";
import Badges from "./Badges";

const DEFAULT_MAX_FILE_SIZE_MB = 5;
const DEFAULT_MAX_FILES = 5;

type FileDropzoneProps = {
  uploadedFiles: File[];
  uploadFiles: (acceptedFiles: File[]) => void;
  removeFile: (fileName: string) => void;
  errorMessage?: string;
  maxFiles?: number;
  maxSizeMB?: number;
};

const FileDrop = ({
  uploadedFiles,
  uploadFiles,
  removeFile,
  errorMessage,
  maxFiles = DEFAULT_MAX_FILES,
  maxSizeMB = DEFAULT_MAX_FILE_SIZE_MB,
}: FileDropzoneProps) => {
  const reachedMaxUploads = uploadedFiles.length >= maxFiles;

  const { getInputProps, getRootProps } = useDropzone({
    onDrop: uploadFiles,
    accept: {
      "application/pdf": [".pdf"],
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
    },
    disabled: reachedMaxUploads,
    noClick: reachedMaxUploads,
    noDrag: reachedMaxUploads,
    multiple: true,
  });

  return (
    <BaseFileDrop>
      <Dropzone
        {...getRootProps()}
        $reachedMaxUploads={reachedMaxUploads}
        $hasError={!!errorMessage}
      >
        <input {...getInputProps()} type="file" />
        <DropzoneContent maxFiles={maxFiles} maxSizeMB={maxSizeMB} />
      </Dropzone>

      {errorMessage ? <ErrorMessage>{errorMessage}</ErrorMessage> : <></>}

      <UploadedFiles uploadedFiles={uploadedFiles} removeFile={removeFile} />
    </BaseFileDrop>
  );
};

export default FileDrop;

const BaseFileDrop = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Dropzone = styled.div<{
  $reachedMaxUploads: boolean;
  $hasError: boolean;
}>`
  padding: 40px;
  border-radius: 8px;
  border: 1px solid
    ${({ $hasError }) =>
      $hasError ? Colors.accent.red1 : Colors.neutral.grey3};

  &:hover {
    cursor: ${({ $reachedMaxUploads }) =>
      $reachedMaxUploads ? "not-allowed" : "pointer"};
  }
`;

type DropzoneContentProps = {
  maxFiles: number;
  maxSizeMB: number;
};

const DropzoneContent = ({ maxFiles, maxSizeMB }: DropzoneContentProps) => (
  <BaseDropzoneContent>
    <Icons.FileDashedIcon
      weight="thin"
      size={48}
      color={Colors.neutral.grey1}
    />
    <AllDropzoneText>
      <DropzoneText>
        {`Drop up to ${maxFiles} files here (up to ${maxSizeMB}MB each)`}
      </DropzoneText>

      <DropzoneSubtitle $isHighlighted>
        or click to browse with your file explorer
      </DropzoneSubtitle>

      <DropzoneSubtitle>Accepted file formats: pdf, png, jpg</DropzoneSubtitle>
    </AllDropzoneText>
  </BaseDropzoneContent>
);

const BaseDropzoneContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
`;

const AllDropzoneText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const DropzoneText = styled.p`
  text-align: center;

  font-weight: 500;

  ${BodyFontSize}
`;

const DropzoneSubtitle = styled.p<{ $isHighlighted?: boolean }>`
  text-align: center;

  font-weight: 400;

  color: ${({ $isHighlighted = false }) =>
    $isHighlighted ? Colors.accent.yellow1 : Colors.typography.blackLow};

  ${HelperFontSize}
`;

const ErrorMessage = styled.p`
  color: ${Colors.accent.red1};
`;

type UploadedFilesProps = {
  uploadedFiles: File[];
  removeFile: (fileName: string) => void;
};

const UploadedFiles = ({ uploadedFiles, removeFile }: UploadedFilesProps) => {
  const fileBadgesProps = uploadedFiles.map(
    ({ name: fileName, type: fileType }) => ({
      label: getFileNameWithoutExtension(fileName),
      onClickClose: () => removeFile(fileName),
      Icon: FILE_TYPE_ICON_MAP[fileType] ?? Icons.FileIcon,
    }),
  );

  return <Badges allBadgeProps={fileBadgesProps} vertical />;
};

export const useFileDrop = (
  initialFiles: File[] = [],
  maxFiles: number = DEFAULT_MAX_FILES,
  maxSizeMB: number = DEFAULT_MAX_FILE_SIZE_MB,
) => {
  const [files, setFiles] = useState<File[]>(() => initialFiles);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const uploadFiles = (acceptedFiles: File[]) => {
    if (files.length + acceptedFiles.length > maxFiles) {
      setErrorMessage(() => `Maximum upload limit is ${maxFiles} files`);
    } else if (anyFileTooLarge(acceptedFiles, maxSizeMB)) {
      setErrorMessage(() => `Maximum file size is ${maxSizeMB}MB`);
    } else {
      setErrorMessage(() => undefined);
      setFiles((previousFiles) =>
        combineFilesWithoutDuplicates(previousFiles, acceptedFiles),
      );
    }
  };

  const removeFile = (fileName: string) => {
    setErrorMessage(() => undefined);
    setFiles((previousFiles) => filterFilesByName(previousFiles, fileName));
  };

  return {
    files,
    uploadFiles,
    removeFile,
    errorMessage,
  };
};

const anyFileTooLarge = (files: File[], maxSizeMB: number): boolean =>
  files.some((file) => file.size > convertMegabytesToBytes(maxSizeMB));

const convertMegabytesToBytes = (megabytes: number): number =>
  megabytes * 1024 * 1024;

const combineFilesWithoutDuplicates = (
  oldFiles: File[],
  newFiles: File[],
): File[] => {
  const newFileNames = newFiles.map((file) => file.name);
  const keptOldFiles = oldFiles.filter(
    (oldFile) => !newFileNames.includes(oldFile.name),
  );

  return [...keptOldFiles, ...newFiles];
};

const filterFilesByName = (files: File[], fileName: string): File[] =>
  files.filter((file) => file.name !== fileName);

const getFileNameWithoutExtension = (fileName: string): string =>
  fileName.substring(0, fileName.lastIndexOf("."));
