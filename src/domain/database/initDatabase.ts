import Database from 'better-sqlite3';

export const db = new Database('src/domain/database/database.db'); // Remplace par le chemin correct de ta base de données

async function initializeDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS ratings (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      rating INTEGER NOT NULL
    )
  `);
}

export default initializeDatabase;
