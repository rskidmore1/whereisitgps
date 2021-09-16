require('dotenv/config');
const express = require('express');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const ClientError = require('./client-error');
const pg = require('pg');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const app = express();

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

app.use(staticMiddleware);

app.use(errorMiddleware);

const jsonMiddleware = express.json();

app.use(jsonMiddleware);

app.post('/api/vehicleinfo', (req, res, next) => {

  const { name, make, model, year, color, plate } = req.body;
  if (!name || !model) {
    throw new ClientError(400, 'name and model are required fields');

  }
  const sql = `
    insert into "vehicles" ("name", "make", "model", "year", "color",  "plate", "createdAt")
        values ($1, $2, $3, $4, $5, $6, now())
        returning *
  `;

  const params = [name, make, model, year, color, plate];

  db.query(sql, params)
    .then(result => {
      const veh = result.rows;
      res.json(veh);
    })
    .catch(err => {
      next(err);
    });

});

app.put('/api/vehiclealerts/:vehicleId', (req, res, next) => {

  const { speedAlert, speedingThreshold, brakeAlert, accelerationAlert, textAlert, emailAlert } = req.body;
  const vehicleId = parseInt(req.params.vehicleId, 10);
  if (!Number.isInteger(vehicleId) || vehicleId < 1) {
    throw new ClientError(400, 'vehicleId must be a positive integer');

  }

  const sql = `
    update "vehicles" set
      "speedAlert" = $1, "speedingThreshold" = $2,
      "brakeAlert" = $3, "accelerationAlert" = $4,
      "textAlert" = $5,  "emailAlert" = $6
      where "vehicleId" = $7;
  `;

  const params = [speedAlert, speedingThreshold, brakeAlert, accelerationAlert, textAlert, emailAlert, vehicleId];

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

app.get('/api/driverinfo/:driverId', (req, res, next) => {
  const driverId = parseInt(req.params.driverId, 10);
  if (!Number.isInteger(driverId) || driverId < 1) {
    throw new ClientError(400, 'driverId must be a positive integer');
  }
  const params = [driverId];

  const sql = `
    select * from "drivers"
    where "driverId" = $1
    `;
  db.query(sql, params)
    .then(results => {
      const [driver] = results.rows;
      if (!driver) {

        throw new ClientError(404, `cannot find driverId ${driverId}`); // This is returning html to instead json message to httpie
      } else {

        res.json(driver);
      }
    })
    .catch(err => {
      next(err);
    });

});

app.post('/api/driverinfo', (req, res, next) => {

  const { name, phone, email } = req.body;
  if (!name || !phone || !email) {
    throw new ClientError(400, 'name, phone, and email are required fields');

  }
  const sql = `
    insert into "drivers" ("name", "phone", "email", "vehicleId", "createdAt")
        values ($1, $2, $3, 2, now())
        returning *
  `; // Enter vehicle ID from vehicle profile

  const params = [name, phone, email];

  db.query(sql, params)
    .then(result => {
      const dri = result.rows;
      res.json(dri);
    })
    .catch(err => {
      next(err);
    });

});

app.post('/api/sendtext', (req, res, next) => {

  const sql = `
      select "phone", "email"
        from "users"
        where "userId" = 1
    `;// -replace userId with global thing

  db.query(sql)
    .then(result => {
      const user = result.rows;

      const userPhone = user[0].phone;
      const { toNumber, message } = req.body;
      const messages = [
        { toNumber: toNumber, message: message },
        { toNumber: userPhone, message: message }
      ];

      Promise.all([

        client.messages
          .create({
            body: messages[0].message,
            from: '+16193042945',
            to: messages[0].toNumber
          }),
        client.messages
          .create({
            body: messages[1].message,
            from: '+16193042945',
            to: messages[1].toNumber
          })

      ])
        .then(() => res.json({ success: true }))
        .catch(err => next(err));

    })
    .catch(err => {
      next(err);
    });

});

app.get('/api/demoroutes', (req, res, next) => {

  const sql = `
    select "vehicleId", "demoRoute" from "vehicles";
    `;

  db.query(sql)
    .then(results => {

      res.json(results);

    })
    .catch(err => {
      next(err);
    });
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
