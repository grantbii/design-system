import { LocationIcon } from "@/.";
import { Location } from "@grantbii/ui-core/location/enums";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta<typeof LocationIcon> = {
  title: "Archive/Location Icon",
  component: LocationIcon,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const SingaporeIcon: Story = {
  args: { location: Location.SINGAPORE, width: 24 },
};
export const OthersIcon: Story = {
  args: { location: Location.OTHERS, width: 24 },
};
