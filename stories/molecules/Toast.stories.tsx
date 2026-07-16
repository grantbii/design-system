import { Button, Toast, ToastProvider, useToast, type ToastOptions } from "@/.";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useEffect } from "react";
import { fn } from "storybook/test";
import styled from "styled-components";

const meta: Meta<ToastOptions> = {
  title: "Molecules/Toast",
  component: Toast,
  tags: ["autodocs"],
  args: {
    title: "Bookmarked Successfully",
    message: "This grant has been added to your bookmark list & collections.",
    variant: "neutral",
    duration: 8000,
    onClose: fn(),
  },
  argTypes: {
    action: {
      description: "Optional action displayed before the close button.",
      control: false,
    },
    duration: {
      description: "Time in milliseconds before the toast is dismissed.",
      control: { type: "number", min: 0, step: 1000 },
      table: { defaultValue: { summary: "8000" } },
    },
    dedupeKey: {
      description:
        "Stable event key used to re-emphasize an existing toast instead of stacking a duplicate.",
      control: "text",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Shows up to three notifications with the latest in front. Keep titles under approximately 40 characters, use one toast per event, and avoid placing toasts over navigation, modals, or form actions. On mobile, set `--toast-mobile-bottom-offset` when the navigation bar needs additional clearance.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const ToastTriggerExample = (options: ToastOptions) => {
  const showToast = useToast();
  return <Button label="Show toast" onClick={() => showToast(options)} />;
};

const STACKED_TOAST_TITLES = [
  "Report ready",
  "Invite sent",
  "Changes saved",
  "File uploaded",
];

const StackedToastPreview = (options: ToastOptions) => {
  const showToast = useToast();

  useEffect(() => {
    STACKED_TOAST_TITLES.forEach((title) =>
      showToast({ ...options, title, dedupeKey: title }),
    );
  }, [options, showToast]);

  return null;
};

const StackedToastTrigger = (options: ToastOptions) => {
  const showToast = useToast();

  return (
    <Button
      label="Show stacked toasts"
      onClick={() =>
        STACKED_TOAST_TITLES.forEach((title) =>
          showToast({ ...options, title, dedupeKey: title }),
        )
      }
    />
  );
};

const renderToast: NonNullable<Story["render"]> = (args, { viewMode }) =>
  viewMode === "docs" ? (
    <Toast {...args} />
  ) : (
    <ToastProvider>
      <ToastTriggerExample {...args} />
    </ToastProvider>
  );

export const Neutral: Story = {
  render: renderToast,
};

export const WithAction: Story = {
  args: {
    title: "Report ready",
    message: "Your Q2 report has finished exporting",
    variant: "success",
    action: { label: "View", onClick: fn() },
  },
  render: renderToast,
};

export const DescriptionOnly: Story = {
  args: {
    title: undefined,
    message: "Copied to clipboard.",
    duration: 4000,
  },
  render: renderToast,
};

export const Stacked: Story = {
  args: {
    duration: 60000,
    message: "photo.png was added to your library.",
    variant: "success",
  },
  render: (args, { viewMode }) =>
    viewMode === "docs" ? (
      <StackedPreview
        onClickCapture={(event) => {
          event.preventDefault();
          event.stopPropagation();
        }}
      >
        <ToastProvider>
          <StackedToastPreview {...args} />
        </ToastProvider>
      </StackedPreview>
    ) : (
      <ToastProvider>
        <StackedToastTrigger {...args} />
      </ToastProvider>
    ),
};

const StackedPreview = styled.div`
  display: grid;
  place-items: center;
  width: 100%;
  min-height: 112px;

  [data-slot="toast-viewport"] {
    position: relative;
    inset: auto;
    transform: none;
  }
`;
