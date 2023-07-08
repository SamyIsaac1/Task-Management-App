import React from "react";
import UserSVG from "./../assets/users.svg";
import Logo from "./../assets/images/task.png";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Header({ tasks }) {
  const navigate = useNavigate()

  async function handleSignOut() {
    const result = await Swal.fire({
      title: "Have You Done all Your Work 👌 or 😢?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#00d0c5",
      cancelButtonColor: "#d33",
      confirmButtonText: "Log Out",
      cancelButtonText: "Cancel",
    });
    if (result.isConfirmed) {
      localStorage.removeItem("token");
      navigate("/login")
    }
  }
  return (
    <div className="header d-flex justify-content-between align-items-center">
      <h1>
        Tasks <img src={Logo} alt="logo" className="logo" />
      </h1>

      <div className="right-part">
        <div className="dropdown">
          <img
            className="user-icon"
            src={UserSVG}
            alt=""
            data-bs-toggle="dropdown"
            aria-expanded="false"
          />
          <ul className="dropdown-menu text-small shadow">
            <li>
              <Link className="dropdown-item" >
                Settings
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" >
                Profile
              </Link>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <Link
                className="dropdown-item"
                onClick={handleSignOut}
              >
                Sign out
              </Link>
            </li>
          </ul>
        </div>

        <div className="count">{tasks.length}</div>
      </div>
    </div>
  );
}
