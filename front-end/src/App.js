import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes/Router";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
    <div className="app"> 
      <Router />
    </div>
    </BrowserRouter>
  );
}

export default App;
