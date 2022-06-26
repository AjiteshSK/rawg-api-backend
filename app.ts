import express from 'express';
import router from './routes';
import cors from 'cors';

import config from 'config';

const port = config.get<number>('PORT');

const app = express();

app.use(cors());

app.use(router);

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
