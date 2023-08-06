import React, { useState, useEffect } from "react";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import CropOriginalIcon from "@mui/icons-material/CropOriginal";
import ShortTextIcon from "@mui/icons-material/ShortText";
import SubjectIcon from "@mui/icons-material/Subject";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import FilterNoneOutlinedIcon from '@mui/icons-material/FilterNoneOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import "./Questionform.css";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormControlLabel,
  Icon,
  IconButton,
  MenuItem,
  Select,
} from "@mui/material";

const Questionform = (props) => {
  const [questions, setQuestions] = useState([
    {
      questionText: "Question?",
      questionType: "radio",
      options: [
        { optionText: "option 1" },
        { optionText: "option 2" },
        { optionText: "option 3" },
        { optionText: "option 4" },
      ],
      open: true,
      required: false,
    },
  ]);

  const questionsUI = () => {
    return questions.map((ques, i) => (
      <div className="question-card">
        <Accordion
          expanded={ques.open}
          className={ques.open ? "add-border" : ""}
        >
          <AccordionSummary style={{ width: "100%" }}>
            {ques.open ? (
              <div>
                <div className="question-text">
                  {i + 1}. {ques.questionText}
                  {ques.options.map((op, i) => (
                    <div key={i} style={{ marginTop: "15px" }}>
                      <div style={{ display: "flex" }}>
                        <FormControlLabel
                          style={{ marginLeft: "5px", marginBottom: "5px" }}
                          disabled
                          control={
                            <input
                              type={ques.questionType}
                              style={{ marginRight: "3px" }}
                              required={ques.type}
                            />
                          }
                          label={
                            <div className="option-text">{op.optionText}</div>
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              ""
            )}
          </AccordionSummary>
          <div className="question-boxes">
            <AccordionDetails className="add-question">
              <div className="add-question-top">
                <input
                  type="text"
                  className="question"
                  placeholder="Question"
                  value={ques.questionText}
                ></input>
                <CropOriginalIcon style={{ color: "#5f6368" }} />
                <Select
                  className="select"
                  style={{ color: "#5f6368", fontSize: "13px" }}
                >
                  <MenuItem id="text" value="Text">
                    <SubjectIcon style={{ marginRight: "10px" }} />
                    Paragraph
                  </MenuItem>
                  <MenuItem id="checkbox" value="Checkbox">
                    <CheckBoxOutlinedIcon style={{ marginRight: "10px" }} />
                    Checkboxes
                  </MenuItem>
                  <MenuItem id="radio" value="Radio">
                    <RadioButtonCheckedIcon style={{ marginRight: "10px" }} />
                    Multiple choice
                  </MenuItem>
                </Select>
              </div>
              {ques.options.map((op, ind) => {
                <div className="add-question-body" key="ind">
                  {ques.questionType != "text" ? (
                    <input
                      type={ques.questionType}
                      style={{ marginRight: "10px" }}
                    />
                  ) : (
                    <ShortTextIcon style={{ marginRight: "10px" }} />
                  )}
                  <div>
                    <input
                      type="text"
                      className="text-input"
                      placeholder="option"
                      value={ques.options[ind].optionText}
                    ></input>
                  </div>

                  <CropOriginalIcon style={{ color: "#5f6368" }} />
                </div>;
              })}
              <div className="add-question-footer">
                <IconButton aria-label="Copy"><FilterNoneOutlinedIcon/></IconButton>
                <IconButton aria-label="Delete"><DeleteOutlineOutlinedIcon/></IconButton>
                <IconButton>
                  <span style={{color:"#5f6368", fontSize="13px"}}>Required</span>
                </IconButton>
              </div>
            </AccordionDetails>
          </div>
        </Accordion>
      </div>
    ));
  };

  return (
    <div className="question-form">
      <div className="section">
        <div className="question-title-section">
          <div className="question-form-top">
            <input
              type="text"
              className="question-form-top-name"
              style={{ color: "black" }}
              placeholder="Untitled document"
            ></input>
            <input
              type="text"
              className="question-form-top-desc"
              placeholder="Form description"
            ></input>
          </div>
        </div>
        {questionsUI()}
      </div>
      {/* <Accordion expanded="false">
        <AccordionSummary>
          <div>questionOpen</div>
        </AccordionSummary>
      </Accordion>;*/}
    </div>
  );
};

export default Questionform;

{
  /* <div className="question-boxes">
<AccordionDetails className="add_question">
  <div className="add-question-top">
    <input
      type="text"
      className="question"
      placeholder="Question"
      value={ques.questionText}
    ></input>
    <CropOriginalIcon style={{ color: "#5f6368" }} />
    <Select
      className="select"
      style={{ color: "#5f6368", fontSize: "13px" }}
    >
      <MenuItem id="text" value="Text">
        Paragraph
      </MenuItem>
      <MenuItem id="checkbox" value="Checkbox">
        Checkboxes
      </MenuItem>
      <MenuItem id="radio" value="Radio">
        Multiple choice
      </MenuItem>
    </Select>
  </div>
</AccordionDetails>
</div> */
}
