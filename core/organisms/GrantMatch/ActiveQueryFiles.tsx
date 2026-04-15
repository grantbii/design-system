import styled from "styled-components";
import { Colors, Icons } from "../../atoms";
import { Badge, Button } from "../../molecules";
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
          label={file.name.substring(0, file.name.lastIndexOf("."))}
          Icon={FILE_TYPE_ICON_MAP[file.type] ?? Icons.FileIcon}
          onClickClose={() => removeActiveQueryFile(file.name)}
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
    <Button
      label="Reset"
      onClick={() => updateActiveQuery({ files: [], text: activeQuery.text })}
      color={Colors.typography.blackMedium}
      underline
    />
  );
};
