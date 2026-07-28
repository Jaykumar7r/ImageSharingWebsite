const ADMIN_PASSWORD = "Seven@77";
const express = require("express");
const multer = require("multer");
const fs = require("fs");

const app = express();

app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

app.post("/upload", upload.single("image"), (req, res) => {

  const password = req.headers["admin-password"];

  if (password !== ADMIN_PASSWORD) {
    return res.status(403).send("Access denied");
  }

  res.send("Image uploaded successfully!");

});

app.get("/images", (req, res) => {
  fs.readdir("uploads", (err, files) => {
    if (err) return res.json([]);
    res.json(files);
  });
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});