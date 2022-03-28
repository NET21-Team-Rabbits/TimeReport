import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ViewTimereports } from "./ViewTimereport";
import "./timereport.css";

export function Example({ user, databases }) {
  const [users, setUsers] = useState("");
  const [timereport, setDatabase] = useState(false);
  const [project, setProject] = useState("None");
  const [comment, setComment] = useState("");
  const [hours, setHours] = useState(0);
  const [date, setDate] = useState(new Date());
  const [sendData, setsendData] = useState(false);
  const [viewTimereports, setViewTimereports] = useState(false);
  const [receiveTimereports, setReceiveTimereports] = useState(false);
  const [timereports, setTimereports] = useState(false);
  const [projects, setProjects] = useState(false);
  const [projectOptions, setProjectOptions] = useState([]);
  const [loadProjects, setLoadprojects] = useState(false);

  useEffect(() => {
    if (!databases) return;
    const database = databases?.logs ?? null;

    if (!database) return;

    setDatabase(database);

  }, [databases]);

  useEffect(() => {
    if (!timereport) return;
    console.log(timereport);
  }, [timereport]);

  useEffect(() => {

    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Notion-Version': '2022-02-22',
        'Content-Type': 'application/json'
      }
    };

      fetch('/retrieveProjects', options)
        .then(response => response.json())
        .then(response => setProjects(response))
        .catch(err => console.error(err));

        setLoadprojects(true);
  }, []);

  useEffect(() => {
    if(loadProjects){
      if (!projects) return;

    for(var i = 0; i < projects.results.length; i++){
      projectOptions.push({value: projects.results[i].id, text: projects.results[i].properties.Project.title[0].plain_text});
    }
    setLoadprojects(false)
    }
  });

  function getProject() {
    var input = document.getElementById("projectSelect");
    var inputVal = "";
    if (input) {
      inputVal = input.value;
      setProject(`${inputVal}`);
    }
  }

  function getComment() {
    var input = document.getElementById("commentTextarea");
    var inputVal = "";
    if (input) {
      inputVal = input.value;
      setComment(`${inputVal}`);
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
    getComment();
    getHours();
    setsendData(true);
  }

  function viewTimereportsButton() {
    setReceiveTimereports(true);
  }

  function SumbitConfirmation() {
    document.getElementById("SumbitConfirmation").innerHTML = "";
  }

  useEffect(() => {
    if (sendData) {

      let hours_ = hours * 1;

      console.log(date);

      fetch("/submitData", {
        method: "post",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          Person: users,
          Project: project,
          Hours: hours_,
          Comment: comment,
          Date: date,
          UserID: "a"
        })
      });
      document.getElementById("SumbitConfirmation").innerHTML = "Timereport successfully submitted";
      setTimeout(SumbitConfirmation, 3000);
    }
    setsendData(false);
  });

  useEffect(() => {

    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Notion-Version': '2022-02-22',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ User: users })
    };

    if (receiveTimereports) {
      fetch('/retrievePages', options)
        .then(response => response.json())
        .then(response => setTimereports(response))
        .catch(err => console.error(err));

      setReceiveTimereports(false);
      setViewTimereports(true);
    }
  });

  useEffect(() => {
    if (!timereports) return;
    console.log(timereports.results);
    console.log(user);
  }, [timereports]);

  return (
    <div>
      <h1>Reporting for user: {users}</h1>

      <label className="reportLabels" for="projectSelect">Reporting for project:</label>
      <br/>
      <select id="projectSelect" name="Project">
        {projectOptions.map(item => {
        return (<option key={item.value} value={item.value}>{item.text}</option>);
      })}
      </select>
      <br />
      
      <label className="reportLabels" for="Datepicker">Date</label>
      <DatePicker id="Datepicker" selected={date} onChange={date => setDate(date)} popperPlacement="bottom" name="Date"/>
      <br />
       
      <label className="reportLabels" for="hourInput">Hours worked: {hours}</label>
      <br/>
      <input id="hourInput" type="number" name="hours" min="0" max="24"></input>
      <br />

      <label className="reportLabels" for="commentTextarea">Comment:</label>
      <br/>
      <textarea id="commentTextarea" name="comment" rows="5" cols="45">
      </textarea>
      <br />

      <button className="reportButtons" name="Submit" onClick={getAllInfo}>Submit timereport</button>
      <p id="SumbitConfirmation"></p>
      <br />
      <br />

      <button className="reportButtons" name="View timereports" onClick={viewTimereportsButton}>View my timereports</button>
      <br />
      <br />

      {
        viewTimereports ? (
          <ViewTimereports {...{ timereports }} />
        ) : (
          <></>
        )
      }
    </div>
  );
};