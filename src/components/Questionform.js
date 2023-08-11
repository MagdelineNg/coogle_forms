import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import CropOriginalIcon from "@mui/icons-material/CropOriginal";
import ShortTextIcon from "@mui/icons-material/ShortText";
import SubjectIcon from "@mui/icons-material/Subject";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import FilterNoneOutlinedIcon from "@mui/icons-material/FilterNoneOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import TocIcon from "@mui/icons-material/Toc";
import "./Questionform.css";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormControlLabel,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Select,
  Switch,
  Tooltip,
} from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";
import { actionTypes } from "./reducer";
import { useStateValue } from "./StateProvider";

const Questionform = (props) => {
  const [{}, dispatch] = useStateValue();

  const [questions, setQuestions] = useState([
    {
      questionText: "Untitled Question",
      questionType: "radio",
      options: [{ optionText: "Option 1" }],
      open: true,
      required: false,
      section: false,
    },
  ]);
  const [anchorEl, setAnchorEl] = useState(null);

  const moreVertMenuOptions = [
    "Description",
    //"Description"    -> to be implemented
    "Go to section based on answer",
  ];

  const [docName, setDocName] = useState("Untitled Form");
  const [docDesc, setDocDesc] = useState("Form description");
  let maxSectionNumber = 0;

  questions.forEach((question) => {
    if (question.section && question.sectionNumber > maxSectionNumber) {
      maxSectionNumber = question.sectionNumber;
    }
  });

  const { id } = useParams();
  // const urlPath = useLocation();
  // const formId = urlPath.pathname.split("/").pop()

  useEffect(() => {
    const addData = async () => {
      var request = await axios.get(`http://localhost:9000/data/${id}`);
      const { questions, doc_name, doc_desc } = request.data; //obj destructuring referring to properties set in commitToDB()

      setDocName(doc_name);
      setDocDesc(doc_desc);
      setQuestions(questions);

      dispatch({
        type: actionTypes.SET_DOC_NAME,
        docName: doc_name,
      });
      dispatch({
        type: actionTypes.SET_DOC_DESC,
        docDesc: doc_desc,
      });
      dispatch({
        type: actionTypes.SET_QUESTIONS,
        questions: questions,
      });
    };
    addData();
  }, []);

  const commitToDB = () => {
    axios.post(`http://localhost:9000/add_questions/${id}`, {
      doc_name: docName,
      doc_desc: docDesc,
      questions: questions,
    });
  };

  const showMoreOptions = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuOption = (quesInd) => {
    let newQuestions = [...questions];
  };

  const changeQuestion = (text, quesInd) => {
    let newQuestions = [...questions];
    newQuestions[quesInd].questionText = text;
    setQuestions(newQuestions);
  };

  const changeSection = (text, quesInd) => {
    let newQuestions = [...questions];
    newQuestions[quesInd].questionText = text;
    setQuestions(newQuestions);
  };

  const addQuestionType = (quesInd, type) => {
    let newQuestions = [...questions];
    newQuestions[quesInd].questionType = type;
    setQuestions(newQuestions);
  };

  function changeOptionValue(text, quesInd, optionInd) {
    let newQuestions = [...questions];
    newQuestions[quesInd].options[optionInd].optionText = text;
    setQuestions(newQuestions);
  }

  function removeOption(quesInd, optionInd) {
    var newQuestions = [...questions];
    if (newQuestions[quesInd].options.length > 1) {
      newQuestions[quesInd].options.splice(optionInd, 1);
      setQuestions(newQuestions);
    }
  }

  function addOption(ind) {
    let newQuestions = [...questions];
    const numOfOptions = newQuestions[ind].options.length;
    if (numOfOptions < 5) {
      newQuestions[ind].options.push({
        optionText: "Option " + (numOfOptions + 1),
      });
      setQuestions(newQuestions);
    } else {
      console.log("Maximum of 5 options allowed.");
    }
  }

  function expandCloseAll() {
    let curQuestions = [...questions];
    for (const element of curQuestions) {
      element.open = false;
    }
    setQuestions(curQuestions);
  }

  function copyQuestion(quesInd) {
    expandCloseAll();
    let curQuestions = [...questions];
    // let newQuestion = curQuestions[i]  -> doesn't create new obj, just assigns ref to existing question obj in array, hence change made to newQ will also affect originalQ
    let newQuestion = { ...curQuestions[quesInd] }; //use spread operator to create new question object with same properties without affecting original question
    setQuestions([...curQuestions, newQuestion]);
  }

  function deleteQuestion(quesInd) {
    let curQuestions = [...questions];
    if (curQuestions.length > 1) {
      curQuestions.splice(quesInd, 1);
      setQuestions(curQuestions);
    }
  }

  function toggleRequiredQuestion(quesInd) {
    let curQuestions = [...questions];
    curQuestions[quesInd].required = !curQuestions[quesInd].required;
    setQuestions(curQuestions);
  }

  function addNewQuestion() {
    expandCloseAll();
    setQuestions([
      ...questions,
      {
        questionText: "Question",
        questionType: "radio",
        options: [{ optionText: "Option 1" }],
        open: true,
        required: false,
      },
    ]);
  }

  function addNewSection() {
    expandCloseAll();

    let curQuestions = [...questions];
    // curQuestions[0].section = true;
    // curQuestions[0].sectionNumber = 1;

    setQuestions([
      ...curQuestions,
      {
        questionText: "Untitled Section",
        open: true,
        section: true,
        sectionNumber: maxSectionNumber + 1,
      },
    ]);
  }

  //WIP -> navigate to section by storing user choice in JSON
  const navigateToSection = (fromSectionNum, toSectionNum) => {
    console.log("from ", fromSectionNum, " to ", toSectionNum);
  };

  function handleExpand(quesInd) {
    let curQuestions = [...questions];
    for (let j = 0; j < curQuestions.length; j++) {
      //curQuestions[j].open = quesInd === j ? true : false;
      if (quesInd === j) {
        curQuestions[j].open = true;
      } else {
        curQuestions[j].open = false;
      }
    }
    setQuestions(curQuestions);
  }

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  function onDragEnd(result) {
    if (!result.destination) return;

    let item = [...questions];
    const newItem = reorder(
      item,
      result.source.index,
      result.destination.index
    );
    setQuestions(newItem);
  }

  const questionsUI = () => {
    var displayedIndex = 0;
    var indexObj = {};
    return questions.map((ques, quesInd) => {
      if (!ques.sectionNumber) {
        displayedIndex += 1;
        indexObj[quesInd] = displayedIndex;
      }
      return (
        <Draggable
          key={quesInd}
          draggableId={quesInd + "id"}
          index={quesInd}
          isDragDisabled={ques.section === true ? true : false}
        >
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <div>
                <div style={{ marginBottom: "0px" }}>
                  <div style={{ width: "100%", marginBottom: "0px" }}>
                    <DragIndicatorIcon
                      style={{
                        transform: "rotate(-90deg)",
                        color: "#DAE0E2",
                        left: "300px",
                      }}
                      fontSize="small"
                    />
                  </div>
                  <div className="question-row">
                    <div className="question-card">
                      {!ques.questionType ? (
                        <div>
                          <div>
                            After section {ques.sectionNumber - 1}
                            <Select
                              className="select"
                              style={{ color: "#5f6368", fontSize: "13px" }}
                              defaultValue=""
                            >
                              {Array.from(
                                {
                                  length:
                                    maxSectionNumber - ques.sectionNumber + 1,
                                },
                                (_, index) => (
                                  <MenuItem
                                    id="section-choice"
                                    value="Text"
                                    onClick={() => {
                                      navigateToSection(
                                        ques.sectionNumber - 1,
                                        ques.sectionNumber + index
                                      ); //arg: from section, to section
                                    }}
                                  >
                                    Go to section {ques.sectionNumber + index}
                                  </MenuItem>
                                )
                              )}
                            </Select>
                          </div>
                          <Accordion
                            expanded={true}
                            className="section-accordion"
                            onChange={() => {
                              handleExpand(quesInd);
                            }}
                          >
                            <div className="question-boxes">
                              <AccordionDetails className="add-question">
                                <div className="add-question-top">                                
                                  <input
                                    type="text"
                                    className="question"
                                    placeholder="Question"
                                    value={ques.questionText}
                                    onChange={(e) =>
                                      changeSection(e.target.value, quesInd)
                                    }
                                  ></input>
                                </div>
                              </AccordionDetails>
                            </div>
                          </Accordion>
                        </div>
                      ) : (
                        <Accordion
                          expanded={ques.open}
                          className={ques.open ? "add-border" : ""}
                          onChange={() => {
                            handleExpand(quesInd);
                          }}
                        >
                          <AccordionSummary style={{ width: "100%" }}>
                            {!ques.open ? (
                              <div>
                                {ques.section && (
                                  <div
                                    className="section-header"
                                    style={{ marginBottom: "10px" }}
                                  >
                                    {" "}
                                    Section {ques.sectionNumber} of{" "}
                                    {maxSectionNumber}{" "}
                                  </div>
                                )}
                                <div className="question-text">
                                  {indexObj[quesInd]}. {ques.questionText}
                                  {ques.options.map((op, optionInd) => (
                                    <div
                                      key={optionInd}
                                      style={{ marginTop: "15px" }}
                                    >
                                      <div style={{ display: "flex" }}>
                                        <FormControlLabel
                                          style={{
                                            marginLeft: "5px",
                                            marginBottom: "5px",
                                          }}
                                          disabled
                                          control={
                                            <input
                                              type={ques.questionType}
                                              style={{ marginRight: "3px" }}
                                              required={ques.required}
                                            />
                                          }
                                          label={
                                            <div className="option-text">
                                              {op.optionText}
                                            </div>
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
                          {ques.open ? (
                            <div className="question-boxes">
                              {ques.section && (
                                <div
                                  className="section-header"
                                  style={{ marginBottom: "10px" }}
                                >
                                  {" "}
                                  Section {ques.sectionNumber} of{" "}
                                  {maxSectionNumber}{" "}
                                </div>
                              )}
                              <AccordionDetails className="add-question">
                                <div className="add-question-top">
                                <div className="expanded-index">{indexObj[quesInd]}.</div>
                                  <input
                                    type="text"
                                    className="question"
                                    placeholder="Question"
                                    value={ques.questionText}
                                    onChange={(e) =>
                                      changeQuestion(e.target.value, quesInd)
                                    }
                                  ></input>
                                  <CropOriginalIcon
                                    style={{ color: "#5f6368" }}
                                  />
                                  <Select
                                    className="select"
                                    style={{
                                      color: "#5f6368",
                                      fontSize: "13px",
                                    }}
                                    defaultValue=""
                                  >
                                    <MenuItem
                                      id="text"
                                      value="Text"
                                      onClick={() => {
                                        addQuestionType(quesInd, "text");
                                      }}
                                    >
                                      <SubjectIcon
                                        style={{ marginRight: "10px" }}
                                      />
                                      Paragraph
                                    </MenuItem>
                                    <MenuItem
                                      id="checkbox"
                                      value="Checkbox"
                                      onClick={() => {
                                        addQuestionType(quesInd, "checkbox");
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
                                        addQuestionType(quesInd, "radio");
                                      }}
                                    >
                                      <RadioButtonCheckedIcon
                                        style={{ marginRight: "10px" }}
                                      />
                                      Multiple choice
                                    </MenuItem>
                                  </Select>
                                </div>
                                {ques.options.map((op, optionInd) => (
                                  <div
                                    className="add-question-body"
                                    key={optionInd}
                                  >
                                    {ques.questionType !== "text" ? (
                                      <input
                                        type={ques.questionType}
                                        style={{ marginRight: "10px" }}
                                      />
                                    ) : (
                                      <ShortTextIcon
                                        style={{ marginRight: "10px" }}
                                      />
                                    )}
                                    <div>
                                      <input
                                        type="text"
                                        className="text-input"
                                        placeholder="option"
                                        value={op.optionText}
                                        onChange={(e) => {
                                          changeOptionValue(
                                            e.target.value,
                                            quesInd,
                                            optionInd
                                          );
                                        }}
                                      ></input>
                                    </div>
                                    <IconButton
                                      aria-label="delete"
                                      onClick={() =>
                                        removeOption(quesInd, optionInd)
                                      }
                                    >
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
                                          <div
                                            style={{
                                              display: "flex",
                                              alignItems: "center",
                                            }}
                                          >
                                            <input
                                              type="text"
                                              className="text-input"
                                              placeholder="Add other"
                                              style={{ width: "80px" }}
                                            ></input>
                                            or
                                            <Button
                                              size="small"
                                              style={{
                                                textTransform: "none",
                                                color: "#4285f4",
                                                fontSize: "600",
                                                marginLeft: "5px",
                                              }}
                                              onClick={() => {
                                                addOption(quesInd);
                                              }}
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
                                  <IconButton
                                    aria-label="Copy"
                                    onClick={() => {
                                      copyQuestion(quesInd);
                                    }}
                                  >
                                    <FilterNoneOutlinedIcon />
                                  </IconButton>
                                  <IconButton
                                    aria-label="Delete"
                                    onClick={() => {
                                      deleteQuestion(quesInd);
                                    }}
                                  >
                                    <DeleteOutlineOutlinedIcon />
                                  </IconButton>
                                  <IconButton
                                    onClick={() => {
                                      toggleRequiredQuestion(quesInd);
                                    }}
                                  >
                                    <span
                                      style={{
                                        color: "#5f6368",
                                        fontSize: "13px",
                                      }}
                                    >
                                      Required
                                    </span>
                                    <Switch
                                      name="checked"
                                      checked={ques.required}
                                      aria-label={
                                        ques.required
                                          ? "This question is required."
                                          : "This question is not required."
                                      }
                                    />
                                  </IconButton>
                                  <IconButton
                                    aria-label="more options"
                                    onClick={showMoreOptions}
                                    aria-controls="long-menu"
                                  >
                                    <MoreVertIcon />
                                  </IconButton>
                                  <Menu
                                    anchorEl={anchorEl}
                                    keepMounted
                                    onClose={handleClose}
                                    onClick={handleClose}
                                    open={open}
                                  >
                                    {moreVertMenuOptions.map((option) => (
                                      <MenuItem
                                        key={option}
                                        onClick={handleMenuOption(quesInd)}
                                      >
                                        {option}
                                      </MenuItem>
                                    ))}
                                  </Menu>
                                </div>
                              </AccordionDetails>
                            </div>
                          ) : (
                            ""
                          )}
                        </Accordion>
                      )}
                    </div>
                    <div className="question-edit">
                      <Tooltip title="Add new question">
                        <AddCircleOutlineOutlinedIcon
                          className="add-question-icon"
                          onClick={() => {
                            addNewQuestion();
                          }}
                        />
                      </Tooltip>
                      <Tooltip title="Add new section">
                        <TocIcon
                          className="add-section-icon"
                          onClick={() => {
                            addNewSection();
                          }}
                        />
                      </Tooltip>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Draggable>
      );
    });
  };

  return (
    <div className="question-form">
      <div className="section">
        <div className="question-title-section">
          <div className="question-form-top" style={{ marginTop: "20px" }}>
            <input
              type="text"
              className="question-form-top-name"
              style={{ color: "black" }}
              placeholder="Untitled form"
              value={docName}
              onChange={(e) => setDocName(e.target.value)}
            ></input>
            <input
              type="text"
              className="question-form-top-desc"
              placeholder="Form description"
              value={docDesc}
              onChange={(e) => setDocDesc(e.target.value)}
            ></input>
          </div>
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {questionsUI()}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <div className="save-form">
        <Button
          variant="contained"
          onClick={commitToDB}
          color="primary"
          style={{ fontSize: "14px" }}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default Questionform;
