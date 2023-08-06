import logo from "./logo.svg";
import "./App.css";
import NewForm from "./components/Newform";
import Formheader from "./components/Formheader";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<NewForm/> }/>
          <Route path="/form/:id" element={<Formheader /> }>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
