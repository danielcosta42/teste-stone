require('dotenv/config');
const app = require('./src/config/express')();

const port = process.env.PORT;

import './src/database';

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
