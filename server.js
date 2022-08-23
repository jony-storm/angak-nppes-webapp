const path = require("path");
const express = require("express");
const multer = require("multer");
const reader = require("xlsx");
const fetch_rec = require("./fetch_rec");
const exc_gen_output = require("./match_rec");
const fs = require("fs");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname.split(".xlsx")[0] + "-" + Date.now() + ".xlsx");
  },
});

var upload = multer({ storage: storage });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile("index.html");
});

app.post("/upload-file", upload.single("excel_file"), async (req, res) => {
  const file = req.file;
  if (!file) {
    console.log("Please select an Excel(.xlsx) file first");
  } else {
    const exc_file = reader.readFile(file.path);
    let exc_recs = [];
    let exc_output_recs = [];
    const sheet1 = exc_file.SheetNames[0];
    const temp = reader.utils.sheet_to_json(exc_file.Sheets[sheet1]);
    temp.forEach((rec) => {
      const ori_rec = {
        "PI Last Name": rec["PI Last Name"] || "",
        "PI First Name": rec["PI First Name"] || "",
        Addrss: rec["Address"] || "",
        City: rec["City"] || "",
        "State/Province": rec["State/Province"] || "",
        Country: rec["Country"] || "",
        "PI Phone #": rec["PI Phone #"] || "",
        "PI Fax #": rec["PI Fax #"] || "",
        "PI Email": rec["PI Email"] || "",
      };
      // console.log(ori_rec);
      exc_recs.push(ori_rec);
    });

    for (let ori_rec of exc_recs) {
      const fetched_rec = await fetch_rec.fetch_rec(
        ori_rec["PI First Name"],
        ori_rec["PI Last Name"]
      );
      // console.log(fetched_rec);
      if (fetched_rec.length > 0) {
        const output_rec = exc_gen_output.exc_gen_output(ori_rec, fetched_rec);
        console.log("fetched works...");
        // console.log(output_rec);
        exc_output_recs.push(output_rec);
      } else {
        console.log("no records found...");
        const output_rec = {};
        output_rec["PI Last Name"] = ori_rec["PI Last Name"];
        output_rec["Suggested PI Last Name"] = "";
        output_rec["PI First Name"] = ori_rec["PI First Name"];
        output_rec["Suggested PI First Name"] = "";
        output_rec["Address"] = ori_rec["Address"];
        output_rec["Suggested Address"] = "";
        output_rec["City"] = ori_rec["City"];
        output_rec["Suggested City"] = "";
        output_rec["State/Province"] = ori_rec["State/Province"];
        output_rec["Suggested State/Province"] = "";
        output_rec["Country"] = ori_rec["Country"];
        output_rec["Suggested Country"] = "";
        output_rec["PI Phone #"] = ori_rec["PI Phone #"];
        output_rec["Suggested PI Phone #"] = "";
        output_rec["PI Fax #"] = ori_rec["PI Fax #"];
        output_rec["Suggested PI Fax #"] = "";
        output_rec["PI Email"] = ori_rec["PI Email"];
        output_rec["Suggested PI Email"] = "";
        output_rec["Surity Percentage"] = "";
        exc_output_recs.push(output_rec);
      }
    }
    let wb = reader.utils.book_new();
    let ws = reader.utils.json_to_sheet(exc_output_recs);
    reader.utils.book_append_sheet(wb, ws, "Non Responder Lists");
    const filePath = __dirname + "/public/downloads/" + file.filename;
    reader.writeFile(wb, filePath);
    console.log("File processed successfully");
    res.json(file);
  }
});

app.get("/download-file", (req, res) => {
  const fileName = req.query.fileName;
  console.log(fileName);
  const filePath = __dirname + "/public/downloads/" + fileName;
  console.log(filePath);
  res.download(filePath, fileName);
  console.log("File sent successfully!");
  // try {
  //   res.download(
  //       filePath,
  //       fileName,
  //   );
  //   console.log("File sent successfully!");
  //   res.send(200);
  // }
  // catch (error) {
  //   console.error("File could not be sent!");
  //   next(error);
  // }
});

app.listen(3000, () => {
  console.log(`Server started...`);
});
