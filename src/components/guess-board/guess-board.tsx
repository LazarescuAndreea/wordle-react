import { LETTER_COUNT } from "../../utils/constants";
import { Row } from "./row";

export interface GuessBoardProps {
  attempts: string[];
  randomSessionWord: string;
  currentAttempt: number;
}

export const GuessBoard = (props: GuessBoardProps) => {
  return (
    <>
      {props.attempts.map((attempt, index) => {
        return (
          <Row
            key={`row-${index}`}
            letterCount={LETTER_COUNT}
            word={attempt}
            randomSessionWord={props.randomSessionWord}
            isCurrentAttemptRow={props.currentAttempt === index}
          />
        );
      })}
    </>
  );
};
