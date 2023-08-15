export const initialState = {
  questions: [
    {
      questionText: "Question",
      questionType: "Radio",
      options: [{ optionText: "" }],
      open: true,
      required: false,
    },
  ],
  questionTypes: "Radio",
  docName: "",
  docDesc: "",
};

export const actionTypes = {
  SET_QUESTIONS: "SET_QUESTIONS",
  CHANGE_TYPE: "CHANGE_TYPE",
  SET_DOC_NAME: "SET_DOC_NAME",
  SET_DOC_DESC: "SET_DOC_DESC",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_QUESTIONS:
      return { ...state, questions: action.questions };
    case actionTypes.CHANGE_TYPE:
      return { ...state, questionTypes: action.questionTypes };
    case actionTypes.SET_DOC_NAME:
      return { ...state, docName: action.docName };
    case actionTypes.SET_DOC_DESC:
      return { ...state, docDesc: action.docDesc };
    default:
      return state;
  }
};

export default reducer;
