import { useState } from "react";
import { LETTER_COUNT, ROW_COUNT } from "./utils/constants";
import { Keyboard } from "./components/keyboard/keyboard";
import { RestartKey } from "./components/keyboard/restart-key";
import { GuessBoard } from "./components/guess-board/guess-board";
import { useRandomWord } from "./hooks/useRandomWord";
import { useRealWord } from "./hooks/useRealWord";
import { getInitialAttempts } from "./utils/attempts";
import "./App.css";

export const App = () => {
  const { randomSessionWord, fetchNewRandomWord } = useRandomWord();
  const { isWordReal } = useRealWord();
  const [currentAttempt, setCurrentAttempt] = useState<number>(0);
  const [attempts, setAttempts] = useState<string[]>(getInitialAttempts);
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

    isWordReal(attempts[currentAttempt])
      .then((isReal: boolean) => {
        if (!isReal) {
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
      })
      .catch((error: Error) => {
        console.log(error);
      });
  };

  const onRestartClickHandler = () => {
    setAttempts(getInitialAttempts());
    setCurrentAttempt(0);
    setLettersPressed("");
    fetchNewRandomWord();
  };

  if (!randomSessionWord) {
    return <div>Loading...</div>;
  }

  if (attempts[currentAttempt - 1] === randomSessionWord) {
    return (
      <div className="main-container">
        <GuessBoard
          attempts={attempts}
          randomSessionWord={randomSessionWord}
          currentAttempt={currentAttempt}
        ></GuessBoard>
        <div>Correct guess.</div>
        <RestartKey onRestartClick={onRestartClickHandler} />
      </div>
    );
  } else if (
    currentAttempt === ROW_COUNT &&
    attempts[currentAttempt - 1] != randomSessionWord
  ) {
    return (
      <div className="main-container">
        <GuessBoard
          attempts={attempts}
          randomSessionWord={randomSessionWord}
          currentAttempt={currentAttempt}
        ></GuessBoard>
        <div>The word was {randomSessionWord}.</div>
        <RestartKey onRestartClick={onRestartClickHandler} />
      </div>
    );
  }

  return (
    <div className="main-container">
      <GuessBoard
        attempts={attempts}
        randomSessionWord={randomSessionWord}
        currentAttempt={currentAttempt}
      ></GuessBoard>
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
    </div>
  );
};
