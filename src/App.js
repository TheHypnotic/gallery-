import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import ImageList from "./pages/ImageList";
import SingleImage from "./pages/singleImage";
import SearchForm from "./components/searchForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
function App() {
  const navigate = useNavigate();
  return (
    <>
      <div className="navbar">
        <div className="container">
          <a
            onClick={() => {
              navigate("/");
            }}
          >
            <h1 className="brand">Nexels</h1>
          </a>
          <SearchForm />
        </div>
      </div>
      <div className="container">
        <Routes>
          <Route path="*" element={<ImageList />} />
          <Route path="/image/:id" element={<SingleImage />} />
        </Routes>
      </div>
      <div className="footer">
        <div className="container">
          <h2>Nexels</h2>
          <h3 className="git-hub">
            <FontAwesomeIcon icon={faGithub} />
            <a href="#" target="_blank">
              Source Code
            </a>
          </h3>
          <p>Created in 2022</p>
        </div>
      </div>
    </>
  );
}

export default App;
