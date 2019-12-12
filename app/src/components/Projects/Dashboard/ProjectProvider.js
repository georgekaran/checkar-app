import React, {createContext, useContext, useReducer} from 'react';

export const StateContext = createContext();

export const ProjectProvider = ({reducer, initialState, children}) =>(
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);
