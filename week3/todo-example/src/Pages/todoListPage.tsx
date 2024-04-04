import { useState } from "react";
import TodoItem from "../Components/todoItem";
import styled from "styled-components";

const Title = styled.p`
  font-size: 50px;
  font-weight: bold;
`;

const TodoList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export default function TodoListPage() {
  const [todos, setTodos] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");

  const addTodo = () => {
    setTodos([...todos, input]);
    setInput("");
  };

  const deleteTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <div>
      <Title>Todo List</Title>
      <div style={{ display: "flex", gap: "20px" }}>
        <input
          type='text'
          value={input}
          placeholder={`현재 ${todos.length}개`}
          onSubmit={addTodo}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <TodoList>
        {todos.map((todo, i) => (
          <TodoItem key={i} todo={todo} onDelete={() => deleteTodo(i)} />
        ))}
      </TodoList>
    </div>
  );
}
