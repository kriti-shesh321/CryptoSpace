import { Response } from 'express';
import { AuthRequest } from '../../middlewares/auth.middleware';
import * as alertService from './alert.service';

import { validate as isUUID } from 'uuid';

// @desc Get alerts by user ID
// @route GET /api/v1/alerts
export const getAlerts = async (req: AuthRequest, res: Response) => {
    try {
        const alerts = await alertService.getAlerts(req.userId!);
        res.json(alerts);

    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
};

// @desc Create a new alert
// @route POST /api/v1/alerts
export const createAlert = async (req: AuthRequest, res: Response) => {
    try {
        const { coinId, type, operator, value, cooldownSeconds } = req.body || {};

        if (!coinId || !type || !operator || value === undefined) {
            return res.status(400).send('Missing required fields');
        }

        const alert = await alertService.createAlert(req.userId!, {
            coinId,
            type,
            operator,
            value,
            cooldownSeconds,
        });

        res.status(201).json(alert);
    } catch (error) {

        if (
            error instanceof Error &&
            error.message === 'INVALID_ALERT_DATA'
        ) {
            return res.status(400).send('Invalid alert data');
        }

        console.error(error);
        res.status(500).send('Server error');
    }
};

// @desc Update an alert
// @route PATCH /api/v1/alerts/:id
export const updateAlert = async (req: AuthRequest, res: Response) => {
    try {
        const updateData = req.body || {};

        if (!isUUID(req.params.id)) {
            return res.status(400).send('Invalid alert id. Must be a valid UUID');
        }

        if (Object.keys(updateData).length === 0) {
            return res.status(400).send('No fields provided for update');
        }
        const alert = await alertService.updateAlert(
            req.userId!,
            req.params.id as string,
            updateData
        );

        res.json(alert);
    } catch (error) {

        if (
            error instanceof Error &&
            error.message === 'INVALID_ALERT_DATA'
        ) {
            return res.status(400).send('Invalid alert data');
        }

        if (
            error instanceof Error &&
            error.message === 'ALERT_NOT_FOUND'
        ) {
            return res.status(404).send('Alert not found');
        }

        console.error(error);
        res.status(500).send('Server error');
    }
};

// @desc Delete an alert
// @route DELETE /api/v1/alerts/:id
export const deleteAlert = async (req: AuthRequest, res: Response) => {
    try {
        if (!isUUID(req.params.id)) {
            return res.status(400).send('Invalid alert id. Must be a valid UUID');
        }
        await alertService.deleteAlert(req.userId!, req.params.id as string);
        res.json({ message: 'Alert deleted successfully' });
    } catch (error) {
        if (error instanceof Error && error.message === 'ALERT_NOT_FOUND') {
            return res.status(404).send('Alert not found');
        }

        console.error(error);
        res.status(500).send('Server error');
    }
};