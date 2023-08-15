# Coogle Forms
A survey form system. (WIP)

## Demo application
A customer can build a survey by clicking on "Blank".

![Survey layout](https://drive.google.com/uc?export=view&id=1NdTT1QW9DhprjX0OaQM5d3phTtqJtjgB)
<details>
<summary>
Workflow of Coogle Forms
</summary>

Customer can save the form after layout is completed.
![Save form](https://drive.google.com/uc?export=view&id=1Km_-ax4Q7o4Zxh8l9XPWbPLn4GIqE69e)

Anyone can be directed to the user form and fill up their response. 
![View user form](https://drive.google.com/uc?export=view&id=1fr18xyWjHRanDzgEsRSCbMFag8_aKpcC)

Click on "Responses" tab to view panel displaying total number of responses. Responses stored in an Excel file with the form name as its name. Excel file is retrievable in `./src/backend/responses` now)
![Record all responses](https://drive.google.com/uc?export=view&id=1vOyM6lWa0GRHD-EZfOsykWGHD7yQshsU)

Navigate to the directory where the Excel file is at(shown in "Responses" tab panel) to view all responses.
![All past responses saved in Excel](https://drive.google.com/uc?export=view&id=1m84gn2sxhXGJR0r_4eQtpVgUkvh1Y5_k)

</details>

## Features
- Create form
- Add unlimited questions and maximum of 5 options per question
- Delete and duplicating the question
- Drag and Drop questions to sort them in the preferred order
- Group questions by section
- Submit response to the form

## Built using 
- ReactJS and MaterialUI (frontend)
- NodeJS, XLJS library (backend)

## Getting started:
- Clone this repository or fork it
    - To clone this repository type git clone `https://github.com/MagdelineNg/coogle_forms.git` on your command line
    - To fork this repository, click fork button of this repository then type git clone `https://github.com/<your username>/coogle_forms.git`
- Ensure that [Docker](https://docs.docker.com/engine/install/) is installed on your local computer. 
- Run the `docker-compose.yaml` that builds the frontend and backend by typing `docker-compose up --build`
- Visit `localhost:3000` on your browser

## Architectural decisions
For each question, the default is a JSON object as such:
``` 
      {
        questionText: "Untitled Question",
        questionType: "radio",        //types: radio, checkbox, text
        options: [{ optionText: "Option 1" }],  //maximum of 5 customised options
        open: true,    //default is an expanded accordion
        required: false,   //required questions are marked with * on the public form
        section: false,    //whether it is a section or a question
      },
```
I used React's useContext hook and a Redux store, as I needed to manage the state across multiple components. I created a reducer function for the values and actions to manage the state of the form variables and use these values using `useStateValue()` imported from `StateProvider.js`.
```
//In reducer.js: actions that can be dispatched by user's action
export const actionTypes = {
    SET_QUESTIONS: "SET_QUESTIONS",
    CHANGE_TYPE: "CHANGE_TYPE",
    SET_DOC_NAME: "SET_DOC_NAME",
    SET_DOC_DESC: "SET_DOC_DESC",
}
```

Although I had limited time to implement conditional logic for the questions, how I would approach the conditional logic is when the customer is designing the form, I will create a "Go to question x " dropdown, where x=all questions except itself. In the question object, there will be another key "skipToSection", where the value will be an integer x (the question that user will be redirected to if user chooses this option). When user clicks on the option, the input fields for all questions to be skipped will be disabled and the component will be greyed out to signal that those questions are skipped. 


## Stretch Goal B
To handle a potential surge in traffic for a survey form system, frontend, backend, infrastructure, and scalability considerations should be taken into account. (non-exhaustive)

1. **Frontend Optimization:**
    - Implement lazy loading for components that are not immediately visible (eg. a long form with multiple sections) to reduce the initial load time.
2. **Backend Scaling:**
    - Horizontal scaling of backend servers by adding more servers to cache users’ responses and load balancers to distribute the incoming traffic across servers in times of high traffic
    - Implement rate limiting and request validation to protect servers from abusive requests during a surge.
3. **Database Considerations:**
    - Use non-relational DBs that scale well like NoSQL databases (e.g., MongoDB, Cassandra) or scalable SQL databases (e.g., Amazon Aurora, Google Cloud Spanner).
    - Cache user responses to reduce the load of writing each response immediately into the primary database.

## Contact
- Magdeline Ng - [magdelinenxl@gmail.com](mailto:magdelinenxl@gmail.com)
- Project link: [https://github.com/kimlimjustin/google-form-clone](https://github.com/MagdelineNg/coogle_forms.git)
