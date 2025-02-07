import "./App.css";
import { Row } from "./components/row/row";
import { Keyboard } from "./components/keyboard/keyboard";
import { useState } from "react";
import { LETTER_COUNT, ROW_COUNT } from "./utils/constants";
import { useRandomWord } from "./hooks/useRandomWord";

export const App = () => {
  const { randomSessionWord } = useRandomWord();
  const [currentAttempt, setCurrentAttempt] = useState<number>(0);
  const [attempts, setAttempts] = useState<string[]>(() => {
    const attemptsArray = [];

    for (let i = 0; i < ROW_COUNT; i++) {
      attemptsArray.push("");
    }

    return attemptsArray;
  });
  const [lettersPressed, setLettersPressed] = useState<string>("");

  const onLetterClickHandler = (letter: string) => {
    if (attempts[currentAttempt].length >= LETTER_COUNT) {
      return;
    }

    const newAttempts = [...attempts];
    newAttempts[currentAttempt] = newAttempts[currentAttempt] + letter;
    setAttempts(newAttempts);
  };

  const onDeleteClickHandler = () => {
    if (attempts[currentAttempt] === "") {
      return;
    }

    const newAttempts = [...attempts];
    newAttempts[currentAttempt] = attempts[currentAttempt].substring(
      0,
      attempts[currentAttempt].length - 1,
    );
    setAttempts(newAttempts);
  };

  const onEnterClickHandler = () => {
    if (attempts[currentAttempt].length < LETTER_COUNT) {
      return;
    }

    for (let i = 0; i < currentAttempt; i++) {
      if (attempts[i] === attempts[currentAttempt]) {
        console.log("Same word is not allowed");
        return;
      }
    }

    setLettersPressed(attempts[currentAttempt] + lettersPressed);
    setCurrentAttempt(currentAttempt + 1);
  };

  if (!randomSessionWord) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {attempts.map((attempt, index) => {
        return (
          <Row
            key={`row-${index}`}
            letterCount={LETTER_COUNT}
            word={attempt}
            randomSessionWord={randomSessionWord}
            isCurrentAttemptRow={currentAttempt === index}
          />
        );
      })}
      <Keyboard
        onLetterClick={(letter) => {
          onLetterClickHandler(letter);
        }}
        onDeleteClick={() => {
          onDeleteClickHandler();
        }}
        onEnterClick={() => {
          onEnterClickHandler();
        }}
        lettersPressed={lettersPressed}
        randomSessionWord={randomSessionWord}
      />
    </>
  );
};
