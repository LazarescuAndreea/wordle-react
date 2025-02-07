import { DeleteIcon } from "lucide-react";

export interface DeleteKeyProps {
  onDeleteClick: () => void;
}

export const DeleteKey = (props: DeleteKeyProps) => {
  return (
    <div
      className="key delete-key not-pressed"
      onClick={() => {
        props.onDeleteClick();
      }}
    >
      <DeleteIcon />
    </div>
  );
};
