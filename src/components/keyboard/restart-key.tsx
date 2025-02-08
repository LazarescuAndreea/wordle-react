import { RotateCcwIcon } from "lucide-react";
import "./keyboard.css";

export interface RestartKeyProps {
  onRestartClick: () => void;
}

export const RestartKey = (props: RestartKeyProps) => {
  return (
    <RotateCcwIcon
      className="key not-pressed restart-key"
      onClick={() => {
        props.onRestartClick();
      }}
    />
  );
};
