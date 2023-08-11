import React from "react";
import { useParams } from "react-router-dom";
import "./Responses.css";
import axios from "axios";
import { useEffect , useState } from "react";
import { useStateValue } from "./StateProvider";

export default function Responses() {
  const params = useParams();
  const formId = params.id;
  var [{ docName }] = useStateValue();
  const [totalRows, setTotalRows] = useState()

  useEffect(() => {
    const getTotalResponses = async () => {
      try {
        var request = await axios.get(
          `http://localhost:9000/${docName}/get_total_responses`
        );
        setTotalRows(request.data)
      } catch (err) {
        console.log("Error retrieving total responses: ", err);
      }
    };

    getTotalResponses();
  }, []);

  const excelFile = docName.replace(" ", "-")

  return (
    <div className="responses">
      <h2>{totalRows-1} responses</h2>
      {totalRows && <div>Please view the Excel responses in <b>./backend/responses/{excelFile}.xlsx</b></div>}

    </div>
  );
}

