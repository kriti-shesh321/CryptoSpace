import { Router } from 'express';
import { getPrices, getPriceHistory } from './price.controller';

const router = Router();

router.get('/', getPrices);
router.get('/history/:coinId', getPriceHistory);

export default router;
