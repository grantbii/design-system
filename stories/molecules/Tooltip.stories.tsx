import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  type TooltipContentProps,
} from "@/.";
import type { ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

type TooltipExampleProps = Omit<TooltipContentProps, "children"> & {
  content: ReactNode;
};

const TooltipExample = ({
  content,
  ...tooltipContentProps
}: TooltipExampleProps) => (
  <Tooltip>
    <TooltipTrigger>
      <Button label="Hover me" />
    </TooltipTrigger>
    <TooltipContent {...tooltipContentProps}>{content}</TooltipContent>
  </Tooltip>
);

const meta: Meta<typeof TooltipExample> = {
  title: "Molecules/Tooltip",
  component: TooltipExample,
  tags: ["autodocs"],
  args: {
    content:
      "A message which appears when a cursor is positioned over an element.",
    side: "top",
    sideOffset: 8,
  },
  argTypes: {
    content: {
      description: "Content displayed inside the tooltip.",
      control: "text",
    },
    side: {
      description:
        "Preferred side of the trigger where the tooltip is displayed. It may change to remain visible within the viewport.",
      control: "radio",
      options: ["top", "right", "bottom", "left"],
      table: { defaultValue: { summary: '"top"' } },
    },
    sideOffset: {
      description: "Distance in pixels between the tooltip and its trigger.",
      control: { type: "number", min: 0, step: 1 },
      table: { defaultValue: { summary: "0" } },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
