import { Response } from 'express';
import * as watchlistService from './watchlist.service';
import { AuthRequest } from '../../middlewares/auth.middleware';


// @desc Add coin to watchlist
// @route POST /api/watchlist
export const addCoin = async (
    req: AuthRequest,
    res: Response
) => {

    try {

        const { coinId } = req.body;

        if (!coinId || Array.isArray(coinId)) {
            return res
                .status(400)
                .send('Coin ID is required');
        }

        const item =
            await watchlistService.addCoin(
                req.userId!,
                coinId
            );

        res.status(201).json(item);

    } catch (error) {

        if (error instanceof Error && error.message === 'WATCHLIST_ITEM_EXISTS') {
            return res
                .status(409)
                .send(
                    'Coin already exists in watchlist'
                );
        }

        if (error instanceof Error && error.message === 'INVALID_COIN') {
            return res
                .status(400)
                .send('Invalid coin ID');
        }

        console.error(error);

        res.status(500).send('Server error');
    }
};


// @desc Get watchlist
// @route GET /api/watchlist
export const getWatchlist = async (
    req: AuthRequest,
    res: Response
) => {

    try {

        const watchlist =
            await watchlistService.getWatchlist(
                req.userId!
            );

        res.json(watchlist);

    } catch (error) {

        console.error(error);

        res
            .status(500)
            .send('Server error');
    }
};


// @desc Remove coin from watchlist
// @route DELETE /api/watchlist/:coinId
export const removeCoin = async (
    req: AuthRequest,
    res: Response
) => {

    try {

        const { coinId } = req.params;

        if (!coinId || Array.isArray(coinId)) {
            return res
                .status(400)
                .send('Coin ID is required');
        }

        await watchlistService.removeCoin(
            req.userId!,
            coinId
        );

        res.sendStatus(204);

    } catch (error) {

        if (
            error instanceof Error &&
            error.message ===
            'WATCHLIST_ITEM_NOT_FOUND'
        ) {
            return res
                .status(404)
                .send(
                    'Watchlist item not found'
                );
        }

        if (error instanceof Error && error.message === 'INVALID_COIN') {
            return res
                .status(400)
                .send('Invalid coin ID');
        }

        console.error(error);

        res
            .status(500)
            .send('Server error');
    }
};