import * as SQLite from "expo-sqlite";
// Typy danych
export interface User {
  id: string;
  email: string;
}

export interface Exercise {
  id: number;
  userId: string;
  name: string;
  description: string;
}

// Otwórz bazę danych
const db = SQLite.openDatabaseSync("app.db");

// Inicjalizacja bazy danych i tabel
export const initDatabase = (): void => {
  db.runSync(`CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY NOT NULL,
    email TEXT
  );`);
  db.runSync(`CREATE TABLE IF NOT EXISTS exercises (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId TEXT,
    name TEXT,
    description TEXT,
    FOREIGN KEY (userId) REFERENCES users (id)
  );`);
};
// Dodaj użytkownika
export const insertUser = (id: string, email: string): void => {
  db.runSync("INSERT OR REPLACE INTO users (id, email) VALUES (?, ?);", [
    id,
    email,
  ]);
};

// Pobierz dane użytkownika po ID
export const getUserById = (
  id: string,
  callback: (user: User | null) => void
): void => {
  const result = db.getFirstSync<User>("SELECT * FROM users WHERE id = ?;", [
    id,
  ]);
  callback(result ?? null);
};
// Dodaj ćwiczenie
export const insertExercise = (
  userId: string,
  name: string,
  description: string
): void => {
  db.runSync(
    "INSERT INTO exercises (userId, name, description) VALUES (?, ?, ?);",
    [userId, name, description]
  );
};
// Pobierz wszystkie ćwiczenia użytkownika
export const getExercisesByUserId = (
  userId: string,
  callback: (exercises: Exercise[]) => void
): void => {
  const results = db.getAllSync<Exercise>(
    "SELECT * FROM exercises WHERE userId = ?;",
    [userId]
  );
  callback(results);
};
