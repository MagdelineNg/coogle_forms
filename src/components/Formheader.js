import React, { useState, useEffect } from "react";
import formLogo from "../img/google-forms-logo.png";
import "./Formheader.css";
import CenteredTabs from "./CenteredTabs";
import Questionform from "./Questionform";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';


const Formheader = (props) => {
  var [{ docName }, dispatch] = useStateValue();

  const navigate = useNavigate();

  const changeDocName = (newTitle) => {
    console.log("change doc name: ", newTitle);
    dispatch({
      type: actionTypes.SET_DOC_NAME,
      docName: newTitle,
    });
  };

  useEffect(() => {
    changeDocName(docName);
  }, [docName]);

  return (
    <div>
      <div className="form-header">
        <div className="form-header-left">
          <img
            src={formLogo}
            alt=""
            style={{ height: "45px", width: "40px" }}
          />
          <input
            type="text"
            placeholder="Untitled form"
            className="form-name"
            value={docName}
            onChange={(e) => changeDocName(e.target.value)}
          ></input>
        </div>
        <div className="form-header-right">
          <IconButton onClick={() => {navigate("/response")}}>
            <VisibilityOutlinedIcon className="form-header-icon"/>
          </IconButton>
        </div>
      </div>
      <CenteredTabs />
    </div>
  );
};

export default Formheader;
