const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.send(`

    <div>
      <form method="POST">
        <input name="email" placeholder="email" />
        <input name="password" placeholder="password" />
        <input name="passwordConfirm" placeholder="password confirm" />
        <button>Sign Up</button>
      </form>
    </div>


  `);
});

// req.on("data", (data) => {
//   const parsed = data.toString("utf8").split("&");
//   const formData = {};
//   for (let pair of parsed) {
//     const [key, value] = pair.split("=");
//     formData[key] = value;
//   }
//   console.log(formData);
// });

app.post("/", (req, res) => {
  console.log(req.body);
  res.send("Account Created");
});

app.listen(3000, () => {
  console.log("Listening");
});
