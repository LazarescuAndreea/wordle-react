import { ROW_COUNT } from "./constants";

export const getInitialAttempts = () => {
  const attemptsArray = [];

  for (let i = 0; i < ROW_COUNT; i++) {
    attemptsArray.push("");
  }

  return attemptsArray;
};
