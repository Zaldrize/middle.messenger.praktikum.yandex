
import express from 'express';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = 3000;

app.use(express.static('./dist'));
app.use('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});
app.listen(PORT, function () {
  console.log(`Chat app listening on port ${PORT}!`);
});