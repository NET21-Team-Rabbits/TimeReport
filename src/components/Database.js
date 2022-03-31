import "./database.scss";
import { Data } from "../DataContainer";
import { useContext, useEffect, useState } from "react";
import { getCellValue } from "../data/getCellValue";

export function Database({ database, order, title }) {
  const { isMobile } = useContext(Data);
  const [properties, setProperties] = useState();

  useEffect(() => {
    if (!database) return;

    if (!order) return setProperties(Object.keys(database.properties).filter(property => !property.startsWith('[') && !property.endsWith(']')));

    setProperties(order.filter(property => Object.keys(database.properties).includes(property)));
  }, [database, order]);

  useEffect(() => {
    if (!isMobile || !database || !title || !Object.keys(database.properties).includes(title)) return;

    setProperties(currentState => currentState.filter(property => property !== title));
  }, [database, isMobile, title]);

  if (!properties) return <h1>Loading...</h1>;

  if (isMobile) return (
    <section className="database-mobile">
      {
        database.content.map(row =>
          <div className="database-mobile-row" key={row.id}>
            {
              title ? (
                <h2 className="database-mobile-row-title">{getCellValue(row.properties[title])}</h2>
              ) : null
            }
            <div className="database-mobile-row-content">
              {
                properties.map(property =>
                  <div className={`database-mobile-cell ${database.title}-${property.replace(' ', '-')}`.toLowerCase()} key={row.properties[property].id}>
                    <h2>{property}</h2>
                    <p>{getCellValue(row.properties[property])}</p>
                  </div>
                )
              }
            </div>
          </div>
        )
      }
    </section>
  );

  return (
    <table className="database">
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