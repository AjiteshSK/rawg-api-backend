import express from 'express';
import router from './routes';

import config from 'config';

const port = config.get<number>('PORT');

const app = express();

app.use(router);

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
