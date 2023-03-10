import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from './Column.jsx';
import Chatbox from './Chatbox.jsx'

const onDragEnd = (result, columns, setColumns) => {
  console.log("here", result)
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

const Dashboard = () => {
  const [ count, setCount ] = useState(0);
  // change data to empty array when working with real data
  const [columns, setColumns] = useState({
    ['tasks']: {
      name: 'To Do',
      items: [],
    },
    ['inProgress']: {
      name: 'In Progress',
      items: [],
    },
    ['verified']: {
      name: 'Verified',
      items: [],
    },
    ['complete']: {
      name: 'Complete',
      items: [],
    },
  });

  useEffect(() => {
    setTimeout(()=> {
      setCount(count =>  count + 1)
  }, 1000);
    getTodos();
  }, [count]);

  const getTodos = async () => {
    try {
      const response = await axios.get('/api/tasks');
      // console.log('RES DATAAA: ', response.data)
      const newColumns = {
        ['tasks']: {
          name: 'To Do',
          items: [],
        },
        ['inProgress']: {
          name: 'In Progress',
          items: [],
        },
        ['verified']: {
          name: 'Verified',
          items: [],
        },
        ['complete']: {
          name: 'Complete',
          items: [],
        },
      };
      for (let i = 0; i < response.data.length; i++) {
        const currTask = response.data[i];
        if (!currTask.currentcolumn) newColumns[['tasks']].items.push(currTask);
        else newColumns[[currTask.currentcolumn]].items.push(currTask);
      }
      setColumns(newColumns);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="w-screen h-3/4 pt-32 pb-12 flex items-center justify-center ">
        <div className="grid grid-cols-4 min-h-4 w-5/6 gap-10 ">
          
          <DragDropContext
            onDragEnd={(result) => { 
              onDragEnd(result, columns, setColumns);
              fetch('/api/tasks/updateColumn', {
                method: 'POST', 
                body: JSON.stringify({
                  'taskID': result.draggableId,
                  'currentColumn': result.destination.droppableId 
                }), 
                headers: {
                  'Content-Type': 'application/json' 
                }
              })
              //send post request to backend to update database w/ result.destination.droppableID and taskID
              }
            }
          >
            {Object.entries(columns).map(([columnId, column], index) => {
              return (
                <Column
                  // className="h-32"
                  colName={column.name}
                  droppableId={columnId}
                  key={columnId}
                  index={index}
                  column={column}
                  getTodos={getTodos}
                />
              );
            })}
          </DragDropContext>
        </div>
      </div>
      <div >
        <Chatbox/>
      </div>
    </div>

    
  );
};

export default Dashboard;
