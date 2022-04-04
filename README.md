# Team Rabbits Timereport

## About

Application made for keeping track and logging time spent working on projects through Notion's API. Assigned to *five* students as a school project in northern Sweden. Developed during the month of March in 2022.

## Code Structure

Application built with React with a backend express server that integrates Notion's API. Navigation on the website is built with React-Router and mostly uses the react hook "Context" for sharing data among components.

The backend server is connected to a specified workspace on notion through a token. On initial application launch, the backend server recieves a request to fetch relevant data from the workspace, when notion-data is recieved, the application defines recieved data as context. Context can then be retrieved by any component at ease.

## Developers

- Simon Johansson
- Olivia Walter
- Filip Omnell
