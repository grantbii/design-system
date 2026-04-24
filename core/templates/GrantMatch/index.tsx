import type { GrantMatchQuery } from "@grantbii/ui-core/match/entities";
import { checkGrantMatchActive } from "@grantbii/ui-core/match/validations";
import { useMemo, useState } from "react";
import styled from "styled-components";
import { Color, Responsive } from "../../atoms";
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
  const { showModal, openModal, closeModal } = useModal();
  const [queryText, setQueryText] = useState(activeQuery.text);
  const updateQueryText = (newText: string) => setQueryText(newText);

  const commonProps = useMemo(
    () => ({
      activeQuery,
      updateActiveQuery,
      queryText,
      updateQueryText,
      openModal,
      closeModal,
    }),
    [
      activeQuery,
      updateActiveQuery,
      queryText,
      updateQueryText,
      openModal,
      closeModal,
    ],
  );

  return (
    <GrantMatchContext.Provider value={commonProps}>
      <BaseGrantMatch>
        <SearchBarContainer>
          <SearchBar
            activeQuery={activeQuery}
            updateActiveQuery={updateActiveQuery}
            queryText={queryText}
            updateQueryText={updateQueryText}
            textSearchCallback={textSearchCallback}
          />
          <OpenModalButton openModalCallback={openModalCallback} />
        </SearchBarContainer>

        {activeQuery.files.length > 0 ? <ActiveQueryFiles /> : <></>}

        {showModal ? (
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
  gap: 8px;

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

  @media (width < ${Responsive.WIDTH_BREAKPOINTS.laptop}) {
    gap: 8px;
    padding: 0px;

    box-shadow: none;
    border-radius: 0px;
  }

  @media (width >= ${Responsive.WIDTH_BREAKPOINTS.laptop}) {
    gap: 16px;
    padding: 12px 16px;

    box-shadow: 0px 0px 40px 0px #00000008;
    border-radius: 12px;
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
