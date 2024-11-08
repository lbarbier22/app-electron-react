import { db } from '../initDatabase';

export function getRating(trackId: string) {
  try {
    const stmt = db.prepare('SELECT rating FROM ratings WHERE id = ?');
    return stmt.pluck().get(trackId);
  } catch (error) {
    console.error('Erreur lors de la récupération de la note:', error);
    throw error;
  }
}

export function upsertRating(trackId: string, rating: number, name: string) {
  try {
    const existingRating = db
      .prepare('SELECT rating FROM ratings WHERE id = ?')
      .get(trackId);

    if (existingRating) {
      const stmt = db.prepare(
        'UPDATE ratings SET rating = ?, name = ? WHERE id = ?',
      );
      stmt.run(rating, name, trackId);
    } else {
      const stmt = db.prepare(
        'INSERT INTO ratings (id, rating, name) VALUES (?, ?, ?)',
      );
      stmt.run(trackId, rating, name);
    }

    return { success: true };
  } catch (error) {
    console.error(
      'Erreur lors de l’insertion/mise à jour dans la base de données :',
      error,
    );
    throw error;
  }
}

export function getAllRatings() {
  const stmt = db.prepare('SELECT * FROM ratings');
  return stmt.all();
}
