import React, {useState, useEffect} from 'react';
import { Draggable } from 'react-beautiful-dnd';
import axios from 'axios';
import TaskPopUp from './TaskPopUp.jsx';

// const Todo = ({ deleteTodo, columns, setColumns, title, text, item, index, getTodos }) => {
const Todo = ({ title, text, item, index, getTodos }) => {

  const [ buttonPopup, setButtonPopup ] = useState(false);
  console.log(buttonPopup);

  // const togglebuttonPopup =() => {
  //   setbuttonPopup(!buttonPopup)
  // }

  const deleteTodo = async (id) => {
    console.log('deleted ', item._id);
    await axios.delete(`/api/tasks/delete?id=${id}`);
    getTodos();
  };

//info button
  // const infoTodo = async (id) => {
  //   console.log('info card ', item._id);
  //   await axios.get(`/api/tasks/get?id=${id}`);
  //   getTodos();
  // };

  return (
    <Draggable key={item._id} draggableId={item._id.toString()} index={index}>
      {(provided, snapshot) => {
        return (
          
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className="bg-primary-500 rounded-xl min-h-[100px] mt-3 text-secondary-500 px-6 py-3 flex flex-col"
          >

            <div class='flex justify-end'>
              {/* <button
                onClick={(e) => {
                  e.stopPropagation();
                  // infoTodo(item._id);
                }}
                className="bg-tertiary-500 w-5 px-2 rounded-lg text-primary-500 -mt-1 cursor-pointer"
              >
                i
              </button> */}
              <div>
                <button onclick={() => setButtonPopup(true)}>Open</button>

                <TaskPopUp trigger={buttonPopup} setTrigger={setButtonPopup}></TaskPopUp>

              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteTodo(item._id);
                }}
                className="bg-tertiary-500 w-5 px-2 rounded-lg text-primary-500 -mt-1 cursor-pointer"
              >
                x
              </button>
            </div>


            <div className="text-lg break-words text-center -mt-2">{title}</div>
            <ul className="text-secondary-200 break-words text-left list-disc -mr-3">
              <li>{text}</li>
            </ul>
          </div>
        );
      }}
    </Draggable>
  );
};

export default Todo;
