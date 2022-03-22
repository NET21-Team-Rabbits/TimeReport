import { useEffect, useState } from "react";


export function Projects({ user, database }) {
  const [properties, setProperties] = useState(false);
  const [data, setData] = useState(false);

  useEffect(() => {
    if (!database) return;

    fetch(`/query/${database.id}`)
      .then(data => data.json())
      .then(data => setData(data));

    const propertyTitles = Object.keys(database.properties);
    const _properties = [];
    const order = [6, 1, 0, 4, 3, 5];

    order.forEach(index => {
      _properties.push(propertyTitles[index]);
    });

    setProperties(_properties);
  }, [database]);

  useEffect(() => {
    if (!data) return;

    console.log(data);
  }, [data]);

  if (!properties || !data) return <h1>Loading...</h1>;

  return (
    <div>
      <h1>Projects for: {user.name}</h1>
      <table>
        <thead>
          <tr>
            {
              properties.map(property => <th key={property}>- - - {property} - - -</th>)
            }
          </tr>
        </thead>
        <tbody>
          {
            data.map(row =>
              <tr key={row.id}>

                {
                  properties.map(property =>
                    <td key={row.properties[property].id}>
                      {
                        getValue(row.properties[property])
                      }
                    </td>
                  )
                }
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  );

}
function getValue(data) {

  switch (data.type) {
    case 'number': // HOURS
      return data.number;

    case 'select': // STATUS
      return data.select.name;

    case 'formula': // HOURS LEFT
      switch (data.formula.type) {
        case 'number':
          return data.formula.number;

        default:
          return 'woppies';
      }

    case 'rollup': // WORKED HOURS
      switch (data.rollup.type) {
        case 'number':
          return data.rollup.number;

        default:
          return 'woppies';
      }

    case 'date': // TIMESPAN
      return `${data.date.start} -> ${data.date.end}`;

    case 'title': // PROJECTNAME
      return data.title[0].text.content;

    default:
      return '♣️ GETVALUE NOT ADDED ♣️';
  }
}

































// ♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️♣️