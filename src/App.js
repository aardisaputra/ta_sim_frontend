import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Home";
import Model from "./models/Model";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  const [ticker, setTicker] = useState("Ticker");
  const [model, setModel] = useState("Model");

  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Home
              setTicker={setTicker}
              setModel={setModel}
              model={model}
              ticker={ticker}
            />
          }
        ></Route>
        <Route
          exact
          path="/model"
          element={<Model model={model} ticker={ticker} setModel={setModel} />}
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
