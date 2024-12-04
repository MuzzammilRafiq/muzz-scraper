import { ExecutionPhase } from "@prisma/client";

type Phase = Pick<ExecutionPhase, "creditsConsumed">;

export const GetPhasesTotalCost = (phases: Phase[]): number => {
  return phases.reduce((acc, phase) => acc + (phase.creditsConsumed || 0), 0);
};
/**
 * The GetPhasesTotalCost function takes an array of Phase objects as its parameter.
 * It uses the reduce method to iterate over the array and accumulate the total credits consumed.
 * The reduce method starts with an initial accumulator value of 0 and adds the creditsConsumed
 * value of each phase to this accumulator. The || 0 part ensures that if creditsConsumed is
 *  undefined or null, it defaults to 0, preventing potential runtime errors.
 */
