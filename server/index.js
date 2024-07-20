import express from "express";
import cors from "cors";
import colors from 'colors';
import { connectDB } from "./config/db.js";
import { graphqlHTTP } from "express-graphql";
import { GQLSchema } from "./schema/schema.js";
import dotenv from "dotenv";
dotenv?.config();

const app = express();

/**
 * Connecting with database
 */
connectDB();

app.use(
  cors({
    origin: process.env.ORIGIN_URL,
  })
);

app.use(
  "/gql",
  graphqlHTTP({
    schema: GQLSchema,
    graphiql: true,
  })
);

app.get("/", (req, res) => {
  res.status(200).json({ Message: "Server is up and running." });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});
