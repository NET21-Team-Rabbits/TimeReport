// import "../styles/table.scss";
import { useEffect, useState } from "react";
import { getCellValue } from "../data/getCellValue";

export function Database({ database, order }) {
  const [properties, setProperties] = useState();

  useEffect(() => {
    if (!database) return;

    if (!order) return setProperties(Object.keys(database.properties).filter(property => !property.startsWith('[') && !property.endsWith(']')));

    setProperties(order.filter(property => Object.keys(database.properties).includes(property)));
  }, [database, order]);

  if (!properties) return <h1>Loading...</h1>;

  return (
    <table className="table">
      <thead>
        <tr>
          {
            properties.map(property =>
              <th key={database.properties[property].id}>{property}</th>
            )
          }
        </tr>
      </thead>
      <tbody>
        {
          database.content.map(row =>
            <tr key={row.id}>
              {
                properties.map(property =>
                  <td key={row.properties[property].id}>
                    {
                      getCellValue(row.properties[property])
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