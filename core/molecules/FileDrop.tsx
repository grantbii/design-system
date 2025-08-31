import { useState } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import { Badge } from "../atoms";
import { Colors, Icons, Responsive, Typography } from "../foundations";

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
    accept: { "application/pdf": [".pdf"] },
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
  border-radius: 6px;
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
        {`Drop up to ${maxFiles} files here ( ${maxSizeMB}MB each)`}
      </DropzoneText>

      <DropzoneSubtitle $isHighlighted>{DROPZONE_BROWSE_TEXT}</DropzoneSubtitle>
      <DropzoneSubtitle>{FILE_FORMAT_TEXT}</DropzoneSubtitle>
    </AllDropzoneText>
  </BaseDropzoneContent>
);

const DROPZONE_BROWSE_TEXT = "or click to browse with your file explorer";
const FILE_FORMAT_TEXT = "Accepted file formats: .pdf (more coming soon)";

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

  @media (width < ${Responsive.WIDTH_BREAKPOINTS.laptop}) {
    font-size: ${Typography.BODY_FONT_SIZES.small};
  }

  @media (width >= ${Responsive.WIDTH_BREAKPOINTS.laptop}) {
    font-size: ${Typography.BODY_FONT_SIZES.big};
  }
`;

const DropzoneSubtitle = styled.p<{ $isHighlighted?: boolean }>`
  text-align: center;

  font-weight: 400;

  color: ${({ $isHighlighted = false }) =>
    $isHighlighted ? Colors.accent.yellow1 : Colors.typography.blackLow};

  @media (width < ${Responsive.WIDTH_BREAKPOINTS.laptop}) {
    font-size: ${Typography.HELPER_FONT_SIZES.small};
  }

  @media (width >= ${Responsive.WIDTH_BREAKPOINTS.laptop}) {
    font-size: ${Typography.HELPER_FONT_SIZES.big};
  }
`;

const ErrorMessage = styled.p`
  color: ${Colors.accent.red1};
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
        text={getFileNameWithoutExtension(fileName)}
        onClickClose={() => removeFile(fileName)}
        Icon={FILE_TYPE_ICON_MAP[fileType] ?? Icons.FileIcon}
      />
    ))}
  </BaseUploadedFiles>
);

const BaseUploadedFiles = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const FILE_TYPE_ICON_MAP: { [itemType: string]: Icons.Icon } = {
  "application/pdf": Icons.FilePdfIcon,
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
