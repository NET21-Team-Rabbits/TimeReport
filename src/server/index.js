import express from "express";
import { Client } from "@notionhq/client";
import "dotenv/config";

const app = express();
const notion = new Client({ auth: process.env.TOKEN });

app.listen(process.env.PORT, console.log(`Server created on port: ${process.env.PORT}`));

app.get('^/databases', (req, res) => {
  notion.search({ filter: { property: 'object', value: 'database' } })
    .then(database => res.send(database.results))
    .catch(error => res.sendStatus(404).send(error.message));
});

app.get('^/database/:databaseID(*)', (req, res) => {
  notion.databases.query({ database_id: req.params.databaseID })
    .then(database => res.send(database.results))
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

app.get('/roles', (req, res) => {
  notion.blocks.children.list({ block_id: 'cf2972c2-176f-4c46-9f69-43dbffd81356' })
    .then(response => res.send(response.results))
    .catch(error => res.sendStatus(404).send(error.message));
});

app.get('/role/:roleID(*)', (req, res) => {
  notion.blocks.children.list({ block_id: req.params.roleID })
    .then(response => res.send(response.results))
    .catch(error => res.sendStatus(404).send(error.message));
});