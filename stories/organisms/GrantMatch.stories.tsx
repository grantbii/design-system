import { GrantMatch } from "@/.";
import { useMatchQuery } from "@/core/organisms/GrantMatch";
import { Meta, StoryObj } from "@storybook/nextjs-vite";

const GrantMatchExample = () => {
  const matchQuery = useMatchQuery();

  return (
    <GrantMatch
      {...matchQuery}
      onPerformGrantMatch={() => console.log("finding grants...")}
      onResetGrantMatch={() => console.log("resetting grant match...")}
    />
  );
};

const meta: Meta<typeof GrantMatchExample> = {
  title: "Organisms/Grant Match",
  component: GrantMatchExample,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {
  args: {},
};
