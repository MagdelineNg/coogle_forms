import React from "react";
import { useParams } from "react-router-dom";
import "./Responses.css";
import axios from "axios";
import { useEffect , useState } from "react";
import { useStateValue } from "./StateProvider";

export default function Responses() {
  const params = useParams();
  const formId = params.id;
  const sheetsPath = `./backend/responses/${formId}.xlsx`;
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

  return (
    <div className="responses">
      <h2>{totalRows} responses</h2>
      {totalRows && <a href="file:///src/backend/responses/survey-for-developers.xlsx">View in Excel</a>}

      {/* {numOfResponses !== 0 && <a href={sheetsPath}>View in Excel</a>} */}
    </div>
  );
}

