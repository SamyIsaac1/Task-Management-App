import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Chart from "./Chart";

export default function Report({ onHide, show, tasks }) {
  const completedTasks = tasks.filter((task) => task.status === "done").length;
  const inprogressTasks = tasks.filter(
    (task) => task.status === "inprogress"
  ).length;
  const pendingTasks = tasks.filter((task) => task.status === "pending").length;
  const remainingTask = tasks.length - completedTasks;
  return (
    <Modal
      onHide={onHide}
      show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Progress Report
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="text-center">
          <h3>Your Progress <i class="fa-solid fa-chart-column text-info"></i></h3>
          <div className="my-3">
            <span class="done p-2 rounded">
              {completedTasks}{" "}
              {completedTasks > 1 ? "Completed Tasks" : "Completed Task"}
            </span>
            <span class="inprogress p-2 rounded mx-2">
              {inprogressTasks} Inprogress Task
            </span>
            <span class="pending p-2 rounded">
              {pendingTasks}{" "}
              {completedTasks > 1 ? "Pending Tasks" : "Pending Task"}
            </span>
          </div>
          {remainingTask === 0 ? (
            "WooooHooo You've Done all the work, Get some coffee ☕ and chill 🐼 "
          ) : (
            <p>
              Great Work 😍 , you have {remainingTask}
              {remainingTask > 1 ? " tasks left" : " task left"} to Complete all your
              tasks. 👏
            </p>
          )}
        </div>

        <Chart tasks={tasks} />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
