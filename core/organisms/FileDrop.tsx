import { useState } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import { Color, Spacing, SystemIcon, Typography } from "../atoms";
import { applyTypography } from "../integrations";
import { FILE_TYPE_ICON_MAP } from "../shared";
import { Badge } from "../molecules";

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
    ${({ $hasError }) => ($hasError ? Color.accent.red1 : Color.neutral.grey3)};

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
    <SystemIcon.FileDashedIcon
      weight="thin"
      size={48}
      color={Color.neutral.grey1}
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

  ${applyTypography(Typography.bodyPrimaryMedium)}
`;

const DropzoneSubtitle = styled.p<{ $isHighlighted?: boolean }>`
  text-align: center;

  color: ${({ $isHighlighted = false }) =>
    $isHighlighted ? Color.accent.yellow1 : Color.typography.blackLow};

  ${applyTypography(Typography.bodySecondaryRegular)}
`;

const ErrorMessage = styled.p`
  color: ${Color.accent.red1};
`;

type UploadedFilesProps = {
  uploadedFiles: File[];
  removeFile: (fileName: string) => void;
};

const UploadedFiles = ({ uploadedFiles, removeFile }: UploadedFilesProps) => (
  <BaseUploadedFiles>
    {uploadedFiles.map(({ name: fileName, type: fileType }) => (
      <Badge
        key={fileName}
        label={getFileNameWithoutExtension(fileName)}
        onClickClose={() => removeFile(fileName)}
        Icon={FILE_TYPE_ICON_MAP[fileType] ?? SystemIcon.FileIcon}
      />
    ))}
  </BaseUploadedFiles>
);

const BaseUploadedFiles = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${Spacing.px4};
`;

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
  const newFileNames = new Set(newFiles.map((file) => file.name));
  const keptOldFiles = oldFiles.filter(
    (oldFile) => !newFileNames.has(oldFile.name),
  );

  return [...keptOldFiles, ...newFiles];
};

const filterFilesByName = (files: File[], fileName: string): File[] =>
  files.filter((file) => file.name !== fileName);

const getFileNameWithoutExtension = (fileName: string): string =>
  fileName.substring(0, fileName.lastIndexOf("."));
