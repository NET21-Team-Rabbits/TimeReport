export function addLog(notion, { parentID, person, hours, comment, date, _peopleID, _projectID }) {
  notion.pages.create({
    parent: { database_id: parentID },
    properties: {
      Person: {
        title: [
          {
            text: {
              content: person
            }
          }
        ]
      },
      Hours: {
        number: hours
      },
      Comment: {
        rich_text: [
          {
            text: {
              content: comment
            }
          }
        ]
      },
      Date: {
        date: {
          start: date.toString().substring(0, 10)
        }
      },
      "[Logs - Projects]": {
        relation: [
          {
            id: _projectID
          }
        ]
      },
      "[Logs - People]": {
        relation: [
          {
            id: _peopleID
          }
        ]
      },
    }
  });
}