interface TodoItemProps {
  todo: string;
  onDelete: () => void;
}

export default function TodoItem({ todo, onDelete }: TodoItemProps) {
  return (
    <li
      style={{
        display: "flex",
        justifyContent: "space-between",
        border: "1px solid black",
      }}
    >
      {todo}
      <button onClick={onDelete}> delete </button>
    </li>
  );
}
