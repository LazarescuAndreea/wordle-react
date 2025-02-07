import { useEffect } from "react";
import { KeyboardKeyState } from "../../types/keyboard";
import {
  FIRST_KEYBOARD_ROW,
  LETTER_COUNT,
  SECOND_KEYBOARD_ROW,
  THIRD_KEYBOARD_ROW,
} from "../../utils/constants";
import { DeleteKey } from "./delete-key";
import { EnterKey } from "./enter-key";
import { KeyboardKey } from "./keyboard-key";
import "./keyboard.css";

export interface KeyboardProps {
  onLetterClick: (letter: string) => void;
  onDeleteClick: () => void;
  onEnterClick: () => void;
  lettersPressed: string;
  mockSessionWord: string;
}

export const Keyboard = (props: KeyboardProps) => {
  useEffect(() => {
    const keyDownListener = (e: KeyboardEvent) => {
      e.preventDefault();

      if (e.key === "Backspace") {
        props.onDeleteClick();
      } else if (e.key === "Enter") {
        props.onEnterClick();
      } else if (e.key.match(/^[a-zA-Z]$/)) {
        props.onLetterClick(e.key.toUpperCase());
      }
    };

    document.addEventListener("keydown", keyDownListener);

    return () => {
      document.removeEventListener("keydown", keyDownListener);
    };
  }, [props]);

  const calculateLetterPositions = (
    searchedCharacter: string,
    lettersPressed: string,
  ) => {
    let characterPositions = [];

    for (let index = 0; index < lettersPressed.length; index++) {
      if (lettersPressed[index] === searchedCharacter) {
        characterPositions.push(index % LETTER_COUNT);
      }
    }
    return characterPositions;
  };

  const calculateKeyState = (character: string) => {
    if (props.lettersPressed.includes(character)) {
      if (
        calculateLetterPositions(character, props.lettersPressed).includes(
          props.mockSessionWord.indexOf(character),
        )
      ) {
        return KeyboardKeyState.PRESSED_CORRECT_PLACE;
      } else if (props.mockSessionWord.includes(character) === false) {
        return KeyboardKeyState.PRESSED_NOT_EXISTING;
      } else {
        return KeyboardKeyState.PRESSED_WRONG_PLACE;
      }
    }
    return KeyboardKeyState.NOT_PRESSED;
  };

  return (
    <div className="keyboard">
      <div className="keyboard-row">
        {FIRST_KEYBOARD_ROW.split("").map((character, i) => {
          return (
            <KeyboardKey
              key={`first-keyboard-row-key-${i}`}
              state={calculateKeyState(character)}
              letter={character}
              onLetterClick={props.onLetterClick}
            />
          );
        })}
      </div>
      <div className="keyboard-row">
        {SECOND_KEYBOARD_ROW.split("").map((character, i) => {
          return (
            <KeyboardKey
              key={`second-keyboard-row-key-${i}`}
              state={calculateKeyState(character)}
              letter={character}
              onLetterClick={props.onLetterClick}
            />
          );
        })}
      </div>
      <div className="keyboard-row">
        <DeleteKey onDeleteClick={props.onDeleteClick}></DeleteKey>
        {THIRD_KEYBOARD_ROW.split("").map((character, i) => {
          return (
            <KeyboardKey
              key={`third-keyboard-row-key-${i}`}
              state={calculateKeyState(character)}
              letter={character}
              onLetterClick={props.onLetterClick}
            />
          );
        })}
        <EnterKey onEnterClick={props.onEnterClick}></EnterKey>
      </div>
    </div>
  );
};
