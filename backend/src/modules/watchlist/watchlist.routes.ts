import { Router } from 'express';

import {
    addCoin,
    getWatchlist,
    removeCoin,
} from './watchlist.controller';

import {
    authMiddleware,
} from '../../middlewares/auth.middleware';

const router = Router();

router.post(
    '/',
    authMiddleware,
    addCoin
);

router.get(
    '/',
    authMiddleware,
    getWatchlist
);

router.delete(
    '/:coinId',
    authMiddleware,
    removeCoin
);

export default router;