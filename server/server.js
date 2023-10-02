const app = require("./app");
const db = require("./db/db");
const dotenv = require("dotenv");

dotenv.config({ path: "./config/config.env" });

db();

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log("Listening on port " + port);
});
