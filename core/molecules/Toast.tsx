import {
  createContext,
  type HTMLAttributes,
  type PropsWithChildren,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import styled, { keyframes } from "styled-components";
import { Color, Responsive, Spacing, SystemIcon, Typography } from "../atoms";
import { applyTypography } from "../integrations";

export type ToastVariant = "neutral" | "success" | "danger";

export type ToastProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  "children" | "title"
> & {
  title?: ReactNode;
  message?: ReactNode;
  variant?: ToastVariant;
  action?: {
    label: ReactNode;
    onClick: () => void;
  };
  onClose?: () => void;
};

const toastVariants = {
  neutral: {
    iconBackground: Color.neutral.grey1,
    border: Color.neutral.grey2,
    background: Color.neutral.grey3,
    Icon: null,
  },
  success: {
    iconBackground: Color.accent.green1,
    border: Color.accent.green2,
    background: Color.accent.green4,
    Icon: SystemIcon.CheckIcon,
  },
  danger: {
    iconBackground: Color.accent.red1,
    border: Color.accent.red2,
    background: Color.accent.red4,
    Icon: SystemIcon.XIcon,
  },
} as const;

const Toast = ({
  title,
  message,
  variant = "neutral",
  action,
  onClose,
  ...props
}: ToastProps) => {
  const { iconBackground, border, background, Icon } = toastVariants[variant];
  const isCompact = title == null && !action;

  return (
    <ToastContainer
      {...props}
      role={variant === "danger" ? "alert" : "status"}
      $border={border}
      $background={background}
      $compact={isCompact}
    >
      <ToastLayout>
        <ToastDetails>
          <ToastIconContainer $background={iconBackground}>
            {Icon ? (
              <Icon color={Color.neutral.white} size={14} weight="bold" />
            ) : (
              <SystemIcon.InfoIcon
                color={Color.neutral.white}
                size={14}
                weight="bold"
              />
            )}
          </ToastIconContainer>
          <ToastText>
            {title != null && <Title>{title}</Title>}
            {message != null && <Message>{message}</Message>}
          </ToastText>
        </ToastDetails>
        {action && (
          <ActionButton type="button" onClick={action.onClick}>
            {action.label}
          </ActionButton>
        )}
      </ToastLayout>
      {onClose && (
        <CloseButton type="button" onClick={onClose}>
          <SystemIcon.XIcon color={Color.typography.blackMedium} size={18} />
        </CloseButton>
      )}
    </ToastContainer>
  );
};

export default Toast;

export type ToastOptions = ToastProps & {
  dedupeKey?: string;
  duration?: number;
};

type ToastItem = ToastOptions & { id: string; revision: number };

const ToastContext = createContext<((options: ToastOptions) => void) | null>(
  null,
);

export const ToastProvider = ({ children }: PropsWithChildren) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const dismissToast = useCallback(
    (id: string) =>
      setToasts((currentToasts) =>
        currentToasts.filter((toast) => toast.id !== id),
      ),
    [],
  );
  const showToast = useCallback(
    (options: ToastOptions) =>
      setToasts((currentToasts) => {
        const existingToastIndex = options.dedupeKey
          ? currentToasts.findIndex(
              (toast) => toast.dedupeKey === options.dedupeKey,
            )
          : -1;
        const nextToast =
          existingToastIndex < 0
            ? { ...options, id: crypto.randomUUID(), revision: 0 }
            : {
                ...currentToasts[existingToastIndex],
                ...options,
                revision: currentToasts[existingToastIndex].revision + 1,
              };

        return [
          nextToast,
          ...currentToasts.filter(
            (_, toastIndex) => toastIndex !== existingToastIndex,
          ),
        ].slice(0, 3);
      }),
    [],
  );

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <Viewport
        data-slot="toast-viewport"
        $stackDepth={Math.max(0, toasts.length - 1)}
      >
        {toasts.map(
          ({ id, revision, dedupeKey, duration = 8000, ...props }, index) => (
            <StackItem
              key={`${dedupeKey ?? id}-${revision}`}
              data-pulse={revision > 0}
              $index={index}
            >
              <TimedToast
                {...props}
                id={id}
                duration={duration}
                dismiss={dismissToast}
              />
            </StackItem>
          ),
        )}
      </Viewport>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const showToast = useContext(ToastContext);
  if (!showToast) throw new Error("useToast must be used within ToastProvider");
  return showToast;
};

const TimedToast = ({
  id,
  duration,
  dismiss,
  action,
  onClose,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  ...props
}: ToastOptions & { id: string; dismiss: (id: string) => void }) => {
  const [isTimerPaused, setIsTimerPaused] = useState(false);

  useEffect(() => {
    if (isTimerPaused) return;
    const timeoutId = window.setTimeout(() => dismiss(id), duration);
    return () => window.clearTimeout(timeoutId);
  }, [dismiss, duration, id, isTimerPaused]);

  return (
    <Toast
      {...props}
      onMouseEnter={(event) => {
        setIsTimerPaused(true);
        onMouseEnter?.(event);
      }}
      onMouseLeave={(event) => {
        if (!event.currentTarget.contains(document.activeElement))
          setIsTimerPaused(false);
        onMouseLeave?.(event);
      }}
      onFocus={(event) => {
        setIsTimerPaused(true);
        onFocus?.(event);
      }}
      onBlur={(event) => {
        if (
          !event.currentTarget.contains(event.relatedTarget) &&
          !event.currentTarget.matches(":hover")
        )
          setIsTimerPaused(false);
        onBlur?.(event);
      }}
      action={
        action && {
          label: action.label,
          onClick: () => {
            dismiss(id);
            action.onClick();
          },
        }
      }
      onClose={() => {
        onClose?.();
        dismiss(id);
      }}
    />
  );
};

const ToastContainer = styled.div<{
  $border: Color.DesignColor;
  $background: Color.DesignColor;
  $compact: boolean;
}>`
  display: flex;
  align-items: center;
  gap: ${Spacing.px16};

  box-sizing: border-box;
  width: ${({ $compact }) => ($compact ? "300px" : "400px")};
  max-width: calc(100vw - ${Spacing.px40});
  min-height: ${({ $compact }) => ($compact ? "44px" : "64px")};
  padding: ${Spacing.px12};

  background: ${({ $background }) => $background};
  border: 1px solid ${({ $border }) => $border};
  border-radius: ${Spacing.px8};
`;

const ToastLayout = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${Spacing.px8};
  flex: 1;

  min-width: 0;
`;

const ToastDetails = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${Spacing.px12};
  flex: 1;

  min-width: 0;
`;

const ToastIconContainer = styled.span<{
  $background: Color.DesignColor;
}>`
  display: grid;
  place-items: center;
  flex: 0 0 ${Spacing.px20};

  height: ${Spacing.px20};

  background: ${({ $background }) => $background};
  border-radius: ${Spacing.px4};
`;

const ToastText = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;

  min-width: 0;
`;

const Title = styled.div`
  color: ${Color.typography.blackHigh};

  ${applyTypography(Typography.bodySecondaryBold)}
`;

const Message = styled.div`
  color: ${Color.typography.blackMedium};

  ${applyTypography(Typography.bodySecondaryRegular)}
`;

const ActionButton = styled.button`
  align-self: center;
  flex: none;

  box-sizing: border-box;
  height: ${Spacing.px40};
  padding: 10px 0;

  color: ${Color.typography.blackHigh};
  background: transparent;

  text-decoration: underline;
  white-space: nowrap;

  cursor: pointer;

  ${applyTypography(Typography.bodySecondaryMedium)}
`;

const CloseButton = styled.button`
  display: grid;
  place-items: center;
  align-self: center;
  flex: 0 0 ${Spacing.px24};

  width: ${Spacing.px24};
  height: ${Spacing.px24};

  background: transparent;

  cursor: pointer;
`;

const toastPulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.03); }
`;

const StackItem = styled.div<{ $index: number }>`
  grid-area: 1 / 1;
  z-index: ${({ $index }) => 3 - $index};

  transform: translate(
    ${({ $index }) => `${-$index * 8}px`},
    ${({ $index }) => `${-$index * 8}px`}
  );
  transition: transform 250ms ease-in-out;
  pointer-events: ${({ $index }) => ($index === 0 ? "auto" : "none")};

  ${({ $index }) =>
    $index > 0 &&
    `
      > [role] > * {
        visibility: hidden;
      }
    `}

  &[data-pulse="true"] > [role] {
    animation: ${toastPulse} 250ms ease-in-out;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &[data-pulse="true"] > [role] {
      animation: none;
    }
  }
`;

const Viewport = styled.div<{ $stackDepth: number }>`
  display: grid;
  padding: ${({ $stackDepth }) =>
    `${$stackDepth * 8}px 0 0 ${$stackDepth * 8}px`};

  z-index: 100;
  position: fixed;
  top: 25px;
  right: ${Spacing.px20};
  transition: padding 250ms ease-in-out;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

  @media (width < ${Responsive.widthBreakpoint.laptop}) {
    top: auto;
    right: 50%;
    bottom: var(--toast-mobile-bottom-offset, ${Spacing.px88});
    transform: translateX(50%);
  }
`;
