import React, { useEffect, useState } from "react";
import Header from "./Header";
import TaskList from "./TaskList";
import Form from "./Form";
import Report from "./Report";

import {
  getAllTasks,
  addNewTask,
  deleteTaskById,
  updateTaskById,
} from "../api/taskApi";
import Swal from "sweetalert2";

export default function DashBoard() {
  const [tasks, setTasks] = useState([]);
  const [sortBy, setSort] = useState("");
  const [filterBy, setfilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [counterId, setCounterId] = useState(null);

  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    getAllTasks()
      .then((tasks) => {
        setTasks(tasks.data);
        return tasks.data;
      })
      .then((data) => {
        const storedCounterId = localStorage.getItem("counterId");
        if (storedCounterId) {
          clearInterval(parseInt(storedCounterId));
          localStorage.removeItem("counterId");
        }

        const inProgressTask = data.find(
          (task) => task.status === "inprogress"
        );

        if (!inProgressTask) return;
        // Start New Counter due to reload
        const newCounterId = startCounter(inProgressTask._id);
        setCounterId(newCounterId);
      })
      .catch((error) => console.log(error));
  }, []);

  function startCounter(taskId) {
    const counterId = setInterval(() => {
      setTasks((tasks) =>
        tasks.map((task) =>
          task._id === taskId ? { ...task, time_end: Date.now() } : task
        )
      );
    }, 1000);
    localStorage.setItem("counterId", counterId.toString());
    return counterId;
  }

  function handleAddTask(task) {
    if (!task.title) return;

    addNewTask(task).then((task) => {
      if (!task) return;
      setTasks((tasks) => [...tasks, task.data]);
    });
  }

  async function handleDeleteTask(id) {
    const result = await Swal.fire({
      title: "Are You Sure ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#00d0c5",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete it!",
      cancelButtonText: "Cancel",
    });
    if (result.isConfirmed) {
      deleteTaskById(id).then((task) => {
        // NetWork Error
        if (!task) return;
        // if the delete Task was in progress delete the counter id
        let deletedTask = tasks.find((task) => task._id === id);

        if (deletedTask.status === "inprogress") {
          const counterId = localStorage.getItem("counterId");

          if (counterId) {
            // Clear the interval using the stored ID
            clearInterval(parseInt(counterId));

            // Remove the interval ID from localStorage
            localStorage.removeItem("counterId");
          }
        }
        //Delete the Task
        setTasks((tasks) => tasks.filter((task) => task._id !== id));
      });
    }
  }

  function handleSearch(query) {
    setSearchQuery(query);
  }

  function handleFilterChange(status) {
    setfilter(status);
  }

  function handleSortChange(property) {
    setSort(property);
  }

  function handleStartTask(id) {
    const inProgressTaskIndex = tasks.findIndex(
      (task) => task.status === "inprogress"
    );
    if (inProgressTaskIndex !== -1) {
      Swal.fire({
        icon: "info",
        title: "we're not ninjas 🐱‍👤 , complete the previous Task First!🧐",
        showConfirmButton: true,
      });
      return;
    }

    let updateTask = {
      time_start: Date.now(),
      time_end: Date.now(),
      status: "inprogress",
    };

    updateTaskById(id, updateTask).then((task) => {
      setTasks((tasks) =>
        tasks.map((task) =>
          task._id === id
            ? {
                ...task,
                time_start: Date.now(),
                time_end: Date.now(),
                status: "inprogress",
              }
            : task
        )
      );

      setCounterId(startCounter(id));
    });
  }

  function handleCompleteTask(id) {
    const counterId = localStorage.getItem("counterId");

    if (counterId) {
      // Clear the interval using the stored ID
      clearInterval(parseInt(counterId));

      // Remove the interval ID from localStorage
      localStorage.removeItem("counterId");
    }

    let updateTask = {
      time_end: Date.now(),
      status: "done",
    };

    updateTaskById(id, updateTask).then((task) => {
      // NetWork Error
      if (!task) return;
      setTasks((tasks) =>
        tasks.map((task) =>
          task._id === id
            ? { ...task, status: "done", time_end: Date.now() }
            : task
        )
      );
      Swal.fire({
        icon: "success",
        title: "Great Job,You Nailed It!🤩🎉",
        showConfirmButton: true,
      });
    });
  }

  return (
    <div className="dashboard">
      <Header tasks={tasks} />
      <Form
        onAddTask={handleAddTask}
        searchQuery={searchQuery}
        onSearchQuery={handleSearch}
        filterBy={filterBy}
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
        sortBy={sortBy}
      />
      <hr />
      <TaskList
        tasks={tasks}
        onDeleteTask={handleDeleteTask}
        searchQuery={searchQuery}
        filterBy={filterBy}
        sortBy={sortBy}
        onstartTask={handleStartTask}
        onCompleteTask={handleCompleteTask}
      />

      {tasks.length > 0 && (
        <button
          className="btn btn-info text-white px-3 ms-auto mt-3 "
          variant="primary"
          onClick={() => setModalShow(true)}
        >
          <i className="fa-solid fa-chart-column"></i> Report
        </button>
      )}

      <Report
        show={modalShow}
        onHide={() => setModalShow(false)}
        tasks={tasks}
      />
    </div>
  );
}
