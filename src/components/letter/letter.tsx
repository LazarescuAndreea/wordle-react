import clsx from "clsx";
import "./letter.css";
import { LetterState } from "../../types/letter";

export interface LetterProps {
  letter: string;
  state: LetterState;
}

export const Letter = (props: LetterProps) => {
  return (
    <>
      <div
        className={clsx({
          letter: true,
          "letter-empty": props.state === LetterState.LETTER_EMPTY,
          "letter-correct": props.state === LetterState.LETTER_CORRECT,
          "letter-present": props.state === LetterState.LETTER_PRESENT,
          "letter-absent": props.state === LetterState.LETTER_ABSENT,
        })}
      >
        {props.letter}
      </div>
    </>
  );
};
