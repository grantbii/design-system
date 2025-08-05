import { Button, Modal } from "@/.";
import type { StoryObj } from "@storybook/nextjs-vite";
import { Meta } from "@storybook/nextjs-vite";

const meta: Meta<typeof Modal> = {
  title: "Molecules/Modal",
  component: Modal,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const text =
  "Grantbii is an AI-powered grant intelligence and matching platform that helps grant seekers effortlessly find, match, prep & apply for the right business grants - maximizing grant funding success with minimal effort. Our platform connects businesses with a trusted Grant Enabler Network - solution providers, consulting experts, and delivery partners - ensuring that every dollar of grant funding leads to real business transformation impact.";

export const DesktopVersion: Story = {
  args: {
    clickable: (openModal) => (
      <Button text="Click to open modal" onClick={openModal} />
    ),
    header: "What is Grantbii?",
    content: <p>{text}</p>,
    width: "600px",
  },
};

export const MobileVersion: Story = {
  args: {
    clickable: (openModal) => (
      <Button text="Click to open modal" onClick={openModal} />
    ),
    header: "What is Grantbii?",
    content: <p>{text}</p>,
    isFullScreen: true,
  },
};
