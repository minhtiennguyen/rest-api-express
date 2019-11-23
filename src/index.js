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
app.use(async (req, res, next) => {
  req.context = {
    models,
    me: await models.User.findbyLogin('tnguyen1')
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
  // re-initialize db on every server start
  if(eraseDatabaseOnSync) {
    await Promise.all([
      models.User.deleteMany({}),
      models.Message.deleteMany({})
    ]);
  }

  createUserWithMessages();

  app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
  });
});

// seeding function
const createUserWithMessages = async () => {
  const user1 = new models.User({
    username: 'tnguyen1'
  });

  const user2 = new models.User({
    username: 'tnguyen2'
  });

  const mes1 = new models.Message({
    text: 'Message 1',
    user: user1.id
  });
  const mes2 = new models.Message({
    text: 'Message 2',
    user: user2.id
  });
  const mes3 = new models.Message({
    text: 'Message 3',
    user: user2.id
  });

  await mes1.save();
  await mes2.save();
  await mes3.save();

  await user1.save();
  await user2.save();
};
