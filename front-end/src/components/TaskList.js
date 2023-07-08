import React from 'react';
import Task from './Task';

export default function TaskList({
  tasks,
  onDeleteTask,
  searchQuery,
  filterBy,
  sortBy,
  onstartTask,
  onCompleteTask,
}) {
  let filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  filteredTasks =
    !filterBy || filterBy === "all"
      ? filteredTasks
      : filteredTasks.filter((task) => task.status === filterBy);

  let sortedTasks;
  
  if (sortBy === "title")
    sortedTasks = filteredTasks
      .slice()
      .sort((a, b) => a.title.localeCompare(b.title));

  if (sortBy === "status")
    sortedTasks = filteredTasks
      .slice()
      .sort((a, b) => a.status.localeCompare(b.status));

  if (sortBy === "time")
    sortedTasks = filteredTasks
      .slice()
      .sort((a, b) => Number(a.time_start) - Number(b.time_start));

  if (!sortBy) sortedTasks = filteredTasks;

  let inprogressTask = tasks.find((task) => task.status === "inprogress");

  return (
    <table className="text-center">
      <thead>
        <tr>
          <th scope="col">Task</th>
          <th scope="col">Start</th>
          <th scope="col">Time Spent</th>
          <th scope="col">Control</th>
          <th scope="col">Status</th>
        </tr>
      </thead>
      <tbody>
        {sortedTasks.length > 0 &&
          sortedTasks.map((task) => (
            <Task
              task={task}
              inprogressTask={inprogressTask}
              key={task._id}
              onDeleteTask={onDeleteTask}
              onstartTask={onstartTask}
              onCompleteTask={onCompleteTask}
            />
          ))}
      </tbody>
    </table>
  );
}
