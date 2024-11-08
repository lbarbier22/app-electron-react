import Database from 'better-sqlite3';

const db = new Database('src/domain/database/database.db'); // Remplace par le chemin correct de ta base de données

export function insertRating(trackId: string, rating: number) {
  const stmt = db.prepare('INSERT INTO ratings (id, rating) VALUES (?, ?)');
  stmt.run(trackId, rating);
}

export function getAllRatings() {
  const stmt = db.prepare('SELECT * FROM ratings');
  return stmt.all();
}
