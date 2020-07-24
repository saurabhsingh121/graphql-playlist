const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

//allow cross origin request
app.use(cors());
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
mongoose.connect(
  `mongodb://${DB_USERNAME}:${DB_PASSWORD}@ds123614.mlab.com:23614/gql-ninja`
);
mongoose.connection.once("open", () => {
  console.log("Connected to database");
});
// bind express with graphql
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log("now listening for requests on port 4000");
});
