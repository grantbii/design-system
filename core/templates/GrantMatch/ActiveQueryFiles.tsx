import styled from "styled-components";
import { Color, SystemIcon } from "../../atoms";
import { Badge, RawButton } from "../../molecules";
import { FILE_TYPE_ICON_MAP } from "../../shared";
import { useGrantMatchContext } from "./context";

const ActiveQueryFiles = () => (
  <BaseActiveFiles>
    <FileBadges />
    <ResetFilesButton />
  </BaseActiveFiles>
);

export default ActiveQueryFiles;

const BaseActiveFiles = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FileBadges = () => {
  const { activeQuery, updateActiveQuery } = useGrantMatchContext();

  const removeActiveQueryFile = (fileName: string) => {
    const newQuery = {
      files: activeQuery.files.filter((file) => file.name !== fileName),
      text: activeQuery.text,
    };

    updateActiveQuery(newQuery);
  };

  return (
    <BaseFileBadges>
      {activeQuery.files.map((file) => (
        <Badge
          key={file.name}
          label={file.name}
          Icon={FILE_TYPE_ICON_MAP[file.type] ?? SystemIcon.FileIcon}
          onClickX={() => removeActiveQueryFile(file.name)}
          labelWidthPixels={160}
        />
      ))}
    </BaseFileBadges>
  );
};

const BaseFileBadges = styled.div`
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

const ResetFilesButton = () => {
  const { activeQuery, updateActiveQuery } = useGrantMatchContext();

  return (
    <RawButton
      label="Reset"
      onClick={() => updateActiveQuery({ files: [], text: activeQuery.text })}
      defaultColor={Color.typography.blackHigh}
      hoverColor={Color.typography.blackMedium}
      disabledColor={Color.typography.blackLow}
      defaultBackgroundColor="transparent"
      textDecoration="underline"
      height="26px"
      padding="10px 0px"
      fontSize="14px"
    />
  );
};
