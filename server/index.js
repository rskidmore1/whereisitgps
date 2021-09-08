require('dotenv/config');
const express = require('express');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
// const ClientError = require('./client-error');

const app = express();

app.use(staticMiddleware);

app.use(errorMiddleware);

// app.get('/vehicleinfo', (req, res, next) => {
//   console.log('success');
// });
app.post('/vehicleinof', (req, res, next) => {
  // const { name, make, model, year } = req.body;
  // if (!name || !model) {
  //   throw new ClientError(400, 'name and model are required fields');
  // }
  // const sql = `
  //   insert into "vehicle" ("name", "make", "model", "year")
  //       values ($1, $2, $3, $4)
  //       returning *
  // `;
  // const params = [name, make, model, year];

  // -make sql promise next

});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
