import React from "react";
import { Outlet, Link } from "react-router-dom";

export default function Layout() {
  return (
    <div>
      <nav>
        <ul>
          <li className="home-link" key="home-button">
            <Link to="/">Home</Link>
          </li>
          <li className="gallery-link" key="gallery-button">
            <Link to="/gallery">View Posts</Link>
          </li>
          <li className="create-link" key="create-button">
              <Link to="/create">Create</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}
