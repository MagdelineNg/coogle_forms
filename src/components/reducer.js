export const initialState = {
    questions: [{questionText: "Question", questionType: "radio", options: [{optionText: "Option 1"}], open: true, required: false}],
    questionTypes: "radio",
    docName: "Untitled form",
    docDesc: "Form description",
    numOfResponses: 0
}

export const actionTypes = {
    SET_QUESTIONS: "SET_QUESTIONS",
    CHANGE_TYPE: "CHANGE_TYPE",
    SET_DOC_NAME: "SET_DOC_NAME",
    SET_DOC_DESC: "SET_DOC_DESC",
    ADD_RESPONSE: "ADD_RESPONSE",
}

const reducer = (state=initialState, action) =>{
    switch(action.type){
        case actionTypes.SET_QUESTIONS:
            return {...state, questions: action.questions}
        case actionTypes.CHANGE_TYPE:
            return {...state, questionTypes: action.questionTypes}
        case actionTypes.SET_DOC_NAME:
            return {...state, docName: action.docName}
        case actionTypes.SET_DOC_DESC:
            return{...state, docDesc: action.docDesc}
        case actionTypes.ADD_RESPONSE:
            return {...state, numOfResponses: action.numOfResponses}
        default:
            return state;
    }
}

export default reducer;