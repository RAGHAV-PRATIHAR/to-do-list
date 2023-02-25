const express = require("express");
const app = express();

const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.set("view engine", "ejs");

let items = ["Cook", "Eat", "Shit"];
let workitems = [];

app.get("/", function (req, res) {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  let today = new Date();
  //   let currentDay = weekday[today.getDay()];
  let day = today.toLocaleDateString("en-Us", options);
  //   using ejs we are sending multiple dynamic html
  res.render("lists", { kindofday: day, newitems: items });
});

app.get("/work", function (req, res) {
  res.render("lists", { kindofday: "Work Day", newitems: workitems });
});

app.post("/", function (req, res) {
  let item = req.body.input;
  items.push(item);
  //   redirect to the home page
  res.redirect("/");
});

app.post("/work",function(req,res){
  let item=req.body.input
  workitems.push(item)
  res.redirect("/work")
})

app.listen(3000, function () {
  console.log("Server is running");
});
