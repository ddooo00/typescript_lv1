import React, { useState, ChangeEvent, FormEvent } from "react";
import uuid from "react-uuid";
import styled from "styled-components";

interface Todo {
  id: string;
  title: string;
  contents: string;
  isDone: boolean;
}

function App(): JSX.Element {
  const [title, setTitle] = useState<string>("");
  const [contents, setContents] = useState<string>("");

  const [todos, setTodos] = useState<Todo[]>([
    {
      id: uuid(),
      title: "Typescript",
      contents: "Typescript 공부하기",
      isDone: false,
    },
    {
      id: uuid(),
      title: "Typescript",
      contents: "Typescript lv,1 과제하기",
      isDone: true,
    },
    {
      id: uuid(),
      title: "AWS",
      contents: "AWS 공부하기",
      isDone: false,
    },
    {
      id: uuid(),
      title: "React",
      contents: "React 공부하기",
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
    setTitle("");
    setContents("");
  };

  //인풋
  const TitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const ContentChange = (event: ChangeEvent<HTMLInputElement>) => {
    setContents(event.target.value);
  };

  //삭제버튼
  const DeleteButton = (id: string) => {
    const deleteTodos = todos.filter((item) => item.id !== id);
    setTodos(deleteTodos);
  };

  //완료버튼
  const CompleteButton = (id: string) => {
    const finishTodos = todos.map((item) => {
      if (item.id === id) {
        return { ...item, isDone: true };
      } else {
        return item;
      }
    });
    setTodos(finishTodos);
  };
  //취소버튼
  const CancelButton = (id: string) => {
    const finishTodos = todos.map((item) => {
      if (item.id === id) {
        return { ...item, isDone: false };
      } else {
        return item;
      }
    });
    setTodos(finishTodos);
  };
  //----------------------------------------------------------------------

  return (
    <div>
      <Main>
        <form onSubmit={SubmitTodo}>
          <div>
            <Input value={title} onChange={TitleChange} />
            <Input value={contents} onChange={ContentChange} />
            <Addbutton>추가</Addbutton>
          </div>
        </form>
        <div>
          <div>
            <h2>✏️할 일 목록✏️</h2>
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
                    <DeletedButton onClick={() => DeleteButton(todo.id)}>
                      삭제
                    </DeletedButton>
                    <CompletedButton
                      onClick={() => {
                        CompleteButton(todo.id);
                      }}
                    >
                      완료
                    </CompletedButton>
                  </div>
                );
              })}
          </div>
          <div>
            <h2>🥳끝난 목록🥳</h2>

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
                    <DeletedButton onClick={() => DeleteButton(todo.id)}>
                      삭제
                    </DeletedButton>
                    <CanceleddButton
                      onClick={() => {
                        CancelButton(todo.id);
                      }}
                    >
                      취소
                    </CanceleddButton>
                  </div>
                );
              })}
          </div>
        </div>
      </Main>
    </div>
  );
}

export default App;

// -------------------------스타일 컴포넌트--------------------------------

const Main = styled.div`
  background-color: #a3ccb8;
  padding: 10px;
`;

const Input = styled.input`
  width: 30%;
  height: 25px;
  background-color: transparent;
  border: 3px solid white;
  border-radius: 10px;
  margin-right: 5px;
  &:hover {
    background: cornflowerblue;
    opacity: 0.6;
    transition: 0.3s;
  }
`;

const Addbutton = styled.button`
  width: 80px;
  height: 35px;
  background-color: transparent;
  border: 3px solid white;
  border-radius: 10px;
  font-size: 15px;
  fontw-wight: 800;
  cursor: pointer;
  &:hover {
    background: cornflowerblue;
    transition: 0.3s;
    color: white;
  }
`;

const DeletedButton = styled.button`
  background-color: transparent;
  border: 3px solid white;
  margin-right: 5px;
  cursor: pointer;
`;

const CompletedButton = styled.button`
  background-color: transparent;
  border: 3px solid white;
  cursor: pointer;
`;

const CanceleddButton = styled.button`
  background-color: transparent;
  border: 3px solid white;
  cursor: pointer;
`;
