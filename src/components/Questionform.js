import React, { useState, useEffect } from "react";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import CropOriginalIcon from "@mui/icons-material/CropOriginal";
import ShortTextIcon from "@mui/icons-material/ShortText";
import SubjectIcon from "@mui/icons-material/Subject";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import FilterNoneOutlinedIcon from "@mui/icons-material/FilterNoneOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import "./Questionform.css";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormControlLabel,
  Icon,
  IconButton,
  Button,
  MenuItem,
  Select,
  Switch,
} from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";

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

  const changeQuestion = (text, i) => {
    var newQuestions = [...questions];
    newQuestions[i].questionText = text;
    setQuestions(newQuestions);
    console.log(newQuestions);
  };

  const addQuestionType = (i, type) => {
    var newQuestions = [...questions];
    newQuestions[i].questionType = type;
    setQuestions(newQuestions);
    console.log(newQuestions);
  };

  function changeOptionValue(text,ind,optionInd) {
    var newQuestions = [...questions];
    newQuestions[ind].options[optionInd].optionText = text;
    setQuestions(newQuestions);
    console.log(newQuestions);
  }

  function removeOption(ind,optionInd){
    var newQuestions = [...questions];
    if (newQuestions[ind].options.length > 1){
      console.log("removing option...")
      newQuestions[ind].options.splice(optionInd, 1)
      setQuestions(newQuestions);
      console.log(questions);
    }
  }

  function addOption(ind){
    var newQuestions = [...questions];
    const numOfOptions = newQuestions[ind].options.length
    if (numOfOptions < 5){
      newQuestions[ind].options.push({optionText: "Option " + (numOfOptions+1)})
      setQuestions(newQuestions);
      console.log(newQuestions);
    } else {
      console.log("Maximum of 5 options allowed.")
    }
  }

  const questionsUI = () => {
    return questions.map((ques, i) => (
      <div className="question-row" key={i}>
        <div className="question-card">
          <Accordion
            expanded={ques.open}
            className={ques.open ? "add-border" : ""}
          >
            <AccordionSummary style={{ width: "100%" }}>
              {!ques.open ? (
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
                              required={ques.required}
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
              ) : (
                <div className="question-boxes">
                  <AccordionDetails className="add-question">
                    <div className="add-question-top">
                      <input
                        type="text"
                        className="question"
                        placeholder="Question"
                        value={ques.questionText}
                        onChange={(e) => changeQuestion(e.target.value, i)}
                      ></input>
                      <CropOriginalIcon style={{ color: "#5f6368" }} />
                      <Select
                        className="select"
                        style={{ color: "#5f6368", fontSize: "13px" }}
                        defaultValue=""
                      >
                        <MenuItem
                          id="text"
                          value="Text"
                          onClick={() => {
                            addQuestionType(i, "text");
                          }}
                        >
                          <SubjectIcon style={{ marginRight: "10px" }} />
                          Paragraph
                        </MenuItem>
                        <MenuItem
                          id="checkbox"
                          value="Checkbox"
                          onClick={() => {
                            addQuestionType(i, "checkbox");
                          }}
                        >
                          <CheckBoxOutlinedIcon
                            style={{ marginRight: "10px" }}
                          />
                          Checkboxes
                        </MenuItem>
                        <MenuItem
                          id="radio"
                          value="Radio"
                          onClick={() => {
                            addQuestionType(i, "radio");
                          }}
                        >
                          <RadioButtonCheckedIcon
                            style={{ marginRight: "10px" }}
                          />
                          Multiple choice
                        </MenuItem>
                      </Select>
                    </div>
                    {ques.options.map((op, j) => (
                      <div className="add-question-body" key={j}>
                        {ques.questionType !== "text" ? (
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
                            value={op.optionText}
                            onChange={(e) => {changeOptionValue(e.target.value,i,j)}}
                          ></input>
                        </div>
                        <IconButton aria-label="delete" onClick={()=>removeOption(i,j)}>
                          <CloseOutlined />
                        </IconButton>
                      </div>
                    ))}
                    <div>
                      {ques.options.length < 5 ? (
                        <div className="add-question-body">
                          <FormControlLabel
                            disabled
                            control={
                              ques.questionType !== "text" ? (
                                <input
                                  type={ques.questionType}
                                  style={{
                                    marginLeft: "10px",
                                    marginRight: "10px",
                                  }}
                                  disabled
                                />
                              ) : (
                                <ShortTextIcon
                                  style={{ marginRight: "10px" }}
                                />
                              )
                            }
                            label={
                              <div style={{display:"flex",alignItems:"center"}}>
                                <input
                                  type="text"
                                  className="text-input"
                                  placeholder="Add other"
                                  style={{width:"80px"}}
                                ></input>
                                or
                                <Button
                                  size="small"
                                  style={{
                                    textTransform: "none",
                                    color: "#4285f4",
                                    fontSize: "600",
                                    marginLeft: "5px"
                                  }}
                                  onClick={addOption(i)}
                                >
                                  Add option
                                </Button>
                              </div>
                            }
                          />
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="add-question-footer">
                      <IconButton aria-label="Copy">
                        <FilterNoneOutlinedIcon />
                      </IconButton>
                      <IconButton aria-label="Delete">
                        <DeleteOutlineOutlinedIcon />
                      </IconButton>
                      <IconButton>
                        <span style={{ color: "#5f6368", fontSize: "13px" }}>
                          Required
                        </span>
                        <Switch name="checked" defaultChecked />
                      </IconButton>
                    </div>
                  </AccordionDetails>
                </div>
              )}
            </AccordionSummary>
          </Accordion>
        </div>
        <div className="question-edit">
          <AddCircleOutlineOutlinedIcon className="edit" />
        </div>
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
