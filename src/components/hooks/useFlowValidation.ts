import { useContext } from "react";
import { FlowValidationContext } from "../context/FlowValidationContext";

/**
 * Custom hook that provides access to the FlowValidationContext.
 *
 * This hook must be used within a `FlowValidationContextProvider`.
 * If used outside of a `FlowValidationContextProvider`, it will throw an error.
 *
 * @returns The context value from `FlowValidationContext`.
 * @throws {Error} If the hook is used outside of a `FlowValidationContextProvider`.
 */
export default function useFlowValidation() {
  const context = useContext(FlowValidationContext);

  if (!context) {
    throw new Error(
      "useFlowValidation must be used within a FlowValidationContextProvider"
    );
  }
  return context;
}
