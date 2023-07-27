import React, { useState, ChangeEvent, FormEvent } from "react";
import uuid from "react-uuid";

interface Todo {
  id: string;
  title: string;
  contents: string;
  isDone: boolean;
}

function App() {
  const [title, setTitle] = useState<string>("");
  const [contents, setContents] = useState<string>("");

  const [todos, setTodos] = useState<Todo[]>([
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

  //폼
  const SubmitTodo = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newTodo: Todo = {
      id: uuid(),
      title: title,
      contents: contents,
      isDone: false,
    };
    setTodos([...todos, newTodo]);
  };

  //인풋
  const TitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const ContentChange = (event: ChangeEvent<HTMLInputElement>) => {
    setContents(event.target.value);
  };
  //----------------------------------------------------------------------

  return (
    <div>
      <header style={{ backgroundColor: "green", padding: "10px" }}>
        헤더입니다
      </header>
      <main style={{ backgroundColor: "pink", padding: "10px" }}>
        메인입니다
        <form onSubmit={SubmitTodo}>
          <div>
            <input value={title} onChange={TitleChange} />
            <input value={contents} onChange={ContentChange} />
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
      <footer style={{ backgroundColor: "yellowgreen", padding: "10px" }}>
        푸터입니다
      </footer>
    </div>
  );
}

export default App;
