import { SearchBar, type ButtonVariant, type SearchBarSize } from "@/.";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";

type SearchBarExampleProps = {
  size?: SearchBarSize;
  searchButtonVariant?: ButtonVariant;
};

const SearchBarExample = ({
  size,
  searchButtonVariant,
}: SearchBarExampleProps) => {
  const [queryText, setQueryText] = useState("");

  const performSearch = () => {
    if (queryText.trim() !== "") {
      alert(`Searching for ${queryText}`);
    }
  };

  return (
    <SearchBar
      queryText={queryText}
      onClickReset={() => setQueryText("")}
      onClickSearch={() => performSearch()}
      handlePressEnter={() => performSearch()}
      onChangeQueryText={(event) => setQueryText(event.target.value)}
      searchButtonVariant={searchButtonVariant}
      size={size}
    />
  );
};

const meta: Meta<typeof SearchBar> = {
  title: "Organisms/SearchBar",
  component: SearchBarExample,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: { size: "small" },
};

export const Medium: Story = {
  args: { size: "medium" },
};

export const OutlineSearchButton: Story = {
  args: { size: "medium", searchButtonVariant: "outline" },
};
