import jwt from 'jsonwebtoken';
import { pool } from '../../config/db';
import { ENV } from '../../config/env';
import { hashPassword, comparePassword } from '../../utils/crypto';
import { DbUser, User } from './auth.types';

const toUser = (dbUser: DbUser): User => {
    return {
        id: dbUser.id,
        email: dbUser.email,
        createdAt: dbUser.created_at,
    };
};

export const register = async (email: string, password: string) => {
    const passwordHash = await hashPassword(password);

    const existingUser = await pool.query<DbUser>(
        `SELECT * FROM users WHERE email = $1`,
        [email]
    );

    if (existingUser.rows.length > 0) {
        throw new Error('EMAIL_ALREADY_EXISTS');
    }

    const result = await pool.query<DbUser>(
        `INSERT INTO users (email, password_hash)
        VALUES ($1, $2)
        RETURNING *`,
        [email, passwordHash]
    );

    const user = toUser(result.rows[0]);

    const token = jwt.sign(
        { userId: user.id },
        ENV.JWT_SECRET,
        { expiresIn: '7d' }
    );

    return { token, user };
};

export const login = async (email: string, password: string) => {
    const result = await pool.query<DbUser>(
        `SELECT * FROM users WHERE email = $1`,
        [email]
    );

    const dbUser = result.rows[0];
    if (!dbUser) throw new Error('Invalid credentials');

    const isValid = await comparePassword(password, dbUser.password_hash);
    if (!isValid) throw new Error('Invalid credentials');

    const user = toUser(dbUser);

    const token = jwt.sign(
        { userId: user.id },
        ENV.JWT_SECRET,
        { expiresIn: '7d' }
    );

    return { token, user };
}

export const getUser = async (userId: string) => {
    const result = await pool.query<DbUser>(
        `SELECT * FROM users WHERE id = $1`,
        [userId]
    );

    if (!result.rows[0]) throw new Error('User not found');

    return toUser(result.rows[0]);
}
