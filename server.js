const express = require("express");
const path = require("path");
const app = express();
const port = process.env.port || 5200;

app.use(express.static("public"));

app.get('/category', (req, res) => {
    res.sendFile("./category-all.html", {root: path.join(__dirname, "public")});
});

app.get('/category/:category', (req, res) => {
    res.sendFile("./category.html", {root: path.join(__dirname, "public")});
});

app.get('/contact', (req, res) => {
    res.sendFile("./contact.html", {root: path.join(__dirname, "public")});
});

app.listen(port, () => {
    console.log(`Listening at port: ${port}`);
})