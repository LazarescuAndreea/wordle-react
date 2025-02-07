import { useEffect, useState } from "react";
import { WORD_API_URL } from "../utils/constants";

export const useRandomWord = () => {
  const [randomSessionWord, setRandomSessionWord] = useState<string>("");

  useEffect(() => {
    const fetchRandomWord = async () => {
      const response = await fetch(WORD_API_URL);
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Failed to fetch word");
      }
    };

    fetchRandomWord()
      .then((words: string[]) => {
        console.log(words[0]);
        setRandomSessionWord(words[0]);
      })
      .catch((error: Error) => {
        console.error(error);
      });
  }, []);

  return { randomSessionWord };
};
