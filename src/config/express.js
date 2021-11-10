import express from 'express';
import consign from 'consign';
import cors from 'cors';

module.exports = () => {
  const app = express();

  app.use(express.json());

  app.use(cors());

  consign({ cwd: 'src/api' })
    .then('../database/models')
    .then('services')
    .then('validations')
    .then('controllers')
    .into(app);

  return app;
};
