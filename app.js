const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
app.use(cors());
app.use(express.json());
require("./database")
app.use("/", require("./route"))
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
