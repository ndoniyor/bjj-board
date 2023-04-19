import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SimpleView from "../routes/SimpleView";
import CreateView from "../routes/CreateView";
import DetailView from "../routes/DetailView";
import Layout from "../routes/Layout";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index={true} element={<App />} />
          <Route index={false} path="/gallery/*">
            <Route index={true} element={<SimpleView />} />
            <Route path=":id" element={<DetailView />} />
          </Route>
          <Route index={false} path="/create/" element={<CreateView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
