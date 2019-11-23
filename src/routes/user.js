import Router from 'express';

const router = Router();

router.get('/', async (req, res) => {
  const users = await req.context.models.User.find();
  return res.send(users);
});

router.get('/:userId', async (req, res) => {
  const user = await req.context.models.User.findbyId(req.params.userId);
  return res.send(user);
});

router.delete('/:userId', async (req, res) => {
  const user  = await req.context.models.User.findById(req.params.userId);

  let result = null;
  if(user) {
    result = await user.remove();
  }

  return res.send(result);
});

export default router;