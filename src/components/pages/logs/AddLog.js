import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { post } from "../../../data/post";

export function AddLog({ user, databases }) {
  const [date, setDate] = useState();

  useEffect(() => {
    if (!date) return setDate(new Date());
  }, [date]);

  function addLog() {
    fetch('/add-log', post({
      parentID: databases.logs.id,
      person: user.name,
      hours: parseInt(document.getElementById('hours').value),
      comment: document.getElementById('comment').value,
      date: date,
      _peopleID: databases.people.content.find(person => person.properties.User.people[0].id === user.id).id,
      _projectID: document.getElementById('projects').value
    }));
  }

  if (!databases) return <h1>Loading...</h1>;

  return (
    <div style={{ display: 'flex', flexFlow: 'column wrap' }}>
      <label htmlFor="projects">Project</label>
      <select id="projects" name="Project">
        {
          databases.projects.content.map(project =>
            <option key={project.id} value={project.id}>
              {project.properties.Project.title[0].text.content}
            </option>
          )
        }
      </select>

      <label htmlFor="datepicker">Date</label>
      <DatePicker id="datepicker" selected={date} onChange={date => setDate(date)} popperPlacement="bottom" name="date" />

      <label htmlFor="hours">Hours</label>
      <input id="hours" type="number" name="hours" min="0" max="24" />

      <label htmlFor="comment">Comment</label>
      <textarea id="comment" name="comment" rows="5" cols="45" />

      <button onClick={() => addLog()}>Submit log</button>
    </div>
  );
};