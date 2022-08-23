const path = require("path");
const express = require("express");
const multer = require("multer");

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
    setTimeout(() => {
      console.table(file);
      res.json(file);
    }, 5000);
  }
});

app.get("/download-file", (req, res) => {
  const fileName = req.query.fileName;
  console.log(fileName);
  const filePath = __dirname + "/public/downloads/" + fileName;
  console.log(filePath);
  res.download(
    filePath,
    fileName,
  );
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
})

app.listen(3000, () => {
  console.log(`Server started...`);
});
