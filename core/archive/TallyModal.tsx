import type { MouseEventHandler, ReactNode } from "react";
import Modal from "../organisms/Modal";

type TallyModalProps = {
  header?: ReactNode;
  tallyId: string;
  prefilledFieldsQueryParams?: string;
  onClickClose: MouseEventHandler<HTMLButtonElement>;
};

const TallyModal = ({
  tallyId,
  prefilledFieldsQueryParams,
  ...modalProps
}: TallyModalProps) => (
  <Modal
    {...modalProps}
    content={
      <iframe
        src={constructIframeSrc(tallyId, prefilledFieldsQueryParams)}
        loading="lazy"
        title="Tally Modal"
      />
    }
    width="640px"
    height="600px"
  />
);

export default TallyModal;

const constructIframeSrc = (
  tallyId: string,
  prefilledFieldsQueryParams?: string,
) => {
  const queryParams = prefilledFieldsQueryParams
    ? `&${prefilledFieldsQueryParams}`
    : "";

  return `https://tally.so/embed/${tallyId}?${TALLY_QUERIES}${queryParams}`;
};

const TALLY_QUERIES =
  "alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=0";
