import React, { createContext, ReactNode } from 'react';

// Define the configuration type for the selection context
export type SelectionContextConfig = {
  multiple: boolean;
  [key: string]: any;
}

// Define the interface for the selection context
export interface ISelectionContext<T> {
  list?: Array<T>;
  setList?: (list: Array<T>) => void;
  config: SelectionContextConfig;
}

// Define the props type for the context provider component
type ContextProps<T> = ISelectionContext<T> & { children: React.ReactNode }

// Create a generic selection context provider function
export function createSelectionContextProvider<T>():
  [React.Context<ISelectionContext<T>>, (props: ContextProps<T>) => ReactNode] {

  // Create a context with a default value
  const SelectionContext = createContext<ISelectionContext<T>>({ config: { multiple: false } });

  // Return the context and the provider component
  return [
    SelectionContext,
    ({ children, list, setList, config }: ContextProps<T>) => {
      return (
        // Provide the context value to the children
        <SelectionContext.Provider value={{ list, setList, config }}>
          {children}
        </SelectionContext.Provider>
      )
    }
  ];
}