import React, { useEffect, useState } from "react";
import LeftBar from "./../components/LeftBar";
import DashBoard from "./../components/DashBoard";
import { getUserInfo } from "./../api/userApi";

export default function Home() {
  let [user, setUser] = useState({});

  useEffect(() => {
    getUserInfo()
      .then((user) => {setUser(user.data)})
      .catch((error) => console.log(error));
  }, []);
  return (
    <div className="task-manager">
      <LeftBar user={user} />
      <DashBoard />
    </div>
  );
}
