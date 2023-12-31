import React from "react";
import { v4 as uuidv4 } from "uuid";
import blank from "../img/forms-blank-googlecolors.png";
import "./Newform.css";
import Mainbody from "./Mainbody";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NewForm = () => {
  const navigate = useNavigate();

  const CreateForm = () => {
    const id = uuidv4();

    var question = [
      {
        questionText: "",
        questionType: "Radio",
        options: [{ optionText: "" }],
        open: true,
        required: false,
        section: false,
      },
    ];

    axios.post(`http://localhost:9000/add_questions/${id}`, {
      doc_name: "",
      doc_desc: "",
      questions: question,
    });

    navigate("/form/" + id);
  };

  return (
    <div>
      <div className="template-section">
        <div
          className="newform-top"
          style={{ fontSize: "16px", color: "#202124" }}
        >
          Start a new form
        </div>
        <div className="newform-body">
          <div className="card" onClick={CreateForm}>
            <img src={blank} alt="" className="card-image" />
            <p className="card-image-title">Blank</p>
          </div>
        </div>
      </div>
      <Mainbody />
    </div>
  );
};

export default NewForm;
