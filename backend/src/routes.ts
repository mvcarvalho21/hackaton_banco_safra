import { Router } from 'express';

import user from './routes/user';
import offer from './routes/offer';

const routes = Router();

routes.get('/', (req, res) => {
    return res.json({ message: 'Hello, Hackathon Safra!' })
})

routes.use(user);
routes.use(offer);


export default routes;
