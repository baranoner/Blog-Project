import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

export const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
});
