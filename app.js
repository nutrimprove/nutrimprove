const morgan = require('morgan');
const express = require('express');
const next = require('next');
const {statusCheck} = require('./database/db');
const favicon = require('serve-favicon');

const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const port = 3000;
const apiPath = '/api/v1';
const handle = app.getRequestHandler();

app
   .prepare()
   .then(() => {
      const server = express();
      const foodRoutes = require('./routing/food');
      const recommendationRoutes = require('./routing/recommendations');

      server.use(express.static('public'));
      server.use(favicon('public/images/favicon.ico'));
      server.use(morgan('short'));

      server.use(foodRoutes);
      server.use(recommendationRoutes);

      server.get(apiPath + '/status', (req, res) => {
         statusCheck(req, res);
      });

      server.get('*', (req, res) => {
         return handle(req, res);
      });

      server.listen(port, err => {
         if (err) {
            throw err;
         }
         console.log(`> Ready on http://localhost:${port}`)
      });
   })
   .catch(ex => {
      console.error(ex.stack);
      process.exit(1);
   });