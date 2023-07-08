import React from 'react'
import maleImage from "./../assets/images/male.jpg";
import femaleImage from "./../assets/images/female.jpg";

export default function LeftBar({ user }) {
    return (
      <div className="left-bar">
        <div className="actions">
          <div className="circle"></div>
          <div className="circle-2"></div>
        </div>
  
        <div className="profile d-flex flex-column align-items-center">
          <img
            src={user && user.gender === "male" ? maleImage : femaleImage}
            className="rounded-circle "
            alt=""
          />
          <h3>{user && user.name}</h3>
          <p>{user && user.email}</p>
          <p>Age: {user && user.age} </p>
          <p>Gender: {user && user.gender}</p>
          <p>Let's get the work done</p>
          <p>😉{user && user.gender==="male"? "👷‍♂️":"👷‍♀️"}🚀</p>
        </div>
      </div>
    );
  }