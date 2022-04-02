import { Router } from 'express';

import user from './routes/user';

const routes = Router();

routes.get('/', (req, res) => {
    return res.json({ message: 'Hello, New Project! ' })
})

routes.use(user);


export default routes;
