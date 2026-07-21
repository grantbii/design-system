import {
  SystemIcon,
  ToggleButton,
  ToggleButtonGroup,
  ToggleButtonGroupItem,
} from "@/.";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";

const meta: Meta<typeof ToggleButton> = {
  title: "Molecules/Toggle Button",
  component: ToggleButton,
  tags: ["autodocs"],
  args: {
    disabled: false,
    size: "medium",
  },
  argTypes: {
    children: {
      description: "Icon or text displayed inside the toggle button.",
      control: false,
    },
    pressed: {
      description: "Pressed state when the toggle is controlled.",
      control: "boolean",
    },
    onPressedChange: {
      description: "Called when the pressed state changes.",
      control: false,
    },
    size: {
      description: "Size of the toggle button.",
      table: { defaultValue: { summary: '"medium"' } },
      control: "radio",
      options: ["small", "medium", "large"],
    },
    disabled: {
      description: "Prevents the toggle button from being pressed.",
      table: { defaultValue: { summary: "false" } },
      control: "boolean",
    },
    title: {
      description: "Native browser tooltip text for the button.",
      control: "text",
    },
    type: {
      description: "Native button behavior when used inside a form.",
      table: { defaultValue: { summary: '"button"' } },
      control: "radio",
      options: ["button", "submit", "reset"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Icon: Story = {
  args: { title: "Bookmark" },
  render: (args) => (
    <ToggleButton {...args}>
      <SystemIcon.BookmarkSimpleIcon />
    </ToggleButton>
  ),
  play: async ({ canvasElement }) => {
    const toggleButton = within(canvasElement).getByRole("button");
    await expect(toggleButton).toHaveAttribute("data-state", "off");
    await userEvent.click(toggleButton);
    await expect(toggleButton).toHaveAttribute("data-state", "on");
    await userEvent.click(toggleButton);
    await expect(toggleButton).toHaveAttribute("data-state", "off");
  },
};

export const Text: Story = {
  render: (args) => <ToggleButton {...args}>Bookmark</ToggleButton>,
};

export const IconGroup: Story = {
  args: { size: "small" },
  render: (args) => (
    <ToggleButtonGroup
      defaultValue="bookmark"
      disabled={args.disabled}
      size={args.size}
    >
      <ToggleButtonGroupItem value="bookmark" title="Bookmarks">
        <SystemIcon.BookmarkSimpleIcon />
      </ToggleButtonGroupItem>
      <ToggleButtonGroupItem value="grid" title="Grid view">
        <SystemIcon.GridFourIcon />
      </ToggleButtonGroupItem>
      <ToggleButtonGroupItem value="list" title="List view">
        <SystemIcon.ListIcon />
      </ToggleButtonGroupItem>
    </ToggleButtonGroup>
  ),
};

export const TextGroup: Story = {
  args: { size: "small" },
  render: (args) => (
    <ToggleButtonGroup
      defaultValue="first"
      disabled={args.disabled}
      size={args.size}
    >
      <ToggleButtonGroupItem value="first">Bookmark</ToggleButtonGroupItem>
      <ToggleButtonGroupItem value="second">Bookmark</ToggleButtonGroupItem>
      <ToggleButtonGroupItem value="third">Bookmark</ToggleButtonGroupItem>
    </ToggleButtonGroup>
  ),
};

export const Disabled: Story = {
  args: { disabled: true, title: "Bookmark" },
  render: Icon.render,
};
