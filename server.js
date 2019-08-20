const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const projectRouter = require('./routers/project-router');
const resourceRouter = require('./routers/resource-router');
const TaskRouter = require('./routers/task-router');

const server = express();

server.use(morgan('dev'));
server.use(express.json());
server.use(`/api/projects`, projectRouter);
server.use(`/api/resources`, resourceRouter);
server.use(`/api/tasks`, TaskRouter);
server.use(helmet());

server.get('/', (request, response) => {
  response.send(`
    <h1>NodeDB SPRINT Challenge</h1>
    <p>Please see the <a href='https://github.com/ericlugo/node-db-challenge'>README</a> for more information on where to go!</p>
  `);
});

server.get('/api', (request, response) => {
  response.send(`
    <h1>Looking for API Information?</h1>
    <p>Please see the <a href='https://github.com/ericlugo/node-db-challenge'>README</a> for more information on where to go!</p>
  `);
});

module.exports = server;
