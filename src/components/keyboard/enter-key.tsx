import { SendIcon } from "lucide-react";

export interface EnterKeyProps {
  onEnterClick: () => void;
}

export const EnterKey = (props: EnterKeyProps) => {
  return (
    <div
      className="key enter-key not-pressed"
      onClick={() => {
        props.onEnterClick();
      }}
    >
      <SendIcon />
    </div>
  );
};
