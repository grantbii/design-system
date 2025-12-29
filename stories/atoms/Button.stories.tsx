import { Button, Colors, Icons } from "@/.";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import styled from "styled-components";

const meta: Meta<typeof Button> = {
  title: "Atoms/Button",
  component: Button,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

const baseArgs = {
  label: "Button",
  onClick: () => alert("You have clicked on the button."),
};

export const TextOnly: Story = {
  args: baseArgs,
};

export const LeftIcon: Story = {
  args: {
    ...baseArgs,
    LeftIcon: Icons.PlusIcon,
  },
};

export const RightIcon: Story = {
  args: {
    ...baseArgs,
    RightIcon: Icons.MinusIcon,
  },
};

export const BothIcons: Story = {
  args: {
    ...baseArgs,
    LeftIcon: Icons.SmileyXEyesIcon,
    RightIcon: Icons.SmileyMeltingIcon,
  },
};

export const Underline: Story = {
  args: {
    ...baseArgs,
    underline: true,
    color: Colors.typography.blackMedium,
  },
};

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 200px;
`;

export const GrantObjectivesFilter: Story = {
  args: {
    borderColor: Colors.neutral.grey3,
    backgroundColor: Colors.base.white,
    color: Colors.typography.blackMedium,
    onClick: () => alert("You have clicked on the button."),
    label: (
      <Content>
        <p>Select grant objectives</p>
        <Icons.CaretRightIcon size={20} />
      </Content>
    ),
  },
};
