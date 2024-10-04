import { createContext, useContext } from "react";
import { useLocalObservable } from "mobx-react-lite";

const generalStoreContext = createContext(null);

export const GeneralStoreProvider = ({ children }) => {
  const generalState = useLocalObservable(() => ({
    // --- OBSERVABLES ---
    isWidgetsOn: false,
    selectedSource: "bbc-news",

    // --- ACTIONS:SETTERS ---
    setIsWidgetsOn(value) {
      this.isWidgetsOn = value;
    },
    setSelectedSource(value) {
      this.selectedSource = value;
    },
  }));

  return (
    <generalStoreContext.Provider value={generalState}>
      {children}
    </generalStoreContext.Provider>
  );
};

export const useGeneralStore = () => {
  const state = useContext(generalStoreContext);
  if (!state)
    throw new Error(
      "Cannot use useGeneralStore outside of GeneralStoreContext",
    );
  return state;
};
