const axios = require("axios");
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const app = express();
const port = process.env.PORT || 3003;

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get(`/questions/:id`, (req, res) => {
  axios
    .get(
      `https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/qa/questions/?product_id=${req.params.id}&count=60`,
      {
        headers: {
          Authorization: "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",
        },
      }
    )
    .then((response) => {
      res.status(200).json(response.data);
    });
});



app.post("/qa/questions", (req, res) => {
  console.log("heyyyy", req.body);
  let question = {
    product_id: req.body.product_id,
    body: req.body.body,
    name: req.body.name,
    email: req.body.email,
  };
  axios.post("https://app-hrsei-api.herokuapp.com/api/fec2/hrnyc/qa/questions",
      question,
      {
        headers: {
          Authorization: "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",
        },
      }
    )
    .then((response) => {
      console.log(response);
      res.send("created");
    })
    .catch((err) => console.error(err));
});

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
