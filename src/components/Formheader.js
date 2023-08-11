import React, { useState, useEffect } from "react";
import formLogo from "../img/google-forms-logo.png";
import "./Formheader.css";
import CenteredTabs from "./CenteredTabs";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";
import { IconButton, Tooltip } from "@mui/material";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useParams , useNavigate} from "react-router-dom";

const Formheader = (props) => {
  var [{ docName }, dispatch] = useStateValue();

  const param = useParams()
  const formId = param.id

  const changeDocName = (newTitle) => {
    console.log("change doc name: ", newTitle);
    dispatch({
      type: actionTypes.SET_DOC_NAME,
      docName: newTitle,
    });
  };

  const navigate = useNavigate()

  useEffect(() => {
    changeDocName(docName);
  }, [docName]);

  return (
    <div>
      <div className="form-header">
        <div className="form-header-left">
          <img
            src={formLogo}
            alt="Return to main page"
            style={{ height: "45px", width: "40px" }}
            onClick={() => {window.open('./')}}
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
          {/* <IconButton onClick={() => {window.open(`/${formId}/response`,'_blank', 'rel=noopener noreferrer')}}> */}
          <IconButton onClick={() => {navigate(`/${formId}/response`)}}>
            <Tooltip title="View user form">
            <VisibilityOutlinedIcon className="form-header-icon"/>
            </Tooltip>
          </IconButton>
        </div>
      </div>
      <CenteredTabs />
    </div>
  );
};

export default Formheader;
