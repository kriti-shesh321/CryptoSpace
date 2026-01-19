import fs from 'fs';
import path from 'path';
import { pool} from '../src/config/db';

async function runMigrations() {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS migrations (
            id SERIAL PRIMARY KEY,
            filename TEXT UNIQUE NOT NULL,
            applied_at TIMESTAMPTZ DEFAULT now()
        );
    `);

    const migrationsDir = path.join(process.cwd(), 'src/migrations');
    const files = fs.readdirSync(migrationsDir).sort();

    for (const file of files) {
        const alreadyRun = await pool.query(
            'SELECT 1 FROM migrations WHERE filename = $1',
            [file]
        );

        if (alreadyRun.rowCount) continue;

        const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf-8');

        console.log(`Running migration: ${file}`);
        await pool.query(sql);
        await pool.query(
            'INSERT INTO migrations (filename) VALUES ($1)',
            [file]
        );
    }

    console.log('Migrations complete');
    process.exit(0);
}

runMigrations().catch(console.error);