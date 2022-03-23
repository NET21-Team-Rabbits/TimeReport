import { render } from '@testing-library/react';
import { useState } from 'react';
import { useEffect } from 'react';
import './timereport.css';

export function ViewTimereports({timereports}) {
  const [aa, setAa] = useState(0);
  var array = [];

  useEffect(()=>{
    if(timereports){
       setAa(timereports.results.length)

      for(var i = 0; i < aa; i++){
        array += '<div class="hehe">';
        array += '<h3>' + 'ReportId:' + '</h3>' + '<p>' + timereports.results[i].id + '</p>';
        array += '<h3>' + 'Project:' + '</h3>' + '<p>' + timereports.results[i].properties.Project.rich_text[0].plain_text + '</p>';
        array += '<h3>' + 'Date:' + '</h3>' + '<p>' + timereports.results[i].properties.Date.date.start + '</p>';
        array += '<h3>' + 'Hours:' + '</h3>' + '<p>' + timereports.results[i].properties.Hours.number + '</p>';
        array += '<h3>' + 'Comment' + '</h3>' + '<p>' + timereports.results[i].properties.Comment.rich_text[0].plain_text + '</p>';
        array += '</div>';
        array += '<br/>'
      }
      document.getElementById('IdkWhatToNameThis').innerHTML = array;
    }
  })

  return (
    <>
      <h3 id='IdkWhatToNameThis'></h3>
    </>
  );
};