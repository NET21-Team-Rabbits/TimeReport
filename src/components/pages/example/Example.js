import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useEffect, useState } from "react";
import App from "../../../App";
import { Login } from "../login/Login";
import { UserInput } from "../login/UserInput";

export function Example({ user, databases }) {
  const [users, setUsers] = useState("");
  const [timereport, setDatabase] = useState(false);
  const [project, setProject] = useState("None");
  const [week, setWeek] = useState(0);
  const [comment, setComment] = useState("");
  const [day, setDay] = useState("");
  const [hours, setHours] = useState(0);

  useEffect(() => {
    if (!databases) return;

    const database = databases.find(database => database.title[0].plain_text === 'Timereports');
    if (!database) return;

    setDatabase(database);

  }, [databases]);

  useEffect(() => {
    if (!timereport) return;
    console.log(timereport);
  }, [timereport]);

  function getProject() {
    var input = document.getElementById("projectSelect");
    var inputVal = "";
    if (input) {
      inputVal = input.value;
      setProject(`${inputVal}`);
    }
  }

  function getWeek() {
    var input = document.getElementById("weekInput");
    var inputVal = "";
    if (input.value > 52 || input.value < 0 || input.value === "") {
      console.log("error");
    }
    else {
      if (input) {
        inputVal = input.value;
        setWeek(`${inputVal}`);
      }
    }
  }

  function getComment() {
    var input = document.getElementById("commentInput");
    var inputVal = "";
    if (input) {
      inputVal = input.value;
      setComment(`${inputVal}`);
    }
  }

  function getDay() {
    var input = document.getElementById("daySelect");
    var inputVal = "";
    if (input) {
      inputVal = input.value;
      setDay(`${inputVal}`);
    }
  }

  function getHours() {
    var input = document.getElementById("hourInput");
    var inputVal = "";
    if (input.value > 24 || input.value < 0 || input.value === "") {
      console.log("error");
    }
    else {
      if (input) {
        inputVal = input.value;
        setHours(`${inputVal}`);
      }
    }
  }

  useEffect(() => {
    if (user) {
      setUsers(user.name);
    }
  });

  function getAllInfo() {
    getProject();
    getWeek();
    getDay();
    getHours();
    getComment();
    sendData();
  }

  function sendData(){
    fetch("http://localhost:3001/submitData", {
      method: "post",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        person: users,
        hours: hours
      })
    })
  }

  return (
    <div>
      <h1>reporting for user: {users}</h1>

      <h2 id="e">Rapporterar för: {project}</h2>
      <select id="projectSelect">
        <option value="Project_a">Project_a</option>
        <option value="Project_b">Project_b</option>
      </select>
      <br />

      <h2>Vecka: {week}</h2>
      <input id="weekInput" type="number" min="0" max="52"></input>
      <br />

      <h2 id="e">Dag: {day}</h2>
      <select id="daySelect">
        <option value="Måndag">Måndag</option>
        <option value="Tisdag">Tisdag</option>
        <option value="Onsdag">Onsdag</option>
        <option value="Torsdag">Torsdag</option>
        <option value="Fredag">Fredag</option>
        <option value="Lördag">Lördag</option>
        <option value="Söndag">Söndag</option>
      </select>
      <br />

      <h2>Timmar: {hours}</h2>
      <input id="hourInput" type="number" min="0" max="24"></input>
      <br />

      <h2>Kommentar:</h2>
      <input id="commentInput" type="text"></input>
      <br />

      <button onClick={getAllInfo}>Knapp..</button>
    </div>
  );
};