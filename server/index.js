require('dotenv/config');
const express = require('express');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const ClientError = require('./client-error');
const pg = require('pg');

const app = express();

const db = new pg.Pool({ // What is this?
  connectionString: process.env.DATABASE_URL, // Pulls the env var
  ssl: {
    rejectUnauthorized: false
  }
});

app.use(staticMiddleware);

app.use(errorMiddleware);

const jsonMiddleware = express.json();

app.use(jsonMiddleware);

app.post('/vehicleinfo', (req, res, next) => {

  const { name, make, model, year } = req.body;
  if (!name || !model) {
    throw new ClientError(400, 'name and model are required fields');
  }
  const sql = `
    insert into "vehicles" ("name", "make", "model", "year", "createdAt")
        values ($1, $2, $3, $4, now())
        returning *
  `; // -make sure to update this code when creating the update function

  const params = [name, make, model, year];

  db.query(sql, params)
    .then(result => {
      const veh = result.rows;
      res.json(veh);
    })
    .catch(err => {
      next(err);
    });

});

app.get('/api/vehicleinfo/:vehicleId', (req, res, next) => {
  const vehicleId = parseInt(req.params.vehicleId, 10);
  if (!Number.isInteger(vehicleId) || vehicleId < 1) {
    throw new ClientError(400, 'vehicleId must be a positive integer');

  }
  const params = [vehicleId];

  const sql = `
    select * from "vehicles"
    where "vehicleId" = $1
    `;

  db.query(sql, params)
    .then(results => {
      const [vehicle] = results.rows;
      if (!vehicle) {

        throw new ClientError(404, `cannot find vehicleId ${vehicleId}`); // This is returning html to instead json message to httpie
      } else {

        res.json(vehicle);
      }
    })
    .catch(err => {
      next(err);
    });
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
