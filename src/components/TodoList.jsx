import React from "react";
import EditTodo from "./EditTodo";
import TodoItem from "./TodoItem";

export default function ListTodo({ todoList, todoDelete, updateTodo }) {
  return todoList.length ? (
    <ul>
      {todoList.map((todo) =>
        todo.edit ? (
          <EditTodo key={todo._id} todo={todo} updateTodo={updateTodo} />
        ) : (
          <TodoItem key={todo._id} todo={todo} updateTodo={updateTodo} todoDelete={todoDelete}/>
        )
      )}
    </ul>
  ) : (
    <p>Aucune todo en cours </p>
  );
}
