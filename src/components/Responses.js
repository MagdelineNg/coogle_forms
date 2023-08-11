import React from "react";
import { useParams } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import "./Responses.css";

export default function Responses() {
  const params = useParams();
  const formId = params.id;
  const sheetsPath = `./backend/responses/${formId}.xlsx`;
  var [{ numOfResponses }] = useStateValue();

  return (
    <div className="responses">
      <h2>{numOfResponses} responses</h2>
      {numOfResponses !== 0 && <a href={sheetsPath}>View in Sheets</a>}
    </div>
  );
}
