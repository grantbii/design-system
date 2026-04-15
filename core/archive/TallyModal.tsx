import type { MouseEventHandler, ReactNode } from "react";
import { Modal } from "../molecules";

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
) =>
  `https://tally.so/embed/${tallyId}?${TALLY_QUERIES}${prefilledFieldsQueryParams ? `&${prefilledFieldsQueryParams}` : ""}`;

const TALLY_QUERIES =
  "alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=0";
