import React from "react";
import { Outlet } from "react-router-dom";
import {AuthGuard}  from "./../guards/AuthGuard";

export default function UserGaurdRouter() {
  return (
    <>
      <AuthGuard>
        <div>
          <Outlet />
        </div>
      </AuthGuard>
    </>
  );
}
