import { Button, Color, SystemIcon } from "@/.";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import styled from "styled-components";

const meta: Meta<typeof Button> = {
  title: "Molecules/Button",
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
    LeftIcon: SystemIcon.PlusIcon,
  },
};

export const RightIcon: Story = {
  args: {
    ...baseArgs,
    RightIcon: SystemIcon.MinusIcon,
  },
};

export const BothSystemIcon: Story = {
  args: {
    ...baseArgs,
    LeftIcon: SystemIcon.SmileyXEyesIcon,
    RightIcon: SystemIcon.SmileyMeltingIcon,
  },
};

export const Underline: Story = {
  args: {
    ...baseArgs,
    underline: true,
    color: Color.typography.blackMedium,
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
    borderColor: Color.neutral.grey3,
    backgroundColor: Color.neutral.white,
    color: Color.typography.blackMedium,
    onClick: () => alert("You have clicked on the button."),
    label: (
      <Content>
        <p>Select grant objectives</p>
        <SystemIcon.CaretRightIcon size={20} />
      </Content>
    ),
  },
};
