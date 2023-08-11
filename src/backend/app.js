const fs = require("fs");
const express = require("express");
const path = require("path");
var cors = require("cors");
var bodyParser = require("body-parser");
const Excel = require("exceljs");
var XLSX = require("xlsx");

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

// if (fs.existsSync(responseCsvPath)) {
//   // var worksheet = workbook.csv.getWorksheet(`small-sg`);

//   var currentdate = new Date();
// var datetime = "Last Sync: " + currentdate.getDate() + "/"
//                 + (currentdate.getMonth()+1)  + "/"
//                 + currentdate.getFullYear() + " @ "
//                 + currentdate.getHours() + ":"
//                 + currentdate.getMinutes() + ":"
//                 + currentdate.getSeconds();

//   workbook.csv.readFile(responseCsvPath).then((workbook) => {
//     console.log(workbook.addRow({
//         timestamp: datetime,
//         'when is national day': '13 dec',
//       }))
//   })

// var options = {
//   dateFormat:
//   dateUTC: boolean;
//   sheetName: string;
//   sheetId: number;
// }
//   workbook.csv.writeFile(, 	options)

//   workbook.csv.writeFile(responseCsvPath);

// }

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

app.get("/:form_name/get_total_responses", (req, res) => {


  const formName = req.params.form_name;
  const responseFilePath = `./responses/${formName.replaceAll(" ", "-")}.xlsx`
  console.log("be get total resp: ", responseFilePath)
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

app.post("/survey_response/:form_name", async (req, res) => {
  try {
    var formName = req.params.form_name;
    var fileName = formName.replaceAll(" ", "-");
    var formResponse = req.body;
    const responseCsvPath = `./responses/${formName}.xlsx`;
    if (fs.existsSync(responseCsvPath)) {
      const workbook = XLSX.readFile(responseCsvPath);
      const sheet = workbook.Sheets[fileName];

      //convert answer_data json to aoa
      const answerAoa = [
        new Date().toISOString(),
        ...Object.values(formResponse.answer_data[0]),
      ];
      //add multiple cell values to WS
      XLSX.utils.sheet_add_aoa(sheet, [answerAoa], { origin: -1 });

      // var wb = XLSX.utils.book_new();
      // XLSX.utils.book_append_sheet(wb, sheet, fileName);
      // XLSX.writeFile(wb, "SheetJSAddAOA.xlsx");

      XLSX.writeFile(workbook, `./responses/${fileName}.xlsx`);

      // XLSX.writeFile(workbook, `./responses/small-sg.csv`);
      // XLSX.utils.sheet_to_csv(modifiedWs)

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
      console.log("answer_data if new file: ", formResponse.answer_data);
      var responseObj = {};
      responseObj['Timestamp'] = new Date().toISOString();
      responseObj = {...responseObj, ...formResponse.answer_data[0]};
      // responseObj["timestamp"] = new Date().toISOString();
      const formHeaders = ["Timestamp", ...Object.keys(formResponse.answer_data[0])];
      console.log(formHeaders);

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
