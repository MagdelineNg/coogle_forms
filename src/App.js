import logo from "./logo.svg";
import "./App.css";
import NewForm from "./components/Newform";
import Formheader from "./components/Formheader";
import Userform from "./components/UserForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Submitted from "./components/SubmittedForm";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<NewForm/> }/>
          <Route path="/form/:id" element={<Formheader /> }/>
          <Route path="/:id/response" element={<Userform/>}/>
          <Route path="/submitted" element={<Submitted/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
