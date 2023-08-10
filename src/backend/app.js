const fs = require("fs");
const express = require("express");
const path = require("path");
var cors = require("cors");
var bodyParser = require("body-parser");
const Excel = require("exceljs");
var XLSX = require("xlsx");

const { QuestionAnswer, ElevatorSharp } = require("@mui/icons-material");
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//post questions to db
app.post("/add_questions/:doc_id", (req, res) => {
  var docData = JSON.stringify(req.body);
  console.log(docData);
  var docId = req.params.doc_id;
  fs.writeFileSync(`files/${docId}.json`, docData);
  console.log("written to db");
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

app.post("/survey_response/:form_name", async (req, res) => {
  try {
    var formName = req.params.form_name;
    var formResponse = req.body;
    var date = new Date();
    const options = {
      dateFormat: "DD/MM/YYYY HH:mm:ss",
      dateUTC: true, // use utc when rendering dates
    };

    const workbook = new Excel.Workbook();
    const responseCsvPath = `./responses/${formName}.csv`;
    if (fs.existsSync(responseCsvPath)) {
      const workbook = XLSX.readFile(`./responses/${fileName}.csv`);
      const sheet = workbook.Sheets[fileName];

      //convert answer_data json to aoa
      answerAoa = [new Date().toISOString(), ...Object.values(answer_data)];

      //add multiple cell values to WS
      XLSX.utils.sheet_add_aoa(worksheet, [answerAoa], { origin: -1 });

      XLSX.writeFile(workbook, `./responses/${fileName}.csv`);
      // workbook.csv.readFile(responseCsvPath).then(async function () {
      //   // var worksheet = workbook.csv.getWorksheet(`${formName}`);
      //   var worksheet = await workbook.csv.readFile(responseCsvPath);
      //   // var lastRow = worksheet.lastRow;
      //   // var getRowInsert = worksheet.getRow(++lastRow.number);
      //   // getRowInsert.values = {
      //   //   timestamp: date,
      //   //   ...formResponse.answer_data,
      //   // };
      //   // console.log("getrowinsert: " + JSON.stringify(getRowInsert.values));
      //   // getRowInsert.commit();
      //   // getRowInsert.getCell('A').value = 'yo';
      //   // getRowInsert.commit();
      //   // getRowInsert.values = {
      //   //   timestamp: date,
      //   //   ...formResponse.answer_data,
      //   // }
      //   const rows = [
      //     [new Date(), "test"], // row by array
      //     [new Date(), "test 2"]
      //   ];
      //   // add new rows and return them as array of row objects
      //   const newRows = worksheet.addRows(rows)
      //   console.log({
      //     timestamp: date,
      //     ...formResponse.answer_data[0],
      //   });
      //   worksheet
      //     .addRow({
      //       timestamp: date,
      //       ...formResponse.answer_data[0],
      //     })
      // });
      // workbook.csv.writeFile(responseCsvPath);
    } else {
      console.log("answer_data if new file: ", formResponse.answer_data[0]);
      const worksheet = XLSX.utils.json_to_sheet(formResponse.answer_data[0]);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, `${formName}`);

      /* fix headers */

      headers = Object.keys(answer_data);
      console.log("headers for new file: ", header);
      XLSX.utils.sheet_add_aoa(worksheet, [[headers]], { origin: "A1" });

      const max_width = answer_data.reduce(
        (w, r) => Math.max(w, r.name.length),
        10
      );
      worksheet["!cols"] = [{ wch: max_width }];

      /* create an XLSX file and try to save to Presidents.xlsx */
      XLSX.writeFile(workbook, `./responses/${formName}.csv`);

      // let worksheet = workbook.addWorksheet(`${formName}`);

      // worksheet.columns = [
      //   {
      //     header: "Timestamp",
      //     key: "timestamp",
      //     style: { numFmt: "mm/dd/yyyy\\ h:mm:ss\\ AM/PM" },
      //   },
      //   ...formResponse.column,
      // ];
      // worksheet.columns.forEach((col) => {
      //   col.width = col.header.length < 12 ? 12 : col.header.length;
      // });

      // formResponse.answer_data.forEach((ans, ind) => {
      //   console.log("ans: ", ans);
      //   worksheet.addRow({
      //     timestamp: date,
      //     ...ans,
      //   });
      // });

      // worksheet.getRow(1).font = { bold: true };

      // workbook.csv.writeFile(responseCsvPath);
    }
  } catch (err) {
    console.error("Error submitting response: " + err);
  }
});

app.listen(9000, () => {
  console.log("express server is running at port 9000");
});
