import type { GrantMatchQuery } from "@grantbii/ui-core/match/entities";
import { checkGrantMatchActive } from "@grantbii/ui-core/match/validations";
import { useMemo, useState } from "react";
import styled from "styled-components";
import { Color, Responsive, Spacing } from "../../atoms";
import { SearchBar, useModal } from "../../organisms";
import ActiveQueryFiles from "./ActiveQueryFiles";
import GrantMatchModal from "./GrantMatchModal";
import OpenModalButton from "./OpenModalButton";
import { GrantMatchContext } from "./context";

type GrantMatchProps = {
  activeQuery: GrantMatchQuery;
  updateActiveQuery: (newQuery: GrantMatchQuery) => void;
  textSearchCallback?: () => void;
  findGrantsCallback?: () => void;
  closeModalCallback?: () => void;
  openModalCallback?: () => void;
};

const GrantMatch = ({
  activeQuery,
  updateActiveQuery,
  textSearchCallback,
  findGrantsCallback,
  closeModalCallback,
  openModalCallback,
}: GrantMatchProps) => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const [queryText, setQueryText] = useState(activeQuery.text);

  const commonProps = useMemo(
    () => ({
      activeQuery,
      updateActiveQuery,
      queryText,
      updateQueryText: setQueryText,
      openModal,
      closeModal,
    }),
    [activeQuery, updateActiveQuery, queryText, openModal, closeModal],
  );

  const handleSearch = () => {
    updateActiveQuery({ files: activeQuery.files, text: queryText });
    textSearchCallback?.();
  };

  const handleReset = () => {
    setQueryText("");
    updateActiveQuery({ files: activeQuery.files, text: "" });
  };

  return (
    <GrantMatchContext.Provider value={commonProps}>
      <BaseGrantMatch>
        <SearchBarContainer>
          <SearchBar
            queryText={queryText}
            onChangeQueryText={(event) => setQueryText(event.target.value)}
            handlePressEnter={() => handleSearch()}
            onClickSearch={() => handleSearch()}
            onClickReset={() => handleReset()}
            size="small"
          />
          <OpenModalButton openModalCallback={openModalCallback} />
        </SearchBarContainer>

        {activeQuery.files.length > 0 ? <ActiveQueryFiles /> : <></>}

        {isModalOpen ? (
          <GrantMatchModal
            findGrantsCallback={findGrantsCallback}
            closeModalCallback={closeModalCallback}
          />
        ) : (
          <></>
        )}
      </BaseGrantMatch>
    </GrantMatchContext.Provider>
  );
};

export default GrantMatch;

const BaseGrantMatch = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${Spacing.px8};

  width: 100%;
  max-width: 100vw;
`;

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;

  color: ${Color.typography.blackHigh};
  background-color: ${Color.neutral.white};

  @media (width < ${Responsive.widthBreakpoint.laptop}) {
    gap: ${Spacing.px8};
    padding: 0px;

    box-shadow: none;
    border-radius: 0px;
  }

  @media (width >= ${Responsive.widthBreakpoint.laptop}) {
    gap: ${Spacing.px16};
    padding: ${Spacing.px12} ${Spacing.px16};

    box-shadow: 0px 0px ${Spacing.px40} 0px #00000008;
    border-radius: ${Spacing.px12};
  }
`;

export const useGrantMatchActiveQuery = (
  performGrantMatch: (newQuery: GrantMatchQuery) => void,
  resetGrantMatch: () => void,
): GrantMatchProps => {
  const [activeQuery, setActiveQuery] = useState<GrantMatchQuery>({
    files: [],
    text: "",
  });

  const updateActiveQuery = (newQuery: GrantMatchQuery) => {
    setActiveQuery({ ...newQuery });

    if (checkGrantMatchActive(newQuery)) {
      performGrantMatch(newQuery);
    } else {
      resetGrantMatch();
    }
  };

  return { activeQuery, updateActiveQuery };
};
