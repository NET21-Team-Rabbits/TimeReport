import { useState } from 'react';
import { useEffect } from 'react';
import './timereport.css';

export function ViewTimereports({ timereports }) {
  const [timereportLength, setTimereportLength] = useState(0);
  var array = [];

  useEffect(() => {
    if (timereports) {
      setTimereportLength(timereports.results.length);

      for (var i = 0; i < timereportLength; i++) {
        array += '<div class="timereportContents">';
        array += '<h3>' + 'ReportId:' + '</h3>' + '<p>' + timereports.results[i].id + '</p>';
        array += '<h3>' + 'Project:' + '</h3>' + '<p>' + timereports.results[i].properties.Project.rollup.array[0].title[0].plain_text + '</p>';
        array += '<h3>' + 'Date:' + '</h3>' + '<p>' + timereports.results[i].properties.Date.date.start + '</p>';
        array += '<h3>' + 'Hours:' + '</h3>' + '<p>' + timereports.results[i].properties.Hours.number + '</p>';
        array += '<h3>' + 'Comment' + '</h3>' + '<p>' + timereports.results[i].properties.Comment.rich_text[0].plain_text + '</p>';
        array += '</div>';
        array += '<br/>';
      }
      document.getElementById('ViewTimereportText').innerHTML = array;
    }
  });

  return (
    <>
      <h3 id='ViewTimereportText'></h3>
    </>
  );
};