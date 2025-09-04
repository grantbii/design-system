import type { GrantMatchQuery } from "@grantbii/ui-core/match/models";
import { createContext, useContext } from "react";

type GrantMatchCommonProps = {
  activeQuery: GrantMatchQuery;
  updateActiveQuery: (query: GrantMatchQuery) => void;
  queryText: string;
  updateQueryText: (newText: string) => void;
  openModal: () => void;
  closeModal: () => void;
};

export const GrantMatchContext = createContext<GrantMatchCommonProps | null>(
  null,
);

export const useGrantMatchContext = (): GrantMatchCommonProps => {
  const context = useContext(GrantMatchContext);

  if (!context) {
    throw new Error("useGrantMatchContext must be used within its Provider");
  }

  return context;
};
