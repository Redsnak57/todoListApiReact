// import { useEffect, useState } from "react";
// import AddTodo from "./components/AddTodo";
// import TodoList from "./components/TodoList";

// function App() {
//   const [todoList, setTodoList] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     let ignore = false;
//     async function fetchTodoList() {
//       try {
//         const response = await fetch("https://restapi.fr/api/todoDyma");
//         if (response.ok) {
//           const todos = await response.json();
//           if(!ignore){
//             if (Array.isArray(todos)) {
//               setTodoList(todos);
//             } else {
//               setTodoList([todos]);
//             }
//           }
//         } else {
//           console.log("Erreur");
//         }
//       } catch (e) {
//         console.log("Oops, une erreur");
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchTodoList();
//     return () => {
//       ignore = true;
//     }
//   }, []);

//   function addTodo(newTodo) {
//     setTodoList([...todoList, newTodo]);
//   }

//   function todoDelete(id) {
//     setTodoList(todoList.filter(t => t._id !== id));
//     // todoList.filter(t => t._id !== action.todo._id)
//   }

//   function updateTodo(updatedTodo){
//     setTodoList(todoList.map(t => t._id === updatedTodo._id ? updatedTodo : t))
//   }

  
//   return (
//     <div className="d-flex flex-row justify-content-center align-items-center p-20">
//       <div className="container card p-20">
//         <h1 className="mb-20"> Todo list </h1>
//         <AddTodo addTodo={addTodo} />
//         {loading ? (
//           <p>Chargement en cours</p>
//         ) : (
//           <TodoList
//             todoList={todoList}
//             todoDelete={todoDelete}
//             updateTodo={updateTodo}
//           />
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;




// Avec réduceur 
import { useEffect, useReducer, useState } from "react";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";

function todoReduceur(state, action){
  switch(action.type){
    case "FETCH_TODO" : {
      return {
        ...state,
        todoList : action.todoList
      }
    }
    case 'ADD_TODO' : {
      return {
        ...state,
        todoList : [...state.todoList, action.todo]
      }
    }
    case "UPDATE_TODO" : {
      return {
        ...state,
        todoList : state.todoList.map(t => t._id === action.todo._id ? action.todo : t)
      }
    }
    case "DELETE_TODO" : {
      return {
        ...state,
        todoList : state.todoList.filter(t => t._id !== action.todo._id)
      }
    }
    default : {
      throw new Error('Action inconnu');
    }
  }
}

function App() {
  const [state, dispatch] = useReducer(todoReduceur, { todoList : []})
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    async function fetchTodoList() {
      try {
        const response = await fetch("https://restapi.fr/api/todoDyma");
        if (response.ok) {
          const todos = await response.json();
          if(!ignore){
            if (Array.isArray(todos)) {
              dispatch({type : "FETCH_TODO", todoList : todos})
            } else {
              dispatch({type : "FETCH_TODO", todoList : [todos]})
            }
          }
        } else {
          console.log("Erreur");
        }
      } catch (e) {
        console.log("Oops, une erreur");
      } finally {
        setLoading(false);
      }
    }
    fetchTodoList();
    return () => {
      ignore = true;
    }
  }, []);

  function addTodo(newTodo) {
    dispatch({ type : "ADD_TODO", todo : newTodo});
  }

  function todoDelete(_id) {
    dispatch({type : "DELETE_TODO", todo : _id});
  }

  function updateTodo(updatedTodo){
    dispatch({type : "UPDATE_TODO", todo : updatedTodo })
  }

  
  return (
    <div className="d-flex flex-row justify-content-center align-items-center p-20">
      <div className="container card p-20">
        <h1 className="mb-20"> Todo list </h1>
        <AddTodo addTodo={addTodo} />
        {loading ? (
          <p>Chargement en cours</p>
        ) : (
          <TodoList
            todoList={state.todoList}
            todoDelete={todoDelete}
            updateTodo={updateTodo}
          />
        )}
      </div>
    </div>
  );
}

export default App;