import React, { useState } from "react";
import uuid from "react-uuid";

function App() {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  const [todos, setTodos] = useState([
    {
      id: uuid(),
      title: "제목1",
      contents: "내용1",
      isDone: false,
    },
    {
      id: uuid(),
      title: "제목2",
      contents: "내용2",
      isDone: true,
    },
    {
      id: uuid(),
      title: "제목3",
      contents: "내용3",
      isDone: false,
    },
    {
      id: uuid(),
      title: "제목4",
      contents: "내용4",
      isDone: false,
    },
  ]);

  return (
    <div>
      <header style={{ backgroundColor: "green", padding: "10px" }}>
        헤더입니다
      </header>
      <main style={{ backgroundColor: "pink", padding: "10px" }}>
        메인입니다
        <form
          onSubmit={(event) => {
            event.preventDefault();
            const newTodo = {
              id: uuid(),
              title: title,
              contents: contents,
              isDone: false,
            };
            setTodos([...todos, newTodo]);
          }}
        >
          <div>
            <input
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
            <input
              value={contents}
              onChange={(event) => {
                setContents(event.target.value);
              }}
            />
            <button>입력</button>
          </div>
        </form>
        <div>
          <div>
            <h2>할일 목록</h2>
            {todos
              .filter((todo) => {
                return todo.isDone === false;
              })
              .map((todo) => {
                return (
                  <div
                    key={todo.id}
                    style={{ border: "1px solid black", marginBottom: "10px" }}
                  >
                    <p>{todo.id}</p>
                    <h2>{todo.title}</h2>
                    <p>{todo.contents}</p>
                    <p>{todo.isDone.toString()}</p>
                    <button
                      onClick={() => {
                        const deleteTodos = todos.filter((item) => {
                          return item.id !== todo.id;
                        });
                        setTodos(deleteTodos);
                      }}
                    >
                      삭제
                    </button>
                    <button
                      onClick={() => {
                        const finishTodos = todos.map((item) => {
                          if (item.id === todo.id) {
                            return { ...item, isDone: true };
                          } else {
                            return item;
                          }
                        });
                        setTodos(finishTodos);
                      }}
                    >
                      완료
                    </button>
                  </div>
                );
              })}
          </div>
          <div>
            <h2>해야할 일 목록</h2>

            {todos
              .filter((todo) => {
                return todo.isDone === true;
              })
              .map((todo) => {
                return (
                  <div
                    key={todo.id}
                    style={{ border: "1px solid black", marginBottom: "10px" }}
                  >
                    <p>{todo.id}</p>
                    <h2>{todo.title}</h2>
                    <p>{todo.contents}</p>
                    <p>{todo.isDone.toString()}</p>
                    <button
                      onClick={() => {
                        const deleteTodos = todos.filter((item) => {
                          return item.id !== todo.id;
                        });
                        setTodos(deleteTodos);
                      }}
                    >
                      삭제
                    </button>
                    <button
                      onClick={() => {
                        const finishTodos = todos.map((item) => {
                          if (item.id === todo.id) {
                            return { ...item, isDone: false };
                          } else {
                            return item;
                          }
                        });
                        setTodos(finishTodos);
                      }}
                    >
                      취소
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
      </main>
      <footer style={{ backgroundColor: "yellowgreen", padding: "10px" }} r>
        푸터입니다
      </footer>
    </div>
  );
}

export default App;
