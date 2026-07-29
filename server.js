const ADMIN_PASSWORD = "Seven@77";

const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

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

// Upload image (Admin only)
app.post("/upload", (req, res) => {

    const password = req.headers["admin-password"];

    if (password !== ADMIN_PASSWORD) {
        return res.status(403).send("Access denied");
    }

    upload.single("image")(req, res, function (err) {

        if (err) {
            return res.status(500).send("Upload failed");
        }

        if (!req.file) {
            return res.status(400).send("No image selected");
        }

        res.send("Image uploaded successfully!");

    });

});

// Get all uploaded images
app.get("/images", (req, res) => {

    fs.readdir("uploads", (err, files) => {

        if (err) {
            return res.json([]);
        }

        res.json(files);

    });

});
app.delete("/delete/:filename", (req, res) => {

    const password = req.headers["admin-password"];

    if (password !== ADMIN_PASSWORD) {
        return res.status(403).send("Access denied");
    }

    const filePath = "uploads/" + req.params.filename;

    fs.unlink(filePath, (err) => {
        if (err) {
            return res.status(404).send("Image not found");
        }

        res.send("Image deleted successfully!");
    });

});
// Home page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});