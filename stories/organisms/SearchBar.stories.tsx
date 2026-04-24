import { SearchBar } from "@/.";
import type { GrantMatchQuery } from "@grantbii/ui-core/match/entities";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";

const SearchBarExample = () => {
  const [activeQuery, setActiveQuery] = useState<GrantMatchQuery>(emptyQuery);
  const updateActiveQuery = (newQuery: GrantMatchQuery) =>
    setActiveQuery(newQuery);

  const [queryText, setQueryText] = useState("");
  const updateQueryText = (newText: string) => setQueryText(newText);

  return (
    <SearchBar
      activeQuery={activeQuery}
      updateActiveQuery={updateActiveQuery}
      queryText={queryText}
      updateQueryText={updateQueryText}
    />
  );
};

const emptyQuery = {
  text: "",
  files: [],
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

export const Default: Story = {
  args: {},
};
