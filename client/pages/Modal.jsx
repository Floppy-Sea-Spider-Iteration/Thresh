import React, { useState } from 'react';

const Modal = ({
  newTodo,
  handleCloseModal,
  handleTodoTitle,
  handleTodoText,
  handleSubmit,
  getTodos,
}) => {
  const submitTask = () => {
    // handleSubmit();
    handleCloseModal();
    setTimeout(getTodos(), 200);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="fixed inset-auto flex flex-col items-center justify-center gap-5 py-2 pl-4 bg-primary-500 bg-opacity-25 backdrop-blur-2xl rounded-xl"
    >
      <div
        onClick={handleCloseModal}
        className="self-end bg-tertiary-500 px-2 mr-3 mt-1 rounded-md cursor-pointer hover:bg-opacity-75"
      >
        x
      </div>
      <label className="text-secondary-500 ">
        Task
        <input
          value={newTodo.title}
          onChange={handleTodoTitle}
          className="bg-slate-50 ml-3 rounded-lg px-3 text-secondary-500"
        />
      </label>
      <label className="text-secondary-500">
        Task Details
        <input
          value={newTodo.text}
          onChange={handleTodoText}
          className="text-secondary-500 bg-slate-50 ml-3 mr-16 rounded-lg px-3 py-1"
        />
      </label>

      <button
        className="bg-tertiary-500 py-1 mb-3"
        // onClick={submitTask}
      >
        Add Task
      </button>
    </form>
  );
};

export default Modal;
