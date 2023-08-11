import { Button, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./UserForm.css";
import { useStateValue } from "./StateProvider";
import axios from "axios";
import { actionTypes } from "./reducer";

function Userform() {
//   const [totalQ, setTotalQ] = useState(1);

  var quest = [];
  var navigate = useNavigate();
  var [answer, setAnswer] = useState([]);
  var [{ questions, docName, docDesc, numOfResponses }, dispatch] = useStateValue();

  
  useEffect(() => {
    console.log('response: ', numOfResponses)

    questions.map((q) => {
      if (!q.section){
        answer.push({
          question: q.questionText,
          answer: " ",
        });
      }
    });
    questions.map((q, qindex) => {
      if (!q.section){
        quest.push({ header: q.questionText, key: q.questionText });
      }
    });
  }, []);
  
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
  }

  function selectCheckbox(e, que, option) {
    var d = [];
    var k = answer.findIndex((ele) => ele.question === que);
    if (answer[k].answer) {
      d = answer[k].answer.split(",");
    }
    if (e === true) {
      d.push(option);
    } else {
      var n = d.findIndex((el) => el.option === option);
      d.splice(n, 1);
    }
    answer[k].answer = d.join(",");
    setAnswer(answer);
  }

  function submit() {
    answer.map((ele) => {
      console.log(ele)
      post_answer_data[ele.question] = ele.answer;
    });

    console.log("userform.js post_answer_data: ", JSON.stringify(post_answer_data));

    axios.post(`http://localhost:9000/survey_response/${docName}`, {
      column: quest,
      answer_data: [post_answer_data],
    });
    
    dispatch({
      type: actionTypes.ADD_RESPONSE,
      numOfResponses: numOfResponses+1
    })
    console.log("resp: ", numOfResponses);
    navigate(`/submitted`);
  }

  return (
    <div className="submit">
      <div className="user_form">
        <div className="user_form_layout">
          <div className="user_title_section">
            <Typography style={{ fontSize: "26px" }}>{docName}</Typography>
            <Typography style={{ fontSize: "15px" }}>{docDesc}</Typography>
          </div>

          {questions.map((question, qindex) => (
            <div>
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
                  <div style={{marginTop: "15px"}}>{question.questionText}</div>
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
                    {question.questionText}
                  </Typography>
                  {question.options.map((ques, index) => (
                    <div key={index} style={{ marginBottom: "5px" }}>
                      <div style={{ display: "flex" }}>
                        <div className="form-check">
                          {question.questionType !== "radio" ? (
                            question.questionType !== "text" ? (
                              <label>
                                <input
                                  type={question.questionType}
                                  name={qindex}
                                  value={ques.optionText}
                                  className="form-check-input"
                                  required={question.required}
                                  style={{
                                    margnLeft: "5px",
                                    marginRight: "5px",
                                  }}
                                  onChange={(e) => {
                                    selectCheckbox(
                                      e.target.checked,
                                      question.questionText,
                                      ques.optionText, 
                                    );
                                  }}
                                />{" "}
                                {ques.optionText}
                              </label>
                            ) : (
                              <label>
                                <input
                                  type={question.questionType}
                                  name={qindex}
                                  value={ques.optionText}
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
                                {ques.optionText}
                              </label>
                            )
                          ) : (
                            <label>
                              <input
                                type={question.questionType}
                                name={qindex}
                                value={ques.optionText}
                                className="form-check-input"
                                required={question.required}
                                style={{ margnLeft: "5px", marginRight: "5px" }}
                                onChange={() => {
                                  selectRadio(
                                    question.questionText,
                                    ques.optionText,
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
              variant="contained"
              color="primary"
              onClick={submit}
              style={{ fontSize: "14px" }}
            >
              Submit
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Userform;
