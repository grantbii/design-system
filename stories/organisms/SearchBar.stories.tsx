import { SearchBar } from "@/.";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";

type SearchBarExampleProps = {
  size?: "small" | "medium";
};

const SearchBarExample = ({ size }: SearchBarExampleProps) => {
  const [queryText, setQueryText] = useState("");

  const performSearch = () => {
    if (queryText.trim() !== "") {
      alert(`Searching for ${queryText}`);
    }
  };

  return (
    <SearchBar
      queryText={queryText}
      onChangeQueryText={(event) => setQueryText(event.target.value)}
      handlePressEnter={() => performSearch()}
      onClickSearch={() => performSearch()}
      onClickReset={() => setQueryText("")}
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
