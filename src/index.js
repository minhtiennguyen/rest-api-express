import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import uuidv4 from 'uuid/v4';

// import models from './models';
import routes from './routes';
import models, { connectDb } from './models';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.context = {
    models,
    me: models.users[1]
  };
  next();
});
// End Middleware

// routes
app.use('/users', routes.user);
app.use('/messages', routes.message);
app.use('/session', routes.session);

app.get('/users', (req, res) => {
  return res.send(Object.values(req.context.models.users));
});

const eraseDatabaseOnSync = true;

connectDb().then(async () => {
  if(eraseDatabaseOnSync) {
    await Promise.all([
      models.User.deleteMany({}),
      models.Message.deleteMany({})
    ]);
  }

  app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
  });
});
