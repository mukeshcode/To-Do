// Here "express" is a module which we have installed by npm, and express is what is being exported when we import that module
import express from "express";

// here express() is a function which returns an instance of the express()
const app = express();
// this is our port where we will listen for any requests
const port = process.env.PORT || 3000;

// the app is using all the static file from the public folder
app.use(express.static("public"));

app.use(express.urlencoded({extended : true}));

let fullDate = "";
function getDateString(req, res, next){
  const today = new Date();

  let date = today.getDate();
  let month = today.getMonth();
  let year = today.getFullYear();
  let day = today.getDay();

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  fullDate = `${days[day]}, ${months[month]} ${date} ${year}`;
  next();
}


app.use(getDateString);

let todayTask = [];
let weekTask = [];
let monthTask = [];

app.get("/", (req, res) => {
  res.render("index.ejs", {
    date : fullDate,
    tasks : todayTask
  });
});

app.post("/", (req, res) => {
  let newTask = req.body["task"];
  todayTask.push(newTask);
  res.render("index.ejs", {
    tasks : todayTask,
    date : fullDate
  });
});

app.get("/week", (req, res) => {
  res.render("week.ejs", {
    date : fullDate,
    tasks : weekTask
  });
});

app.get("/month", (req, res) => {
  res.render("month.ejs", {
    date : fullDate,
    tasks : monthTask
  })
});

app.post("/week", (req, res) => {
  let newTask = req.body["task"];
  weekTask.push(newTask);
  res.render("week.ejs", {
    date : fullDate,
    tasks : weekTask
  });
});

app.post("/month", (req, res) => {
  let newTask = req.body["task"];
  monthTask.push(newTask);
  res.render("month.ejs", {
    date : fullDate,
    tasks : monthTask
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
  // for striking through the paragraph element
  
  // till this point