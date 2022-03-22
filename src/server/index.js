import express from "express";
import { Client } from "@notionhq/client";

const app = express();
const port = 3001;

const token = "secret_iAH7qE3H2iPsk4oBTiTN99lqHR71VyEYoNHD1yY2jvJ";
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

app.get('/query/:ID(*)', (req, res) => {
  notion.databases.query({ database_id: req.params.ID })
    .then(response => res.send(response.results))
    .catch(error => res.sendStatus(404).send(error.message));
});


