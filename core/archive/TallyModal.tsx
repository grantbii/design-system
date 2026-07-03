import type { MouseEventHandler, ReactNode } from "react";
import styled from "styled-components";
import { Color, Spacing, Typography } from "../atoms";
import { applyTypography } from "../integrations";
import { Button } from "../molecules";
import { Modal } from "../organisms";

type TallyModalProps = {
  header?: ReactNode;
  tallyId: string;
  prefilledFieldsQueryParams?: string;
  onClickClose: MouseEventHandler<HTMLButtonElement>;
};

const TallyModal = ({
  header,
  tallyId,
  prefilledFieldsQueryParams,
  onClickClose,
}: TallyModalProps) => (
  <Modal width="640px" height="600px">
    {header ? <ModalHeader>{header}</ModalHeader> : <></>}

    <ModalBody>
      <ModalIframe
        src={constructIframeSrc(tallyId, prefilledFieldsQueryParams)}
        loading="lazy"
        title="Tally Modal"
      />
    </ModalBody>

    <ModalFooter>
      <Button
        label="Close"
        onClick={onClickClose}
        variant="tertiary"
        size="small"
      />
    </ModalFooter>
  </Modal>
);

export default TallyModal;

const ModalHeader = styled.div`
  margin-bottom: ${Spacing.px12};
  padding: ${Spacing.px12} ${Spacing.px20};

  border-bottom: 1px solid ${Color.neutral.grey3};

  ${applyTypography(Typography.subheading2Medium)}
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;

  height: 100%;
  overflow-y: auto;
`;

const ModalIframe = styled.iframe`
  width: 100%;
  height: 100%;
  min-height: ${Spacing.px100};

  padding: ${Spacing.px4} ${Spacing.px20};
  border: none;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${Spacing.px12};

  padding: ${Spacing.px16} ${Spacing.px20};
`;

const constructIframeSrc = (
  tallyId: string,
  prefilledFieldsQueryParams?: string,
) => {
  const queryParams = prefilledFieldsQueryParams
    ? `&${prefilledFieldsQueryParams}`
    : "";

  return `https://tally.so/embed/${tallyId}?${tallyQueryParams}${queryParams}`;
};

const tallyQueryParams =
  "alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=0";
