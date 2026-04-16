const Database = require('better-sqlite3');
const path = require('path');

// Create/connect to the database file and if database.db doesn't exist, better-sqlite3 will create it automatically
const db = new Database(path.join(__dirname, '../database.db'));

// Enable WAL mode
db.pragma('journal_mode = WAL');

// Create the tyres table if it does not already exist.
// Run every time the server starts but only create table on the first run because of IF NOT EXISTS
db.exec(`
    CREATE TABLE IF NOT EXISTS tyres (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    brand TEXT NOT NULL,
    size TEXT NOT NULL,
    price INTEGER NOT NULL
    vehicleType TEXT NOT NULL,
    condition TEXT NOT NULL,
    description TEXT,
    image TEXT,
    inStock INTEGER DEFAULT 1,
    createdAt TEXT DEFAULT CURRENT_TIMESTAMP
    )
`);

module.exports = db;