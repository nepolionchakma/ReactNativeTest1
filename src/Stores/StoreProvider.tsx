import React, {createContext, useContext} from 'react';
import {rootStore, IRootStore} from './RootStore';

const StoreContext = createContext<IRootStore>(rootStore);

export const StoreProvider = ({children}: {children: React.ReactNode}) => {
  return (
    <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
