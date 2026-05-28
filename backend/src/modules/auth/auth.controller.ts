import { Request, Response } from 'express';
import * as authService from './auth.service';
import { AuthRequest } from "../../middlewares/auth.middleware";

// @desc Register a new user
// @route POST /api/v1/auth/register
export const register = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) return res.status(400).send('Email and password are required');

        const data = await authService.register(email, password);
        res.status(201).json(data);
    } catch (error) {
        if (error instanceof Error && error.message === 'EMAIL_ALREADY_EXISTS') {
            console.warn('Email already exists.');
            return res.status(400).send('Error during registration.');
        }

        console.error(error);
        res.status(500).send('Server error');
    }
};

// @desc Login a user
// @route POST /api/v1/auth/login
export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) return res.status(400).send('Email and password are required');

        const data = await authService.login(email, password);
        res.json(data);
    } catch (error) {
        if (error instanceof Error && error.message === 'USER_NOT_FOUND') {
            console.warn('User not found.');
            return res.status(404).send('User not found.');
        }

        if (error instanceof Error && error.message === 'INVALID_CREDENTIALS') {
            console.warn('Invalid credentials.');
            return res.status(401).send('Invalid credentials.');
        }
        console.error(error);
        res.status(500).send('Server error');
    }
};

// @desc Get user data
// @route GET /api/v1/auth/me
export const getUser = async (req: AuthRequest, res: Response) => {
    try {
        const user = await authService.getUser(req.userId!);
        res.json(user);
    } catch (error) {
        if (error instanceof Error && error.message === 'USER_NOT_FOUND') {
            console.warn('User not found.');
            return res.status(404).send('User not found.');
        }

        console.error(error);
        res.status(500).send('Server error');
    }
};