import "./App.css";
import { useState } from "react";

import { counterActions } from "./store/counterSlice";
import { selectTodo, todosActions } from "./store/todoSlice";

import { selectValue } from "./store/counterSlice";
import { useAppDispatch, useAppSelector } from "./store/hooks";

function App() {
  const dispatch = useAppDispatch();

  const count = useAppSelector(selectValue);
  const todos = useAppSelector(selectTodo);

  const [incrementAmount, setIncrementAmount] = useState("2");
  const [inputTodo, setInputTodo] = useState("");

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(todosActions.addTodo(inputTodo));
    setInputTodo("");
  };

  return (
    <div className="App" style={{ marginTop: "30px" }}>
      <div>
        <br />
        <input
          name="incrementBy"
          type="number"
          value={incrementAmount}
          style={{ width: "30px" }}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <button
          type="submit"
          onClick={() =>
            dispatch(counterActions.incrementByAmount(Number(incrementAmount)))
          }
        >
          IncrementBy
        </button>
      </div>
      <div>
        <button onClick={() => dispatch(counterActions.increment())}>+</button>
        <span>{count}</span>
        <button onClick={() => dispatch(counterActions.decrement())}>-</button>
      </div>
      <br />
      <div>
        <form onSubmit={handleAddTodo}>
          <label htmlFor="todo">Add todo</label>
          <input
            type="text"
            placeholder="Add todo"
            value={inputTodo}
            onChange={(e) => {
              setInputTodo(e.target.value);
            }}
          />
          <button type="submit">Submit</button>
        </form>
        <br />
        {todos.length > 0 && <h3>Todos</h3>}
        {todos.map((todo) => {
          return (
            <div key={todo.id}>
              <span>{todo.name}</span>
              <button
                onClick={() => dispatch(todosActions.deleteTodo(todo.id))}
              >
                Delete
              </button>
            </div>
          );
        })}
        <br />
      </div>
    </div>
  );
}

export default App;
