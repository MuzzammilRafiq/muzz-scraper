import { createContext, ReactNode, useState } from "react";
import { AppNodeMissingInputs } from "~/type/appNode";

type FlowValidationContextType = {
  invalidInputs: AppNodeMissingInputs[];
  setInvalidInputs: (invalidInputs: AppNodeMissingInputs[]) => void;
  clearErrors: () => void;
};

export const FlowValidationContext =
  createContext<FlowValidationContextType | null>(null);

/**
 * Provides a context for managing flow validation state.
 *
 * @param {Object} props - The props object.
 * @param {ReactNode} props.children - The child components to be wrapped by the provider.
 *
 * @returns {JSX.Element} The context provider component.
 *
 * @context {Object} FlowValidationContext - The context object.
 * @context {AppNodeMissingInputs[]} FlowValidationContext.invalidInputs - The array of invalid inputs.
 * @context {Function} FlowValidationContext.setInvalidInputs - Function to update the invalid inputs.
 * @context {Function} FlowValidationContext.clearErrors - Function to clear all invalid inputs.
 */
export const FlowValidationContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [invalidInputs, setInvalidInputs] = useState<AppNodeMissingInputs[]>(
    []
  );

  const clearErrors = () => {
    setInvalidInputs([]);
  };

  return (
    <FlowValidationContext.Provider
      value={{ invalidInputs, setInvalidInputs, clearErrors }}
    >
      {children}
    </FlowValidationContext.Provider>
  );
};
