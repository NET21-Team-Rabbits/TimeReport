import "../styles/table.scss";
import { useEffect, useState } from "react";
import { getCellValue } from "../data/getCellValue";

export function Database({ database, order }) {
  const [properties, setProperties] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!database) return;

    fetch(`/database/${database.id}`)
      .then(data => data.json())
      .then(data => setData(data));
  }, [database]);

  useEffect(() => {
    if (!database) return;

    if (!order) return setProperties(Object.values(database.properties));

    setProperties(order.filter(property => Object.keys(database.properties).includes(property)).map(property => database.properties[property]));
  }, [database, order]);

  if (!properties || !data) return <h1>Loading...</h1>;

  return (
    <table className="table">
      <thead>
        <tr>
          {
            properties.map(property =>
              <th key={property.id}>{property.name}</th>
            )
          }
        </tr>
      </thead>
      <tbody>
        {
          data.map(row =>
            <tr key={row.id}>
              {
                properties.map(property =>
                  <td key={row.properties[property.name].id}>
                    {
                      getCellValue(row.properties[property.name])
                    }
                  </td>
                )
              }
            </tr>
          )
        }
      </tbody>
    </table>
  );
}