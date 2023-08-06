import React from "react";
import formLogo from "../img/google-forms-logo.png";
import "./Formheader.css";
import CenteredTabs from "./CenteredTabs";
import Questionform from "./Questionform";

const Formheader = (props) => {
  return (
    <div>
      <div className="form-header">
        <div className="form-header-left">
          <img src={formLogo} style={{ height: "45px", width: "40px" }} />
          <input
            type="text"
            placeholder="Untitled form"
            className="form-name"
          ></input>
        </div>
      </div>
      <CenteredTabs />
    </div>
  );
};

export default Formheader;
