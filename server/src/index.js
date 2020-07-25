const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const middlewares = require('./middlewares');

const app = express();

const port = process.env.PORT || 1300;

app.use(morgan('combined'));
app.use(helmet());
app.use(cors({
  origin: 'http://localhost:3000',
}));

app.get('/', (req, res) => {
  res.json({
    message: 'hello world!',
  });
});

app.use(middlewares.notFound);

app.use(middlewares.errorHandler);

app.listen(port, () => {
  console.log(`Server running on PORT: ${port}`);
});
