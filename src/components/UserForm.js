import { Button, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./UserForm.css";
import { useStateValue } from "./StateProvider";
import axios from "axios";
import { actionTypes } from "./reducer";

function Userform() {
  const [shortans, setshortans] = useState("");
  let navigate = useNavigate();
  let [answer, setAnswer] = useState([]);
  let [{ questions, docName, docDesc }, dispatch] = useStateValue();

  useEffect(() => {
    questions.map((q) => {
      answer.push({
        question: q.questionText,
        answer: "",
      });
    });
  }, []);

  function deRequire(name) {
    let elements = document.getElementsByClassName(name);
    var someChecked = false;
    elements.forEach(
      (element) => (someChecked = someChecked || element.checked)
    );
    elements.forEach((element) => (element.required = !someChecked));
  }

  function selectRadio(que, option) {
    var k = answer.findIndex((ele) => ele.question === que);

    answer[k].answer = option;
    setAnswer(answer);
  }
  var post_answer_data = {};

  function selectText(que, option) {
    var k = answer.findIndex((ele) => ele.question === que);

    answer[k].answer = option;
    setAnswer(answer);
    setshortans(option);
  }

  function selectCheckbox(e, que, option) {
    let d = [];
    let k = answer.findIndex((ele) => ele.question === que);

    if (answer[k].answer) {
      d = answer[k].answer.split(",");
    }
    if (e === true) {
      d.push(option);
    } else {
      let n = d.findIndex((el) => el.option === option);
      d.splice(n, 1);
    }
    answer[k].answer = d.join(",");
    setAnswer(answer);

    if (e){
      questions[k].required = false
    }
    dispatch({
      type: actionTypes.SET_QUESTIONS,
      questions: questions,
    });
  }

  function submit() {}

  const handleSubmit = (e) => {
    e.preventDefault();

    answer.map((ele) => {
      post_answer_data[ele.question] = ele.answer;
    });

    axios.post(`http://localhost:9000/survey_response/${docName}`, {
      column: questions.map((question) => question.questionText),
      answer_data: post_answer_data,
    });

    navigate(`/submitted`);
  };

  return (
    <div className="submit">
      <form onSubmit={handleSubmit}>
        <div className="user_form">
          <div className="user_form_layout">
            <div className="user_title_section">
              <Typography style={{ fontSize: "26px" }}>{docName}</Typography>
              <Typography style={{ fontSize: "15px" }}>{docDesc}</Typography>
            </div>
            <div className="user-form-instructions">
              Please choose only 1 option for each question.
            </div>
            {questions.map((question, qindex) => (
              <div key={qindex}>
                {!question.options ? (
                  <div className="user_form_section">
                    <Typography
                      style={{
                        fontWeight: "400",
                        letterSpacing: ".1px",
                        lineHeight: "24px",
                        paddingBottom: "8px",
                        fontSize: "25px",
                      }}
                    >
                      Section {question.sectionNumber}
                    </Typography>
                    <div style={{ marginTop: "15px" }}>
                      {question.questionText}
                    </div>
                  </div>
                ) : (
                  <div className="user_form_questions">
                    <Typography
                      style={{
                        fontWeight: "400",
                        letterSpacing: ".1px",
                        lineHeight: "24px",
                        paddingBottom: "8px",
                        fontSize: "14px",
                      }}
                    >
                      {question.required||question.questionType==="Checkbox" ? (
                        <div className="user-form-question">
                          <div className="required-qn">* </div>{" "}
                          {question.questionText}{" "}
                        </div>
                      ) : (
                        <div> {question.questionText} </div>
                      )}
                    </Typography>
                    {question.options.map((ques, index) => (
                      <div key={index} style={{ marginBottom: "5px" }}>
                        <div style={{ display: "flex" }}>
                          <div className="form-check">
                            {question.questionType !== "Radio" ? (
                              question.questionType !== "Text" ? (
                                <label for={`Q${qindex}-option${index}`}>
                                  <input
                                    id={`Q${qindex}-option${index}`}
                                    type={question.questionType}
                                    name={`Q${qindex}-${question.questionType}`}
                                    value={ques.optionText}
                                    className="form-check-checkbox"
                                    required={question.required}
                                    style={{
                                      marginLeft: "5px",
                                      marginRight: "5px",
                                    }}
                                    onChange={(e) => {
                                      selectCheckbox(
                                        e.target.checked,
                                        question.questionText,
                                        ques.optionText
                                      );
                                    }}
                                  />{" "}
                                  {ques.optionText}
                                </label>
                              ) : (
                                <label for={`Q${qindex}-option${index}`}>
                                  <input
                                    id={`Q${qindex}-option${index}`}
                                    type={question.questionType}
                                    name={`Q${qindex}-${question.questionType}`}
                                    value={shortans}
                                    className="form-check-input"
                                    required={question.required}
                                    style={{
                                      marginLeft: "5px",
                                      marginRight: "5px",
                                    }}
                                    onChange={(e) => {
                                      selectText(
                                        question.questionText,
                                        e.target.value
                                      );
                                    }}
                                  />{" "}
                                </label>
                              )
                            ) : (
                              <label for={`Q${qindex}-option${index}`}>
                                <input
                                  type={question.questionType}
                                  id={`Q${qindex}-option${index}`}
                                  name={`Q${qindex}-${question.questionType}`}
                                  value={ques.optionText}
                                  className="form-check-input"
                                  required={question.required}
                                  style={{
                                    marginLeft: "5px",
                                    marginRight: "5px",
                                  }}
                                  onChange={() => {
                                    selectRadio(
                                      question.questionText,
                                      ques.optionText
                                    );
                                  }}
                                />
                                {ques.optionText}
                              </label>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="user_form_submit">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={{ fontSize: "14px" }}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Userform;
