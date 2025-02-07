import { LetterState } from "../../types/letter";
import { Letter } from "../letter/letter";
import "./row.css";

export interface RowProps {
  word: string;
  letterCount: number;
  randomSessionWord: string;
  isCurrentAttemptRow: boolean;
}

export const Row = (props: RowProps) => {
  const calculateLetterState = (letter: string, index: number) => {
    if (props.isCurrentAttemptRow || letter === "") {
      return LetterState.LETTER_EMPTY;
    } else {
      if (letter === props.randomSessionWord.charAt(index)) {
        return LetterState.LETTER_CORRECT;
      } else if (props.randomSessionWord.includes(letter)) {
        return LetterState.LETTER_PRESENT;
      } else {
        return LetterState.LETTER_ABSENT;
      }
    }
  };

  return (
    <div className="row">
      {[...Array(props.letterCount)].map((_e, index) => {
        return (
          <Letter
            key={`letter-${index}`}
            state={calculateLetterState(props.word.charAt(index), index)}
            letter={props.word.charAt(index)}
          />
        );
      })}
    </div>
  );
};
