import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./../pages/Home";
import Login from "./../pages/Login";
import Register from "./../pages/Register";
import NotFound from "../pages/NotFound";
import UserGaurdRouter from "./UserGaurdRouter";
export default function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<UserGaurdRouter />}>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
