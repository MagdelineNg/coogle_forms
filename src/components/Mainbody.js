import React, { useState } from "react";
import "./Mainbody.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import formIframe from "../img/form-iframe.png";

const Mainbody = (props) => {
  const [fileNames, setFileNames] = useState([]);
  const nav = useNavigate();

  const getFileNames = async () => {
    var request = await axios.get("http://localhost:9000/get_all_filenames");

    if (request.data){
      let filenames = request.data;
      setFileNames(filenames);
    }
  };

  getFileNames();

  const navigateTo = (docName) => {
    var fileName = docName.split(".");
    nav("/form/" + fileName[0]);
  };

  return (
    <div className="main-body">
      <div
        className="main-body-top"
        style={{ fontSize: "16px", fontWeight: "500" }}
      >
        Recent forms
      </div>
      <div className="main-body-docs">
        {fileNames.map((file) => (
          <div
            className="doc-card"
            onClick={() => {
              navigateTo(file);
            }}
          >
            <img
              src={formIframe}
              alt={file}
              className="doc-image"
              style={{ height: "169px", width: "208px" }}
            />
            <div className="doc-card-content">
              <h5 style={{ overflow: "ellipsis" }}>
                {file ? file : "Untitled form"}
              </h5>
              <div className="doc-content"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mainbody;
