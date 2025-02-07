import { REAL_WORD_API_URL } from "../utils/constants";

export const useRealWord = () => {
  const isWordReal = async (word: string) => {
    const response = await fetch(REAL_WORD_API_URL + word);
    if (response.ok) {
      const responseJson = await response.json();

      if (responseJson.title === "No Definitions Found") {
        return false;
      } else {
        return true;
      }
    } else {
      throw new Error("Word does not exist");
    }
  };

  return { isWordReal };
};
