import clsx from "clsx";
import "./keyboard.css";
import { KeyboardKeyState } from "../../types/keyboard";

export interface KeyboardKeyProps {
  state: KeyboardKeyState;
  letter: string;
  onLetterClick: (letter: string) => void;
}

export const KeyboardKey = (props: KeyboardKeyProps) => {
  return (
    <>
      <div
        className={clsx({
          key: true,
          "keyboard-key": true,
          "not-pressed": props.state === KeyboardKeyState.NOT_PRESSED,
          "pressed-not-existing":
            props.state === KeyboardKeyState.PRESSED_NOT_EXISTING,
          "pressed-wrong-place":
            props.state === KeyboardKeyState.PRESSED_WRONG_PLACE,
          "pressed-correct-place":
            props.state === KeyboardKeyState.PRESSED_CORRECT_PLACE,
        })}
        onClick={() => {
          props.onLetterClick(props.letter);
        }}
      >
        {props.letter}
      </div>
    </>
  );
};
