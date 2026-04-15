import type { GrantMatchQuery } from "@grantbii/ui-core/match/entities";
import { checkGrantMatchActive } from "@grantbii/ui-core/match/validations";
import { useState } from "react";
import styled from "styled-components";
import { useModal } from "../../organisms/Modal";
import ActiveQueryFiles from "./ActiveQueryFiles";
import GrantMatchModal from "./GrantMatchModal";
import SearchBar from "./SearchBar";
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

  // TODO: refactor away?
  const commonProps = {
    activeQuery,
    updateActiveQuery,
    queryText,
    updateQueryText,
    openModal,
    closeModal,
  };

  return (
    <GrantMatchContext.Provider value={commonProps}>
      <BaseGrantMatch>
        <SearchBar
          textSearchCallback={textSearchCallback}
          openModalCallback={openModalCallback}
        />

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
