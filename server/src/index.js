const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const middlewares = require('./middlewares');
const logsRouter = require('./api/logs');

dotenv.config();

const app = express();

const port = process.env.PORT || 1300;

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(morgan('combined'));
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN,
}));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'hello world!',
  });
});

app.use('/api/logs', logsRouter);

app.use(middlewares.notFound);

app.use(middlewares.errorHandler);

app.listen(port, () => {
  console.log(`Server running on PORT: ${port}`);
});
