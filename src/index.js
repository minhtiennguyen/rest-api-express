import 'dotenv/config';
import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

let users = {
  1: {
    id: '1',
    username: 'Robin Wieruch',
  },
  2: {
    id: '2',
    username: 'Dave Davids',
  },
};
let messages = {
  1: {
    id: '1',
    text: 'Hello World',
    userId: '1',
  },
  2: {
    id: '2',
    text: 'By World',
    userId: '2',
  },
};

app.use(cors());

app.get('/users', (req, res) => {
  return res.send('GET HTTP method on user resource');
});

app.post('/users', (req, res) => {
  return res.send('POST HTTP method on user resource');
});

app.put('/users/:userId', (req, res) => {
  return res.send(`PUT HTTP method on user/${req.params.userId} resource`);
});

app.delete('/users/:userId', (req, res) => {
  return res.send(`DELETE HTTP method on user/${req.params.userId} resource`);
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
})