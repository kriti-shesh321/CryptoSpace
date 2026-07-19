import { Request, Response } from 'express';
import * as priceService from './price.service';

// @desc Get live prices for all tracked coins
// @route GET /api/v1/prices
export const getPrices = async (req: Request, res: Response) => {
    try {
        const prices = await priceService.getLivePrices();
        res.json(prices);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

// @desc Get price history for a tracked coin
// @route GET /api/v1/prices/history/:coinId
export const getPriceHistory = async (req: Request, res: Response) => {
    try {
        const { coinId } = req.params;
        const days = req.query.days
            ? Number(req.query.days)
            : undefined;

        if (days !== undefined && Number.isNaN(days)) {
            return res.status(400).send('Invalid days query parameter');
        }

        const history = await priceService.getPriceHistory(
            coinId as string,
            days
        );

        res.json(history);
    } catch (error) {
        if (error instanceof Error && error.message === 'INVALID_COIN') {
            return res.status(400).send('Invalid coin ID');
        }

        console.error(error);
        res.status(500).send('Server error');
    }
};
