import { Badge, SystemIcon } from "@/.";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta<typeof Badge> = {
  title: "Molecules/Badge",
  component: Badge,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

const Icon = SystemIcon.FilePdfIcon;
const defaultText = "Badge";
const longText = "super_long_file_name.pdf";
const onClickClose = () => alert("You have closed the badge.");

export const DefaultTextOnly: Story = {
  args: {
    label: defaultText,
  },
};

export const WithIcon: Story = {
  args: {
    Icon,
    label: defaultText,
  },
};

export const ClickableX: Story = {
  args: {
    label: defaultText,
    onClickX: onClickClose,
  },
};

export const LongText: Story = {
  args: {
    label: longText,
    labelWidthPixels: 160,
  },
};

export const AlmostEverything: Story = {
  args: {
    label: longText,
    Icon,
    labelWidthPixels: 160,
    onClickX: onClickClose,
  },
};

export const Clickable: Story = {
  args: {
    label: "Click Me",
    onClick: () => alert("Clicked on badge"),
  },
};

export const Neutral: Story = {
  args: {
    label: longText,
    Icon,
    labelWidthPixels: 160,
    onClickX: onClickClose,
    variant: "neutral",
  },
};

export const ClickableNeutral: Story = {
  args: {
    label: "Click Me",
    onClick: () => alert("Clicked on badge"),
    variant: "neutral",
  },
};

export const Blue: Story = {
  args: {
    label: longText,
    Icon,
    labelWidthPixels: 160,
    onClickX: onClickClose,
    variant: "blue",
  },
};

export const ClickableBlue: Story = {
  args: {
    label: "Click Me",
    onClick: () => alert("Clicked on badge"),
    variant: "blue",
  },
};

export const Green: Story = {
  args: {
    label: longText,
    Icon: SystemIcon.FilePngIcon,
    labelWidthPixels: 160,
    onClickX: onClickClose,
    variant: "green",
  },
};

export const ClickableGreen: Story = {
  args: {
    label: "Click Me",
    onClick: () => alert("Clicked on badge"),
    variant: "green",
  },
};

export const Yellow: Story = {
  args: {
    label: longText,
    Icon,
    labelWidthPixels: 160,
    onClickX: onClickClose,
    variant: "yellow",
  },
};

export const ClickableYellow: Story = {
  args: {
    label: "Click Me",
    onClick: () => alert("Clicked on badge"),
    variant: "yellow",
  },
};

export const Red: Story = {
  args: {
    label: longText,
    Icon,
    labelWidthPixels: 160,
    onClickX: onClickClose,
    variant: "red",
  },
};

export const ClickableRed: Story = {
  args: {
    label: "Click Me",
    onClick: () => alert("Clicked on badge"),
    variant: "red",
  },
};
