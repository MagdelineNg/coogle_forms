const fs = require("fs");
const express = require("express");
const path = require("path");
var cors = require("cors");
var bodyParser = require("body-parser");
const Excel = require("exceljs");
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


let workbook = new Excel.Workbook();
const responseCsvPath = `./responses/small-sg.csv`;
if (fs.existsSync(responseCsvPath)) {
  // var worksheet = workbook.csv.getWorksheet(`small-sg`);

  var currentdate = new Date(); 
var datetime = "Last Sync: " + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();

  workbook.csv.readFile(responseCsvPath).then((workbook) => {
    console.log(workbook.addRow({
        timestamp: datetime,
        'when is national day': '13 dec',
      }))
    // let worksheet = workbook.getWorksheet(`small-sg`);
    
    // console.log("worksheet: ", worksheet)

  })

  var options = {
    dateFormat: 
    dateUTC: boolean;
    sheetName: string;
    sheetId: number;
  }
  workbook.csv.writeFile(, 	options)

  workbook.csv.writeFile(responseCsvPath);

}

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

    let workbook = new Excel.Workbook();
    const responseCsvPath = `./responses/${formName}.csv`;
    if (fs.existsSync(responseCsvPath)) {
      // var worksheet = workbook.csv.getWorksheet(`${formName}`);

      workbook.csv.readFile(responseCsvPath).then(() => {
        let worksheet = workbook.getWorksheet(`${formName}`);
        
        console.log(worksheet)
        // let lastRow = worksheet.lastRow;
        // var getRowInsert = worksheet.getRow(++lastRow.number);
  
        // getRowInsert.values = {
        //   timestamp: date,
        //   ...formResponse.answer_data[0],
        // }
        // getRowInsert.commit();

        // return workbook.csv.writeFile(responseCsvPath);

      })

      // console.log("getrowinsert: " + JSON.stringify(getRowInsert.values));
      // getRowInsert.commit();

      // getRowInsert.getCell('A').value = 'yo';
      // getRowInsert.commit();
      // getRowInsert.values = {
      //   timestamp: date,
      //   ...formResponse.answer_data,
      // }
      // const rows = [
      //   [new Date(), "test"], // row by array
      //   [new Date(), "test 2"],
      // ];
      // // add new rows and return them as array of row objects
      // const newRows = worksheet.addRows(rows);

      // console.log({
      //   timestamp: date,
      //   ...formResponse.answer_data[0],
      // });

      // worksheet.addRow({
      //   timestamp: date,
      //   ...formResponse.answer_data[0],
      // });

    } else {
      let worksheet = workbook.addWorksheet(`${formName}`);

      worksheet.columns = [
        {
          header: "Timestamp",
          key: "timestamp",
          style: { numFmt: "mm/dd/yyyy\\ h:mm:ss\\ AM/PM" },
        },
        ...formResponse.column,
      ];
      worksheet.columns.forEach((col) => {
        col.width = col.header.length < 12 ? 12 : col.header.length;
      });

      formResponse.answer_data.forEach((ans, ind) => {
        console.log("ans: ", ans);
        worksheet.addRow({
          timestamp: date,
          ...ans,
        });
      });

      worksheet.getRow(1).eachCell((cell) => cell.font = { bold: true });

      workbook.csv.writeFile(responseCsvPath);
    }
  } catch (err) {
    console.error("Error submitting response: " + err);
  }
});

app.listen(9000, () => {
  console.log("express server is running at port 9000");
});
