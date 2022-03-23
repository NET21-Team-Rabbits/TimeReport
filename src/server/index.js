import express from "express";
import { Client } from "@notionhq/client";
import cors from "cors";
import bodyParser from "body-parser";
var jsonParser = bodyParser.json();

const app = express();
app.use(cors());
const port = 3001;

const token = "secret_iAH7qE3H2iPsk4oBTiTN99lqHR71VyEYoNHD1yY2jvJ";
const databaseId = "559c653219e44d6b890220e0aff15dfc";
const timereportDbId = "559c653219e44d6b890220e0aff15dfc";
const notion = new Client({ auth: token });

app.listen(port, console.log(`Server created on port: ${port}`));

app.get('^/databases', (req, res) => {
  notion.search({ filter: { property: 'object', value: 'database' } })
    .then(database => res.send(database.results))
    .catch(error => res.sendStatus(404).send(error.message));
});

app.get('^/database/:databaseID(*)', (req, res) => {
  notion.databases.retrieve({ database_id: req.params.databaseID })
    .then(database => res.send(database))
    .catch(error => res.sendStatus(404).send(error.message));
});

app.get('^/users', (req, res) => {
  notion.users.list()
    .then(users => res.send(users.results.filter(user => user.type === 'person')))
    .catch(error => res.sendStatus(404).send(error.message));
});

app.get('^/user/:userID(*)', (req, res) => {
  notion.users.retrieve({ user_id: req.params.userID })
    .then(user => res.send(user))
    .catch(error => res.sendStatus(404).send(error.message));
});

app.post("/submitData", jsonParser, async(req, res) =>{
  
  const Person = req.body.Person;
  const Project = req.body.Project;
  const Week = req.body.Week;
  const Day = req.body.Day;
  const Hours = req.body.Hours;
  const Comment = req.body.Comment;
  const Date = req.body.Date;

  try{
    const response = await notion.pages.create({
      parent: {database_id: databaseId},
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
        "Project": {
          rich_text: [
            {
              text: {
                content: Project
              }
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
    })
    console.log(response);
    console.log("okay");
  } catch(error){
    console.log(error);
  }
});

app.post("/retrievePages", jsonParser, async(req, res) =>{
  
  const User = req.body.User;

  try{
    const response = await notion.databases.query({
      database_id: timereportDbId,
      filter: {
        property: "Person", title: {equals: User}
      }
    })
    .then(resp => res.send(resp))
    .catch(error => res.sendStatus(404).send(error.message));

    console.log(response);
    console.log("okay");
  } catch(error){
    console.log(error);
  }
});