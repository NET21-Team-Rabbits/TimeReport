import express from "express";
import { Client } from "@notionhq/client";
import bodyParser from "body-parser";
import { removeChildren } from "./notionData/removeChildren.js";
import "dotenv/config";
import { addChildren } from "./notionData/addChildren.js";

const app = express();
const notion = new Client({ auth: process.env.TOKEN });
const jsonParser = bodyParser.json();

app.listen(process.env.PORT, console.log(`Server created on port: ${process.env.PORT}`));

const databaseId = "559c653219e44d6b890220e0aff15dfc";
const timereportDbId = "559c653219e44d6b890220e0aff15dfc";

app.get('^/get-databases', (req, res) => {
  notion.search({ filter: { property: 'object', value: 'database' } })
    .then(database => res.send(database.results))
    .catch(error => res.sendStatus(404).send(error.message));
});

app.get('^/get-database/:databaseID(*)', (req, res) => {
  notion.databases.query({ database_id: req.params.databaseID })
    .then(database => res.send(database.results))
    .catch(error => res.sendStatus(404).send(error.message));
});

app.get('^/get-users', (req, res) => {
  notion.users.list()
    .then(users => res.send(users.results.filter(user => user.type === 'person')))
    .catch(error => res.sendStatus(404).send(error.message));
});

app.get('^/get-block/:blockID(*)', (req, res) => {
  notion.blocks.children.list({ block_id: req.params.blockID })
    .then(response => res.send(response.results))
    .catch(error => res.sendStatus(404).send(error.message));
});

app.post('^/add-children', jsonParser, (req, res) => {
  addChildren(notion, req.body);
});

app.post('^/remove-children', jsonParser, (req, res) => {
  removeChildren(notion, req.body);
});

app.post("/submitData", jsonParser, async (req, res) => {

  const Person = req.body.Person;
  const Project = req.body.Project;
  const Hours = req.body.Hours;
  const Comment = req.body.Comment;
  const Date = req.body.Date;

  try {
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        "Person": {
          title: [
            {
              text: {
                content: Person
              }
            }
          ]
        },
        "[Logs - Projects]": {
          "relation": [
            {
              "id": Project
            }
          ]
        },
        Hours: {
          number: Hours
        },
        "Comment": {
          rich_text: [
            {
              text: {
                content: Comment
              }
            }
          ]
        },
        Date: {
          date: {
            start: Date
          }
        }
      }
    });
    console.log(response);
    console.log("okay");
  } catch (error) {
    console.log(error);
  }
});

app.post("/retrievePages", jsonParser, async (req, res) => {

  const User = req.body.User;

  try {
    const response = await notion.databases.query({
      database_id: timereportDbId,
      filter: {
        property: "Person", title: { equals: User }
      }
    })
      .then(resp => res.send(resp))
      .catch(error => res.sendStatus(404).send(error.message));

    console.log(response);
    console.log("okay");
  } catch (error) {
    console.log(error);
  }
});

app.get("/retrieveProjects", jsonParser, async (req, res) => {

  try {
    const response = await notion.databases.query({
      database_id: 'b69ed7b7a5b14fbbb1014b077588fa11',
      filter: {
        property: "Hours", number: { greater_than: 0 }
      }
    })
      .then(resp => res.send(resp))
      .catch(error => res.sendStatus(404).send(error.message));

    console.log(response);
    console.log("done");
  } catch (error) {
    console.log(error);
  }
});