import React ,{useState}from 'react'


export default function Form({
    onAddTask,
    searchQuery,
    onSearchQuery,
    filterBy,
    onFilterChange,
    sortBy,
    onSortChange,
  }) {
    const [taskTitle, setTaskTitle] = useState("");
  
    function handleSubmit(e) {
      e.preventDefault();
      const newTask = {
        id: Date.now(),
        title: taskTitle,
        status: "pending",
        time_start: "",
        time_end: "",
      };
      onAddTask(newTask);
      setTaskTitle("");
    }
  
    return (
      <div className="d-flex justify-content-between flex-wrap ">
        <form onSubmit={handleSubmit} className="me-5">
          <input
            type="text"
            placeholder="Add New Task"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            className="me-1"
          />
          <button type="submit">ADD</button>
        </form>
  
        <div>
          <input
            type="text"
            name="search"
            value={searchQuery}
            placeholder="Task Name..."
            onChange={(e) => onSearchQuery(e.target.value)}
          />
          <select
            name="filter"
            id="filter"
            className="mx-1"
            value={filterBy}
            onChange={(e) => onFilterChange(e.target.value)}
          >
            <option value="" disabled defaultValue="" hidden>
              Filter By Status
            </option>
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="inprogress">Inprogress</option>
            <option value="done">Done</option>
          </select>
  
          <select
            name="sort"
            id="sort"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
          >
           <option value="" disabled defaultValue="" hidden>
              Sort By
            </option>
            <option value="title">Title</option>
            <option value="status">Status</option>
            <option value="time">Time</option>
          </select>
        </div>
      </div>
    );
  }