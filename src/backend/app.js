const fs = require("fs");
const express = require("express");
const path = require("path");
var cors = require("cors");
var bodyParser = require("body-parser");  //to parse json from req.body
var XLSX = require("xlsx");

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); //allow any origin to access resource
  res.header(
    "Access-Control-Allow-Headers", //http headers that can be used in req
    "Origin, X-Requested-With, Content-Type, Accept"  //add cors header to responses to inform browser that server allows requests from diff origins
  );
  next();
});

//post questions to db
app.post("/add_questions/:doc_id", (req, res) => {
  var docData = JSON.stringify(req.body);    
  var docId = req.params.doc_id;
  fs.writeFileSync(`files/${docId}.json`, docData);
});

//get questions to display when form is open
app.get("/data/:doc_id", (req, res) => {
  var docId = req.params.doc_id;
  fs.readFile(`files/${docId}.json`, (err, data) => {
    if (err) {
      console.log("Error reading form data", err);
    } else {
      let quesData = JSON.parse(data);
      res.send(quesData);
    }
  });
});

app.get("/get_all_filenames", (req, res) => {
  const directoryPath = path.join(__dirname, "/files");

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.log("error reading directory");
    } else {
      if (!files.length) {
        console.log("directory is empty");
        return;
      }

      res.send(files);
    }
  });
});

app.get("/:form_name/get_total_responses", (req, res) => {


  const formName = req.params.form_name;
  const responseFilePath = `./responses/${formName.replaceAll(" ", "-")}.xlsx`
  if (fs.existsSync(responseFilePath)){
    try{
      const workbook = XLSX.readFile(responseFilePath);
      let worksheet = workbook.Sheets[formName.replaceAll(" ", "-")];
      let range = XLSX.utils.decode_range(worksheet['!ref']);
      let totalRows = range.e.r - range.s.r + 1;
      res.send(`${totalRows}`)
    }catch(err){
      console.log("Error reading total responses: ", err)
    }
  } else{
    console.log("No response file")
  }
})

//collate user form responses into xlsx
app.post("/survey_response/:form_name", async (req, res) => {
  try {
    var formName = req.params.form_name;
    var fileName = formName.replaceAll(" ", "-");
    var formResponse = req.body;

    const responseCsvPath = `./responses/${fileName}.xlsx`;
    if (fs.existsSync(responseCsvPath)) {
      const workbook = XLSX.readFile(responseCsvPath);
      const sheet = workbook.Sheets[fileName];

      //convert answer_data json to aoa
      const answerAoa = [
        new Date().toISOString(),
        ...Object.values(formResponse.answer_data),
      ];
      //add multiple cell values to WS
      XLSX.utils.sheet_add_aoa(sheet, [answerAoa], { origin: -1 });

      XLSX.writeFile(workbook, responseCsvPath);

    } else {
      var responseObj = {};
      responseObj['Timestamp'] = new Date().toISOString();
      responseObj = {...responseObj, ...formResponse.answer_data};
      // responseObj["timestamp"] = new Date().toISOString();
      const formHeaders = ["Timestamp", ...formResponse.column];

      const worksheet = XLSX.utils.json_to_sheet([responseObj], {header: formHeaders});
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, fileName);

      /* fix headers */

      // XLSX.utils.sheet_add_aoa(worksheet, [['Timestamp', ...formHeaders]], { origin: "A1" });

      // const max_width = [formResponse.answer_data[0]].reduce(
      //   (w, r) => Math.max(w, r.name.length),
      //   10
      // );
      // worksheet["!cols"] = [{ wch: max_width }];

      /* create an XLSX file and try to save to Presidents.xlsx */
      XLSX.writeFile(workbook, `./responses/${fileName}.xlsx`);
    }
  } catch (err) {
    console.error("Error submitting response: " + err);
  }
});

app.listen(9000, () => {
  console.log("express server is running at port 9000");
});
