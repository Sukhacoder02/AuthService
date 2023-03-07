// require express
const express = require('express');
const port = 3000;
const router = require('./routes/routes');
// require dotenv
require('dotenv').config();

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use('/api', router);

app.listen(port, () => {
  console.log(` Auth Server is  listening at http://localhost:${port}`);
});
