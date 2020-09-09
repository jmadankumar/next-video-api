import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const PORT = 8081;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get('/echo', (req, res) => {
  res.send('Echo From server');
});

app.listen(PORT, () => {
  console.log(`Server started at port : ${PORT}`);
});
