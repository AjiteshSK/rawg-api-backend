import express from 'express';
import router from './routes';
import cors from 'cors';
import path from 'path';

import config from 'config';

const port = process.env.PORT || config.get<number>('PORT');

const app = express();

app.use(cors());

app.use(router);

app.get('*', (req, res) => {
  console.log('send file');
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
