import React from "react";
import { convertTimestampToTime, calculateTimeSpent } from "./../utility/time";

export default function Task({ task, onDeleteTask, onCompleteTask, onstartTask }) {
  return (
    <tr className={task.status}>
      <td>{task?.title}</td>
      <td>{task?.time_start && convertTimestampToTime(task.time_start)}</td>
      <td>
        {task && (task.status === "inprogress" || task.status === "done") &&
          calculateTimeSpent(task.time_start, task.time_end)}
      </td>

      <td>
        {task.status === "pending" ? (
          <i
            className="fa-solid fa-hourglass-start"
            title="start progress ?"
            onClick={() => onstartTask(task?._id)}
          ></i>
        ) : task.status === "inprogress" ? (
          <i
            className="fa-solid fa-bars-progress"
            title="Are you Done ?"
            onClick={() => onCompleteTask(task?._id)}
          ></i>
        ) : (
          <i className="fa-solid fa-check" title="well Done ✨"></i>
        )}

        <i
          className="fa-solid fa-trash trash-icon ms-lg-4"
          onClick={() => onDeleteTask(task?._id)}
        ></i>
      </td>
      <td>{task && task.status.charAt(0).toUpperCase() + task.status.slice(1)}</td>
    </tr>
  );
}
